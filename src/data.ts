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

/** Audio guidance now lives in the device check, where it is actionable. */
export const AUDIO_TIPS = [
  {
    lead: 'No steady hiss.',
    body: 'A constant background tone gets a recording rejected. Move away from fans and vents, or try a different mic.',
  },
  {
    lead: 'No popping on p and b sounds.',
    body: 'Point the mic slightly off to the side of your mouth rather than straight at it.',
  },
  {
    lead: 'Nothing else making noise.',
    body: 'Music, a TV, and typing all end up in the recording underneath your voice.',
  },
]

export type Line = { at: number; who: 'user' | 'assistant'; text: string }

/**
 * Simulated transcript. Hardcoded for the demo — there is no speech recognition
 * here. Deliberately never reaches the address on its own, so the failure path
 * is the one that plays out unless the assistant runs a tool.
 */
export const TRANSCRIPT: Line[] = [
  { at: 4, who: 'user', text: 'So Sam moved dinner. Again.' },
  { at: 11, who: 'assistant', text: 'Again? When is it now?' },
  { at: 16, who: 'user', text: "Still seven. It's the where that changed." },
  { at: 24, who: 'user', text: "It was a ten-minute walk. Now it's across town somewhere." },
  { at: 33, who: 'assistant', text: 'Somewhere.' },
  { at: 37, who: 'user', text: "That's the problem. The message came in while I was in the middle of something and I only half read it." },
  { at: 50, who: 'assistant', text: "And you've got, what, an hour and change." },
  { at: 57, who: 'user', text: 'An hour and twenty. I cleared this whole evening back when it was a walk.' },
  { at: 70, who: 'assistant', text: "That's a rough trade." },
  { at: 76, who: 'user', text: "My aunt's going to be there though. Haven't seen her since the spring." },
  { at: 88, who: 'assistant', text: 'Then you want to make it.' },
  { at: 93, who: 'user', text: "I want to make it. I just don't want to spend the night on buses to get there." },
  { at: 108, who: 'assistant', text: 'How long has she been in town?' },
  { at: 114, who: 'user', text: 'A week or so. She stays with Sam usually.' },
  { at: 126, who: 'assistant', text: "Right. And Sam's the one moving things around on you." },
  { at: 134, who: 'user', text: 'Third time this month.' },
  { at: 145, who: 'assistant', text: 'Okay.' },
  { at: 158, who: 'user', text: 'It is what it is.' },
]

/** Appended the moment a tool is pressed, so the console and the talk agree. */
export const TOOL_LINES: Record<ToolId, string> = {
  messages: "Hang on — let me pull up what Sam actually sent you.",
  transit: "Let me see what gets you there.",
  calendar: "I'll fix the address in your calendar too.",
}
