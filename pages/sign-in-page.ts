import { expect, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { HeaderModal } from "../modals/header-modals";
import { SignInModal } from "../modals/sign-in-modal";
import { SignUpModal } from "../modals/sign-up-modal";
import { step } from "../utils/base";


export class SignInPage extends BasePage {

    public signInModal: SignInModal;
    public headerModal: HeaderModal;
    public signUpModal: SignUpModal;

    constructor(page: Page) {
        super(page);
        this.signInModal = new SignInModal(page, "");
        this.headerModal = new HeaderModal(page, "");
        this.signUpModal = new SignUpModal(page, "");

    };

    @step('Checking if username "{expectedName}" is present in the navbar')
    public async checkUserNameInNavbar(expectedName: string): Promise<void> {
        const actualName = await this.signInModal.getUserNameFromNavbar();
        expect(actualName).toBe(expectedName);
    };

    @step('Verifying sign-in error message "{expectedMessage}"')
    public async verifySignInError(expectedMessage: string) {
        const actualMessage = (await this.signUpModal.getErrorMessage()).trim();
        expect(actualMessage).toBe(expectedMessage);
    };


};