import { test } from '@playwright/test';
import { HomePage } from '../pages/homepage';


test.beforeEach(async ({ page }, testInfo) => {
    const homepage = new HomePage(page);
    await homepage.open();

});

test('Test 1 : All basic bookmarks visible', async ({ page }) => {
    const homepage = new HomePage(page);
    await homepage.open();
    await homepage.areAllBookmarksAvailable('Platform', 'Synthetic data', 'Resources', 'Company', 'Pricing');
  });

test('Test 2 : Check No results message', async ({ page }) => {
    const homepage = new HomePage(page);
    await homepage.open();
    await homepage.checkNoResultsTextForPhrase("sythetic");
  });

test('Test 3 : Go to Contacts, fill fields and hover on Send Messages button', async ({ page }) => {
    const homepage = new HomePage(page);
    await homepage.open();
    await homepage.viewItemsInBookmark('Company');
    await homepage.clickOnItem('Contact');
    await homepage.fillContactFields();
  });
