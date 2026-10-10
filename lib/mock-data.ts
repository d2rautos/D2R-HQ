export type Role = 'Admin' | 'Member'
export type MemberStatus = 'online' | 'on-shift' | 'away' | 'offline' | 'suspended'

export type Member = {
  id: string
  callsign: string
  name: string
  role: Role
  status: MemberStatus
  xp: { weekly: number; monthly: number; allTime: number }
  hoursThisWeek: number
  streak: number
  systemsCompleted: number
  trend: number
  joined: string
}

export const currentUser = {
  id: 'm1',
  callsign: 'NEONWRAITH',
  name: 'Alex Rivera',
  role: 'Admin' as Role,
  level: 42,
  xp: 18420,
  nextLevelXp: 20000,
  rank: 3,
  streak: 12,
  hoursThisWeek: 31.5,
  weeklyGoal: 40,
}

export const members: Member[] = [
  { id: 'm7', callsign: 'VOIDPULSE', name: 'Jordan Kim', role: 'Member', status: 'on-shift', xp: { weekly: 4820, monthly: 18240, allTime: 142300 }, hoursThisWeek: 38.2, streak: 31, systemsCompleted: 64, trend: 2, joined: 'Jan 2024' },
  { id: 'm4', callsign: 'HEXSTORM', name: 'Priya Shah', role: 'Member', status: 'online', xp: { weekly: 4510, monthly: 17110, allTime: 98750 }, hoursThisWeek: 35.0, streak: 19, systemsCompleted: 51, trend: 0, joined: 'Mar 2024' },
  { id: 'm1', callsign: 'NEONWRAITH', name: 'Alex Rivera', role: 'Admin', status: 'on-shift', xp: { weekly: 4390, monthly: 16880, allTime: 104220 }, hoursThisWeek: 31.5, streak: 12, systemsCompleted: 47, trend: 3, joined: 'Feb 2024' },
  { id: 'm9', callsign: 'GLITCHFOX', name: 'Sam Torres', role: 'Member', status: 'away', xp: { weekly: 3980, monthly: 14020, allTime: 61200 }, hoursThisWeek: 29.0, streak: 8, systemsCompleted: 33, trend: -1, joined: 'Jun 2024' },
  { id: 'm3', callsign: 'ULTRAVIOLET', name: 'Mia Chen', role: 'Member', status: 'online', xp: { weekly: 3720, monthly: 15300, allTime: 87410 }, hoursThisWeek: 27.4, streak: 22, systemsCompleted: 45, trend: -2, joined: 'Feb 2024' },
  { id: 'm12', callsign: 'SYNTHAX', name: 'Leo Park', role: 'Member', status: 'on-shift', xp: { weekly: 3410, monthly: 12100, allTime: 40980 }, hoursThisWeek: 26.1, streak: 5, systemsCompleted: 28, trend: 1, joined: 'Aug 2024' },
  { id: 'm6', callsign: 'CIPHERKAT', name: 'Nora Ali', role: 'Member', status: 'offline', xp: { weekly: 3050, monthly: 11920, allTime: 52340 }, hoursThisWeek: 22.8, streak: 3, systemsCompleted: 30, trend: 0, joined: 'May 2024' },
  { id: 'm15', callsign: 'BYTEBLADE', name: 'Eli Brooks', role: 'Member', status: 'online', xp: { weekly: 2780, monthly: 6400, allTime: 6400 }, hoursThisWeek: 20.0, streak: 9, systemsCompleted: 11, trend: 4, joined: 'Aug 2026' },
  { id: 'm8', callsign: 'DARKMATTER', name: 'Ivy Moreno', role: 'Member', status: 'offline', xp: { weekly: 2240, monthly: 9800, allTime: 37600 }, hoursThisWeek: 18.6, streak: 0, systemsCompleted: 24, trend: -3, joined: 'Sep 2024' },
  { id: 'm11', callsign: 'PIXELGHOST', name: 'Ray Dawson', role: 'Member', status: 'away', xp: { weekly: 1910, monthly: 4200, allTime: 4200 }, hoursThisWeek: 15.2, streak: 2, systemsCompleted: 7, trend: 1, joined: 'Sep 2026' },
  { id: 'm14', callsign: 'NULLSHIFT', name: 'Tess Grant', role: 'Member', status: 'suspended', xp: { weekly: 0, monthly: 3100, allTime: 29800 }, hoursThisWeek: 0, streak: 0, systemsCompleted: 19, trend: -5, joined: 'Nov 2024' },
]

