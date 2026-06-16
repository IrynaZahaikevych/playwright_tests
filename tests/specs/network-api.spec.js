import { test, expect } from '@playwright/test';
import { openRegistrationForm } from '../helpers/Registration.js';
import { RegistrationPage } from '../pages/RegistrationPage.js';

test.describe('ДЗ 29.1. Playwright Network & API Request', () => {
	test('Завдання 1: Підміна response body для профілю користувача', async ({ page }) => {
		const fakeProfileData = {
			status: 'ok',
			data: {
				userId: 77777,
				photoFilename: 'default-user.png',
				name: 'Ira',
				lastName: 'Tester',
			},
		};

		await page.route('/api/users/profile', async (route) => {
			await route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify(fakeProfileData),
			});
		});

		await openRegistrationForm(page);
		const registrationPage = new RegistrationPage(page);

		const uniqueEmail = `qa_user_${Date.now()}@example.com`;

		await registrationPage.typeField(registrationPage.nameInput, 'Ira');
		await registrationPage.typeField(registrationPage.lastNameInput, 'Tester');
		await registrationPage.typeField(registrationPage.emailInput, uniqueEmail);
		await registrationPage.typeField(registrationPage.passwordInput, 'SecurePass123!');
		await registrationPage.typeField(registrationPage.repeatPasswordInput, 'SecurePass123!');

		await registrationPage.registerBtn.click();

		await expect(page).toHaveURL(/.*panel\/garage/);

		const profileMenuBtn = page.locator('a.sidebar_btn[href="/panel/profile"]');
		await profileMenuBtn.click();

		await expect(page).toHaveURL(/.*panel\/profile/);

		const profileName = page.locator('.profile_name');

		await expect(profileName).toHaveText('Ira Tester');
	});
});
