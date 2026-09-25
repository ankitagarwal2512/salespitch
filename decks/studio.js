// ══════════════════════════════════════════════════════════════════
// Studio by HROne — sub-product deck
// Content from the founder's Studio deck; slides styled in the HROne system
// (shared/studio.css). Slides named hrone-*.html are borrowed from the main deck.
// n must increase in list order (the shell sorts by it).
// Format: see decks/hrone.js
// ══════════════════════════════════════════════════════════════════
DECKS.studio = {
  title: 'Studio by HROne',
  pageTitle: 'Studio by HROne',
  hosts: ['pitch.hrone.studio'],
  groups: [
  { id:'intro', label:'Opening', icon:'M2 3.5h10M2 7h8M2 10.5h6',
    slides:[
      { n:1,  t:'Cover · HROne Users',            f:'studio-cover-customer.html', optional:true },
      { n:2,  t:'Cover · Non-HROne',              f:'studio-cover-prospect.html', optional:true },
      { n:3,  t:'Group Overview',                 f:'hrone-group-overview.html' },
      { n:4,  t:'Why HROne',                      f:'hrone-why-hrone.html' },
      { n:5,  t:'The Problem',                    f:'studio-problem.html' },
    ]},
  { id:'product', label:'The Product', icon:'M2 2h4v4H2zM8 2h4v4H8zM2 8h4v4H2zM8 8h4v4H8z',
    slides:[
      { n:6,  t:'A Platform, Not a Form Builder', f:'studio-platform.html' },
      { n:7,  t:"What's Inside",                  f:'studio-inside.html' },
      { n:8,  t:'Model the Data First',           f:'studio-model.html' },
      { n:9,  t:'Forms',                          f:'studio-forms.html' },
      { n:10, t:'Workflows',                      f:'studio-workflows.html' },
      { n:11, t:'Roles & Access',                 f:'studio-roles.html' },
      { n:12, t:'Sync with HROne',                f:'studio-sync.html' },
      { n:13, t:'Anatomy of an App',              f:'studio-anatomy.html' },
    ]},
  { id:'usecases', label:'Use Cases', icon:'M1 4l6-3 6 3-6 3-6-3M1 8l6 3 6-3M1 11l6 3 6-3',
    slides:[
      { n:14, t:'Studio Use Cases',               f:'hrone-studio-usecases.html' },
      { n:15, t:'The Portfolio',                  f:'studio-portfolio.html' },
      { n:16, t:'Uniform Management',             f:'studio-uc-uniform.html' },
      { n:17, t:'Stationery Management',          f:'studio-uc-stationery.html' },
      { n:18, t:'Canteen Management',             f:'studio-uc-canteen.html' },
      { n:19, t:'Seating Management',             f:'studio-uc-seating.html' },
      { n:20, t:'Leave, Short Leave & On-Duty',   f:'studio-uc-leave.html' },
      { n:21, t:'Overtime Requests',              f:'studio-uc-overtime.html' },
      { n:22, t:'OJT Feedback',                   f:'studio-uc-ojt.html' },
      { n:23, t:'Attendance Kiosk',               f:'studio-uc-kiosk.html' },
      { n:24, t:'Vendor & Hawker Management',     f:'studio-uc-vendor.html' },
      { n:25, t:'Production & Delivery Tracking', f:'studio-uc-production.html' },
      { n:26, t:'Project Feedback',               f:'studio-uc-project.html' },
    ]},
  { id:'close', label:'Close', icon:'M2 7l3.5 3.5 6.5-6.5',
    slides:[
      { n:27, t:'What Changes',                   f:'studio-changes.html' },
      { n:28, t:'Why Studio, Not Another Vendor', f:'studio-why.html' },
      { n:29, t:"Let's Connect",                  f:'studio-next-steps.html' },
    ]},
  ],
};
