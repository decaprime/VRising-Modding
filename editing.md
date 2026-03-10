---
title: Contributing to the Wiki
aside: false
---

# Contributing to the Wiki

This wiki is built with Markdown and hosted on GitHub. Contributions of all kinds are welcome: fixing typos, improving guides, or adding new content.

**Don't let worry about format or correctness stop you.** There's a review process and everything can be undone. If you've never used GitHub before, this is a great chance to get started.

## Editing an existing page

Every page has an **Edit this page on GitHub** link at the bottom. Click it to open the file directly in GitHub's editor.

1. Make your changes in Markdown
2. Scroll down and choose **Create a new branch** and start a pull request
3. Submit the pull request; a maintainer will review and merge it

## Adding a new page

1. Navigate to the correct folder in the [GitHub repository](https://github.com/decaprime/vrising-modding) (e.g. `user/` for user guides, `dev/` for developer docs)
2. Click **Add file > Create new file**
3. Name your file (e.g. `my-guide.md`)
4. Add frontmatter at the top:

```yaml
---
title: My Guide Title
---
```

5. Write your content in Markdown below the frontmatter
6. Scroll down and open a pull request

To have the page appear in the sidebar, let a maintainer know in your PR or on [Discord](https://vrisingmods.com/discord). Sidebar entries are managed in `.vitepress/config.mjs`.

## Including screenshots

You can paste images directly into the GitHub Markdown editor and it will upload them automatically. Please crop images to the relevant area before pasting:

- **Windows:** `Win+Shift+S` (Snipping Tool) or `Alt+Print Screen` (active window)
- **Mac:** `Cmd+Shift+4` (selection) or `Cmd+Shift+4` then `Space` (window)
