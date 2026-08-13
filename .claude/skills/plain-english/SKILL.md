---
name: plain-english
description: >-
  House writing standard for clear, plain prose, built on Strunk and White's
  The Elements of Style and George Orwell's "Politics and the English Language."
  Use it to strip the tells that make writing read as AI- or Claude-generated:
  the em dash used as a tic, words like delve, leverage, and robust, rule-of-three
  padding, the "not just X, but Y" antithesis, reflexive hedging, and filler
  transitions like Moreover and In conclusion. Trigger this skill WHENEVER you
  write or edit prose a person will read: READMEs, documentation, website and
  marketing copy, essays, blog posts, release notes, changelogs, pull-request and
  commit descriptions, emails, and user-facing UI text, even when the user never
  says "edit," "proofread," or "style." Run it once before you draft and again as
  a cleanup pass over what you wrote. Do not trigger for code logic, numeric data,
  or configuration files.
---

# Plain English

Good prose sounds like a specific person made specific choices. Machine-generated
prose sounds like the average of everything ever written: smooth, padded, and
forgettable. This skill exists to close that gap. It is built on two of the most
recognized guides to plain English, and it adds a modern layer: a list of the
habits that now mark writing as AI-generated, so you can cut them on sight.

The goal is not to follow rules for their own sake. It is to make writing easier
to read and harder to ignore. When a rule below would make a sentence worse, break
it. That is Orwell's last rule, and it governs all the others.

## The two foundations

**Strunk and White, The Elements of Style.** Four principles do most of the work:

- Omit needless words. Every word should carry weight. If a sentence still means
  the same thing with a word removed, remove it.
- Use the active voice. "The committee rejected the proposal" beats "The proposal
  was rejected by the committee." The actor comes first and the sentence gets
  shorter.
- Use definite, specific, concrete language. Prefer "it rained for three days" to
  "the weather was unfavorable." Concrete nouns and strong verbs carry meaning;
  adjectives and adverbs usually pad it.
- Put statements in positive form. Say what is, not what is not. "He was late"
  beats "He was not on time."

**Orwell's six rules**, from "Politics and the English Language":

1. Never use a metaphor, simile, or figure of speech you are used to seeing in print.
2. Never use a long word where a short one will do.
3. If it is possible to cut a word out, always cut it out.
4. Never use the passive where you can use the active.
5. Never use a foreign phrase, a scientific word, or a jargon word if you can think
   of an everyday English equivalent.
6. Break any of these rules sooner than say anything outright barbarous.

## How to apply it

Writing is two jobs, and they fight each other, so do them separately.

1. **Draft to get the meaning down.** Do not self-edit here.
2. **Cut.** Read what you wrote and delete. Aim to lose ten to twenty percent of the
   words without losing meaning. Most of what you cut will be throat-clearing at the
   start of sentences and hedges in the middle.
3. **Read it aloud, or imagine doing so.** Anything you would not say to a colleague,
   rewrite. This single test catches most of the tells below.

When editing someone else's text, or your own earlier draft, do a dedicated pass
that hunts the patterns in the next section. Preserve the author's voice and
argument. You are removing tics, not rewriting their thinking.

## The tells: what to cut

These patterns are not wrong in isolation. They are overused defaults. One of them
is a coincidence; three in a paragraph is a signature. Learn to see them.

### Punctuation: the em dash

The em dash used as a rhythmic tic is now the single strongest sign of AI text.
Cut it. A dash can almost always become a period, a comma, a colon, or a pair of
parentheses, and the sentence reads calmer for it.

- Before: The model was fast — faster than anyone expected — and cheap.
- After: The model was fast, faster than anyone expected, and cheap.
- Before: There is one rule — write clearly.
- After: There is one rule: write clearly.

If a document truly needs a dash for a sharp aside, one is fine. A dash in every
third sentence is the tic.

### Words to replace

Prefer the plain word on the right. These inflate register without adding meaning.

