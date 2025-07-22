/**
 * User-defined settings for StaticPress
 */
export interface Settings {
	projectFolder: string;
	vaultRoutes: PathRegistry[];
	automaticSlugs: boolean;
}

/**
 * 
 */
export interface PathRegistry {
	vaultPath: string;
	destinationPath: string;
}

/**
 * Structure of modal content
 */
export interface ModalMessage {
	title: string;
	body: string;
}