import { App, Modal } from "obsidian";
import { SPModalMessage } from "src/shared/interfaces";


export default class AlertModal extends Modal {

    title: string;
    body: string;
    
    constructor(app: App) {
        super(app);
        this.title = "Error Modal";
        this.body = "This is a generic placeholder for the error modal.";
    }

    public display(errorMessage: SPModalMessage) {
        this.title = errorMessage.title;
        this.body = errorMessage.body;
        this.open();
    }

    onOpen() {
        const {contentEl} = this;
        contentEl.innerHTML = `
            <h2>${this.title}</h2> 
            <p>${this.body}</p>
        `;
    }

    onClose() {
        this.contentEl.empty();
    }
}