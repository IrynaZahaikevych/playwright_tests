import { test } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage.js';
import { openRegistrationForm } from '../helpers/Registration.js';

test.describe('Validation Password field', () => {
	const errorMessage =
		'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';
	let registrationPage;

	test.beforeEach(async ({ page }) => {
		registrationPage = new RegistrationPage(page);
		await openRegistrationForm(page);
	});

	test('Empty field — "Password required"', async () => {
		await registrationPage.passwordInput.focus();
		await registrationPage.passwordInput.blur();
		await registrationPage.verifyValidationError(
			registrationPage.passwordInput,
			'#signupPassword',
			'Password required',
		);
	});

	test('Wrong data: Missing integer — Error', async () => {
		await registrationPage.typeField(registrationPage.passwordInput, 'ValidPass');
		await registrationPage.verifyValidationError(registrationPage.passwordInput, '#signupPassword', errorMessage);
	});

	test('Wrong data: Missing capital letter — Error', async () => {
		await registrationPage.typeField(registrationPage.passwordInput, 'valid123');
		await registrationPage.verifyValidationError(registrationPage.passwordInput, '#signupPassword', errorMessage);
	});

	test('Wrong data: Missing small letter — Error', async () => {
		await registrationPage.typeField(registrationPage.passwordInput, 'VALID123');
		await registrationPage.verifyValidationError(registrationPage.passwordInput, '#signupPassword', errorMessage);
	});

	test('Wrong length min: 7 characters — Error', async () => {
		await registrationPage.typeField(registrationPage.passwordInput, 'Pass123');
		await registrationPage.verifyValidationError(registrationPage.passwordInput, '#signupPassword', errorMessage);
	});

	test('Wrong length max: 16 characters — Error', async () => {
		await registrationPage.typeField(registrationPage.passwordInput, 'Pass123456789012');
		await registrationPage.verifyValidationError(registrationPage.passwordInput, '#signupPassword', errorMessage);
	});

	test('Boundary check: Min length 8 characters — Success', async () => {
		await registrationPage.typeField(registrationPage.passwordInput, 'Valid123');
		await registrationPage.verifyValidationSuccess(registrationPage.passwordInput, '#signupPassword');
	});

	test('Boundary check: Max length 15 characters — Success', async () => {
		await registrationPage.typeField(registrationPage.passwordInput, 'ValidPass123456');
		await registrationPage.verifyValidationSuccess(registrationPage.passwordInput, '#signupPassword');
	});
});
