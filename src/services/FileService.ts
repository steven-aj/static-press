import { App, Editor, MarkdownView, Notice } from "obsidian";
import { ModalMessage, Settings } from "../shared/interfaces";
import ConfirmModal from "src/modals/ConfirmModal";
import ErrorModal from "../modals/AlertModal";
import * as path from "path";
import * as fs from "fs";

const INVALID_PATH: ModalMessage = {
    title: "Invalid Path",
    body: "StaticPress could not find the target folder. Please create the path or update the current path in StaticPress Settings"
}

export default class FileService {

    confirmModal: ConfirmModal;
    errorModal: ErrorModal;

    constructor(private app: App, private settings: Settings) {
        this.confirmModal = new ConfirmModal(app);
        this.errorModal = new ErrorModal(app);
    }

    /**
     * ## Validate Path
     * 
     * Validates the path entered in Settings.
     * 
     * If it doesn't exist, alerts the user. Otherwise, toasts validation. 
     */
    public async validatePath(): Promise<void> {
        if (!fs.existsSync(this.settings.projectFolder)) {
            this.errorModal.display(INVALID_PATH);
            // new ErrorModal(this.app).open();
            return;
        }

        new Notice(`Valid path: ${this.settings.projectFolder}`);
    }

    /** 
     * ## Push File
     * 
     * Verifies the directory specified within Settings. 
     * 
     * If the directory exists, overwrites any markdown files that match 
     * the working file's name within it.
     * 
     * Otherwise, displays an error modal.
     * 
     * ---
     *  
     * @param editor - CodeMirror's Editor
     * @param view - Instance of the MarkdownView
     */
    public pushFile(editor: Editor, view: MarkdownView): void {
        const { projectFolder } = this.settings;

        if (!view) return;

        if (!fs.existsSync(projectFolder)) {
            this.errorModal.display(INVALID_PATH);
            return;
        }

        const targetPath = path.resolve(projectFolder, view.file.name);
        const content = view.editor.getDoc().getValue();

        try {
            fs.writeFileSync(`${targetPath}`, content, { encoding: "utf8" });
            new Notice(`"${view.file.name}" has been pushed to '${targetPath}'`);
        } catch (err) {
            new Notice(err.message);
        }
    }

    /** 
     * ## Pull File
     * 
     * Verifies the directory specified within Settings. 
     * 
     * If the directory exists, overwrites the current working file with a file
     * of the same name within it.
     * 
     * @param checking - Required for `editorCheckCallback`
     * @param editor - CodeMirror's Editor
     * @param view - Instance of the MarkdownView
     */
    public pullFile(checking: boolean, editor: Editor, view: MarkdownView): void {
        const projectBlogPath = path.resolve(this.settings.projectFolder, view.file.name);

        if (!fs.existsSync(projectBlogPath)) {
            this.errorModal.display(INVALID_PATH);
            return;
        }

        if (!checking) {
            try {
                const file = fs.readFileSync(projectBlogPath, "utf8");

                editor.getDoc().setValue(file);

                new Notice(`"${view.file.name}" has been pulled from '${projectBlogPath}'`);
            } catch (err) {
                new Notice(err.message);
            }
        }
    }
}