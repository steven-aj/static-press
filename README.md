# StaticPress

> [!IMPORTANT]
> This plugin is in on-going development.

**StaticPress** is an [Obsidian](https://obsidian.md) plugin built for users who enjoy managing static-site content from within a vault. It handles pushing and pulling markdown files between your vault and a target directory of your choice — no fluff, no lock-in, no online service required.

- Define push paths per folder. 
- Sync raw markdown back and forth. 
- No versioning, no git magic — just direct overwrite for now.

Built for devs, writers, and tinkerers who want their notes to *be* their site content without fighting their tools.

> [!CAUTION]
> **StaticPress is not a version control system**. Files are completely overwritten when pushed or pulled.

## Features
- **Configure Routing** between your vault and your local project
- **Push** a vault document to a local project folder (Obsidian -> Project)
- **Pull** content from a local project file to your vault (Obsidian <- Project)

## Usage
After enabling the plugin, go to StaticPress' settings.
- Set routing paths for the contents of your vault. **Paths must be absolute**.
- Toggle your preferred settings
- Use StaticPress' *Push* and *Pull* buttons to move your content between directories

### Command Palette

#### Push Command
Creates or overwrites a file at location `/PROJECT_PATH/<note_name>.md` with the current note's markdown content.
- Open a markdown note in editing mode
- Open the command palette and search "push"
- If the **Local project folder path** is invalid or does not exist, the note will not be pushed

#### Pull Command 
Overwrites the current note's markdown content with the file content at location `/PROJECT_PATH/<note_name>.md`
- Open a markdown note in editing mode
- Open the command palette and search "pull"
- If the file at location `/PROJECT_PATH/<note_name>.md` is invalid or does not exist, the content will not be pulled

#### Validate Path
Validates the **Local project folder path** currently in settings.
- Open the command palette and search "Validate Path command"
- A message indicating the validity of the path will be displayed 

## Support Development

If this project is useful to you, consider supporting it!

<a href="https://www.buymeacoffee.com/steven.aj" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
