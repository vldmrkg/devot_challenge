import { Page } from "@playwright/test";
import { BaseModal } from "./base-modal";
import { step } from "../utils/base";

export class SignInModal extends BaseModal {

    private baseSelector: string;
    private readonly email = this.page.locator('#email');
    private readonly password = this.page.locator('#password');
    private readonly signUpButton = this.page.getByRole('button', { name: 'Sign In' });
    private readonly signUpLink = this.page.locator('#go-signup');
    private readonly navbarDropdown = this.page.locator('#navbarDropdown');

    constructor(page: Page, baseSelector: string) {
        super(page);
        this.baseSelector = baseSelector;
    };

    @step('Filling in email "{email}"')
    public async fillEmail(email: string) {
        await this.email.fill(email);
    };

    @step('Filling in password')
    public async fillPassword(password: string) {
        await this.password.fill(password);
    };

    @step('Submitting the sign-in form')
    public async submit() {
        await this.signUpButton.click();
    };

    @step('Navigating to the sign-up page')
    public async goToSignUp() {
        await this.signUpLink.click();
    };

    public async findUserInNavbar(expectedName: string): Promise<void> {
        await this.navbarDropdown.waitFor({ state: "visible", timeout: 5000 });
        const navbarText = await this.navbarDropdown.textContent();

        if (!navbarText || !navbarText.includes(expectedName)) {
            throw new Error(`User name "${expectedName}" was not found in the navbar.`);
        };
    };
};