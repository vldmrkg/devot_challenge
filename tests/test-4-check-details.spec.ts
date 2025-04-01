import { test, expect } from '@playwright/test';
import { BookDetailsPage } from '../pages/book-details-page';
import { BookStorePage } from '../pages/bookstore-page';
import { TestDataService } from '../pages/test-data-service/test-data-service';
import testData from "../test-data/test-4-book-details.json";

interface BookDetailsInput {
  bookName: string;
}

interface BookDetailsOutput {
  pageTitle: string;
  bookTitle: string;
  bookPrice: string;
  bookDescription: string;
}

const testDataService = new TestDataService(testData);
const localTestData = testDataService.getTestData<BookDetailsInput, BookDetailsOutput>("TEST 4 - Verify book details");

test(localTestData.testName, async ({ page }) => {

    const bookStorePage = new BookStorePage(page);
    await bookStorePage.goto();
    await bookStorePage.bookStoreModal.openBookDetails(localTestData.input.bookName);

    const bookDetailsPage = new BookDetailsPage(page);
    await bookDetailsPage.verifyBookDetailsPageTitle(localTestData.expectedOutput.pageTitle);
    
    const title = await bookDetailsPage.fetchBookTitle();
    expect(title).toBe(localTestData.expectedOutput.bookTitle);

    const price = await bookDetailsPage.fetchBookPrice();
    expect(price).toBe(localTestData.expectedOutput.bookPrice);

    const description = await bookDetailsPage.fetchBookDescription();
    expect(description).toBe(localTestData.expectedOutput.bookDescription);     
});