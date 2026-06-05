import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage.js';
import { openRegistrationForm } from '../helpers/Registration.js';

test.describe('Validation Register button', () => {
	let registrationPage;

	test.beforeEach(async ({ page }) => {
		registrationPage = new RegistrationPage(page);
		await openRegistrationForm(page);
	});

	test('The button is disabled if data incorrect — Success', async () => {
		await registrationPage.nameInput.fill('Iryna');
		await registrationPage.lastNameInput.fill('Zahaikevych');
		await registrationPage.emailInput.fill('izahaikevych@gmail.com');
		await registrationPage.passwordInput.fill('123');
		await registrationPage.repeatPasswordInput.fill('123');
		await registrationPage.repeatPasswordInput.blur();

		await expect(registrationPage.registerBtn).toBeDisabled();
	});

	test('When the user clicks on button the new user will be created — Success', async ({ page }) => {
		// Використовуємо обов'язковий префікс "aqa", як вимагає ДЗ
		const uniqueEmail = `aqa.test.user.${Date.now()}@example.com`;

		await registrationPage.nameInput.fill('Iryna');
		await registrationPage.lastNameInput.fill('Zahaikevych');
		await registrationPage.emailInput.fill(uniqueEmail);
		await registrationPage.passwordInput.fill('ValidPass123');
		await registrationPage.repeatPasswordInput.fill('ValidPass123');
		await registrationPage.repeatPasswordInput.blur();

		await expect(registrationPage.registerBtn).not.toBeDisabled();
		await registrationPage.registerBtn.click();

		await expect(page).toHaveURL(/.*panel\/garage/);
	});
});
