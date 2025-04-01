import { test, expect } from '@playwright/test';
import { BookStorePage } from '../pages/bookstore-page';
import { CartPage } from '../pages/cart-page';
import { SignInPage } from '../pages/sign-in-page';
import { CheckoutPage } from '../pages/checkout-page';
import { UserProfilePage } from '../pages/user-profile-page';
import { TestDataService } from '../pages/test-data-service/test-data-service';
import testData from "../test-data/test-9-checkout-test.json";

interface CheckoutInput {
    bookTitle: string;
    email: string;
    password: string;
    userName: string;
    address: string;
    cardHolderName: string;
    cardNumber: string;
    cardExpirationMonth: string;
    cardExpirationYear: string;
    cardCvc: string;
}

interface CheckoutOutput {
    purchaseSuccessMessage: string;
    bookInPastOrders: string;
}

const testDataService = new TestDataService(testData);
const checkoutTestData = testDataService.getTestData<CheckoutInput, CheckoutOutput>("TEST 9 - End-to-End Purchase Flow");

test(checkoutTestData.testName, async ({ page }) => {
    const bookstorePage = new BookStorePage(page);
    await bookstorePage.goto();

    await bookstorePage.addBookToCart(checkoutTestData.input.bookTitle);
    await bookstorePage.headerModal.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();

    const signInPage = new SignInPage(page);
    await signInPage.signInModal.fillEmail(checkoutTestData.input.email);
    await signInPage.signInModal.fillPassword(checkoutTestData.input.password);
    await signInPage.signInModal.submit();

    const checkOutPage = new CheckoutPage(page);
    await checkOutPage.checkoutModal.fillName(checkoutTestData.input.userName);
    await checkOutPage.checkoutModal.fillAddress(checkoutTestData.input.address);
    await checkOutPage.checkoutModal.fillCardHolderName(checkoutTestData.input.cardHolderName);
    await checkOutPage.checkoutModal.fillCardNumber(checkoutTestData.input.cardNumber);
    await checkOutPage.checkoutModal.fillCardExpiration(checkoutTestData.input.cardExpirationMonth, checkoutTestData.input.cardExpirationYear);
    await checkOutPage.checkoutModal.fillCardCvc(checkoutTestData.input.cardCvc);
    await checkOutPage.checkoutModal.submitPurchase();
    
    await checkOutPage.userProfileModal.getSuccessPurchaseMessage(checkoutTestData.expectedOutput.purchaseSuccessMessage);

    const userProfilePage = new UserProfilePage(page);
    await userProfilePage.userProfileModal.verifyBookInPastOrders(checkoutTestData.expectedOutput.bookInPastOrders);
});