import { expect } from '@playwright/test';

/**
 * @param {import('@playwright/test').Page} page
 */
export async function loginAsGuest(page) {
	await page.goto('/');

	await expect(page.getByText('Do more!')).toBeVisible();
}
