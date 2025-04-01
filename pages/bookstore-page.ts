import { Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { BookStoreModal } from "../modals/bookstore-modal";
import { HeaderModal } from "../modals/header-modals";
import { step } from "../utils/base";


export class BookStorePage extends BasePage {

    public bookStoreModal: BookStoreModal;
    public headerModal: HeaderModal;

    constructor(page: Page) {
        super(page);
        this.bookStoreModal = new BookStoreModal(page, "");
        this.headerModal = new HeaderModal(page, "");
    };

    @step('Adding book "{bookName}" to cart')
    public async addBookToCart(bookName: string): Promise<void> {
        const bookLocator = await this.bookStoreModal.findBook(bookName); 
        await this.bookStoreModal.clickAddToCart(bookLocator); 
    };

    @step("Fetching list of all available books with their prices")
    public async getBooksList(): Promise<{ title: string; price: string }[]> {
        return await this.bookStoreModal.getAllBooks();
    };

    // public async getBookPrice(bookName: string): Promise<string> {
    //     return await this.bookStoreModal.getBookPriceByName(bookName);
    // };









};