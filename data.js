/* Unfazed — content library. Frame: calm, grounded, high-value man with options, standards and scarce time.
   Playful, decisive, socially calibrated. Never needy, never creepy, never pushy. */
window.DATA = (function () {

const CATS = [
  { id: "frame", name: "Unfazed Abundance Frame", short: "Frame" },
  { id: "humor", name: "Playful Humor & Teasing", short: "Humor" },
  { id: "tests", name: "Handling Tests & Banter", short: "Tests" },
  { id: "logistics", name: "Contact & Decisive Logistics", short: "Logistics" },
  { id: "chemistry", name: "Chemistry, Tension & Moving Forward", short: "Chemistry" }
];

const FRAMES = [
  { t: "Beauty is common. Character is rare.", b: "Looks get her attention for three seconds — yours too. What keeps you there is warmth, humor, presence. You're screening for that, not for a face.", q: "Next time you see a stunning woman, ask yourself: 'Cool — but is she fun?'" },
  { t: "You're the prize being evaluated? No — it's mutual.", b: "You're not auditioning. Both of you are finding out if the other is worth the next ten minutes. Walk in curious, not hopeful.", q: "Swap 'Will she like me?' for 'Let's see if I like her.'" },
  { t: "Outcome independence.", b: "Your day was great before you spoke to her and stays great after. That detachment is exactly what makes you magnetic.", q: "Decide now: whatever happens on your next approach, you win by having done it." },
  { t: "Your time is the scarcest thing you own.", b: "That's why you lead. No 3-week text pen-pals, no vague 'we should hang out sometime'. Interest gets a plan. No interest gets a warm goodbye.", q: "Every interaction ends with one of two things: a plan or a clean exit." },
  { t: "Slow is magnetic.", b: "Slow walk, slow speech, slow eye contact. Hurry signals you need something. Stillness signals you already have enough.", q: "Today, speak 20% slower than feels natural. Notice how people lean in." },
  { t: "Treat a 10 like a 6 — and a 6 like a 10.", b: "Give every person the same relaxed respect. Don't freeze up for the hottest woman in the room, don't ignore anyone else. Same guy, every room.", q: "Is your energy the same with the barista as with the woman you're attracted to?" },
  { t: "Rejection is just information.", b: "'No' means wrong timing, wrong fit, or she's taken. None of it is a verdict on you. Thank her with a smile and keep moving — you have options.", q: "Picture getting a 'no' and smiling: 'Fair enough — have a great day.' Feel how light that is." },
  { t: "Lead, don't ask permission for everything.", b: "'Do you maybe want to... if you're free?' puts the work on her. 'Come, let's grab a coffee next door' gives her an easy yes or no.", q: "Turn one question into a playful suggestion today." },
  { t: "Curiosity beats performance.", b: "You don't need a routine. Genuine curiosity about who she is beats any line. Lines open the door — curiosity walks through it.", q: "Find one thing about the next person you meet that genuinely interests you." },
  { t: "Standards make you attractive.", b: "A man who likes everyone is impressed by no one. Know what you value — kindness, humor, ambition — and let her show you she has it.", q: "Write down three traits you actually screen for beyond looks." },
  { t: "Respect is non-negotiable — and it's sexy.", b: "Reading her signals and honoring a 'not interested' instantly is what separates confident men from creepy ones. Calibration is a high-value trait.", q: "Practice noticing body language: is she turning toward you, or away?" },
  { t: "Presence over pickup.", b: "Phone away, shoulders down, head up. You notice the room. Women feel a man who's fully here before he says a word.", q: "Walk into your next room and do a slow, calm look-around before doing anything." },
  { t: "Abundance is a lifestyle, not a pose.", b: "Real options come from a full life — training, work you care about, friends, plans. Bring that energy, don't fake it.", q: "What's one exciting thing in your week you could naturally mention?" },
  { t: "You're not here to be liked by everyone.", b: "Polarizing is good. A clear, playful personality attracts the right women and filters out the wrong ones fast — saving you time.", q: "Say one honest opinion today instead of a safe, neutral one." },
  { t: "Tension is good. Don't kill it.", b: "A pause, eye contact, a smile — that's not awkward, that's attraction. Weak men rush to fill silence. You let it breathe.", q: "Hold eye contact two seconds longer than usual, with a slight smile." },
  { t: "Being unfazed by tests.", b: "When she pokes at you, she's checking if you'll crumble. Amused, relaxed, and a little playful is the only answer you need.", q: "Practice laughing it off: 'Ha — you're trouble, aren't you?'" },
  { t: "Momentum over perfection.", b: "The best opener is the one you actually say. A decent line delivered in three seconds beats the perfect line you rehearse while she walks away.", q: "Three-second rule today: notice, smile, say something." },
  { t: "You qualify her too.", b: "'What's something you're genuinely passionate about?' — asking this means you're choosing too. It flips the dynamic from chasing to selecting.", q: "Prepare one qualifying question you actually care about." },
  { t: "Move with her signals, not against them.", b: "Green lights: you lead forward. Mixed: you stay playful and give space. Red: you exit with grace. That's how decisive men stay smooth.", q: "Name three green lights you'll watch for today." },
  { t: "Frame control is calm, not loud.", b: "You don't win by talking more. You win by being the most relaxed person in the conversation.", q: "In your next conversation, be the one who's least in a hurry." }
];

const UPGRADES = [
  // FRAME
  { c: "frame", s: "She's stunning and you open.", bad: "Wow, you're the most beautiful woman I've ever seen.", good: "You look like you've got a story. Something tells me you're trouble.", w: "Leading with looks puts her on a pedestal and blends you with every guy who said the same today. Commenting on vibe and personality makes you the one who noticed something real." },
  { c: "frame", s: "She mentions lots of guys hit on her.", bad: "Yeah, I bet. I'm not like those other guys, I promise.", good: "Ha — tough life. Well, I'm still deciding if you're interesting, so don't relax yet.", w: "Defending yourself is chasing. Playfully flipping the frame shows you're unimpressed by her popularity and evaluating her too." },
  { c: "frame", s: "Showing interest without overinvesting.", bad: "I really, really like you. You're perfect.", good: "I like your energy. You might actually be cool — jury's still out.", w: "Calibrated interest with a playful hint of qualification keeps tension alive instead of handing her all the value." },
  { c: "frame", s: "Qualifying her gently.", bad: "So... what do you like to do?", good: "Give me one thing about you that isn't on your Instagram.", w: "The interview question is a dead end. The qualifier invites her to show depth, and quietly puts you in the selecting seat." },
  { c: "frame", s: "She's late to meet you.", bad: "No worries at all! Take your time, I'll wait as long as you need!", good: "All good — I grabbed us a spot. Next time you're buying the first round though.", w: "Relaxed but with a playful standard. You're not angry, and you're not a doormat. Your time matters." },
  { c: "frame", s: "She asks why you came over.", bad: "Sorry, I just thought you were really pretty and I had to try...", good: "Honestly? You looked like the most interesting person in here. Prove me right.", w: "No apology, no shrinking. You own your intent and hand her a playful challenge." },
  { c: "frame", s: "She compliments you.", bad: "Oh no, not really, I'm just average...", good: "Thank you — I'll take that. You're not so bad yourself.", w: "Accept compliments like a man who expected them. Deflecting signals low self-worth." },
  // HUMOR
  { c: "humor", s: "She asks 'What do you do?'", bad: "I'm a project manager at a logistics company. It's fine.", good: "Professional coffee critic. The day job is aviation — the coffee pays nothing.", w: "Playful misdirection first, then the real answer. Turns a resume moment into flirting." },
  { c: "humor", s: "She says she's from a small town.", bad: "Oh nice. Is it nice there?", good: "So you're the one who escaped. Did they put up a statue?", w: "Playful assumption creates a story and makes her laugh instead of answering a survey." },
  { c: "humor", s: "Push-pull when she's playful.", bad: "You're so cool, I love talking to you.", good: "You're kind of awesome. Too bad we'd never work — you'd steal all my fries.", w: "Push-pull: a compliment wrapped in a tease. Creates emotional spikes that feel like chemistry." },
  { c: "humor", s: "She orders something sweet.", bad: "Good choice.", good: "A caramel triple-shot? Okay, I see you're chaos with a straw.", w: "A teasing label gives her a role to play with. Light, specific, never mean." },
  { c: "humor", s: "She's very serious and dry.", bad: "So... what are your hobbies?", good: "Let me guess — you're secretly the funny one, you just don't show it to strangers.", w: "Gently calling out the vibe with a positive assumption invites her to drop the guard." },
  { c: "humor", s: "She says she loves dogs.", bad: "Me too! I love dogs.", good: "Dog person. Okay, you just went up two points. Don't ruin it by saying you hate pizza.", w: "Playful scoring shows you're evaluating, keeps it light, and creates a running joke." },
  { c: "humor", s: "Turning an interview into flirting.", bad: "Where did you study? What did you study?", good: "You give strong 'class rebel who still got straight A's' energy. Am I close?", w: "Cold reads are fun to correct or confirm. She ends up telling you more, with a smile." },
  // TESTS
  { c: "tests", s: "'Do you use that line on everyone?'", bad: "No! I swear, you're the only one, I'm not like that.", good: "Only on Mondays. You got lucky.", w: "Agree & amplify with a smile. Defending yourself fails the test; playful exaggeration passes it." },
  { c: "tests", s: "'You're probably a player.'", bad: "No, I'm a really nice guy, I've only had two girlfriends!", good: "Retired. Now I just give private lessons. You'd be a tough student though.", w: "Calm amusement. Over-explaining signals insecurity; playing along signals you're unbothered." },
  { c: "tests", s: "'I have a boyfriend.' (said playfully, still smiling, still talking)", bad: "Oh... sorry. Is he nice? Okay, never mind then.", good: "Good for him. I was just enjoying the conversation anyway — but you're not off the hook for that coffee recommendation.", w: "Stay relaxed and respectful. If she's genuinely taken, you keep it friendly and move on. If it was a test, your calm passes it." },
  { c: "tests", s: "'You're too short / not my type.'", bad: "Well, height doesn't matter that much, I have a great personality...", good: "Perfect. Then you won't fall for me and we can just have fun.", w: "No arguing, no justifying. Light humor shows the comment doesn't land." },
  { c: "tests", s: "'Buy me a drink.' (right after meeting)", bad: "Sure! What do you want? Anything you like!", good: "I barely know you. Impress me first — then we'll talk about drinks.", w: "Holding a playful standard. You're generous with people who earn it, not a vending machine." },
  { c: "tests", s: "She's on her phone mid-conversation.", bad: "(Keeps talking louder to get her attention.)", good: "No stress — I'll let you get back to it. Was nice meeting you.", w: "Calmly removing your attention when it isn't valued is the strongest boundary there is. Often she re-engages — and if not, you saved time." },
  { c: "tests", s: "'Why should I give you my number?'", bad: "Please? I'm a nice guy, I promise I'm not weird.", good: "You shouldn't — unless you want the best coffee spot in town. Your call.", w: "Zero pleading. Frame the number as something she gains, then give her an easy yes or no." },
  // LOGISTICS
  { c: "logistics", s: "Things are going well and you want to stay in touch.", bad: "Um... would it maybe be okay if I could possibly get your number?", good: "I've got to run, but we should continue this. Put your number in — I'll text you mine.", w: "Calm assumption. Hand her your phone with the new contact screen open. Decisive, not demanding." },
  { c: "logistics", s: "She seems interested, you have 15 minutes free.", bad: "Maybe we could meet up sometime, if you want?", good: "I'm grabbing a coffee next door. Come with me for ten minutes — you can tell me about that trip.", w: "The instant date. Your time is valuable, so you don't schedule what can happen right now." },
  { c: "logistics", s: "First text after getting her number.", bad: "Hey!! It was sooo nice meeting you!! How's your day going?? :)", good: "Wine critic from Aldi 🍷 — good to meet you. Thursday, espresso at Café Mira, 7pm?", w: "Callback to your shared joke + a concrete plan. No 20-message small talk to earn a date." },
  { c: "logistics", s: "She replies 'maybe sometime this week'.", bad: "Okay cool! Just let me know whenever works for you!", good: "Thursday 7 or Saturday afternoon — pick one.", w: "Offer a clear choice. Vagueness kills momentum; two options make yes easy." },
  { c: "logistics", s: "She hasn't replied in two days.", bad: "Hey? Did you see my message? Is everything okay?", good: "(No text. One light callback in a few days — or nothing. You have a full week.)", w: "No double-texting chains. One playful nudge at most. Her silence is information; your life goes on." },
  { c: "logistics", s: "Picking the date spot.", bad: "Where do you want to go? I'm fine with anything!", good: "There's a little wine bar near me with live jazz on Thursdays. Let's go there.", w: "Leading the plan is attractive and saves both of you a week of 'idk, you choose'." },
  { c: "logistics", s: "Getting Instagram instead of number.", bad: "Can I follow you? Is that weird? Sorry...", good: "What's your Insta? I'll send you that song I was talking about.", w: "Give a reason to connect — it feels natural and keeps it light." },
  // CHEMISTRY
  { c: "chemistry", s: "Conversation is flowing and you feel attraction.", bad: "(Talks faster, adds more stories to keep her entertained.)", good: "(Slow down. Hold eye contact, smile, let a two-second pause hang.) 'You're trouble.'", w: "Slowing down builds tension. Over-talking is the most common chemistry killer." },
  { c: "chemistry", s: "First light physical contact.", bad: "(Avoids touching at all, or grabs her waist suddenly.)", good: "(Light touch on her forearm during a laugh.) 'Stop — you're making me laugh too much.'", w: "Light, brief, contextual touch — and you watch how she responds. If she leans in, comfort grows. If she pulls back, you give space." },
  { c: "chemistry", s: "You sense the moment for a kiss.", bad: "Can I kiss you? Is that okay? Sorry if it's weird...", good: "(Pause mid-sentence, look at her lips then her eyes, slight smile, lean in halfway and let her close the gap.)", w: "Leaning in halfway is both confident and consent-respecting: she chooses to close the gap. If she does, perfect. If she doesn't, you smile and continue — no harm." },
  { c: "chemistry", s: "Moving the night forward.", bad: "So... uh... do you want to maybe do something else?", good: "This place is getting loud. Let's grab a nightcap at my favorite spot around the corner.", w: "Smooth location changes build momentum and comfort. Frame it as a fun next step, and accept a no easily." },
  { c: "chemistry", s: "She says something flirty.", bad: "Haha yeah. So anyway, what do you do?", good: "(Raise an eyebrow, smile.) 'Careful. I might start thinking you like me.'", w: "Acknowledge the flirt and return it. Changing the topic signals you missed it — or got nervous." },
  { c: "chemistry", s: "Ending a great first date.", bad: "So, um, I had a great time, would you maybe want to do this again?", good: "I had fun. You're more interesting than you let on. Come here.", w: "Warm statement + leading the hug or kiss. Confident men close the date, not ask for a grade." },
  { c: "chemistry", s: "Eye contact across the room.", bad: "(Looks away quickly, or stares without expression.)", good: "(Hold it, slight smile, look away slowly — then walk over within a minute.)", w: "Comfortable eye contact plus a slow look-away signals confidence. Following up quickly shows decisiveness." },
  { c: "chemistry", s: "She's nervous on the date.", bad: "Are you okay? Is everything fine? Do you not like it here?", good: "Relax — I already decided you're cool. Now you just have to not mess it up.", w: "A playful reassurance lowers pressure while keeping your leadership." },
  { c: "chemistry", s: "Mixed signals — she's warm but steps back from touch.", bad: "(Tries again harder, or sulks.)", good: "(Totally relaxed, give space, keep the banter fun. Let her re-initiate.)", w: "Reading and respecting signals is the core skill. Calm men don't push; they make it comfortable for her to step closer when she's ready." }
];

const LOCATIONS = [
  {
    id: "gym", name: "Gym", icon: "🏋️", tag: "Short. Respectful. Magnetic.",
    frame: "The gym is her space too. You're the calm guy who doesn't stare, doesn't hover, and doesn't interrupt. When you do talk, it's brief, light, and confident — then you go back to your workout. That restraint is what makes you memorable.",
    timing: [
      "Never mid-set, never when she's wearing headphones and locked in.",
      "Best moments: between sets when she's resting and looking around, at the water fountain, while racking weights, or as you're both leaving.",
      "Keep it under 60–90 seconds. You're there to train — so is she.",
      "If you see her regularly: a nod and smile for a few sessions first builds familiarity before you open."
    ],
    openers: [
      { type: "Observational", line: "That looked brutal — are you training for something, or just punishing yourself today?" },
      { type: "Playful", line: "I'm convinced you're secretly the gym's coach. Everybody watches your form." },
      { type: "Playful", line: "Okay, honest question: is the playlist in here worse today, or is it just me?" },
      { type: "Direct", line: "I'll be quick, I know you're training. I've seen you here a few times — you've got great energy. I'm Alex." },
      { type: "Situational", line: "(At the fountain) After you — you earned it more than me today." }
    ],
    pivots: [
      "\"How long have you been training? You don't look like a January person.\"",
      "\"What's your secret — coffee, music, or pure stubbornness?\"",
      "\"I'll let you get back to it. What's your name, by the way?\" (Name at the end — it sticks.)",
      "Next session: \"Back again — okay, you're officially more disciplined than me.\""
    ],
    green: ["She takes out an earbud fully and turns to you", "Smiles, adds to the conversation, asks you something back", "Lingers after the exchange or seeks you out next session", "Laughs at your tease"],
    red: ["One-word answers, eyes back on her phone or mirror", "Keeps headphones in and nods politely", "Body angled away, resumes training immediately", "Looks uncomfortable — exit right away"],
    exits: [
      "\"Alright, I'll let you finish. Go crush it.\" (smile, walk away, no lingering)",
      "\"Good chatting — see you around.\"",
      "Close if strong green lights: \"We should grab a post-workout coffee sometime. Put your number in — I'll text you.\""
    ]
  },
  {
    id: "grocery", name: "Grocery & Shops", icon: "🛒", tag: "Situational, playful, easy.",
    frame: "Shopping is low pressure — perfect for effortless, situational openers. You're relaxed, playful, and treat the aisle like your living room. Her basket gives you endless material.",
    timing: [
      "Approach when she's browsing, not rushing to checkout with a screaming toddler or on a call.",
      "Stand beside her (not behind), shoulder slightly angled — non-threatening, easy to talk.",
      "Comment on what's in front of you both, then pivot to her.",
      "If she's open, it's easy to say 'there's a café next door' — shops are next to coffee."
    ],
    openers: [
      { type: "Observational", line: "(At the wine shelf) You look like you know what you're doing. Red or white for a guy who's terrible at choosing?" },
      { type: "Playful", line: "That basket says you're either very healthy, or you're about to hide chocolate under the kale." },
      { type: "Playful", line: "Quick — pick one. I trust a stranger's judgment more than my own today." },
      { type: "Direct", line: "I know this is random in the pasta aisle, but you caught my eye and I'd regret not saying hi." },
      { type: "Situational", line: "(Clothes shop) Be honest — would you let your brother leave the house in this?" }
    ],
    pivots: [
      "\"Okay, you passed the test. What are you cooking tonight — or is that a secret recipe?\"",
      "\"You strike me as someone who has strong opinions about cheese.\"",
      "\"I'll trust you on the wine. If it's terrible, you owe me a coffee.\"",
      "\"Are you from around here? You don't shop like a tourist.\""
    ],
    green: ["She turns toward you and gives more than a one-word answer", "Plays along with your tease, teases back", "Keeps the conversation going when there's a natural end", "Stays near you, slows down her shopping"],
    red: ["Polite short answer and keeps moving", "Looks for an escape, steps away", "Mentions she's in a hurry", "Avoids eye contact"],
    exits: [
      "\"Thanks for saving my dinner. Have a good one.\"",
      "Instant date: \"I'm grabbing a coffee next door — come for ten minutes and tell me what you're cooking.\"",
      "Contact: \"I've got to go, but you're fun. Put your number in, I'll report back on the wine.\""
    ]
  },
  {
    id: "street", name: "Street & Daytime", icon: "🏙️", tag: "Calm, unhurried, grounded.",
    frame: "Daytime approaches are the most direct and the most impressive — if they're calm. Never chase, never startle. You stop her gently from the front-side, smile, and slow the moment down. You're the most relaxed person on the street.",
    timing: [
      "Approach from the front-side in her line of sight — never from behind, never grab or block her path.",
      "If she's walking fast, walk briefly alongside, say your opener, then stop and let her stop.",
      "Lower your energy: slow voice, smile, relaxed posture.",
      "Skip it if she's on a call, clearly rushing, or it's dark and isolated — calibration is everything."
    ],
    openers: [
      { type: "Direct", line: "Hey — two seconds. I was walking the other way and thought I'd regret not saying hi. You've got a great style." },
      { type: "Observational", line: "Excuse me — you look like you know this area. Where's the best coffee around here? And don't say Starbucks." },
      { type: "Playful", line: "Sorry, I'm not usually this guy, but you looked way too happy for a Monday and I need to know your secret." },
      { type: "Direct", line: "I know this is random. I saw you and thought: I'd like to meet her. I'm Alex." },
      { type: "Situational", line: "(Near a bookstore / market) Okay, real question — is this place actually good or just pretty?" }
    ],
    pivots: [
      "\"Where are you running off to so fast? You walk like you're late to save the world.\"",
      "\"Let me guess — you work in something creative.\"",
      "\"Are you from here? You don't have the grumpy Berlin face.\"",
      "Ground the moment: shift your weight, relax, ask something real — it signals 'I'm not in a hurry, neither should you be.'"
    ],
    green: ["She stops fully and turns her body toward you", "Laughs, smiles, keeps eye contact", "Asks your name or something about you", "Forgets she was in a hurry"],
    red: ["Keeps walking or says she's in a rush", "Clutches bag, steps back, looks around", "Says 'no thanks' or doesn't respond", "Any sign of discomfort — exit warmly and immediately"],
    exits: [
      "\"No worries — have a beautiful day.\" (smile, walk on)",
      "Instant date: \"I've got 15 minutes — let's grab that coffee you're recommending.\"",
      "Contact: \"I'll let you go. Give me your number — I'll take you to the real best café.\""
    ]
  },
  {
    id: "cafe", name: "Cafes & Coffee", icon: "☕", tag: "Relaxed, curious, convert fast.",
    frame: "Cafés are slow-paced and intimate — the perfect stage for calm charm. The line and the pickup counter are natural openers. If she's open, convert to a sit-down or her number quickly. You don't hover for an hour building up courage.",
    timing: [
      "In line or at the pickup counter is ideal — everyone's waiting, talking is natural.",
      "At a table: look for open signals (looking around, not deep in a laptop or headphones).",
      "If she's working hard on a laptop, a short opener + 'I'll let you work' leaves a strong impression.",
      "If it goes well, ask to sit or invite her to your table — decisive, not lingering."
    ],
    openers: [
      { type: "Observational", line: "(In line) What's the move here? I need to know if I'm a cappuccino guy or a flat white guy today." },
      { type: "Playful", line: "You ordered that so confidently — are you a regular or just a really good actor?" },
      { type: "Playful", line: "(At a table with a book) Okay, is that book actually good or are you just pretending to read it to look mysterious?" },
      { type: "Direct", line: "I'm about to sit down and I'd rather sit with you than with my phone. Mind if I join for a few minutes?" },
      { type: "Situational", line: "(Pickup counter) I think that's mine — kidding. You look like you need it more." }
    ],
    pivots: [
      "\"So what's your caffeine-fueled mission today?\"",
      "\"You look like you've got a lot going on — work or something fun?\"",
      "\"Okay, I trust your taste. What else around here is actually good?\"",
      "Sit-down: \"I'll grab that table by the window. Come sit for five minutes.\""
    ],
    green: ["She removes headphones, closes laptop, or turns her chair", "Asks you questions back, smiles a lot", "Accepts the invitation to sit", "Lingers after her order is ready"],
    red: ["Eyes go back to the screen, short answers", "Says she's busy or working", "Takes the coffee and leaves", "Polite but closed body language"],
    exits: [
      "\"I'll let you get back to work. Was nice meeting you.\"",
      "Convert: \"I've got to head out. Let's do this properly — drinks Thursday? Put your number in.\"",
      "If short on time: \"I'm here most mornings. Next coffee's on you.\" (and leave with a smile)"
    ]
  },
  {
    id: "bar", name: "Bars & Lounges", icon: "🍸", tag: "Playful banter. Lead the logistics.",
    frame: "Bars are social by design — she expects to be approached, so confidence, humor, and leadership stand out. You're the fun, relaxed guy who doesn't hover, doesn't buy drinks for attention, and knows how to move the night forward smoothly.",
    timing: [
      "Approach within the first few minutes of eye contact — the longer you wait, the weirder it gets.",
      "If she's with friends, win the group first: be friendly to everyone, especially the friends.",
      "Stand at an angle, half-turned — it signals you might leave at any moment (less pressure for her).",
      "Isolate naturally: 'Come, let's grab a breath of air' or 'Let's sit over there where it's quieter.'"
    ],
    openers: [
      { type: "Observational", line: "Settle something for us — my friend thinks pineapple belongs on pizza. Tell him he's wrong." },
      { type: "Playful", line: "You look like you're the one who gets the whole group in trouble. Am I right?" },
      { type: "Playful", line: "Okay, you've got the most fun energy here and I'm going to need you to explain yourself." },
      { type: "Direct", line: "Hey — I saw you from over there and wanted to meet you. I'm Alex." },
      { type: "Situational", line: "(At the bar) Okay, what's good here? And don't say vodka soda, I'll judge you." }
    ],
    pivots: [
      "\"How do you all know each other? Let me guess — you're the troublemaker of the group.\"",
      "\"You're not like your friends. They're nice. You're trouble.\" (with a smile)",
      "\"Okay, what's the most spontaneous thing you've done this year?\"",
      "Isolate: \"I like your vibe. Come, let's grab a seat where I can actually hear you.\""
    ],
    green: ["Laughs, touches your arm, mirrors your body language", "Stays with you when friends drift away", "Accepts moving to a quieter spot", "Asks what you're doing later / where you're going"],
    red: ["Keeps checking her friends or phone", "Turns back to her group repeatedly", "Short answers, no questions back", "Friends pull her away and she goes happily"],
    exits: [
      "\"Have a great night, you two.\" (warm to her friends too)",
      "Contact: \"I'm heading to another spot with my friends. Let's continue this — put your number in.\"",
      "Move the night: \"This place is dying. Let's grab a drink at the spot around the corner.\" (If she's with friends, invite the group — you lead.)"
    ]
  }
];

const QUIZ = [
  // GYM
  { loc: "gym", s: "At the gym, she's mid-set on squats with headphones in. She's very attractive. What's the move?", a: [
    { t: "Wait. Let her finish and rest. If she looks around between sets or at the fountain, make a short playful comment.", ok: 1 },
    { t: "Walk over right away and tap her shoulder — confidence means not waiting.", ok: 0 },
    { t: "Stare at her in the mirror until she notices you.", ok: 0 },
    { t: "Give up. Approaching at the gym is always creepy.", ok: 0 }], w: "Calibration is high-value. Interrupting mid-set is rude; staring is creepy. Wait for a natural break, keep it short, and respect her workout." },
  { loc: "gym", s: "She's resting between sets, headphones down, glancing around. You catch her eye. Best opener?", a: [
    { t: "\"That looked brutal — training for something, or just punishing yourself today?\"", ok: 1 },
    { t: "\"Hey, can I give you some tips on your form?\"", ok: 0 },
    { t: "\"You're so beautiful, you shouldn't even need the gym.\"", ok: 0 },
    { t: "\"Do you come here often?\"", ok: 0 }], w: "Playful observation about the shared context. Unsolicited form tips are condescending, looks-compliments put her on a pedestal, cliché lines are forgettable." },
  { loc: "gym", s: "Quick chat at the gym went great — she laughed and asked your name. You're both leaving. What now?", a: [
    { t: "\"We should grab a post-workout coffee sometime. Put your number in, I'll text you.\"", ok: 1 },
    { t: "Say nothing and hope you see her again next week.", ok: 0 },
    { t: "Wait outside and walk with her to her car.", ok: 0 },
    { t: "Find her on Instagram later without asking.", ok: 0 }], w: "Green lights + natural end = decisive close. Waiting wastes the momentum; lurking or stalking online is creepy." },
  // GROCERY
  { loc: "grocery", s: "Grocery store. She's comparing two bottles of wine, glances over at you. Best move?", a: [
    { t: "\"You look like you know what you're doing. Which one would you pick for a guy who's terrible at choosing?\"", ok: 1 },
    { t: "\"I'm a wine expert. Let me explain the difference to you.\"", ok: 0 },
    { t: "\"Hi, sorry to bother you, I don't mean to interrupt...\"", ok: 0 },
    { t: "Wait until she leaves, then regret it.", ok: 0 }], w: "Playful, situational, puts her in an expert role. Mansplaining and apologizing both lower your value." },
  { loc: "grocery", s: "She laughs at your opener and teases you back about your messy basket. What's next?", a: [
    { t: "Tease back, then pivot: \"Okay, you passed. What are you cooking tonight?\"", ok: 1 },
    { t: "\"Sorry, yeah, I'm bad at shopping...\" (apologize)", ok: 0 },
    { t: "Immediately ask for her number.", ok: 0 },
    { t: "Say \"Haha\" and walk away.", ok: 0 }], w: "She's playing — stay in the banter, then open a door to a real conversation. Asking for the number too early skips the vibe." },
  { loc: "grocery", s: "Good vibe in the store, she mentions she's heading out. You have 15 minutes free. Best close?", a: [
    { t: "\"I'm grabbing a coffee next door. Come for ten minutes — tell me about that trip.\"", ok: 1 },
    { t: "\"Would you maybe want to get coffee sometime, if you have time?\"", ok: 0 },
    { t: "\"Okay bye!\"", ok: 0 },
    { t: "\"Can I follow you to your car?\"", ok: 0 }], w: "The instant date respects your time and hers. Leading with a concrete, low-commitment plan is far stronger than a vague maybe." },
  // STREET
  { loc: "street", s: "On the street, you see a woman walking toward you who catches your eye. How do you approach?", a: [
    { t: "From her front-side, in her line of sight, slow down, smile, and calmly say your opener.", ok: 1 },
    { t: "Run up behind her and tap her shoulder.", ok: 0 },
    { t: "Block her path so she has to stop.", ok: 0 },
    { t: "Follow her for a block to find the right moment.", ok: 0 }], w: "Never startle, block, or follow. A calm approach from the front gives her full freedom — which is exactly what makes her comfortable stopping." },
  { loc: "street", s: "She stops, smiles but says, \"I'm kind of in a hurry.\" What do you do?", a: [
    { t: "\"Then I'll be quick — you seem fun. Put your number in, I'll take you for a proper coffee.\"", ok: 1 },
    { t: "\"Come on, just five minutes, please?\"", ok: 0 },
    { t: "\"Oh, okay, sorry, never mind.\" (look defeated)", ok: 0 },
    { t: "Walk with her for ten minutes anyway.", ok: 0 }], w: "Smiling = interest; hurry = logistics. Respect her time with a fast, confident close. If she declines, smile and wish her a good day." },
  { loc: "street", s: "She stops but looks tense, arms crossed, eyes searching for an exit. What now?", a: [
    { t: "\"No worries — have a great day.\" Smile and walk on.", ok: 1 },
    { t: "Push harder with more jokes to win her over.", ok: 0 },
    { t: "Ask why she's being so cold.", ok: 0 },
    { t: "Compliment her looks to change her mood.", ok: 0 }], w: "Clear red lights. A high-value man exits gracefully and instantly. Pushing turns confidence into creepiness." },
  // CAFE
  { loc: "cafe", s: "Café line. She's ahead of you and orders confidently. Best opener?", a: [
    { t: "\"You ordered that so confidently — regular, or just a really good actor?\"", ok: 1 },
    { t: "\"Can I pay for your coffee?\"", ok: 0 },
    { t: "\"You have really pretty eyes.\"", ok: 0 },
    { t: "Say nothing and sit near her hoping she'll talk.", ok: 0 }], w: "Playful observation, no investment. Buying her coffee before you've talked is a bribe, not attraction." },
  { loc: "cafe", s: "She's working on a laptop, headphones in, focused. You find her attractive.", a: [
    { t: "Wait for a natural break — when she looks up or stretches. Keep it short: an opener + \"I'll let you work\".", ok: 1 },
    { t: "Wave your hand in front of her screen.", ok: 0 },
    { t: "Sit down at her table uninvited.", ok: 0 },
    { t: "Write a note and slip it under her coffee cup.", ok: 0 }], w: "Respect her focus. A short, warm interaction that ends on your terms leaves a strong impression — often she'll reengage." },
  { loc: "cafe", s: "At the counter, the conversation is flowing and she's smiling. What's the high-value move?", a: [
    { t: "\"I'll grab the table by the window. Come sit for five minutes.\"", ok: 1 },
    { t: "Keep standing at the counter talking for 30 minutes.", ok: 0 },
    { t: "\"Is it okay if I maybe sit with you, if you don't mind?\"", ok: 0 },
    { t: "Go to your own table and hope she follows.", ok: 0 }], w: "Leading the logistics. A clear, relaxed invitation is easy to say yes to — and easy to decline without awkwardness." },
  // BAR
  { loc: "bar", s: "Bar: She's with two friends. You catch her eye twice. Best approach?", a: [
    { t: "Open the whole group playfully, be warm to the friends, then naturally focus on her.", ok: 1 },
    { t: "Ignore the friends and only talk to her.", ok: 0 },
    { t: "Send her a drink via the bartender.", ok: 0 },
    { t: "Wait for her to come to you.", ok: 0 }], w: "Winning the group shows social skill and makes her friends your allies. Sending a drink is passive and puts you in 'buyer' mode." },
  { loc: "bar", s: "She asks you to buy her a drink within the first minute of talking.", a: [
    { t: "\"I barely know you. Impress me first, then we'll talk drinks.\" (smiling)", ok: 1 },
    { t: "\"Of course! What do you want?\"", ok: 0 },
    { t: "\"No, that's rude.\" (serious)", ok: 0 },
    { t: "Walk away offended.", ok: 0 }], w: "Playful standard. You're generous with people who earn it — and you keep the fun. Serious or offended reactions fail the test." },
  { loc: "bar", s: "Great vibe, she's touching your arm, mirroring you. The bar is loud. Next move?", a: [
    { t: "\"Come, let's grab a seat where I can actually hear you.\" Take her hand and lead.", ok: 1 },
    { t: "Keep shouting over the music for an hour.", ok: 0 },
    { t: "\"Do you want to come home with me right now?\"", ok: 0 },
    { t: "Go back to your friends to play it cool.", ok: 0 }], w: "Strong green lights → move to a better setting. Smooth, logical, not too fast. Leading the logistics is what masculine leadership looks like." },
  { loc: "bar", s: "You're about to leave with your friends. She's been very into the conversation.", a: [
    { t: "\"We're heading to the spot around the corner. You and your friends should come.\" Or: \"Put your number in — let's continue this.\"", ok: 1 },
    { t: "Leave without saying goodbye to seem mysterious.", ok: 0 },
    { t: "Stay and abandon your friends.", ok: 0 },
    { t: "\"Will I ever see you again?\" (sadly)", ok: 0 }], w: "Momentum and options: invite her along or lock in contact. Disappearing wastes the connection; neediness kills it." },
  // TESTS / BANTER
  { loc: "tests", s: "She teases you: \"Do you use that line on everyone?\"", a: [
    { t: "\"Only on Mondays. You got lucky.\" (smile)", ok: 1 },
    { t: "\"No, I swear, you're the only one!\"", ok: 0 },
    { t: "\"Why would you say that? That's rude.\"", ok: 0 },
    { t: "Go silent and look embarrassed.", ok: 0 }], w: "Agree & amplify. Playful exaggeration shows you're unbothered. Defending yourself confirms the test hit." },
  { loc: "tests", s: "She says, \"You're probably a player.\"", a: [
    { t: "\"Retired. Now I just give private lessons. You'd be a tough student though.\"", ok: 1 },
    { t: "\"No! I'm a really nice guy, I've only had two girlfriends.\"", ok: 0 },
    { t: "\"And you're probably a heartbreaker.\" (defensive tone)", ok: 0 },
    { t: "Change the subject quickly.", ok: 0 }], w: "Calm amusement passes. Over-explaining and defensiveness signal insecurity." },
  { loc: "tests", s: "She asks, \"What do you do?\" in a slightly bored tone.", a: [
    { t: "\"Professional coffee critic. Day job is aviation — but the coffee pays nothing.\"", ok: 1 },
    { t: "Give a detailed five-minute explanation of your job.", ok: 0 },
    { t: "\"Why do you want to know?\" (suspicious)", ok: 0 },
    { t: "\"Nothing special, just a boring job.\"", ok: 0 }], w: "Playful misdirection then real answer — turns an interview into flirting. Selling yourself down or over-explaining both lose energy." },
  { loc: "tests", s: "She says, \"I don't usually date guys like you.\"", a: [
    { t: "\"Good. Then this'll be educational for you.\" (relaxed smile)", ok: 1 },
    { t: "\"What do you mean? What's wrong with me?\"", ok: 0 },
    { t: "\"I can change, I promise.\"", ok: 0 },
    { t: "\"Fine, whatever.\" (walk away)", ok: 0 }], w: "Unfazed humor. Seeking approval or getting hurt fails. A light frame-flip keeps the tension fun." },
  // LOGISTICS
  { loc: "logistics", s: "You got her number at a café yesterday. Best first text?", a: [
    { t: "\"Flat white critic ☕ — good meeting you. Thursday 7pm, wine at Café Mira?\"", ok: 1 },
    { t: "\"Hey!! How's your day going?? :)\"", ok: 0 },
    { t: "A long paragraph about how great you felt meeting her.", ok: 0 },
    { t: "Wait two weeks to seem busy.", ok: 0 }], w: "Callback to your inside joke + concrete plan. No pen-pal small talk, no games, no essays." },
  { loc: "logistics", s: "She replies: \"Maybe sometime next week?\"", a: [
    { t: "\"Tuesday 7 or Thursday 8 — pick one.\"", ok: 1 },
    { t: "\"Sure, just let me know whenever you're free!\"", ok: 0 },
    { t: "\"Why not this week? Are you not interested?\"", ok: 0 },
    { t: "Send 5 more texts to keep her engaged.", ok: 0 }], w: "A clear choice keeps momentum. Open-ended 'whenever' leads to nothing; pressure kills attraction." },
  { loc: "logistics", s: "She hasn't replied for three days after you suggested a date.", a: [
    { t: "Do nothing, or send one light, playful callback later. Your week is full anyway.", ok: 1 },
    { t: "\"Hello?? Did you see my message?\"", ok: 0 },
    { t: "\"I guess you're not interested. Fine.\"", ok: 0 },
    { t: "Text her every day until she answers.", ok: 0 }], w: "Abundance means no chasing. One nudge at most — her silence is information, not a problem to solve." },
  // CHEMISTRY
  { loc: "chemistry", s: "On the date, conversation flows, she's laughing, leaning in, holding eye contact. What do you do?", a: [
    { t: "Slow down, hold eye contact, smile, let a pause hang — then lean in halfway and let her close the gap.", ok: 1 },
    { t: "Talk faster and tell more stories to keep her entertained.", ok: 0 },
    { t: "\"Can I kiss you? Sorry if that's weird.\"", ok: 0 },
    { t: "Wait for her to kiss you.", ok: 0 }], w: "Slowing down builds tension. Leaning in halfway is confident and respectful: she chooses to close the gap. Over-talking kills the moment." },
  { loc: "chemistry", s: "You lightly touch her arm while laughing. She pulls back slightly. What now?", a: [
    { t: "Stay relaxed, give space, keep the banter fun. Let her re-initiate when she's comfortable.", ok: 1 },
    { t: "Try again a minute later, a bit firmer.", ok: 0 },
    { t: "Ask, \"Why did you pull away? Don't you like me?\"", ok: 0 },
    { t: "Go cold and stop talking.", ok: 0 }], w: "Reading and respecting signals is the most attractive skill. No pressure, no sulking — just comfort and fun." },
  { loc: "chemistry", s: "Great first date at a bar, strong green lights. It's 11pm. How do you move the night forward?", a: [
    { t: "\"This place is getting loud. Let's grab a nightcap at my favorite spot around the corner.\"", ok: 1 },
    { t: "\"So... do you want to come back to mine?\" (abruptly, with no lead-up)", ok: 0 },
    { t: "\"Well, I guess we should go home.\"", ok: 0 },
    { t: "Order five more shots to keep her there.", ok: 0 }], w: "A smooth venue change builds momentum and comfort naturally. Abrupt asks feel pushy; ending early wastes chemistry; alcohol is never a strategy." },
  { loc: "chemistry", s: "She looks at your lips, then back at your eyes, and goes quiet. What does it mean?", a: [
    { t: "A strong green light — slow down, smile, and lean in halfway.", ok: 1 },
    { t: "She's bored — change the topic.", ok: 0 },
    { t: "She wants you to tell another joke.", ok: 0 },
    { t: "Ask her what she's thinking about.", ok: 0 }], w: "Lip glances + silence = classic kiss window. The mistake is filling the silence with words." },
  { loc: "frame", s: "A woman is ignoring you and very aloof. She's the most attractive in the room. Your frame?", a: [
    { t: "Stay friendly but unbothered — if there's no interest, talk to the people who are fun.", ok: 1 },
    { t: "Try harder — the hottest girl is worth the extra effort.", ok: 0 },
    { t: "Make a mean comment to get her attention.", ok: 0 },
    { t: "Buy her drinks to win her over.", ok: 0 }], w: "Looks alone don't earn extra effort. You invest in energy, warmth, and mutual interest. Chasing or bribing signals low value; negativity is never the move." },
  { loc: "frame", s: "She says, \"Lots of guys hit on me.\"", a: [
    { t: "\"Tough life. Well, I'm still deciding if you're interesting, so don't relax yet.\" (smile)", ok: 1 },
    { t: "\"I'm not like other guys, I promise.\"", ok: 0 },
    { t: "\"Wow, that must be so hard.\" (sarcastic, cold)", ok: 0 },
    { t: "\"Of course, you're gorgeous.\"", ok: 0 }], w: "Unimpressed, playful frame-flip. You evaluate her too. Defending yourself or validating her popularity puts her on a pedestal." }
];

const PROMPTS = [
  { scene: "Grocery store: an attractive woman is comparing two wines and glances over at you.", tag: "Grocery", sec: 25, hint: "Situational + put her in the expert role." },
  { scene: "She teases you: \"Do you use that line on everyone?\"", tag: "Test", sec: 20, hint: "Agree & amplify, smile." },
  { scene: "Gym: she's resting between sets, headphones down, catches your eye.", tag: "Gym", sec: 25, hint: "Short, playful observation. Then back to training." },
  { scene: "Café line: she orders confidently and turns around.", tag: "Café", sec: 25, hint: "Playful read on her order." },
  { scene: "Street: a stylish woman walks toward you, makes brief eye contact.", tag: "Street", sec: 30, hint: "Calm, direct, from the front. Slow voice." },
  { scene: "Bar: she's with two friends, laughing loudly. You want to open the group.", tag: "Bar", sec: 30, hint: "Opinion opener, win the friends." },
  { scene: "She asks, \"So what do you do?\" with a bored look.", tag: "Banter", sec: 25, hint: "Playful misdirection first, then the real answer." },
  { scene: "She says: \"You're probably a player.\"", tag: "Test", sec: 20, hint: "Calm amusement. No defending." },
  { scene: "The conversation is great and you have 15 minutes. Invite her for an instant coffee.", tag: "Logistics", sec: 25, hint: "Assume, lead, concrete." },
  { scene: "You need to get her number before you leave. Say it smoothly.", tag: "Logistics", sec: 20, hint: "Phone out, statement, not question." },
  { scene: "Shop: she's holding up a jacket in the mirror, looks unsure.", tag: "Shop", sec: 25, hint: "Honest playful opinion." },
  { scene: "She says: \"Buy me a drink.\" — one minute after meeting.", tag: "Test", sec: 20, hint: "Playful standard." },
  { scene: "Bookstore café: she's reading at a table and looks up.", tag: "Café", sec: 30, hint: "Tease the book." },
  { scene: "She says she's from a small town nobody's heard of.", tag: "Banter", sec: 25, hint: "Playful story assumption." },
  { scene: "On a date: she's nervous and fidgeting. Reassure her while leading.", tag: "Chemistry", sec: 30, hint: "Playful reassurance." },
  { scene: "The bar is loud and she's into you. Lead her to a quieter spot.", tag: "Bar", sec: 20, hint: "Reason + lead." },
  { scene: "She mentions lots of guys hit on her.", tag: "Frame", sec: 25, hint: "Unimpressed frame-flip." },
  { scene: "Water fountain at the gym — you both arrive at the same time.", tag: "Gym", sec: 20, hint: "Situational, generous, short." },
  { scene: "She replies by text: \"Maybe sometime next week?\" Say your reply out loud.", tag: "Logistics", sec: 20, hint: "Two concrete options." },
  { scene: "She says: \"I don't usually date guys like you.\"", tag: "Test", sec: 20, hint: "Unfazed humor." },
  { scene: "Street: she's waiting at a crosswalk, looks relaxed.", tag: "Street", sec: 30, hint: "Observational or direct; ground the moment." },
  { scene: "Supermarket checkout: she's behind you with just a chocolate bar.", tag: "Grocery", sec: 25, hint: "Playful tease, maybe let her go first." },
  { scene: "She compliments your watch.", tag: "Frame", sec: 20, hint: "Accept it, flip back playfully." },
  { scene: "End of a great first date. Close it confidently.", tag: "Chemistry", sec: 30, hint: "Warm statement, lead the hug/kiss." },
  { scene: "Lounge: you catch her eye across the room twice. Walk over and open.", tag: "Bar", sec: 25, hint: "Direct and relaxed." },
  { scene: "She says: \"I have a boyfriend\" — but she's smiling and still talking to you.", tag: "Test", sec: 25, hint: "Stay relaxed, keep it light, respect it." },
  { scene: "She's on her phone while you're talking to her.", tag: "Frame", sec: 20, hint: "Calm boundary — remove your attention." },
  { scene: "Coffee shop: she's laughing at something on her phone.", tag: "Café", sec: 25, hint: "Playful curiosity." },
  { scene: "She asks: \"Why did you come talk to me?\"", tag: "Frame", sec: 20, hint: "Own it, playful challenge." },
  { scene: "Invite her on a first date by text — concrete place and time.", tag: "Logistics", sec: 20, hint: "Callback + plan." },
  { scene: "On a date: she says something flirty. Return it.", tag: "Chemistry", sec: 20, hint: "Eyebrow, smile, tease." },
  { scene: "Farmers' market: she's tasting cheese samples.", tag: "Shop", sec: 25, hint: "Situational playful judgment." },
  { scene: "Gym exit: you've chatted a few times before. Ask her for coffee.", tag: "Gym", sec: 25, hint: "Decisive, light." },
  { scene: "She says: \"You're not my type.\"", tag: "Test", sec: 20, hint: "Perfect — then just have fun." },
  { scene: "Bar: her friend tries to pull her away. Win the friend.", tag: "Bar", sec: 30, hint: "Include the friend, be warm." },
  { scene: "She's 15 minutes late to the date and apologizes.", tag: "Frame", sec: 20, hint: "Relaxed with a playful standard." },
  { scene: "Street: she's lost and looking at a map. Help and open.", tag: "Street", sec: 30, hint: "Helpful then playful." },
  { scene: "Date moving well — propose the next venue.", tag: "Chemistry", sec: 25, hint: "Logical, fun, lead." },
  { scene: "Coffee shop: she's working on a laptop and looks up, stretching.", tag: "Café", sec: 25, hint: "Short opener + 'I'll let you work'." },
  { scene: "She says: \"Impress me.\"", tag: "Test", sec: 20, hint: "Flip it: 'You first.'" }
];

const MISSIONS = [
  "Make eye contact and smile at three attractive women today — hold it two seconds, look away slowly.",
  "Use one situational opener in a shop or café. Outcome doesn't matter — only delivery.",
  "Give one compliment on style or energy (not looks) to a stranger.",
  "Ask a barista or cashier a playful question. Practice light banter with zero stakes.",
  "Speak 20% slower all day. Notice how people lean in.",
  "Start one conversation in a line — café, supermarket, anywhere.",
  "When someone teases you today, agree & amplify with a smile.",
  "Practice the 3-second rule once: see someone interesting, approach within three seconds.",
  "Walk through a busy place with shoulders back, head up, phone away for 10 minutes.",
  "Ask one woman for a recommendation (coffee, wine, book) and banter about it.",
  "If you have a match or number: send one text with a callback + concrete plan.",
  "At the gym, give one friendly nod and smile — build familiarity, no conversation needed.",
  "Hold one pause in a conversation for three seconds without filling it.",
  "Turn one interview question into a playful cold read.",
  "Approach one group and win the friends first — even just for a quick question.",
  "Accept a compliment today with just: 'Thank you — I'll take that.'",
  "Exit a conversation on a high note while it's still fun.",
  "Do one direct opener: 'I saw you and wanted to say hi.' Calm voice, then breathe.",
  "Invite someone (friend or date) to a concrete plan instead of 'sometime'.",
  "Notice green vs. red lights in three interactions today — just observe.",
  "Go to a new café alone. Sit facing the room. Be open to talking."
];

const RESET = [
  { t: "Ground", d: "Feet flat. Three slow breaths: in 4, hold 4, out 6. Drop your shoulders.", s: 15 },
  { t: "Posture", d: "Chest open, chin level, slow eyes. Take up your space — you belong here.", s: 10 },
  { t: "Abundance", d: "Say quietly: 'I have options. I'm here to have fun and meet interesting people. Nobody here is above me — or below me.'", s: 10 },
  { t: "Standards", d: "Recall the three things you screen for: warmth, humor, character. Looks alone don't move you.", s: 10 },
  { t: "Lead", d: "Remember: interest gets a plan. No interest gets a warm exit. Respect every signal.", s: 10 },
  { t: "Go", d: "Smile. Your first interaction within 5 minutes of arriving. Momentum over perfection.", s: 5 }
];

const FILLERS = ["um", "uh", "erm", "like", "you know", "basically", "actually", "literally", "sort of", "kind of", "i mean", "so yeah", "i guess", "maybe", "sorry"];

return { CATS, FRAMES, UPGRADES, LOCATIONS, QUIZ, PROMPTS, MISSIONS, RESET, FILLERS };
})();
