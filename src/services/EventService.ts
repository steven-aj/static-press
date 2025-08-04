import { TAbstractFile } from "obsidian";
import { ISettings } from "src/shared/interfaces";

export default class EventService {

    settings: ISettings;

    constructor(settings: ISettings) {
        this.settings = settings;
    }

    public onFileRenamed(evt: TAbstractFile) {
        // console.log('A file has been renamed: ');
        // console.log(evt);
    }
}