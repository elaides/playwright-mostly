import { expect, type Page } from '@playwright/test';
import {user} from '../utils/userData';
export class HomePage {
    readonly page: Page;
constructor(page: Page) {
        this.page = page;
    }

async open() {
        await this.page.goto('https://mostly.ai/');
    }

async viewItemsInBookmark(bookmark: string) {
        await this.page.getByRole('button', { name: 'DECLINE' }).click();
        await this.page.getByRole('button', { name: bookmark }).hover();
    }

async clickOnItem(itemName: string) {
        await this.page.getByRole('link', { name: 'Contact Do you have a question about synthetic data? Send us a message!' }).click();
    }

async areAllBookmarksAvailable(...bookmarks): Promise<boolean> {
    for (const bookmark of bookmarks) {
        const isTabVisible = await this.page.isVisible('//span[text()="'+ bookmark + '"]');

        if (!isTabVisible) {
            return false; 
          }
        }
    
        return true;
    }

async checkNoResultsTextForPhrase(phrase: string){
        await this.page.click('.oxy-header-search_open-icon');
        await this.page.getByPlaceholder("Search...").fill(phrase);
        await this.page.getByPlaceholder("Search...").press('Enter');
        await expect(this.page.getByText("Sorry, no results for:")).toBeVisible();
        await expect(this.page.getByText(phrase)).toBeVisible();
}

async fillContactFields() {
    const userInfo = user.User;
    await this.page.fill('input[name="firstname"]', userInfo.firstName, {timeout : 30000});
    await this.page.fill('input[name="lastname"]', userInfo.lastName);
    await this.page.fill('input[name="email"]', userInfo.email);
    await this.page.fill('input[name="mobilephone"]', userInfo.phone);
    await this.page.fill('input[name="company"]', userInfo.organisation);
    await this.page.fill('input[name="how_did_you_hear_about_mostly_ai___free_text"]', userInfo.recommendation);
    await this.page.getByPlaceholder('How can we help you? ').fill(userInfo.description)
    await this.page.getByLabel('Country/Region*').selectOption(userInfo.country);
    await this.page.getByText('Marketing offers and updates.').check();
    await this.page.getByRole('button', { name: 'SEND MESSAGE' }).hover();

}
}