export type SystemCategory = 'AI Agents' | 'Automation' | 'Sales' | 'Marketing' | 'Development'
export type SystemItem = {
  id: string
  title: string
  summary: string
  category: SystemCategory
  difficulty: 'Foundation' | 'Advanced' | 'Expert'
  xp: number
  minutes: number
  author: string
  updated: string
  completedBy: number
  progress: number
  steps: string[]
}

export const systems: SystemItem[] = [
  { id: 's1', title: 'AI Voice Receptionist', summary: 'Deploy a 24/7 voice agent that answers calls, qualifies callers and books appointments straight into the calendar.', category: 'AI Agents', difficulty: 'Advanced', xp: 450, minutes: 30, author: 'VOIDPULSE', updated: '2d ago', completedBy: 38, progress: 60, steps: ['Write the call script and qualifying questions', 'Configure the voice model and persona', 'Connect calendar booking and call transfer', 'Run 20 test calls and review transcripts', 'Hand over the live number to the client'] },
  { id: 's2', title: 'Lead Generation Automation', summary: 'Scrape, enrich and score leads automatically, then push qualified prospects into outbound sequences.', category: 'Automation', difficulty: 'Advanced', xp: 400, minutes: 25, author: 'HEXSTORM', updated: '5d ago', completedBy: 31, progress: 100, steps: ['Define the ideal customer profile', 'Set up data sources and enrichment', 'Apply the lead scoring model', 'Sync qualified leads to the CRM', 'Trigger the outbound email sequence'] },
  { id: 's3', title: 'AI Content Engine', summary: 'Turn one long-form piece into a week of blog posts, social clips and newsletters with brand-safe AI workflows.', category: 'Marketing', difficulty: 'Foundation', xp: 250, minutes: 20, author: 'ULTRAVIOLET', updated: '1w ago', completedBy: 52, progress: 0, steps: ['Load the brand voice guide', 'Generate drafts from the source content', 'Human review and fact check', 'Schedule posts across channels'] },
  { id: 's4', title: 'CRM Automation', summary: 'Automate pipeline stages, follow-ups and task assignment so no deal goes cold.', category: 'Automation', difficulty: 'Foundation', xp: 200, minutes: 15, author: 'NEONWRAITH', updated: '3d ago', completedBy: 57, progress: 100, steps: ['Map the pipeline stages', 'Build stage-change triggers', 'Set automated follow-up reminders', 'Test with a sample deal'] },
  { id: 's5', title: 'Website Development', summary: 'Our standard build process for fast, conversion-focused client websites from brief to launch.', category: 'Development', difficulty: 'Expert', xp: 600, minutes: 45, author: 'SYNTHAX', updated: '12h ago', completedBy: 14, progress: 25, steps: ['Run the discovery and brief call', 'Wireframe and design sign-off', 'Build, connect forms and analytics', 'QA on mobile and desktop', 'Launch and hand over'] },
  { id: 's6', title: 'Customer Support Agents', summary: 'Build AI chat agents trained on client knowledge bases that resolve tickets and escalate edge cases to humans.', category: 'AI Agents', difficulty: 'Expert', xp: 550, minutes: 40, author: 'VOIDPULSE', updated: '4d ago', completedBy: 19, progress: 0, steps: ['Collect and clean the knowledge base', 'Configure the agent and guardrails', 'Set up human escalation rules', 'Evaluate against 50 real tickets', 'Go live on the client help desk'] },
  { id: 's7', title: 'Discovery Call Playbook', summary: 'How we run sales calls, uncover pain points and position the right AI solution.', category: 'Sales', difficulty: 'Foundation', xp: 150, minutes: 10, author: 'GLITCHFOX', updated: '2w ago', completedBy: 61, progress: 100, steps: ['Research the prospect beforehand', 'Ask the five discovery questions', 'Demo the most relevant system', 'Agree next steps and send the recap'] },
  { id: 's8', title: 'Proposal & Pricing Builder', summary: 'Scope projects, price AI builds and send proposals that close.', category: 'Sales', difficulty: 'Advanced', xp: 300, minutes: 20, author: 'CIPHERKAT', updated: '6d ago', completedBy: 22, progress: 0, steps: ['Use the scoping template', 'Pick the pricing tier', 'Add case studies and timeline', 'Send and track proposal opens'] },
]

