import { Page } from "@playwright/test";
import { BaseModal } from "./base-modal";
import { step } from "../utils/base";

export class CheckoutModal extends BaseModal {

    private baseSelector: string;
    private readonly name = this.page.locator('#name');
    private readonly address = this.page.locator('#address');
    private readonly cardHolderName = this.page.locator('#card-name');
    private readonly cardNumber = this.page.locator('#card-number');
    private readonly cardExpirationMonth = this.page.locator('#card-expiry-month');
    private readonly cardExpirationYear = this.page.locator('#card-expiry-year');
    private readonly cardCvc = this.page.locator('#card-cvc');
    private readonly purchaseButton = this.page.getByRole('button', { name: 'Purchase' });


    constructor(page: Page, baseSelector: string) {
        super(page);
        this.baseSelector = baseSelector;
    };

    @step('Filling Name Field')
    public async fillName(name: string) {
        await this.name.fill(name);
    };

    @step('Filling Address Field')
    public async fillAddress(address: string) {
        await this.address.fill(address);
    };

    @step('Filling Card Holder Name')
    public async fillCardHolderName(name: string) {
        await this.cardHolderName.fill(name);
    };

    @step('Filling Card Number Field')
    public async fillCardNumber(number: string) {
        await this.cardNumber.fill(number);
    };

    @step('Filling Card Expiration Date')
    public async fillCardExpiration(month: string, year: string) {
        await this.cardExpirationMonth.fill(month);
        await this.cardExpirationYear.fill(year);
    };

    @step('Filling Card CVC Field')
    public async fillCardCvc(cvc: string) {
        await this.cardCvc.fill(cvc);
    };

    @step('Submitting Purchase')
    public async submitPurchase() {
        await this.purchaseButton.click();
    };

};

    