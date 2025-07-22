import { TAbstractFile } from "obsidian";
import { Settings } from "src/shared/interfaces";

export default class EventService {

    settings: Settings;

    constructor(settings: Settings) {
        this.settings = settings;
    }

    public onFileRenamed(evt: TAbstractFile) {
        console.log('A file has been renamed: ');
        console.log(evt);
    }
}