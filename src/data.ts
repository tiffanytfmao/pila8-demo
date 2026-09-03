export type ToolId = 'messages' | 'transit' | 'calendar'

export type ToolDef = {
  id: ToolId
  label: string
  /** What the assistant can reach with it. Never what it will return. */
  affords: string
}

export const TOOLS: ToolDef[] = [
  { id: 'messages', label: 'Search messages', affords: 'Their recent threads' },
  { id: 'transit', label: 'Look up transit', affords: 'Departures and arrival times' },
  { id: 'calendar', label: 'Calendar', affords: 'Read and edit their events' },
]

/** Scenario shown only to the User. The word "frustrated" never appears. */
export const USER_SCENARIO: string[] = [
  "You've had dinner with your cousin Sam planned for months. You cleared the evening for it back when it was a ten-minute walk from your place.",
  'This is the third time this month Sam has moved something on you. The message came in this afternoon while you were between things. You caught that the place changed, somewhere across town and not walking distance anymore, but not where.',
  'This was your one free evening this week. Your favorite aunt will be there and you haven’t seen her since spring.',
  "It's 5:40. Dinner is at seven.",
]

export const USER_GOAL = 'A way to reach dinner with Sam on time'

export const ASSISTANT_BRIEF = [
  "You're the assistant.",
  'You can search their messages, look up transit, and edit their calendar.',
  "You can't see what they see.",
]

/** Nobody sees any of this until the tool runs. */
export const TOOL_RESULTS = {
  messages: {
    kind: 'message' as const,
    from: 'Sam',
    at: '2:47 PM',
    body: "change of plan!! not doing it at the usual spot, we're at 418 Maple St now. still 7. use the side entrance, front door is confusing",
  },
  transit: {
    kind: 'transit' as const,
    route: 'Grand St → Parkside',
    departures: [
      { leave: '6:02', arrive: '6:31', detail: '1 transfer · 8 min walk to 418 Maple' },
      { leave: '6:24', arrive: '6:58', detail: '1 transfer · 8 min walk to 418 Maple' },
    ],
  },
  calendar: {
    kind: 'calendar' as const,
    title: 'Dinner with Sam',
    time: '7:00 PM',
    location: '112 Oak Ave',
  },
}

/** Counted off the two screenshots of the current pre-record view. */
export const REMOVED = {
  scriptLines: 24,
  rules: 18,
  items: [
    {
      label: 'The 24-line conversation walkthrough',
      why: 'It contains every fact both people will say, including the address. Nobody has to listen to find out what happens.',
    },
    {
      label: '"Required tone: Frustrated, then relieved."',
      why: 'Instructed emotion produces displayed frustration, not felt frustration.',
    },
    {
      label: 'The backchannel panel — "use mm-hmm, right, I see"',
      why: 'Backchannels placed by rule instead of by listening are audibly worse than none.',
    },
    {
      label: 'The shared label "Work, Family, Travel, Health, and Community"',
      why: 'Neither participant can act on it.',
    },
    {
      label: 'The 7 conversation tips',
      why: 'Eleven more rules to hold in your head while talking.',
    },
  ],
  moved: [
    {
      label: 'Audio guidelines — hissing, popping, clipping',
      to: 'the device check, where they are actionable at the moment they matter',
    },
    {
      label: 'Behavioral guidelines — silences, monotone, one person dominating',
      to: 'pre-submit review, where the system can point at a timestamp',
    },
  ],
}
