import { App, Modal } from "obsidian";
import { ModalMessage } from "src/shared/interfaces";

export default class ConfirmModal extends Modal {

    title: string;
    body: string;

    constructor(app: App) {
        super(app);
        this.title = "Confirm Modal";
        this.body = "This is a generic placeholder for the confirm modal.";
    }

    public display(confirmMessage: ModalMessage) {
        this.title = confirmMessage.title;
        this.body = confirmMessage.body;
        this.open();
    }
}