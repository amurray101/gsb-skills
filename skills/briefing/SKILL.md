---
name: briefing
description: Generate a one-screen weekday morning briefing — weather (so you know how to dress), today's calendar with any prep, urgent unreplied messages from the last 12 hours, and the one thing to tackle first. Plain markdown, under 300 words, no greeting or signoff. Use when you ask for today's briefing, daily summary, or what's happening today.
---

# Morning Briefing

Give me a one-screen morning briefing I can read in 30 seconds before my day starts, so I don't have to open five apps.

## Output

Produce a plain markdown summary:

- Under 300 words.
- No greeting, no signoff.
- Readable in 30 seconds.

Cover:

- **Weather** — what it's doing today, framed so I know how to dress.
- **Calendar** — what's on my schedule today, including any prep I'll need.
- **Urgent messages** — anything from the last 12 hours that looks urgent and hasn't been replied to.
- **Top priority** — the one thing I should probably tackle first.
- **Word of the day** — pull from today's Word Genius email (`mail@wordgenius.com`) in Gmail. Search with `in:anywhere` and `includeTrash: true` — the email often lands in Promotions/Spam and a default search will miss it. Include the word, its part of speech, and a short definition. If no email arrived today, omit the section.

Runs every weekday at 7:30am.

## Success criteria

- I read it once and know what my day looks like.
- I know how to dress based on the weather.
- I don't have to open Slack or Gmail to feel caught up.

## Guardrails

- Never include contents from channels marked private or sensitive.
- Don't pull from personal email — work only.
- If a data source is unavailable, say so explicitly. Never fabricate.
