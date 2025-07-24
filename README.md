# StaticPress

> [!NOTE]
> StaticPress is derived from [Alex Fazio](https://github.com/afazio1)'s original work on [Obsidian Markdown Blogger](https://github.com/afazio1/obsidian-markdown-blogger) and has been heavily modified for a more feature-rich experience. 
> If you prefer a more simple, command-based tooling - please check out and support her work.

**StaticPress** is an [Obsidian](https://obsidian.md) plugin built for users who enjoy managing static-site content from within a vault. It handles pushing and pulling markdown files between your vault and a target directory of choice - no fluff, no lock-in, no online service required.

- Define destination paths for each vault folder. 
- Sync raw markdown back and forth. 
- No versioning, no git magic - just direct overwrite for now.

Built for devs, writers, and tinkerers who want their notes to *be* their site content without fighting their tools.

> [!CAUTION]
> **StaticPress is _not_ currently a version control system**. 
> Files are completely overwritten when pushed or pulled.

## ✨ Features
### Vault-to-Project Routing

Push documents to specified paths on a folder-by-folder basis.

### Seamlessly Migrate Content

**Push** your markdown to a local project folder  when you're ready to publish. (Obsidian :arrow_right: Project)

**Pull** changes made outside of the vault into your workspace. (Obsidian :arrow_left: Project)

## :gear: Usage

After enabling the plugin, go to StaticPress' settings.
- Define routing paths for the contents of your vault. **Paths must be absolute**.
- Toggle your preferred settings
- Use StaticPress' *Push* and *Pull* buttons to move your content between directories

### :video_game: Command Palette

#### Push Command
Creates or overwrites a file at location `/PROJECT_PATH/<note_name>.md` with the current working document.
- Open a markdown note in editing mode
- Open the command palette and search `push`
- If the **Local project folder path** is invalid or does not exist, the note will not be pushed

#### Pull Command 
Overwrites the working document's content with the file content at location `/PROJECT_PATH/<note_name>.md`
- Open a markdown note in editing mode
- Open the command palette and search `pull`
- If the file at location `/PROJECT_PATH/<note_name>.md` is invalid or does not exist, the content will not be pulled

#### Validate Path
Validates the **Local project folder path** currently in settings.
- Open the command palette and search `validate`
- A message indicating the validity of the path will be displayed 

## :heart: Support Development

If this project is useful to you, consider supporting it!

<a href="https://www.buymeacoffee.com/steven.aj" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a> 

[:heart: Become a GitHub Sponsor](https://github.com/sponsors/steven-aj)
