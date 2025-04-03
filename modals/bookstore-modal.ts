import { Locator, Page } from "@playwright/test";
import { BaseModal } from "./base-modal";
import { step } from "../utils/base";

export class BookStoreModal extends BaseModal {
    private readonly baseSelector: string;
    private readonly searchBox = this.page.locator('#search-input');
    private readonly searchButton = this.page.locator('#search-btn');
    private readonly sortByNew = this.page.locator('a.filter_sort-new');
    private readonly sortByPriceDropdown = this.page.locator('.filter_sort-select');
    private readonly bookTitle = this.page.locator('.card-title');
    private readonly booksPrice = this.page.locator('.card-text');

    constructor(page: Page, baseSelector: string) {
        super(page);
        this.baseSelector = baseSelector;
    };

    // Helper function to get the book locator based on the book title
    private getBookLocator(bookName: string): Locator {
        return this.page.locator(`${this.baseSelector} .card-title:has-text("${bookName}")`);
    };

    // Helper function to locate the book cover image
    private getBookCoverLocator(bookLocator: Locator): Locator {
        return bookLocator.locator('xpath=ancestor::div[contains(@class, "card-product-user")]//img[contains(@class, "card-img-top")]');
    };

    // Helper function to locate the "Add to Cart" button for a specific book
    private getAddToCartLocator(bookLocator: Locator): Locator {
        return bookLocator.locator('xpath=ancestor::div[contains(@class, "card-product-user")]//a[contains(@class, "btn-expand")]');
    };

    @step('Searching for Book')
    public async searchBook(bookName: string) {
        await this.searchBox.fill(bookName);
        await this.searchButton.click();
    };

    @step('Sorting Books by New')
    public async sortNew() {
        await this.sortByNew.click();
    };

    @step('Sorting Books by Price')
    public async sortByPrice(option: string) {
        const validOptions: string[] = ["ASC", "DESC"];

        if (!validOptions.includes(option.toUpperCase())) {
            throw new Error(`Invalid sort order: ${option}. Allowed values are "ASC" or "DESC".`);
        }

        await this.sortByPriceDropdown.click();
        await this.page.locator(`.filter_sort-select__item-link`, { hasText: option.toUpperCase() }).click();
    };

    @step('Opening Book Details')
    public async openBookDetails(bookName: string): Promise<void> {
        const bookLocator = this.getBookLocator(bookName);
        const bookExists = await bookLocator.isVisible();

        if (!bookExists) throw new Error(`Book with title "${bookName}" not found.`);

        await this.getBookCoverLocator(bookLocator).click();
    };

    public async findBook(bookName: string): Promise<Locator> {
        const bookLocator = this.getBookLocator(bookName);
        const bookExists = await bookLocator.isVisible();

        if (!bookExists) throw new Error(`Book with title "${bookName}" not found.`);

        return bookLocator;
    };

    public async clickAddToCart(bookLocator: Locator): Promise<void> {
        await this.getAddToCartLocator(bookLocator).click();
    };

    public async getAllBooks(): Promise<{ title: string; price: string }[]> {
        const titles = (await this.bookTitle.allTextContents()).map(title => title.trim());
        const prices = (await this.booksPrice.allTextContents()).map(price => price.trim());
    
        if (titles.length !== prices.length) {
            throw new Error(`Mismatch between books (${titles.length}) and prices (${prices.length}).`);
        }
    
        return titles.map((title, index) => ({ title, price: prices[index] }));
    };


    // This function checks if the prices of books are sorted in the specified order (ASC or DESC).
    // It first retrieves the list of books and their prices, removes the dollar sign, and converts them to numbers.
    // Then, it iterates through the list of prices and compares each price with the previous one to ensure the correct sorting order.
    // If any price is out of order, it returns false. If all prices are in the correct order, it returns true.
    @step('Checking if Prices are Sorted')
    public async checkPricesSorted(order: "ASC" | "DESC"): Promise<boolean> {
        await this.page.waitForTimeout(1000);
        const books = await this.getAllBooks();
        const prices = books.map(book => parseFloat(book.price.replace('$', '').trim()));

        for (let i = 1; i < prices.length; i++) {
            if (order === "ASC" && prices[i] < prices[i - 1]) return false;
            if (order === "DESC" && prices[i] > prices[i - 1]) return false;
        }

        return true;
    };
};