import { Page } from "@playwright/test";


export abstract class BaseModal {
  protected page : Page;

  constructor(page: Page) {
    this.page = page
  };


  
   
};