import { Page } from "@playwright/test";
import { BaseModal } from "./base-modal";
import { step } from "../utils/base";

export class HeaderModal extends BaseModal {

    private baseSelector: string;
    private readonly allBooks = this.page.locator('a', { hasText: 'All Books' });
    private readonly cart = this.page.locator('a[href="/bookstore/cart"]');
    private readonly signIn = this.page.locator('a', { hasText: 'Sign In' });


    constructor(page: Page, baseSelector: string) {
        super(page);
        this.baseSelector = baseSelector;
    };

    @step('Navigating to All Books page')
    public async goToAllBooks() {
        await this.allBooks.click();
    };

    @step('Navigating to Cart page')
    public async goToCart() {
        await this.cart.click();
    };

    @step('Navigating to Sign In page')
    public async goToSignIn() {
        await this.signIn.click();
    };
};