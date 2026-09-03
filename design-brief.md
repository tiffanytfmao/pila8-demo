# Pila8 conversation task: what I changed and why

**Demo:** https://tiffanytfmao.github.io/pila8-demo/ · **Path shown:** live matching · **Active time:** [fill in] against a four hour cap

**The problem I chose.** Guidance, examples and role instructions already exist, so adding more has
been tried. I looked instead at what the current materials do to the person reading them. The
pre-record screen hands both participants a 24 line turn by turn walkthrough containing every fact
they will say, and lower on the same page the guidelines list "reading from a script" as a reason
for rejection. The product asks people not to sound scripted while handing them a script. It also
instructs a tone of "frustrated, then relieved", which produces displayed rather than felt
frustration, and instructs backchannels like "mm hmm", which are involuntary reactions to a partner
and sound worse when placed by rule. Both roles see every line, so neither has to listen to find
out what happens next. My hypothesis is that the materials prime people to perform the scenario
line by line instead of participating in it, sending their attention to self monitoring rather than
to their partner. That matters commercially because the real gap in AI voice is interactional
timing and paralinguistic reasoning, and those only appear in unmonitored speech.

**What I changed.** I replaced the walkthrough with a situated scenario that contains every
requirement but never uses the word you would say. The user reads that their cousin has moved
dinner for the third time this month, that they cleared their one free evening for it back when it
was a ten minute walk, that their favourite aunt will be there, and that it is 5:40 with dinner at
seven. "Frustrated" never appears, because the frustration comes from the pattern, the sunk cost,
the scarcity and the clock, and relief has somewhere to land because the aunt gives them a reason
to still want to go. The address is genuinely absent, which makes the assistant's tool call
necessary rather than ceremonial. The assistant gets capabilities rather than dialogue, plus the
line that carries the design: they cannot see what the user sees. Neither person sees a tool result
until a tool runs. This removed 24 script lines and 18 rules from the screen people read
immediately before recording. Nothing useful was lost: audio guidance moved into the device check
beside a live meter, behavioural guidance moved to pre-submit where the system can point at a
timestamp, and the example clips moved to the queue wait, which is dead time. Both clips come from
a different scenario than the one you record, so there is nothing in them to copy.

**Two failure states.** Either a bad setup or a bad conversation can sink a recording, and they
need different recoveries, so the demo shows both. The setup failure sits in the audio check, which
on its first run reports a steady tone under the voice, explains that this is the hiss that gets
recordings rejected and that you will not hear it while talking, names the usual causes and offers
a retry or an override. Thirty seconds there replaces a rejection days later with no explanation.
The behaviour failure is one this redesign creates: with the script gone nothing forces the tool
call, so three minutes in the pair can be talking naturally while nobody has looked up the address.
Recovery runs in three layers. The tools sit in the console as obviously pressable objects from the
moment the assistant joins. At three minutes the assistant, and only the assistant, sees one low
contrast line saying the address has not come up yet, which names the gap and never the words. If
it still has not happened, the pre-submit screen shows the requirement unmet before submission
rather than after review, alongside one simulated behavioural flag pointing at the stretch where
the conversation held still. This is buildable because a console press is an event in our own
interface, so the check asks whether a button was pressed, not whether speech sounded natural. The
risk I will name rather than hide is that any prompt during recording is itself a self monitoring
trigger, which is why the notice is assistant only, one line, and late.

**What the system checks, and what it does not.** The brief describes the user as someone who may
be asked to portray an emotional progression, which reads like a client order, so it deserves a
direct answer. I did not remove the emotional requirement, only the instruction, because instructed
emotion is what is failing review. The system checks three things, all from real button presses:
the address was looked up, a route was worked out, and whether the calendar was updated, marked
optional because nobody asked for it. It does not check whether the emotional arc happened or
whether the pair sound like two people rather than two readers. Those stay with the reviewer, since
a check that guesses is worse than no check and would turn a contributor aid into a grading system.

**Directions I rejected.** Giving the user a phone screen instead of prose would drive the
frustration through the interface and drop copying to near zero, but hand built visual artefacts do
not scale for clients with varied requests on fast turnaround. Replacing the solo voice reference
with a 45 second paired warm up that is never submitted attacks the stiffness directly, since the
first minute of talking is the worst minute, but it costs both people time before either earns
anything, which fails the abandonment guardrail and pushes away high throughput contributors. More
instruction loses twice: same guardrail, and the failure mode is already people following
instructions too literally.

**Assumptions and what I would measure.** I do not have rejection reasons, so failure modes are
inferred from the product surface and the literature. If rejections cluster on audio and dropout
rather than performance, this direction is wrong and the fix belongs in setup, which is part of why
the audio check now has its own failure state. I would first tag a sample of rejected recordings by
failure type, since that validates or kills the direction cheaply. Then measure lexical overlap
between scenario text and the user's transcript, split by pass and fail, the measure Frommherz and
Zarcone used when situated scenarios cut copied content words from 51 to 15 percent. Then A/B the
situated scenario against the current walkthrough on pass rate, with abandonment as the guardrail
and the emotion criterion scored separately, because the specific claim is that induced emotion
beats instructed emotion and I would rather learn that from data than from argument.

**Gaps and how I used AI.** The transcript is hardcoded with no speech recognition, the behavioural
flag is simulated while every other line on the submit screen traces to a real button press, and
only the live matching path is built, in English. With more time I would build the rejected
directions far enough to test, write a second and third scenario to check the approach holds when
it has not been hand tuned once, and instrument the queue screen. I used Claude Code throughout and
the prompt history is preserved. I directed the product and visual decisions and reversed several
of its calls: it built a global navigation the brief explicitly asks the demo not to recreate, it
defaulted the live transcript to visible on the user's screen when that contradicts the argument
being made, and it wrote a timestamp range the demo has no way of knowing.
