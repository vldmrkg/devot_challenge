import { expect, Page, Locator } from "@playwright/test";
import { BaseModal } from "./base-modal";
import { step } from "../utils/base";

export class UserProfileModal extends BaseModal {

    private readonly wellcomeMessage: Locator;
    private readonly orderCards: Locator;
    private readonly successMessage: Locator;


    constructor(page: Page) {
        super(page);
        this.wellcomeMessage = this.page.locator('#welcome-message'); 
        this.orderCards = this.page.locator('.card'); 
        this.successMessage = this.page.locator('#flash');

    };

    public async getWelcomeMessageText(expectedMessage: string): Promise<string> {
        const text = await this.wellcomeMessage.textContent();
        if (text === null) {
            throw new Error('Welcome message not found.');
        }
        return text.trim();
    };


    // This function retrieves and processes the list of past orders from the page. 
    // It waits for the order cards to be visible and extracts the order ID, book title, and price for each order.
    // The book title and price strings are cleaned by removing unnecessary details like units and currency symbols.
    // If no past orders are found, it logs a message and returns an empty array. 
    // Otherwise, it returns an array of objects containing the order ID, book title, and price for each past order.
    
    public async viewPastOrders(): Promise<{ id: string; bookTitle: string; price: string }[]> {
        await this.page.waitForTimeout(1000);
        const orderCount = await this.orderCards.count();

        if (orderCount === 0) {
            console.info("Info: No past orders found.");
            return [];
        };

        const orders = [];
        for (let i = 0; i < orderCount; i++) {
            const orderCard = this.orderCards.nth(i);

            await orderCard.waitFor();

            const idElement = orderCard.locator('.card-header');
            const bookTitleElement = orderCard.locator('.list-group');
            const priceElement = orderCard.locator('.card-footer');

            const id = (await idElement.isVisible()) ? await idElement.textContent() : "Unknown ID";
            let bookTitle = (await bookTitleElement.isVisible()) ? await bookTitleElement.textContent() : "Unknown Title";
            let price = (await priceElement.isVisible()) ? await priceElement.textContent() : "Unknown Price";

            bookTitle = bookTitle?.replace(/\s+\d+\sUnits\s+\d+€/, "").trim() || "Unknown Title";
            price = price?.replace("Total Price: ", "").trim() || "Unknown Price";

            orders.push({
                id: id?.trim() || "Unknown ID",
                bookTitle,
                price
            });
        };

        return orders;
    };

    // This function verifies if a specific book has been ordered in the past by checking the list of past orders.
    // It logs the details of past orders and throws an error if the book was not found in any past order.
    @step('Verifying if book "{bookTitle}" is in past orders')
    public async verifyBookInPastOrders(bookTitle: string): Promise<void> {
        const pastOrders = await this.viewPastOrders();

        if (pastOrders.length > 0) {
            console.info("Info: List of past orders:");
            pastOrders.forEach(order => {
                console.info(`- ID: ${order.id}, Book: ${order.bookTitle}, Price: ${order.price}`);
            });
        } else {
            console.error("ERROR: No past orders found.");
        }

        const normalizeTitle = (title: string) => title.trim().replace(/\s*\|\s*$/, "").toLowerCase();
        const orderExists = pastOrders.some(order => normalizeTitle(order.bookTitle) === normalizeTitle(bookTitle));

        if (!orderExists) {
            throw new Error(`Book "${bookTitle}" was not found in past orders.`);
        }

        expect(orderExists).toBe(true);
    };


    public async checkUserLoggedOut(): Promise<void> {
        const signInText = await this.page.locator('.py-3 .navbar-nav').textContent();
        if (!signInText || !signInText.includes('Sign In')) {
            throw new Error('User is not logged out. "Sign In" text is missing from the navbar.');
        };
    };

    @step('Getting success purchase message with expected text "{expectedText}"')
    public async getSuccessPurchaseMessage(expectedText: string): Promise<void> {
        await this.successMessage.waitFor({ state: 'visible' });
        await expect(this.successMessage).toContainText(expectedText);
    };
};

// public async verifyPastOrdersDisplayed(): Promise<void> {
    //     await this.page.waitForTimeout(1000);
    //     const orderCardsCount = await this.orderCards.count();

    //     if (orderCardsCount === 0) {
    //         console.info("Info: No past orders found.");
    //     } else {
    //         for (let i = 0; i < orderCardsCount; i++) {
    //             const orderCard = this.orderCards.nth(i);
    //             const isVisible = await orderCard.isVisible();
    //             if (isVisible) {
    //                 console.info(`Info: Past order ${i + 1} is displayed.`);
    //             } else {
    //                 console.warn(`Warning: Past order ${i + 1} is not visible.`);
    //             };
    //         };
    //     };
    // };
