import { Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { ShoppingCartModal } from "../modals/shopping-cart-modal";
import { step } from "../utils/base";

export class CartPage extends BasePage {

    public shoppingCartModal: ShoppingCartModal;

    constructor(page: Page) {
        super(page);
        this,this.shoppingCartModal = new ShoppingCartModal(page, "");
        
    };

    @step('Verifying book "{bookName}" is in the cart')
    public async verifyBookInCart(bookName: string): Promise<void> {
        await this.shoppingCartModal.findBookInCart(bookName);
    };

    @step("Proceeding to checkout")
    public async proceedToCheckout(): Promise<void> {
        await this.shoppingCartModal.clickCheckout();
    };


};