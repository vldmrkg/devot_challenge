import { Page } from "@playwright/test";
import { step } from "../utils/base";


export abstract class BasePage {
  protected page: Page;


  constructor(page: Page) {
    this.page = page;

  };

  @step("Navigating to the bookstore page")
  public async goto() {
    await this.page.goto("https://practice.expandtesting.com/bookstore");
  };

  @step("Logging out the user")
  public async logOut(): Promise<void> {
    await this.page.locator('#navbarDropdown').waitFor({ state: "visible", timeout: 5000 });
    await this.page.locator('#navbarDropdown').click();
    await this.page.locator('#logout').click();
  };

};

