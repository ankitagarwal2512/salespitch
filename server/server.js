// ─────────────────────────────────────────────────────────────────────────────
// HROne Deck — Azure Entra SSO gate
//
// Confidential-client OIDC (auth-code + PKCE) with a server-side session cookie.
// The server's only job: validate the session, then serve the static deck.
// The Entra token exchange is the ONLY server-side external call; everything the
// deck itself does (fonts, app APIs) stays in the browser.
// ─────────────────────────────────────────────────────────────────────────────
import express from 'express';
import session from 'express-session';
import { ConfidentialClientApplication, CryptoProvider, LogLevel } from '@azure/msal-node';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// temp changes
// Non-secret config has defaults baked in (these are public: the client/tenant IDs appear
// in the browser auth redirect, and the redirect URIs are public). Only the two real secrets
// have no default — they arrive via image ENV (build-arg) in prod, or server/.env locally.
const {
  PORT = 8080,
  CLIENT_ID = 'efda3e3f-0dc6-4684-b0b8-e6f50fd8f35c',
  TENANT_ID = '0ff95a09-92f4-4e6b-88b0-d5d0519242e0',
  CLIENT_SECRET,
  REDIRECT_URI = 'https://pitch.hrone.cloud/auth/callback',
  POST_LOGOUT_REDIRECT_URI = 'https://pitch.hrone.cloud/',
  SESSION_SECRET,
  STATIC_DIR,
  NODE_ENV = 'development',   // Dockerfile sets production; local dev stays development
} = process.env;

// Blank or unset → serve the repo root (local dev). The container sets /app/public.
const staticRoot = STATIC_DIR && STATIC_DIR.trim() ? STATIC_DIR : path.join(__dirname, '..');

// Fail fast if a real secret is missing — everything else now has a default.
for (const [k, v] of Object.entries({ CLIENT_SECRET, SESSION_SECRET })) {
  if (!v) { console.error(`[config] Missing required env var: ${k}`); process.exit(1); }
}

// ── MSAL confidential client ─────────────────────────────────────────────────
const msal = new ConfidentialClientApplication({
  auth: {
    clientId: CLIENT_ID,
    authority: `https://login.microsoftonline.com/${TENANT_ID}`,
    clientSecret: CLIENT_SECRET,
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Warning,
      loggerCallback: (_level, message) => console.log(message),
    },
  },
});
const cryptoProvider = new CryptoProvider();
const SCOPES = ['User.Read']; // implies openid/profile — enough to identify the user

// ── App ──────────────────────────────────────────────────────────────────────
const app = express();
app.set('trust proxy', 1); // behind Cloudflare: trust X-Forwarded-Proto for secure cookies

app.use(session({
  name: 'hrone.sid',
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: NODE_ENV === 'production', // HTTPS-only cookie in prod
    sameSite: 'lax',                   // 'lax' lets the cookie ride the top-level GET back from Entra
    maxAge: 1000 * 60 * 60 * 8,        // 8h
  },
  // NOTE: default MemoryStore is fine for a single container. For multi-instance
  // or restart-durable sessions, swap in connect-redis (see README).
}));

// Health check — must stay public for the container platform's probes.
app.get('/healthz', (_req, res) => res.status(200).send('ok'));

