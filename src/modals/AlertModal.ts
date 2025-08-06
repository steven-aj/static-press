import { App, Modal } from "obsidian";
import { ModalMessage } from "src/shared/interfaces";


export default class AlertModal extends Modal {

    title: string;
    body: string;
    
    constructor(app: App) {
        super(app);
        this.title = "Error Modal";
        this.body = "This is a generic placeholder for the error modal.";
    }

    public display(errorMessage: ModalMessage) {
        this.title = errorMessage.title;
        this.body = errorMessage.body;
        this.open();
    }

    onOpen() {
        const {contentEl} = this;
        contentEl.createEl("h2", { text: this.title });
        contentEl.createEl("p", { text: this.body });
    }

    onClose() {
        this.contentEl.empty();
    }
}