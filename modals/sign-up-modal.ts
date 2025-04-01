import { expect, Page } from "@playwright/test";
import { BaseModal } from "./base-modal";
import { step } from "../utils/base";

export class SignUpModal extends BaseModal {
    
    private baseSelector: string;
    private readonly userName = this.page.locator('#username');
    private readonly email = this.page.locator('#email');
    private readonly password = this.page.locator('#password');
    private readonly confirmPassword = this.page.locator('#password2');
    private readonly signUpButton = this.page.getByRole('button', { name: 'Sign Up' });
    private readonly errorMessage = this.page.locator('#flash');
    

    constructor(page: Page, baseSelector: string) {
        super(page);
        this.baseSelector = baseSelector;
    };

    @step('Filling in username "{name}"')
    public async fillUserName(name: string) {
        await this.userName.fill(name);
    };

    @step('Filling in email "{email}"')
    public async fillEmail(email: string) {
        await this.email.fill(email);
    };

    @step('Filling in password')
    public async fillPassword(password: string) {
        await this.password.fill(password);
    };

    @step('Filling in confirm password')
    public async fillConfirmPassword(confirmPassword: string) {
        await this.confirmPassword.fill(confirmPassword);
    };

    @step('Submitting the sign-up form')
    public async submit() {
        await this.signUpButton.click();
    };

    
    public async verifyErrorMessage(expectedMessage: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(expectedMessage);
    };
    

    
};