// ── Auth: branded sign-in screen (interstitial) ──────────────────────────────
function renderSignIn(callbackUrl) {
  const target = `/login?redirectTo=${encodeURIComponent(callbackUrl)}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sign in · HROne Deck</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
  html,body{height:100%;}
  body{
    font-family:'Public Sans',system-ui,sans-serif;
    background:#0a1a12;color:#fff;
    min-height:100%;
    display:flex;align-items:center;justify-content:center;
    padding:24px;
  }
  .wrap{width:100%;max-width:420px;display:flex;flex-direction:column;align-items:center;}
  .logo-tile{
    width:76px;height:76px;border-radius:20px;
    background:#0d1f14;border:1px solid rgba(255,255,255,.08);
    display:flex;align-items:center;justify-content:center;
    box-shadow:0 8px 30px rgba(0,0,0,.35);
  }
  .logo-tile svg{width:40px;height:40px;}
  .brand{margin-top:20px;font-size:28px;font-weight:800;letter-spacing:-.01em;}
  .tagline{margin-top:6px;font-size:14px;color:rgba(255,255,255,.5);}
  .card{
    margin-top:34px;width:100%;
    background:#0d1f14;border:1px solid rgba(255,255,255,.07);
    border-radius:16px;padding:28px;
  }
  .card h2{font-size:19px;font-weight:700;}
  .card p{margin-top:6px;font-size:14px;color:rgba(255,255,255,.55);line-height:1.5;}
  .card p b{color:#23A578;font-weight:600;}
  .ms-btn{
    margin-top:22px;width:100%;height:48px;
    display:flex;align-items:center;justify-content:center;gap:12px;
    background:#fff;color:#1b1b1b;text-decoration:none;
    border-radius:10px;font-size:15px;font-weight:600;
    transition:transform .12s ease, box-shadow .15s ease;
  }
  .ms-btn:hover{transform:translateY(-1px);box-shadow:0 6px 18px rgba(0,0,0,.3);}
  .ms-btn:active{transform:translateY(0);}
  .ms-btn svg{width:18px;height:18px;}
  .note{margin-top:18px;text-align:center;font-size:12.5px;color:rgba(255,255,255,.32);}
</style>
</head>
<body>
  <div class="wrap">
    <div class="logo-tile">
      <svg viewBox="0 0 47 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.7176 20.3174L22.2354 22.5769L18.5012 36.8956L16.7309 45.0003C7.4534 42.1998 -0.000488281 33.8365 -0.000488281 23.4865C-0.000488281 21.428 0.270386 19.4365 0.792788 17.536C0.991107 17.6126 1.18459 17.7035 1.3684 17.8041L5.91038 20.303C6.99388 20.9014 8.26603 21.0977 9.47529 20.8583L14.3172 19.8769C15.4684 19.6424 16.668 19.8051 17.7128 20.3222L17.7176 20.3174Z" fill="#23A578"/>
        <path d="M15.6542 14.8012L23.2823 18.6166V18.6262L18.1066 16.3091C16.849 15.7538 15.4124 15.7012 14.1257 16.1847L9.65145 17.8506C8.35996 18.3389 6.92819 18.2863 5.67056 17.7262L1.35107 15.7873C1.58809 15.1315 1.85413 14.4852 2.15402 13.8629L3.85183 14.7964C4.93533 15.39 6.20263 15.5815 7.41673 15.3325L12.2635 14.3512C13.4098 14.1214 14.6046 14.2794 15.6494 14.8059L15.6542 14.8012Z" fill="#23A578"/>
        <path d="M46.9883 23.1032V23.2516C46.9834 24.5968 46.8528 25.9133 46.6255 27.1915C46.6013 27.3255 46.5723 27.45 46.5529 27.5793C46.5336 27.6846 46.5094 27.7899 46.4852 27.8952C46.4513 28.0484 46.4175 28.1968 46.3836 28.3452C45.6194 31.4761 44.1779 34.3771 42.2189 36.8904H28.4672L27.3837 27.225H40.11L41.5272 22.0404L23.2819 13.9883L16.0408 10.7952C14.788 10.2351 13.3563 10.1872 12.0696 10.6707L7.59533 12.3415C6.30384 12.825 4.87691 12.7819 3.61928 12.217L3.16943 12.016C3.30487 11.7766 3.43547 11.5468 3.57575 11.3122C7.64854 4.53351 15.1121 0 23.6495 0C25.7101 0 27.7029 0.263298 29.6039 0.76117C29.6087 0.76117 29.6184 0.76117 29.6233 0.76117C39.2441 3.27926 46.432 11.7144 46.9544 21.9016C46.9738 22.2989 46.9883 22.6963 46.9883 23.0984V23.1032Z" fill="#23A578"/>
      </svg>
    </div>
    <div class="brand">HROne Deck</div>
    <div class="tagline">Product presentation</div>

    <div class="card">
      <h2>Sign in</h2>
      <p>Use your <b>HROne</b> Microsoft account to continue</p>
      <a class="ms-btn" href="${target}">
        <svg viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
          <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
          <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
          <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
        </svg>
        Sign in with Microsoft
      </a>
    </div>
    <div class="note">Access is restricted to HROne employees</div>
  </div>
</body>
</html>`;
}

