import { Locator, Page } from "@playwright/test";

export class BasePage {
    readonly page: Page;
    readonly inputFiled: Locator;
    readonly loadingSpinner: Locator;
    readonly SaveBtn: Locator;
    readonly AddBtn: Locator;
    readonly editBtn: Locator;
    readonly deleteBtn: Locator;
    readonly message: Locator;


    constructor(page: Page) {
        this.page = page;
        this.inputFiled = page.locator('.oxd-input.oxd-input--active');
        this.loadingSpinner = page.locator('div.oxd-loading-spinner');
        this.SaveBtn = page.locator('button:has-text("Save")');
        this.AddBtn = page.locator('button.oxd-button:has-text("Add")');
        this.editBtn = page.locator('.oxd-icon.bi-pencil-fill');
        this.deleteBtn = page.locator('.oxd-icon.bi-trash');
        this.message = page.locator('.oxd-text--toast-message');

    }
}