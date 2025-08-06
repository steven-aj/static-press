/**
 * 
 */
export interface FolderSetting {
	source: string;
	destination: string;
	automaticSlug: boolean;
}

/**
 * User-defined settings for StaticPress
 */
export interface ISettings {
	projectFolder: string;
	routes: Record<string, FolderSetting>;
	automaticSlugs: boolean;
}

/**
 * Structure of modal content
 */
export interface ModalMessage {
	title: string;
	body: string;
}