app.get('/auth/signin', (req, res) => {
  if (req.session?.isAuthenticated) return res.redirect('/');
  let cb = typeof req.query.callbackUrl === 'string' ? req.query.callbackUrl : '/';
  if (!cb.startsWith('/') || cb.startsWith('//')) cb = '/'; // same-site only
  res.status(200).send(renderSignIn(cb));
});

// ── Auth: kick off login (the "Sign in with Microsoft" button target) ────────
app.get('/login', async (req, res, next) => {
  try {
    const { verifier, challenge } = await cryptoProvider.generatePkceCodes();
    const state = cryptoProvider.base64Encode(
      JSON.stringify({ redirectTo: typeof req.query.redirectTo === 'string' ? req.query.redirectTo : '/' })
    );
    req.session.pkceVerifier = verifier;
    req.session.authState = state;

    const authUrl = await msal.getAuthCodeUrl({
      scopes: SCOPES,
      redirectUri: REDIRECT_URI,
      responseMode: 'query',
      codeChallenge: challenge,
      codeChallengeMethod: 'S256',
      state,
    });
    res.redirect(authUrl);
  } catch (err) { next(err); }
});

// ── Auth: Entra redirects back here with ?code&state ─────────────────────────
app.get('/auth/callback', async (req, res, next) => {
  try {
    if (!req.query.code || req.query.state !== req.session.authState) {
      return res.status(400).send('Invalid or expired authentication state. <a href="/login">Try again</a>.');
    }

    const result = await msal.acquireTokenByCode({
      code: String(req.query.code),
      scopes: SCOPES,
      redirectUri: REDIRECT_URI,
      codeVerifier: req.session.pkceVerifier,
    });

    const user = {
      name: result.account?.name,
      username: result.account?.username,
      oid: result.account?.idTokenClaims?.oid,
    };

    // Recover intended destination before we regenerate the session.
    let redirectTo = '/';
    try { redirectTo = JSON.parse(cryptoProvider.base64Decode(req.session.authState)).redirectTo || '/'; } catch { /* ignore */ }
    // Only allow same-site relative paths — never an open redirect.
    if (!redirectTo.startsWith('/') || redirectTo.startsWith('//')) redirectTo = '/';

    // Regenerate to prevent session fixation.
    req.session.regenerate((err) => {
      if (err) return next(err);
      req.session.isAuthenticated = true;
      req.session.user = user;
      req.session.save((err2) => (err2 ? next(err2) : res.redirect(redirectTo)));
    });
  } catch (err) { next(err); }
});

// ── Auth: logout (local session + Entra sign-out) ────────────────────────────
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    const post = encodeURIComponent(POST_LOGOUT_REDIRECT_URI || '/');
    res.redirect(`https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/logout?post_logout_redirect_uri=${post}`);
  });
});

// ── Gate ─────────────────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  if (req.session?.isAuthenticated) return next();
  res.redirect(`/auth/signin?callbackUrl=${encodeURIComponent(req.originalUrl)}`);
}

// Optional: let the deck fetch the signed-in user (e.g. to show a name / sign-out).
app.get('/me', requireAuth, (req, res) => res.json(req.session.user || {}));

// Defense in depth: never serve server internals or dotfiles, whatever STATIC_DIR points at.
app.use((req, res, next) => {
  if (/^\/(server(\/|$)|node_modules|package\.json|Dockerfile|\.)/i.test(req.path)) {
    return res.status(404).send('Not found');
  }
  next();
});

// Everything else is the gated deck.
app.use(requireAuth, express.static(staticRoot, { extensions: ['html'] }));

// Generic error handler — don't leak internals.
app.use((err, _req, res, _next) => {
  console.error('[error]', err);
  res.status(500).send('Something went wrong.');
});

app.listen(PORT, () => console.log(`HROne deck gate listening on :${PORT} (serving ${staticRoot})`));
