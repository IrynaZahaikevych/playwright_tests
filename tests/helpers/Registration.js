import { expect } from '@playwright/test';

/**
 * @param {import('@playwright/test').Page} page
 */
export async function openRegistrationForm(page) {
	await page.goto('/');

	await expect(page.getByText('Do more!')).toBeVisible();

	const signInBtn = page.locator('button.header_signin');
	await expect(signInBtn).toBeVisible();
	await signInBtn.click();

	const registrationLink = page.locator('.modal-content button.btn-link:has-text("Registration")');
	await expect(registrationLink).toBeVisible();
	await registrationLink.click();

	const modalTitle = page.getByRole('heading', { name: 'Registration', exact: true });
	await expect(modalTitle).toBeVisible();
}
