import { App, PluginSettingTab, Setting, Vault, TFolder } from "obsidian";
import RoutesController from "src/controllers/routes.controller";
import StaticPress from "src/main";
import FileService from "src/services/FileService";
import { FolderSetting } from "src/shared/interfaces";
// import { VPAction } from "src/shared/enums";

export default class SettingTab extends PluginSettingTab {

	plugin: StaticPress;
	fileService: FileService;
	selectedDir: string;
	routes: RoutesController;

	constructor(plugin: StaticPress) {
		super(plugin.app, plugin);
		this.plugin = plugin;
		this.routes = new RoutesController(plugin);
		this.fileService = plugin.fileService;
		this.selectedDir = "/";
	}

	private createTabHeading() {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.createEl("h2", { text: "StaticPress" });
	}

	private async cleanRoutes() {
		let folders = this.fileService.getVaultFolders();

		// remove non-existant routes
		if (this.routes.keys.length) {
			this.routes.keys.forEach(key => {
				if (!folders.some(path => (path === key))) {
					this.routes.removeRoute(key);
				}
			})
		}

		// populate routes
		folders.forEach(path => {
			if (!this.routes.containsRoute(path)) {
				this.routes.addRoute(path);
			}
		});
	}

	private toggleControls(key: string) {
		let controls = document.querySelectorAll('div.setting-item');

		controls.forEach((control: HTMLElement) => {
			if (control.classList.contains(key) && !control.classList.contains("directory")) {
				control.style.display = "";
			}

			if (!control.classList.contains(key) && !control.classList.contains("directory")) {
				console.log("key not found");
				control.style.display = "none";
			}
		})
	}

	private async initDirectoryList() {
		const { routes } = this.plugin.settings;
		new Setting(this.containerEl)
			.setName("Directory")
			.setClass("directory")
			.setHeading()
			.addDropdown((dropdown) => {
				for (let key in routes) {
					dropdown
						.addOption(key, routes[key].source)
						.onChange(async (value) => {
							this.selectedDir = value;
							this.toggleControls(value);
						});
				}
			});
	}

	private initDestinationInput() {
		const { routes } = this.plugin.settings;

		this.routes.keys.forEach((key, index) =>
			new Setting(this.containerEl)
				.setName(`Destination`)
				.setClass(`${key}`)
				.setTooltip(`Destination for markdown inside <src path>`)
				.setDesc(`Must be an absolute path.`)
				.addText(text => text
					.setPlaceholder("/path/to/your/project")
					.setValue(routes[key].destination)
					.onChange(async (value) => {
						routes[key].destination = value;
						await this.plugin.saveSettings();
					})
				).settingEl.toggle(index === 0 ? true : false)
		);

	}

	private initAutomaticSlugToggle() {
		const { routes } = this.plugin.settings;

		this.routes.keys.forEach((key, index) =>
			new Setting(this.containerEl)
				.setName("Automatic slug")
				.setClass(`${key}`)
				.addToggle(cb => cb
					.setValue(routes[key].automaticSlug)
					.onChange(async (value) => {
						routes[key].automaticSlug = value;
						await this.plugin.saveSettings();
					})
			).settingEl.toggle(index === 0 ? true : false)
		)
	}

	display(): void {
		this.cleanRoutes();

		this.createTabHeading();
		this.initDirectoryList();
		this.initDestinationInput();
		this.initAutomaticSlugToggle();
	}
}