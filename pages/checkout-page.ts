import { Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { CheckoutModal } from "../modals/checkout-modal";
import { UserProfileModal } from "../modals/user-profile.modal";

export class CheckoutPage extends BasePage {

    public checkoutModal: CheckoutModal;
    public userProfileModal: UserProfileModal;

    constructor(page: Page) {
        super(page);
        this.checkoutModal = new CheckoutModal(page, "");
        this.userProfileModal = new UserProfileModal(page);
        
        
    };

   


};