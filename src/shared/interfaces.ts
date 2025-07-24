/**
 * 
 */
export interface RouteSetting {
	destination: string;
	automaticSlug: boolean;
}

/**
 * User-defined settings for StaticPress
 */
export interface Settings {
	projectFolder: string;
	routes: Record<string, RouteSetting>|null;
	automaticSlugs: boolean;
}

/**
 * Structure of modal content
 */
export interface ModalMessage {
	title: string;
	body: string;
}