import { Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { BookDetailsModal } from "../modals/book-details-modal";
import { step } from "../utils/base";

export class BookDetailsPage extends BasePage {

    private readonly bookDetailsModal: BookDetailsModal;

    constructor(page: Page) {
        super(page);
        this.bookDetailsModal = new BookDetailsModal(page, ".row");
    };

    @step('Verifying book details page title is "{expectedTitle}"')
    public async verifyBookDetailsPageTitle(expectedTitle: string): Promise<void> {
        await this.bookDetailsModal.verifyPageTitle(expectedTitle);
    };
    
    @step("Fetching book title from details page")
    public async fetchBookTitle(): Promise<string> {
        return await this.bookDetailsModal.getBookTitle();
    };

    @step("Fetching book price from details page")
    public async fetchBookPrice(): Promise<string> {
        return await this.bookDetailsModal.getBookPrice();
    };

    @step("Fetching book description from details page")
    public async fetchBookDescription(): Promise<string> {
        return await this.bookDetailsModal.getBookDescription();
    };

    
    
}