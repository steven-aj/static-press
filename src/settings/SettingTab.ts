import { App, PluginSettingTab, Setting, Vault, TFolder } from "obsidian";
import StaticPress from "src/main";
// import { VPAction } from "src/shared/enums";

export default class SettingTab extends PluginSettingTab {

	plugin: StaticPress;

	constructor(app: App, plugin: StaticPress) {
		super(app, plugin);
		this.plugin = plugin;
	}

	private addTabHeading() {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.createEl("h2", { text: "StaticPress Settings" });
	}

	private addFolderPathInput() { // TODO: deprecate this
		new Setting(this.containerEl)
			.setName("Original Directory Setting")
			.setDesc("The local directory to push and pull files to and from. Must be an absolute path.")
			.addText(text => text
				.setPlaceholder("/home/user/blog/posts")
				.setValue(this.plugin.settings.projectFolder)
				.onChange(async (value) => {
					this.plugin.settings.projectFolder = value;
					await this.plugin.saveSettings();
				})
			);
	}

	private addAutomaticSlugToggle() {
		new Setting(this.containerEl)
			.setName("Automatic Slugs")
			.setDesc("Renames pushed files to a slug-friendly format (ex: 'StaticPress Rocks' -> 'staticpress-rocks').")
			.addToggle(cb => cb
				.setValue(this.plugin.settings.automaticSlugs)
				.onChange(async (value) => {
					this.plugin.settings.automaticSlugs = value;
					await this.plugin.saveSettings();
				})
			);
	}

	display(): void {
		this.addTabHeading();
		// this.addFilePicker();
		
		// this.containerEl.createEl("h3", { text: "Command Palette Tools" });
		this.addAutomaticSlugToggle();
		
		this.containerEl.createEl("h3", { text: "Vault Routes" });
		
		this.addFolderPathInput(); // TODO: deprecate this
		
		Vault.recurseChildren(app.vault.getRoot(), (item) => {
			if (item instanceof TFolder) {
				new Setting(this.containerEl)
					.setName(item.name ? item.name : "Vault Root")
					.setDesc("Must be an absolute path.")
					.addText(text => text
						.setPlaceholder("/home/user/blog/posts")
						.setValue(this.plugin.settings.projectFolder)
						.onChange(async (value) => {
							// TODO: save the vault/target pair
							// this.plugin.settings.pipelines = value;
							// await this.plugin.saveSettings();
						})
					);
			}
		});
	}
}