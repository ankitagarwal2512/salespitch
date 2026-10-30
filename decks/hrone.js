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
      // themes: a light/dark switch on the nav row picks which file this slide shows
      { n:1,  t:'Welcome to HROne',           f:'hrone-slide1-dark.html',
        themes:{ light:'hrone-slide1-light.html', dark:'hrone-slide1-dark.html' } },
      { n:2,  t:'Group Overview',               f:'hrone-group-overview.html' },
      // noExport: customer logos stay out of the PDF download
      { n:3,  t:'Why HROne',                   f:'hrone-why-hrone.html', noExport:true },
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
      { n:17, t:"Studio — What's Inside",      f:'hrone-studio-inside.html' },
      { n:18, t:'Connected to HROne',         f:'hrone-studio-connect.html' },
      { n:19, t:'Apps inside HROne',          f:'hrone-studio-apps.html' },
      { n:20, t:'Employee Requests',          f:'hrone-studio-requests.html' },
      { n:21, t:'Inbox Approvals',            f:'hrone-studio-inbox.html' },
      { n:22, t:'Use Cases',                  f:'hrone-studio-usecases.html' },
      { n:23, t:'Reporting & Analytics',        f:'hrone-dashboards.html' },
    ]},

  { id:'modules', label:'Modules', icon:'M1 4l6-3 6 3-6 3-6-3M1 8l6 3 6-3M1 11l6 3 6-3',
    slides:[
      { n:24, t:'Overview',                    f:'hrone-modules-overview.html' },
      { n:25, t:'Recruitment',                 f:'hrone-recruitment.html' },
      { n:26, t:'Onboarding',                  f:'hrone-module-onboarding.html' },
      { n:27, t:'Workforce Management',        f:'hrone-module-workforce.html' },
      { n:28, t:'Time Office',                 f:'hrone-module-timeoffice.html' },
      { n:29, t:'Payroll',                     f:'hrone-module-payroll.html',
        sub:[
          { t:'New Wage Code',                  f:'hrone-payroll-wagecode.html' },
        ]},
      { n:30, t:'Performance',                 f:'hrone-module-performance.html' },
      { n:31, t:'Engagement',                  f:'hrone-module-engagement.html' },
      { n:32, t:'Expense',                     f:'hrone-module-expense.html' },
      { n:33, t:'Helpdesk',                    f:'hrone-module-helpdesk.html' },
    ]},
  { id:'market', label:'Add-Ons', icon:'M2 5h10l-1.5 7H3.5L2 5zM5.5 5V3.5a1.5 1.5 0 013 0V5',
    slides:[
      { n:34, t:'Overview',                     f:'hrone-marketplace.html' },
      { n:35, t:'Live Trip Expense',            f:'hrone-addon-live-trip-expense.html',
        sub:[
          { t:'A Trip on the Record',           f:'hrone-addon-live-trip-record.html' },
        ]},
      { n:36, t:'Facial Kiosk',              f:'hrone-addon-biometric-kiosk.html',
        sub:[
          { t:'Set Up in Minutes',              f:'hrone-addon-biometric-setup.html' },
          { t:'On Mobile, Too',                 f:'hrone-addon-facial-kiosk-mobile.html' },
        ]},
      { n:37, t:'Facial Recognition',           f:'hrone-addon-facial-mobile.html' },
      { n:38, t:'Geo Pulse',                    f:'hrone-addon-geo-pulse.html',
        sub:[
          { t:'The Team on One Map',            f:'hrone-addon-geo-pulse-team.html' },
        ]},
      { n:39, t:'Workforce Planning',           f:'hrone-addon-workforce-planning.html',
        sub:[
          { t:'Plan It Your Way',               f:'hrone-addon-workforce-setup.html' },
          { t:'Hire Only What\'s Approved',     f:'hrone-addon-workforce-hire.html' },
          { t:'Moves Keep the Plan True',       f:'hrone-addon-workforce-moves.html' },
        ]},
      { n:40, t:'Project Management',           f:'hrone-addon-project-management.html',
        sub:[
          { t:'Set Up How It\'s Billed',        f:'hrone-addon-project-setup.html' },
          { t:'Every Task, on Track',           f:'hrone-addon-project-tasks.html' },
          { t:'From Timesheet to Invoice',      f:'hrone-addon-project-invoice.html' },
        ]},
      { n:41, t:'Wi-Fi Attendance',             f:'hrone-addon-wifi-attendance.html' },
      { n:42, t:'Single Sign-On',               f:'hrone-addon-sso.html' },
      { n:43, t:'e-KYC',                        f:'hrone-addon-ekyc.html',
        sub:[
          { t:'Request It Where You Work',      f:'hrone-addon-ekyc-requests.html' },
        ]},
      { n:44, t:'Digi-Sign',                    f:'hrone-addon-digisign.html',
        sub:[
          { t:'Generate, Sign, Done',           f:'hrone-addon-digisign-flow.html' },
        ]},
      { n:45, t:'BGV',                          f:'hrone-addon-bgv.html',
        sub:[
          { t:'Start It From the Joiner List',  f:'hrone-addon-bgv-initiate.html' },
        ]},
      { n:46, t:'Visitor Management',           f:'hrone-visitor-management.html',
        sub:[
          { t:'Pre-approved Visitors',          f:'hrone-visitor-preapproved.html' },
          { t:'Walk-in Visitors',               f:'hrone-visitor-walkin.html' },
          { t:'Facial Check-in & Checkout',     f:'hrone-visitor-facial.html' },
          { t:'Visibility & Control',           f:'hrone-visitor-control.html' },
        ]},
    ]},
  { id:'close', label:'Close', icon:'M2 7l3.5 3.5 6.5-6.5',
    slides:[
      { n:47, t:'Next Steps & Demo',           f:'hrone-next-steps.html' },
    ]},
],
};
