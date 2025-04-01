import { test, expect } from '@playwright/test';
import { BookStorePage } from '../pages/bookstore-page'; 
import { SignInPage } from '../pages/sign-in-page';
import { UserProfilePage } from '../pages/user-profile-page';
import { UserProfileModal } from '../modals/user-profile.modal';
import { TestDataService } from '../pages/test-data-service/test-data-service';
import testData from "../test-data/test-7-user-profile-actions.json";

interface UserProfileInput {
    email: string;
    password: string;
}

interface UserProfileOutput {
    expectedMessage?: string;
    ordersExist?: boolean;
}

const testDataService = new TestDataService(testData);
const viewOrdersTestData = testDataService.getTestData<UserProfileInput, UserProfileOutput>("TEST 1 - View past orders after login");
const logoutTestData = testDataService.getTestData<UserProfileInput, UserProfileOutput>("TEST 2 - Test user logout");

test.describe('User Profile Actions', () => {
    
    let bookStorePage: BookStorePage;
    let signInPage: SignInPage;
    let userProfilePage: UserProfilePage;
    let userProfileModal: UserProfileModal;

    test.beforeEach(async ({ page }) => {
        bookStorePage = new BookStorePage(page);
        signInPage = new SignInPage(page);
        userProfilePage = new UserProfilePage(page);
        userProfileModal = new UserProfileModal(page);
        await bookStorePage.goto();

        await bookStorePage.headerModal.goToSignIn();
        await signInPage.signInModal.fillEmail(viewOrdersTestData.input.email);
        await signInPage.signInModal.fillPassword(viewOrdersTestData.input.password);
        await signInPage.signInModal.submit();
    });

    test(viewOrdersTestData.testName, async () => {
        
        const orders = await userProfilePage.getPastOrders();
    
        if (orders.length > 0) {
            orders.forEach(order => {
                console.info(`Info: Found past order - : ${order.id}, Book: ${order.bookTitle}, Price: ${order.price}`);
            });
        } else {
            console.info("Info: No past orders found.");
        };
    });

    
    
    test(logoutTestData.testName, async () => {
        await userProfilePage.logOut();
        await userProfilePage.confirmUserLoggedOut();
        
    });

});
