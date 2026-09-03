# Pila8 — conversation task, redesigned

A frontend demo for the Besimple / Pila8 take-home. Live at
https://tiffanytfmao.github.io/pila8-demo/

## The argument

Roughly half of submitted two-person voice conversations fail review. The current
pre-record screen hands both participants a 24-line turn-by-turn script containing
every fact they will say — and, lower on the same page, lists "reading from a script"
as a reason for rejection.

The redesign removes the script rather than adding more instruction. What's left:

- **The user** gets a ~95-word situated scenario. The word "frustrated" never appears;
  frustration comes from the pattern, the sunk cost, and the clock. The address is
  absent, which is what makes the assistant's tool call genuinely necessary.
- **The assistant** gets three capabilities and one load-bearing line: *you can't see
  what they see.* No dialogue, no pre-sequenced tool calls.
- **Neither** sees any tool result until the tool runs.

Counted off the current screens: 24 script lines and 18 rules removed from before
recording. Audio guidelines move into the device check; behavioral guidelines move to
pre-submit, where the system can point at a timestamp.

## The failure this redesign creates

With the script gone, nothing forces the tool call. Three minutes in, the pair can be
talking naturally and never look up the address. Recovery is three layers:

1. Tools sit in the console as pressable objects from the moment the assistant joins.
2. At 3:00, assistant only: *The address hasn't come up yet.* Names the gap, never the
   words. One line, no modal, no sound.
3. Pre-submit shows the requirement unmet before submission rather than after review.

Every check is derived from a button press in this interface — a UI event, not a
judgement about how speech sounded. Nothing auto-approves or auto-rejects.

## Using the demo

`User` / `Assistant` switches whose screen you're on; the stage nav moves through
before / during / after. On the assistant's recording screen, **Demo: jump to 3:00**
fires the failure path. **What was removed** opens the subtraction inventory.

## Run locally

```bash
npm install
npm run dev
```
