import { Page } from "@playwright/test";
import { BaseModal } from "./base-modal";

export class ShoppingCartModal extends BaseModal {
    
    private baseSelector: string;
    private readonly bookRowLocator = this.page.locator(`table tbody tr`);
    private readonly proceedToCheckoutButton = this.page.locator('.p-3 .btn');
    private readonly bookNameLocator = 'td.information'; 

    constructor(page: Page, baseSelector: string) {
        super(page);
        this.baseSelector = baseSelector;
    };

    public async findBookInCart(bookName: string): Promise<void> {
        await this.bookRowLocator.waitFor({ state: 'visible', timeout: 5000 });

        const rowsCount = await this.bookRowLocator.count();
        for (let i = 0; i < rowsCount; i++) {
            const rowLocator = this.bookRowLocator.nth(i);
            const bookNameText = await rowLocator.locator(this.bookNameLocator).first().textContent();

            if (bookNameText?.trim() === bookName) {
                return;  // Book found, exit function
            };
        };

        throw new Error(`Book with name "${bookName}" was not found in the cart.`);
    };

    public async clickCheckout(): Promise<void> {
        await this.proceedToCheckoutButton.click();
    };
};