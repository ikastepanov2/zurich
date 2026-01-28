import { Locator, Page } from "@playwright/test";

export class BasePage {
    readonly page: Page;
    readonly InputFiled: Locator;
    readonly LoadingSpinner: Locator;
    readonly SaveBtn: Locator;
    readonly AddBtn: Locator;
    readonly EditBtn: Locator;
    readonly DeleteBtn: Locator;
    readonly Message: Locator;
    readonly SearchButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.InputFiled = page.locator('.oxd-input.oxd-input--active');
        this.LoadingSpinner = page.locator('div.oxd-loading-spinner');
        this.SaveBtn = page.locator('button:has-text("Save")');
        this.AddBtn = page.locator('button.oxd-button:has-text("Add")');
        this.EditBtn = page.locator('.oxd-icon.bi-pencil-fill');
        this.DeleteBtn = page.locator('.oxd-icon.bi-trash');
        this.Message = page.locator('.oxd-text--toast-message');
        this.SearchButton = page.locator('button:has-text("Search")');

    }

    public userRow(username: string) {
        return this.page.locator(
            `//div[@class="oxd-table-cell oxd-padding-cell"]//div[text()="${username}"]`
        );
    }
}