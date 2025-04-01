import { expect, Page, Locator } from "@playwright/test";
import { BaseModal } from "./base-modal";

export class BookDetailsModal extends BaseModal {
    private readonly baseSelector: string;
    private readonly bookTitleLocator: Locator;
    private readonly bookPriceLocator: Locator;
    private readonly bookDescriptionLocator: Locator;

    constructor(page: Page, baseSelector: string) {
        super(page);
        this.baseSelector = baseSelector;
        this.bookTitleLocator = this.page.locator(`${this.baseSelector} h3`);  
        this.bookPriceLocator = this.page.locator(`${this.baseSelector} span`);
        this.bookDescriptionLocator = this.page.locator(`${this.baseSelector} p[style]:nth-of-type(2)`);
    }

    // Helper function to get text content and throw error if not found
    private async getElementText(locator: Locator, errorMessage: string): Promise<string> {
        const text = await locator.textContent();
        if (!text) {
            throw new Error(errorMessage);
        };
        return text.trim();
    };

    
    public async getBookTitle(): Promise<string> {
        return this.getElementText(this.bookTitleLocator, "Book title not found.");
    };

   
    public async getBookPrice(): Promise<string> {
        return this.getElementText(this.bookPriceLocator, "Book price not found.");
    };

    
    public async getBookDescription(): Promise<string> {
        return this.getElementText(this.bookDescriptionLocator, "Book description not found.");
    };

    
    public async verifyPageTitle(expectedTitle: string): Promise<void> {
        const pageTitleLocator = this.page.locator('.page-layout .mt-3');
        const pageTitle = await this.getElementText(pageTitleLocator, "Page title not found.");
        expect(pageTitle).toBe(expectedTitle);
    };
};