| Reach for this instead of | ... this |
| --- | --- |
| use | leverage, utilize, harness |
| explore, look at, cover | delve into, dive into, dig into, unpack |
| show, prove | showcase, underscore, highlight, is a testament to |
| strong, solid, reliable | robust, powerful, seamless, cutting-edge, state-of-the-art |
| has | boasts |
| lets you, helps you | empowers you, enables you to, unlocks |
| improve, add to | elevate, supercharge, take it to the next level |
| area, field, world | landscape, realm, tapestry, ecosystem, space |
| to | in order to |
| plain nouns | game-changer, silver bullet, one-stop shop |

Also cut the empty intensifiers that pretend to add force: very, really,
significantly, notably, critically, remarkably, incredibly, truly. If the noun or
verb needs a booster, pick a stronger noun or verb.

### Constructions to break

- **The rule-of-three padding.** "Fast, reliable, and scalable." "It is clear,
  concise, and compelling." Three is a rhythm the model reaches for on autopilot.
  Keep the items that carry information, drop the ones added for cadence. Often one
  precise word beats three vague ones.
- **The "not just X, but Y" antithesis.** "This isn't just a tool, it's a
  revolution." "It's not about the code; it's about the people." The construction
  promises depth and delivers a slogan. State the actual claim instead.
- **"Whether you're a X or a Y."** "Whether you're a beginner or an expert, this
  guide has you covered." Name the reader once, or drop the framing.
- **"Not only ... but also."** Usually two clauses joined by "and" say it better.
- **Vague abstraction as filler.** things, aspects, elements, factors, solutions,
  capabilities. Replace with the specific thing you mean, or cut the sentence.

### Hedging to delete

Confidence reads as competence. These phrases apologize for the sentence before it
arrives. Delete them and let the claim stand.

it is worth noting that, it is important to note, it should be mentioned, arguably,
generally speaking, in many ways, to some extent, in some sense, that said, at the
end of the day, when it comes to.

- Before: It is worth noting that the API is, generally speaking, fairly fast.
- After: The API is fast.

If a claim genuinely needs a caveat, give the specific caveat ("fast for reads,
slower for writes"), not a vague hedge.

### Filler transitions

Empty connectors that add a beat but no logic. Cut them or replace with the real
relationship between the ideas.

Moreover, Furthermore, Additionally, In addition, In conclusion, Overall,
Ultimately, That being said, It goes without saying, Needless to say, As we all
know, In today's fast-paced world, In the ever-evolving landscape of.

Good writing usually needs fewer transitions than you think. If two sentences follow
each other logically, the reader feels the link without a signpost.

### Openers and closers to drop

In chat and in docs, cut the social packaging around the substance.

- Openers: "Certainly!", "Great question!", "Absolutely!", "I'd be happy to help
  with that." Start with the answer.
- Closers: "I hope this helps!", "Let me know if you have any questions!", "Feel
  free to reach out." End when the content ends.
- Manufactured suspense: "Here's the thing:", "The truth is,", "Let's be honest,",
  "But here's where it gets interesting." Just say the thing.

### Formatting tics

- Do not bold half the words in a paragraph. Bold marks the one phrase that matters,
  or nothing.
- Do not put every noun phrase in Title Case. Sentence case for headings unless the
  house style says otherwise.
- Do not add emoji to prose unless the user asked for them or the medium clearly
  wants them.
- Do not turn every sentence into a bulleted list. Prose is for arguments that flow;
  lists are for items that are genuinely parallel.

## A worked example

Before, dense with tells:

> In today's rapidly evolving landscape, it's worth noting that our robust,
> cutting-edge platform doesn't just streamline your workflow — it empowers your
> team to unlock their full potential. Whether you're a startup or an enterprise,
> we've got you covered.

After, plain:

> Our platform makes your team's work faster. It suits a two-person startup and a
> thousand-person company equally.

The second version is shorter, makes a concrete claim, and could have been written
by a person who knew what they wanted to say.

## The one-line test

Before you finish, reread the draft and ask of each sentence: would a sharp,
busy colleague respect this, or skim past it? Cut whatever they would skim. What
remains is the writing worth keeping.
