import { test as base } from '@playwright/test';
import { GaragePage } from '../page-objects/GaragePage';

const authFile = 'playwright/.auth/user.json';

export const test = base.extend({
	userGaragePage: async ({ browser }, use) => {
		const context = await browser.newContext({ storageState: authFile });
		const page = await context.newPage();

		const garagePage = new GaragePage(page);

		await garagePage.navigate();

		await use(garagePage);

		await context.close();
	},
});

export { expect } from '@playwright/test';
