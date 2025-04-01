import { test, expect } from '@playwright/test';
import { BookStorePage } from '../pages/bookstore-page'; 
import { SignInPage } from '../pages/sign-in-page';
import { UserProfilePage } from '../pages/user-profile-page';
import { TestDataService } from '../pages/test-data-service/test-data-service';
import testData from "../test-data/test-6-sign-in-user.json";


interface UserAuthInput {
    email: string;
    password: string;
}

interface UserAuthOutput {
    expectedMessage: string;
}

const testDataService = new TestDataService(testData);
const validSignInTestData = testDataService.getTestData<UserAuthInput, UserAuthOutput>("TEST 1 - Sign in with valid credentials");
const invalidPasswordTestData = testDataService.getTestData<UserAuthInput, UserAuthOutput>("TEST 2 - Sign in with invalid password");
const invalidEmailTestData = testDataService.getTestData<UserAuthInput, UserAuthOutput>("TEST 3 - Sign in with invalid email");


test.describe('User Authentication Tests', () => {
    
    let bookStorePage: BookStorePage;
    let signInPage: SignInPage;
    let userProfilePage: UserProfilePage;

    test.beforeEach(async ({ page }) => {
        bookStorePage = new BookStorePage(page);
        signInPage = new SignInPage(page);
        userProfilePage = new UserProfilePage(page);

        await bookStorePage.goto();
    });

    test(validSignInTestData.testName, async () => {
        await bookStorePage.headerModal.goToSignIn();
        
        await signInPage.signInModal.fillEmail(validSignInTestData.input.email);
        await signInPage.signInModal.fillPassword(validSignInTestData.input.password);
        await signInPage.signInModal.submit();

        await userProfilePage.verifyWelcomeMessageInUserProfile(validSignInTestData.expectedOutput.expectedMessage);
    });

    test(invalidPasswordTestData.testName, async () => {
        await bookStorePage.headerModal.goToSignIn();

        await signInPage.signInModal.fillEmail(invalidPasswordTestData.input.email);
        await signInPage.signInModal.fillPassword(invalidPasswordTestData.input.password);
        await signInPage.signInModal.submit();

        await signInPage.verifySignInError(invalidPasswordTestData.expectedOutput.expectedMessage);
    });

    test(invalidEmailTestData.testName, async () => {
        await bookStorePage.headerModal.goToSignIn();

        await signInPage.signInModal.fillEmail(invalidEmailTestData.input.email);
        await signInPage.signInModal.fillPassword(invalidEmailTestData.input.password);
        await signInPage.signInModal.submit();

        await signInPage.verifySignInError(invalidEmailTestData.expectedOutput.expectedMessage);
    });
});