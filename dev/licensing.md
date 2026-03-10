---
title: Licensing & Attribution
---

# Licensing & Attribution

This page covers the community's expectations around open-source licenses, how to properly credit the work of others, and what to do when building on top of existing mods.

## Open-Source Requirement

All mods in this community must be **open source**. This means the full source code must be publicly available in a repository (e.g. GitHub) so that other community members can read, learn from, and verify it.

This is not just a courtesy; it is a condition of participation in this community. See [Community Values](/community/values) for the reasoning behind this policy.

## Choosing a License

You must include a license file in your repository. Without one, the default copyright law applies and nobody can legally reuse your code. Common choices:

| License | Allows reuse? | Requires attribution? | Requires open source derivatives? |
|---|---|---|---|
| **MIT** | ✅ Yes | ✅ Yes | ❌ No |
| **Apache 2.0** | ✅ Yes | ✅ Yes | ❌ No |
| **LGPL v3** | ✅ Yes | ✅ Yes | ⚠️ Partial |
| **GPL v3** | ✅ Yes | ✅ Yes | ✅ Yes |
| **AGPL v3** | ✅ Yes | ✅ Yes | ✅ Yes (includes network use) |

**MIT** is the most common choice in this community. It is permissive and easy to understand.

**GPL v3** ensures that anyone who builds on your mod must also release their code under the same terms.

**AGPL v3** goes further: it extends the copyleft requirement to software run over a network. If you want to ensure your code stays open even when used in server-side tools or services without direct distribution, AGPL v3 is the appropriate choice.

Whatever you choose, add a `LICENSE` file to the root of your repository.

## Attributing Other Mods

If your mod directly incorporates code, logic, or assets from another mod:

1. **Check the license first.** Not all open-source licenses allow all forms of reuse. GPL code in a non-GPL project is a license violation.
2. **Credit the original author** in your `README.md`, clearly stating what you used and who wrote it.
3. **Link to the original repository.**
4. **Respect any additional conditions** the author has placed on use (e.g. asking to be contacted before forking).

Example README attribution block:

```md
## Credits
- [OriginalMod](https://github.com/author/originalmod) by AuthorName - portions of the damage calculation logic are adapted from this project (MIT licence).
```

## Forking a Mod

Forking (copying a repo to modify and publish separately) is generally acceptable when:

- The license permits it (MIT, Apache, GPL all do)
- You give clear credit to the original author
- Your fork has a **distinct name** so players do not confuse it with the original
- You do not claim to be the original author

If the original mod is still actively maintained, consider opening a pull request instead of forking.

For abandoned mods specifically, see the [Abandoned Mods](/community/abandoned-mods) policy.

## Framework & Library Attribution

Several community frameworks are widely used. If your mod depends on them, include them in your credits and dependencies:

- **BepInEx** - the core modding framework. [MIT licence.](https://github.com/BepInEx/BepInEx/blob/master/LICENSE)
- **VCF (Vampire Command Framework)** - if your mod adds commands via VCF, note this in your documentation.

Always link to the dependency's Thunderstore or GitHub page so users know what they are installing.

## Thunderstore Manifest

Your `manifest.json` on Thunderstore should accurately list all mod dependencies. This is both a technical requirement (so mod managers can resolve them) and a form of attribution; it tells users and other developers what your mod builds on.

## Content from Other Games or Media

Do not include assets (textures, audio, text, etc.) from other games or copyrighted media in your mod without explicit permission from the rights holder. V Rising mods are not exempt from general copyright law.

## Questions

If you are unsure whether a particular use is appropriate, ask in the [Discord](https://vrisingmods.com/discord) before publishing.
