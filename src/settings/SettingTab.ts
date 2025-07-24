import { App, PluginSettingTab, Setting, Vault, TFolder } from "obsidian";
import StaticPress from "src/main";
import FileService from "src/services/FileService";
// import { VPAction } from "src/shared/enums";

export default class SettingTab extends PluginSettingTab {

	plugin: StaticPress;
	fileService: FileService;

	constructor(plugin: StaticPress) {
		super(plugin.app, plugin);
		this.plugin = plugin;
		this.fileService = plugin.fileService;
	}

	private createTabHeading() {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.createEl("h2", { text: "StaticPress Settings" });
	}

	private async createRouteInputs() {
		if (this.plugin.settings.routes === null) {
			this.plugin.settings.routes = this.fileService.getVaultFolders();
			console.log(this.plugin.settings.routes);
			await this.plugin.saveSettings();
		}

		const { routes } = this.plugin.settings;

		for (let key in routes) {
			const name = `${(key === "/" ? "Vault Root" : key)}`

			this.containerEl.createEl("h3", { text: name });

			new Setting(this.containerEl)
				.setName("Destination")
				.setTooltip(`Destination for markdown inside ${key}`)
				.setDesc(`Must be an absolute path.`)
				.addText(text => text
					.setPlaceholder("/path/to/your/project")
					.setValue(routes[key].destination)
					.onChange(async (value) => {
						routes[key].destination = value;
						await this.plugin.saveSettings();
					})
				);

			new Setting(this.containerEl)
				.setName("Automatic Slug")
				.addToggle(cb => cb
					.setValue(routes[key].automaticSlug)
					.onChange(async (value) => {
						routes[key].automaticSlug = value;
						await this.plugin.saveSettings();
					})
				);
		}
	}

	display(): void {
		this.createTabHeading();
		this.createRouteInputs();
	}
}