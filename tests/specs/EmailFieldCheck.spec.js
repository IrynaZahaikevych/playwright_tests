import { test } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage.js';
import { openRegistrationForm } from '../helpers/Registration.js';

test.describe('Validation Email field', () => {
	let registrationPage;

	test.beforeEach(async ({ page }) => {
		registrationPage = new RegistrationPage(page);
		await openRegistrationForm(page);
	});

	test('Empty field — "Email required"', async () => {
		await registrationPage.emailInput.focus();
		await registrationPage.emailInput.blur();
		await registrationPage.verifyValidationError(registrationPage.emailInput, '#signupEmail', 'Email required');
	});

	test('Wrong data — "Email is incorrect"', async () => {
		await registrationPage.typeField(registrationPage.emailInput, 'invalid-email.com');
		await registrationPage.verifyValidationError(registrationPage.emailInput, '#signupEmail', 'Email is incorrect');
	});

	test('Trim check: Field with spaces only — "Email is incorrect"', async () => {
		await registrationPage.typeField(registrationPage.emailInput, '   ');
		await registrationPage.verifyValidationError(registrationPage.emailInput, '#signupEmail', 'Email is incorrect');
	});

	test('Standard validation: Valid email — Success', async () => {
		await registrationPage.typeField(registrationPage.emailInput, 'test.user@example.com');
		await registrationPage.verifyValidationSuccess(registrationPage.emailInput, '#signupEmail');
	});
});
