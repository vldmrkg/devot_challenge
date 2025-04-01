import { test, expect } from '@playwright/test';
import { BookStorePage } from '../pages/bookstore-page'; 
import { CartPage } from '../pages/cart-page';
import { TestDataService } from '../pages/test-data-service/test-data-service';
import testData from "../test-data/test-8-add-book-to-cart.json";

interface AddBookInput {
    bookTitle: string;
}

interface AddBookOutput {
    cartMessage: string;
}

const testDataService = new TestDataService(testData);
const addBookTestData = testDataService.getTestData<AddBookInput, AddBookOutput>("TEST 8 - Add book to the cart");

test(addBookTestData.testName, async ({ page }) => {
    const bookstorePage = new BookStorePage(page);
    await bookstorePage.goto();

    await bookstorePage.addBookToCart(addBookTestData.input.bookTitle);
    await bookstorePage.headerModal.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.verifyBookInCart(addBookTestData.input.bookTitle);
});