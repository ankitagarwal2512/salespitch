// ══════════════════════════════════════════════════════════════════
// HROne — main sales deck
// Slide files live in /slides. A slide can appear in any number of decks;
// editing the slide file updates it everywhere.
//
//   n        stable id for the slide within this deck (display numbers are computed)
//   t        sidebar title          f   slide file in /slides
//   optional presenter can hide it  sub depth slides (ArrowDown)
// ══════════════════════════════════════════════════════════════════
DECKS.hrone = {
  title: 'HROne deck',              // sidebar header
  pageTitle: 'HROne Deck',          // browser tab
  hosts: ['ankitagarwal2512.github.io'],   // domains that open this deck
  groups: [
  { id:'intro', label:'Introduction', icon:'M2 3.5h10M2 7h8M2 10.5h6',
    slides:[
      { n:1,  t:'Welcome to HROne',           f:'hrone-slide1.html' },
      { n:2,  t:'Group Overview',               f:'hrone-group-overview.html' },
      { n:3,  t:'Why HROne',                   f:'hrone-why-hrone.html' },
      { n:4,  t:'Recognition',                  f:'hrone-recognised.html' },
    ]},
  { id:'platform', label:'The Platform', icon:'M2 2h4v4H2zM8 2h4v4H8zM2 8h4v4H2zM8 8h4v4H8z',
    slides:[
      { n:5,  t:'Outgrow the Team, Not the Tool', f:'hrone-outgrow.html', optional:true },
      { n:6,  t:'The Comprehensive HCM Suite', f:'hrone-slide5.html' },
      { n:7,  t:'Payroll Outsourcing',          f:'hrone-payroll-outsourcing.html',
        sub:[
          { t:'Project Scope',                  f:'hrone-po-scope.html' },
          { t:'Deliverables',                   f:'hrone-po-deliverables.html' },
          { t:'Process & Turnaround Times',     f:'hrone-po-tat.html' },
          { t:'Add-on Services',                f:'hrone-po-addons.html' },
        ]},
      { n:8,  t:'InboxforHR', html:'InboxforHR<sup style="font-size:.55em;vertical-align:super;line-height:0">TM</sup>', f:'hrone-inboxforhr.html' },
      { n:9,  t:'Two Problems, One Inbox',     f:'hrone-what-it-kills.html' },
      { n:10, t:'The Facts',                   f:'hrone-the-facts.html' },
      { n:11, t:'Infosec & Trust',               f:'hrone-infosec.html' },
    ]},
  { id:'mobile', label:'Mobile & AI', icon:'M4.5 1h5a1 1 0 011 1v10a1 1 0 01-1 1h-5a1 1 0 01-1-1V2a1 1 0 011-1zM6 11.5h2',
    slides:[
      { n:12, t:'Mobile-First Experience',     f:'hrone-mobile.html' },
      { n:13, t:'OneAI Voice Agent',           f:'hrone-oneai.html' },
      { n:14, t:'OneAI Efficiency in Every Module', f:'hrone-efficiency.html' },
      { n:15, t:'Integrations',                 f:'hrone-integrations.html' },
      { n:16, t:'Service & Our Strength',         f:'hrone-service.html' },
    ]},
  { id:'build', label:'Build & Extend', icon:'M4 2.5L2 7l2 4.5M10 2.5l2 4.5-2 4.5',
    slides:[
      { n:17, t:"Studio — What's Inside",       f:'hrone-studio-inside.html' },
      { n:18, t:'Studio — Use Cases',           f:'hrone-studio-usecases.html' },
      { n:19, t:'Reporting & Analytics',        f:'hrone-dashboards.html' },
    ]},

  { id:'market', label:'Annexure', icon:'M2 5h10l-1.5 7H3.5L2 5zM5.5 5V3.5a1.5 1.5 0 013 0V5',
    slides:[
      { n:20, t:'Add-Ons',                      f:'hrone-marketplace.html' },
      { n:21, t:'Visitor Management',           f:'hrone-visitor-management.html',
        sub:[
          { t:'Pre-approved Visitors',          f:'hrone-visitor-preapproved.html' },
          { t:'Walk-in Visitors',               f:'hrone-visitor-walkin.html' },
          { t:'Facial Check-in & Checkout',     f:'hrone-visitor-facial.html' },
          { t:'Visibility & Control',           f:'hrone-visitor-control.html' },
        ]},
    ]},
  { id:'modules', label:'Modules', icon:'M1 4l6-3 6 3-6 3-6-3M1 8l6 3 6-3M1 11l6 3 6-3',
    slides:[
      { n:22, t:'Overview',                    f:'hrone-modules-overview.html' },
      { n:23, t:'Recruitment',                 f:'hrone-recruitment.html' },
      { n:24, t:'Onboarding',                  f:'hrone-module-onboarding.html' },
      { n:25, t:'Workforce Management',        f:'hrone-module-workforce.html' },
      { n:26, t:'Time Office',                 f:'hrone-module-timeoffice.html' },
      { n:27, t:'Payroll',                     f:'hrone-module-payroll.html',
        sub:[
          { t:'New Wage Code',                  f:'hrone-payroll-wagecode.html' },
        ]},
      { n:28, t:'Performance',                 f:'hrone-module-performance.html' },
      { n:29, t:'Engagement',                  f:'hrone-module-engagement.html' },
      { n:30, t:'Expense',                     f:'hrone-module-expense.html' },
      { n:31, t:'Helpdesk',                    f:'hrone-module-helpdesk.html' },
    ]},
  { id:'close', label:'Close', icon:'M2 7l3.5 3.5 6.5-6.5',
    slides:[
      { n:32, t:'Next Steps & Demo',           f:'hrone-next-steps.html' },
    ]},
],
};
