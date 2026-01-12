---
title: Using AI
parent: For Developers
---

# Making Mods with AI

AI tools are increasingly used in modding workflows. They can help with boilerplate, explain unfamiliar APIs, assist with debugging and help newer developers learn if asked. **They do not remove licensing obligations** and they do not make code safe to reuse by default.

If you ship the code, _you_ own the consequences.

## Responsibility and licensing

Using AI does not change how licenses apply.

If AI output is materially similar to existing licensed code, the license still applies. The fact that the code was generated rather than copied does not matter.
Remember that referencing other's code to make your own can trigger it becoming a 'derived work' and neccessitate following license.

AI tools do not track where code comes from, what license applies, or whether attribution is required. That is on you.

## Usage Guidelines

Do not blindly trust that the code will do what the AI claims. AI will often create empty classes or "placeholder" information, make up prefabguids, cause crashes and it can cause leaks or expensive loops. Ask for explanations or approaches instead of copying example code.
Feature inspiration is fine. If the output could be diffed against an existing mod and show strong similarities, it should not be used without following license. Credit is easy and generates a collaborative community! AI are pretty good for readme's, but you still need to review and edit it. It can often make hyperbolic claims, use vague language, or restate the same features a ton.

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
* Credit and follow the lisence of any other existing work you used/referenced.
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
