import { Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { SignUpModal } from "../modals/sign-up-modal";
import { SignInModal } from "../modals/sign-in-modal";
import { step } from "../utils/base";


export class SignUpPage extends BasePage {

    public signUpModal: SignUpModal;
    public signInModal: SignInModal
    
    constructor(page: Page) {
        super(page);
        this.signUpModal = new SignUpModal(page, '');
        this.signInModal = new SignInModal(page, '');
    };


    @step('Verifying sign-up error message "{expectedMessage}"')
    public async verifySignUpError(expectedMessage: string) {
        await this.signUpModal.verifyErrorMessage(expectedMessage);
    };
};