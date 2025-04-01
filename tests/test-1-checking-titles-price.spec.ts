import { test, expect } from '@playwright/test';
import { BookStorePage } from '../pages/bookstore-page';
import { TestDataService } from '../pages/test-data-service/test-data-service';
import testData from "../test-data/test-1-checking-titles-prices.json";

const testDataService = new TestDataService(testData);
const bookListValidationTestData = testDataService.getTestData("TEST 1 - Verify the display of the book list with titles and prices");

test(bookListValidationTestData.testName, async ({ page }) => {
    const bookStorePage = new BookStorePage(page);
    await bookStorePage.goto();
    
    const books = await bookStorePage.getBooksList(); 

    expect(books.length).toBeGreaterThan(0); 

    for (const { title, price } of books) {
        expect(title).not.toBe("");
        expect(price).toMatch(/^\d+([\.,]\d{1,2})?\s?[€$£RSD]?$/);
    };
});