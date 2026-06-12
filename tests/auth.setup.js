import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate as user', async ({ page }) => {
	const baseUrl = process.env.BASE_URL.replace('https://', '');
	const authUrl = `https://${process.env.HTTP_CREDENTIALS_USER}:${process.env.HTTP_CREDENTIALS_PASS}@${baseUrl}`;

	await page.goto(authUrl);
	await page.locator('.header_signin').click();
	await page.locator('#signinEmail').fill('izahaikevych@gmail.com');
	await page.locator('#signinPassword').fill('Iryska1405!');
	await page.locator('button', { hasText: 'Login' }).click();

	await expect(page).toHaveURL(/.*panel\/garage/);

	await page.context().storageState({ path: authFile });
});