export type ProjectStatus = 'Planning' | 'In build' | 'Testing' | 'Live' | 'Blocked'
export type Project = {
  id: string
  name: string
  client: string
  category: SystemCategory
  status: ProjectStatus
  progress: number
  lead: string
  team: string[]
  due: string
  nextMilestone: string
}

export const projects: Project[] = [
  { id: 'pr1', name: 'AI Voice Receptionist', client: 'Brightsmile Dental', category: 'AI Agents', status: 'Testing', progress: 82, lead: 'VOIDPULSE', team: ['VOIDPULSE', 'SYNTHAX', 'BYTEBLADE'], due: 'Oct 16', nextMilestone: 'Final call-flow QA' },
  { id: 'pr2', name: 'Lead Generation Automation', client: 'Apex Roofing Co.', category: 'Automation', status: 'In build', progress: 58, lead: 'HEXSTORM', team: ['HEXSTORM', 'GLITCHFOX'], due: 'Oct 24', nextMilestone: 'Lead scoring model' },
  { id: 'pr3', name: 'AI Content Engine', client: 'D2R Internal', category: 'Marketing', status: 'In build', progress: 41, lead: 'ULTRAVIOLET', team: ['ULTRAVIOLET', 'PIXELGHOST'], due: 'Nov 2', nextMilestone: 'Brand voice training' },
  { id: 'pr4', name: 'CRM Automation', client: 'Northline Realty', category: 'Automation', status: 'Live', progress: 100, lead: 'NEONWRAITH', team: ['NEONWRAITH', 'CIPHERKAT'], due: 'Shipped Oct 3', nextMilestone: 'Monthly performance review' },
  { id: 'pr5', name: 'Website Development', client: 'Vela Fitness', category: 'Development', status: 'Blocked', progress: 35, lead: 'SYNTHAX', team: ['SYNTHAX', 'DARKMATTER'], due: 'Oct 30', nextMilestone: 'Waiting on client copy' },
  { id: 'pr6', name: 'Customer Support Agents', client: 'Urban Threads', category: 'AI Agents', status: 'Planning', progress: 12, lead: 'CIPHERKAT', team: ['CIPHERKAT', 'VOIDPULSE'], due: 'Nov 14', nextMilestone: 'Knowledge base audit' },
]

export type ActivityType = 'clock' | 'system' | 'rank' | 'admin' | 'achievement'
export type Activity = {
  id: string
  type: ActivityType
  actor: string
  action: string
  target?: string
  time: string
  xp?: number
}

