import { test } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage.js';
import { openRegistrationForm } from '../helpers/Registration.js';

test.describe('Validation Re-enter Password field', () => {
	let registrationPage;

	test.beforeEach(async ({ page }) => {
		registrationPage = new RegistrationPage(page);
		await openRegistrationForm(page);
	});

	test('Empty field — "Re-enter password required"', async () => {
		await registrationPage.passwordInput.fill('Valid123');
		await registrationPage.repeatPasswordInput.focus();
		await registrationPage.repeatPasswordInput.blur();
		await registrationPage.verifyValidationError(
			registrationPage.repeatPasswordInput,
			'#signupRepeatPassword',
			'Re-enter password required',
		);
	});

	test('Wrong data: Passwords do not match — Error', async () => {
		await registrationPage.passwordInput.fill('Valid123');
		await registrationPage.typeField(registrationPage.repeatPasswordInput, 'Different123');
		await registrationPage.verifyValidationError(
			registrationPage.repeatPasswordInput,
			'#signupRepeatPassword',
			'Passwords do not match',
		);
	});

	test('Valid data: Passwords match — Success', async () => {
		await registrationPage.passwordInput.fill('Valid123');
		await registrationPage.typeField(registrationPage.repeatPasswordInput, 'Valid123');
		await registrationPage.verifyValidationSuccess(registrationPage.repeatPasswordInput, '#signupRepeatPassword');
	});
});
