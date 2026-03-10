---
title: Using AI
parent: For Developers
---

# Making Mods with AI

AI tools are increasingly used in modding workflows. They can help with boilerplate, explain unfamiliar APIs, assist with debugging and help newer developers learn if asked. **They do not remove [licensing obligations](/dev/licensing)** and they do not make code safe to reuse by default.

If you ship the code, _you_ own the consequences.

::: danger Test your mod. Do not publish AI slop.
The community expects working, tested mods. AI-generated code that has not been reviewed and verified is not ready to publish.

Do not release a mod you cannot explain, have not tested, or built entirely by prompting an AI and hitting upload. Low-effort AI releases that break servers, crash clients, or duplicate existing mods without meaningful contribution are not welcome here.

**Publish when it works. Not when the AI says it should.**
:::

## Responsibility and licensing

Using AI does not change how licenses apply.

If AI output is materially similar to existing licensed code, the license still applies. The fact that the code was generated rather than copied does not matter.
Remember that referencing other's code to make your own can trigger it becoming a 'derived work' and necessitate following that license. See [Licensing & Attribution](/dev/licensing) for practical guidance.

AI tools do not track where code comes from, what license applies, or whether attribution is required. That is on you.

## Usage Guidelines

Do not blindly trust that the code will do what the AI claims. AI will often create empty classes or "placeholder" information, make up prefabguids, cause crashes and it can cause leaks or expensive loops. Ask for explanations or approaches instead of copying example code.
Feature inspiration is fine. If the output could be diffed against an existing mod and show strong similarities, it should not be used without following that mod's license. Credit is easy and generates a [collaborative community](/community/values)! AI tools are reasonably good for READMEs, but you still need to review and edit the output; they often make hyperbolic claims, use vague language, or restate the same features repeatedly.

## Do’s and Don’ts

Don't:

* Paste large blocks of licensed code into prompts.
* Ask an AI to recreate or extend a specific mod or repository.
* Request “the same thing but rewritten”.
* Accept large structured outputs without understanding them.
* Ship code you cannot explain line by line.
* Use vague language when directing the AI. Your output is only as good as your question.

Do:

* Use AI for explanations or debugging help.
* Ask for algorithmic guidance rather than full implementations.
* Generate small utilities you fully understand.
* Rewrite and restructure output before using it.
* Credit and follow the [license](/dev/licensing) of any other existing work you used or referenced.
* Thoroughly test any mod you make! Don't believe the AI.

## Common AI tools

### [ChatGPT](https://chatgpt.com/)

**Pros**

* Good at explaining APIs and systems.
* Useful for refactoring and debugging discussion.
* Strong at architectural reasoning.

**Cons**

* Can hallucinate APIs or behavior quickly.
* Does not track licensing or provenance.
* Requires active review.

**Good for:**

* Learning, debugging, design discussion.

---

### [Claude Code](https://code.claude.com/docs/en/overview)

**Pros**

* Handles long context well.
* Good at structured analysis and review.
* More cautious about emitting large blocks of code.
* Can look at whole projects easier.

**Cons**

* Can be verbose.
* Less precise with engine-specific or niche APIs (like ours).
* If you grant access to a repo that isn't saved out (recommend git for easy reverting), it can quickly break the mod as much as fix it.

**Good for:**

* Reviewing code, summarizing systems, reasoning about changes.


---

### GitHub Copilot (built in Visual Studio)

**Pros**

* Fast inline suggestions.
* Useful for repetitive or well-understood patterns.
* IDE integration.

**Cons**

* Higher risk of near-verbatim reproduction.
* Encourages passive acceptance of output.
* No visibility into source similarity or licensing.
* Long blocks often contain nonsense.

**Good for/Avoid:**

* Trivial or boilerplate code you already understand.
* Avoid for core logic or distinctive systems.

---

### [Cursor](https://cursor.com/)

**Pros**

* AI deeply integrated into the editor; chat, inline edits, and agentic mode in one place.
* Codebase-aware context makes suggestions more relevant than standalone chat tools.
* Supports multiple underlying models (GPT-4, Claude, etc.).

**Cons**

* Agentic mode (Composer) can make broad changes quickly; easy to accept too much.
* Still hallucinates APIs and game-specific behavior.
* Encourages passive acceptance of inline suggestions.

**Good for/Avoid:**

* IDE-integrated assistance, refactoring with full project context.
* Avoid letting it make large multi-file changes without reviewing each one.
