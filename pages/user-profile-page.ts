import { Page } from "@playwright/test";
import { UserProfileModal } from "../modals/user-profile.modal";
import { SignUpModal } from "../modals/sign-up-modal";
import { BasePage } from "./base-page";
import { SignInModal } from "../modals/sign-in-modal";
import { step } from "../utils/base";


export class UserProfilePage extends BasePage {

    public userProfileModal: UserProfileModal;
    public signUpModal: SignUpModal;
    public signInModal: SignInModal;

    constructor(page: Page) {
        super(page);
        this.userProfileModal = new UserProfileModal(page);
        this.signUpModal = new SignUpModal(page, '');
        this.signInModal = new SignInModal (page, '');
    };

    @step('Verifying welcome message in user profile: "{expectedMessage}"')
    public async verifyWelcomeMessageInUserProfile(expectedMessage: string): Promise<void> {
        await this.userProfileModal.getWelcomeMessageText(expectedMessage);
    };

    @step('Fetching past orders from user profile')
    public async getPastOrders(): Promise<{ id: string, bookTitle: string, price: string }[]> {
        return await this.userProfileModal.viewPastOrders();
    };

    @step('Confirming user is logged out from user profile')
    public async confirmUserLoggedOut(): Promise<void> {
        await this.userProfileModal.checkUserLoggedOut();
    };

    
    // public async verifyPastOrdersDisplayed(): Promise<void> {
    //     await this.userProfileModal.verifyPastOrdersDisplayed();
    // };

};