export const activities: Activity[] = [
  { id: 'a1', type: 'clock', actor: 'VOIDPULSE', action: 'clocked in for', target: 'Build Sprint', time: '2m ago' },
  { id: 'a2', type: 'system', actor: 'BYTEBLADE', action: 'completed system', target: 'CRM Automation', time: '9m ago', xp: 200 },
  { id: 'a3', type: 'rank', actor: 'NEONWRAITH', action: 'climbed to rank', target: '#3', time: '18m ago' },
  { id: 'a4', type: 'achievement', actor: 'HEXSTORM', action: 'unlocked achievement', target: 'Pipeline Builder (19-day streak)', time: '34m ago', xp: 500 },
  { id: 'a5', type: 'clock', actor: 'GLITCHFOX', action: 'went on break during', target: 'Sales Outreach', time: '41m ago' },
  { id: 'a6', type: 'admin', actor: 'NEONWRAITH', action: 'approved join request from', target: 'PIXELGHOST', time: '1h ago' },
  { id: 'a7', type: 'system', actor: 'SYNTHAX', action: 'published system', target: 'Website Development', time: '2h ago', xp: 600 },
  { id: 'a8', type: 'clock', actor: 'ULTRAVIOLET', action: 'clocked out of', target: 'Marketing Push · 8.2h', time: '3h ago' },
  { id: 'a9', type: 'achievement', actor: 'PIXELGHOST', action: 'unlocked achievement', target: 'First Deployment', time: '4h ago', xp: 100 },
  { id: 'a10', type: 'admin', actor: 'NEONWRAITH', action: 'posted announcement', target: 'Voice Receptionist launch moved to Friday', time: '5h ago' },
  { id: 'a11', type: 'rank', actor: 'GLITCHFOX', action: 'dropped to rank', target: '#4', time: '6h ago' },
  { id: 'a12', type: 'system', actor: 'CIPHERKAT', action: 'completed system', target: 'Discovery Call Playbook', time: '8h ago', xp: 150 },
]

export const weeklyHours = [
  { day: 'Mon', hours: 6.5 },
  { day: 'Tue', hours: 7.2 },
  { day: 'Wed', hours: 5.0 },
  { day: 'Thu', hours: 8.1 },
  { day: 'Fri', hours: 4.7 },
  { day: 'Sat', hours: 0 },
  { day: 'Sun', hours: 0 },
]

export const shiftHistory = [
  { id: 'h1', date: 'Wed, Oct 7', shift: 'Build Sprint', start: '09:00', end: '17:06', hours: 8.1, breaks: 30 },
  { id: 'h2', date: 'Tue, Oct 6', shift: 'Client Delivery', start: '09:12', end: '14:12', hours: 5.0, breaks: 15 },
  { id: 'h3', date: 'Mon, Oct 5', shift: 'Sales Outreach', start: '08:58', end: '16:10', hours: 7.2, breaks: 20 },
  { id: 'h4', date: 'Sun, Oct 4', shift: 'Marketing Push', start: '10:30', end: '17:00', hours: 6.5, breaks: 0 },
]

export const shiftTypes = ['Build Sprint', 'Client Delivery', 'Sales Outreach', 'Marketing Push'] as const

export const pendingApprovals = [
  { id: 'p1', callsign: 'STATICBLOOM', name: 'Kai Nguyen', request: 'Join request', note: 'Referred by HEXSTORM · joins as Member', time: '20m ago' },
  { id: 'p2', callsign: 'BYTEBLADE', name: 'Eli Brooks', request: 'Shift swap', note: 'Swap Fri Build Sprint with SYNTHAX', time: '2h ago' },
  { id: 'p3', callsign: 'GLITCHFOX', name: 'Sam Torres', request: 'Timesheet correction', note: '+1.5h on Oct 6', time: '5h ago' },
]

export const announcements = [
  { id: 'n1', title: 'Voice Receptionist launch moved to Friday', body: 'Brightsmile asked for one more round of call-flow testing. Go-live is Friday 09:00.', author: 'NEONWRAITH', time: '5h ago' },
  { id: 'n2', title: 'Q4 leaderboard reset', body: 'Monthly XP resets on Nov 1. All-time totals are kept.', author: 'NEONWRAITH', time: '2d ago' },
]
