// ══════════════════════════════════════════════════════════════════
// AI Interviewer — sub-product deck
// Content from the AI Interviewer founder deck; slides styled in the HROne
// system (shared/studio.css + shared/ai-interviewer.css). Foundational pass —
// each slide gets its own design pass later.
// n must increase in list order (the shell sorts by it).
// Format: see decks/hrone.js
// ══════════════════════════════════════════════════════════════════
DECKS['ai-interviewer'] = {
  title: 'AI Interviewer',
  pageTitle: 'AI Interviewer by HROne',
  hosts: ['ai-pitch.hrone.studio'],
  groups: [
  { id:'intro', label:'Introduction', icon:'M2 3.5h10M2 7h8M2 10.5h6',
    slides:[
      { n:1,  t:'AI Interviewer',                       f:'ai-cover.html' },
      { n:2,  t:'Group Overview',                       f:'hrone-group-overview.html', optional:true },
      { n:3,  t:'Why HROne',                            f:'hrone-why-hrone.html', optional:true },
      { n:4,  t:'The Screening Bottleneck',             f:'ai-bottleneck.html' },
    ]},
  { id:'product', label:'The Product', icon:'M2 2h4v4H2zM8 2h4v4H8zM2 8h4v4H2zM8 8h4v4H8z',
    slides:[
      { n:5,  t:'Create the Job',                       f:'ai-job.html' },
      { n:6,  t:'Build Your AI Interviewer',            f:'ai-interviewer.html' },
      { n:7,  t:'Configure the Round',                  f:'ai-round.html' },
      { n:8,  t:'Share the Link — Interviews in Parallel', f:'ai-share.html' },
      { n:9,  t:'Track Every Interview',                f:'ai-track.html' },
    ]},
  { id:'report', label:'The Report', icon:'M2 12V7M6 12V4M10 12V8M1 12h12',
    slides:[
      { n:10, t:'Score, Rubric & Recommendation',       f:'ai-report.html' },
      { n:11, t:'Transcript, Recording & Proctoring',   f:'ai-evidence.html' },
    ]},
  { id:'close', label:'Close', icon:'M2 7l3.5 3.5 6.5-6.5',
    slides:[
      { n:12, t:'The Outcome',                          f:'ai-outcome.html' },
      { n:13, t:'₹99 per Interview — Start Free',       f:'ai-pricing.html' },
      { n:14, t:"Let's Connect",                        f:'ai-next-steps.html' },
    ]},
  ],
};
