import { test, expect } from '@playwright/test';
import { SignInPage } from '../pages/sign-in-page';
import { PlaywrightBlocker } from '@cliqz/adblocker-playwright';
import { SignUpPage } from '../pages/sign-up-page';
import { TestDataService } from '../pages/test-data-service/test-data-service';
import testData from "../test-data/test-5-user-registration.json";
import { faker } from '@faker-js/faker';

interface SignUpTestInput {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface SignUpTestOutput {
    expectedUser: string;
    expectedError: string;
}

// Generate a random email using Faker
const generatedEmail = faker.internet.email();

testData.forEach(test => {
  if (test.input.email === "{{EMAIL}}") {
    test.input.email = generatedEmail;
  }
});

const testDataService = new TestDataService(testData);
const validSignUpTestData = testDataService.getTestData<SignUpTestInput, SignUpTestOutput>("TEST 5 - Sign Up and verify new user with valid data");
const invalidSignUpTestData = testDataService.getTestData<SignUpTestInput, SignUpTestOutput>("TEST 6 - Sign Up and verify error message for invalid email");

test.describe('User Registration Tests', () => {

    test.beforeEach(async ({ page }) => {
        const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
        await blocker.enableBlockingInPage(page);

        const signInPage = new SignInPage(page);
        await signInPage.goto();
    });

    test(validSignUpTestData.testName, async ({ page }) => {
        const signInPage = new SignInPage(page);
        
        await signInPage.headerModal.goToSignIn();
        await signInPage.signInModal.goToSignUp();
        
        await signInPage.signUpModal.fillUserName(validSignUpTestData.input.userName);
        await signInPage.signUpModal.fillEmail(validSignUpTestData.input.email);  
        await signInPage.signUpModal.fillPassword(validSignUpTestData.input.password);
        await signInPage.signUpModal.fillConfirmPassword(validSignUpTestData.input.confirmPassword);
        await signInPage.signUpModal.submit();

        await signInPage.checkUserNameInNavbar(validSignUpTestData.expectedOutput.expectedUser);
    });

    test(invalidSignUpTestData.testName, async ({ page }) => {
        const signInPage = new SignInPage(page);
        
        await signInPage.headerModal.goToSignIn();
        await signInPage.signInModal.goToSignUp();

        const signUpPage = new SignUpPage(page);

        await signUpPage.signUpModal.fillUserName(invalidSignUpTestData.input.userName);
        await signUpPage.signUpModal.fillEmail(invalidSignUpTestData.input.email); 
        await signUpPage.signUpModal.fillPassword(invalidSignUpTestData.input.password);
        await signUpPage.signUpModal.fillConfirmPassword(invalidSignUpTestData.input.confirmPassword);
        await signUpPage.signUpModal.submit();

        await signUpPage.verifySignUpError(invalidSignUpTestData.expectedOutput.expectedError);
    });
    
});