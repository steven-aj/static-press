# StaticPress

> [!NOTE]
> StaticPress is derived from [Alex Fazio](https://github.com/afazio1)'s original work on [Obsidian Markdown Blogger](https://github.com/afazio1/obsidian-markdown-blogger) and has been heavily modified for a more feature-rich experience. 
> If you prefer a more simple, command-based tooling - please check out and support her work.


![Obsidian Plugin](https://img.shields.io/badge/Obsidian-Plugin-blueviolet)
![Current Version](https://img.shields.io/badge/version-1.0.0-*)
![Linux Compatible](https://img.shields.io/badge/platform-linux-royalblue)
![MacOS Compatible](https://img.shields.io/badge/platform-macos-silver)


**StaticPress** is an [Obsidian](https://obsidian.md) plugin built for users who enjoy managing static-site content from within a vault. It handles pushing markdown files from your vault to a target directory of choice - no fluff, no lock-in, no online service required.

- Define destination paths for each vault folder.
- No versioning, no git magic - just direct overwrite for now.

Built for devs, writers, and tinkerers who want their notes to *be* their site content without fighting their tools.

> [!CAUTION]
> **StaticPress is _not_ currently a version control system**. 
> Files are completely overwritten when pushed

## ✨ Features
### Vault-to-Project Routing

Specify destination paths for each folder within your Vault

### Seamlessly Migrate Content

**Push** your markdown with a single click when you're ready to publish.

### Automatic Slugs

Toggle **automatic slug** generation on a folder-by-folder basis. (ex.: 'Why StaticPress Rocks' -> 'why-staticpress-rocks') 

## :gear: Usage

After enabling the plugin, go to StaticPress' settings.
- Define routing paths for the contents of your vault. **Paths must be absolute**.
- Toggle your preferred settings
- Use StaticPress' convenient _push_ button to move your content to its new home

### :video_game: Command Palette

#### Push Command
Creates or overwrites a file at location `/PROJECT_PATH/<note_name>.md` with the current working document.
- Open a markdown note in editing mode
- Open the command palette and search `push`
- If the **local project folder path** is invalid or does not exist, the note will not be pushed

## :heart: Support Development

If this project is useful to you, consider supporting it!

<a href="https://www.buymeacoffee.com/steven.aj" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a> 

[:heart: Become a GitHub Sponsor](https://github.com/sponsors/steven-aj)
