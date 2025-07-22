import { MarkdownView, Plugin, Platform } from "obsidian";
import { Settings } from "./shared/interfaces";
import FileService from "./services/FileService";
import EventService from "./services/EventService";
import SettingTab from "./settings/SettingTab";

export const DEFAULT_SETTINGS: Settings = {
	projectFolder: "",
	vaultRoutes: [],
	automaticSlugs: false
}

/** ## StaticPress
 * 
 */
export default class StaticPress extends Plugin {

	settings: Settings;
	fileService: FileService;
	eventService: EventService;

	/** ### Initialize Services
	 * 
	 * Initializes all necessary plugin services
	 * 
	 */
	private initServices() {
		this.fileService = new FileService(this.app, this.settings);
		this.eventService = new EventService(this.settings);
	}

	/**### Initialize Commands
	 * 
	 * Adds useful commands for Obsidian's command palette
	 * 
	 */
	private initCommands() {

		if (Platform.isMobile) return;

		// "Validate path" command
		this.addCommand({
			id: "validate-path",
			name: "Validate path",
			editorCallback: this.fileService.validatePath.bind(this)
		});

		// "Push markdown" command
		this.addCommand({
			id: "push-md",
			name: "Push markdown",
			editorCallback: this.fileService.pushFile.bind(this)
		});

		// Pull markdown command
		this.addCommand({
			id: "pull-md",
			name: "Pull markdown",
			editorCheckCallback: this.fileService.pullFile.bind(this)
		});
	}

	/** ### Initialize Ribbon Items
	 * 
	 * Adds StaticPress functionality to Obsidian's ribbon 
	 * 
	 */
	private initRibbonItems(): void {
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);

		if (Platform.isMobile || !view) return;

		// "Push" ribbon item
		this.addRibbonIcon(
			'arrow-up-from-line',
			'Push markdown',
			() => this.fileService.pushFile(view.editor, view)
		);

		// "Pull" ribbon item
		this.addRibbonIcon(
			'arrow-down-from-line',
			'Pull markdown',
			() => this.fileService.pullFile(false, view.editor, view)
		);
	}

	private initEventRegistry() {
		// "On File Renamed"
		this.registerEvent(
			this.app.vault.on('rename', this.eventService.onFileRenamed)
		);

	}

	/** ### Initialize Setting Tab
	 * 
	 * Add a settings tab for in-app configurations
	 * 
	 */
	private initSettingTab() {
		const settingTab = new SettingTab(this.app, this);
		this.addSettingTab(settingTab);
	}

	/** ### Save Settings
	 * 
	 * Saves settings to `data.json`
	 * 
	 */
	async saveSettings() {
		await this.saveData(this.settings);
	}

	/** ### Load Settings
	 * 
	 * Retrieves settings from `data.json`
	 * 
	 */
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	/** ### On Load
	 * 
	 * Mounting hook for Obsidian Plugins. Invokes all initializers.
	 * 
	 */
	async onload() {
		// Load & initialize settings
		await this.loadSettings();
		this.initSettingTab();

		// Initialize plugin features
		this.initServices();
		this.initEventRegistry();
		this.initCommands();
		this.initRibbonItems();
	}

	/** ### On Unload
	 * 
	 * Unmounting hook for Obsidian Plugins.
	 */
	onunload() {}
}