import { test } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage.js';
import { openRegistrationForm } from '../helpers/Registration.js';

test.describe('Validation Name field', () => {
	let registrationPage;

	test.beforeEach(async ({ page }) => {
		registrationPage = new RegistrationPage(page);
		await openRegistrationForm(page);
	});

	test('Mandatory: Yes — "Name required"', async () => {
		await registrationPage.nameInput.focus();
		await registrationPage.nameInput.blur();
		await registrationPage.verifyValidationError(registrationPage.nameInput, '#signupName', 'Name required');
	});

	test('Wrong data — "Name is invalid"', async () => {
		await registrationPage.typeField(registrationPage.nameInput, 'Іван');
		await registrationPage.verifyValidationError(registrationPage.nameInput, '#signupName', 'Name is invalid');
	});

	test('Wrong length min — "Name has to be from 2 to 20 characters long"', async () => {
		await registrationPage.typeField(registrationPage.nameInput, 'A');
		await registrationPage.verifyValidationError(
			registrationPage.nameInput,
			'#signupName',
			'Name has to be from 2 to 20 characters long',
		);
	});

	test('Wrong length max — "Name has to be from 2 to 20 characters long"', async () => {
		await registrationPage.typeField(registrationPage.nameInput, 'A'.repeat(21));
		await registrationPage.verifyValidationError(
			registrationPage.nameInput,
			'#signupName',
			'Name has to be from 2 to 20 characters long',
		);
	});

	test('Trim check: Field with spaces only — "Name is invalid"', async () => {
		await registrationPage.typeField(registrationPage.nameInput, '   ');
		await registrationPage.verifyValidationError(registrationPage.nameInput, '#signupName', 'Name is invalid');
	});

	test('Trim check: Valid name with spaces along borders — Success', async () => {
		await registrationPage.nameInput.clear();
		await registrationPage.nameInput.fill('  Ab  ');
		await registrationPage.nameInput.blur();
		await registrationPage.verifyValidationSuccess(registrationPage.nameInput, '#signupName');
	});

	test('Boundary check: Min length 2 characters — Success', async () => {
		await registrationPage.typeField(registrationPage.nameInput, 'Ab');
		await registrationPage.verifyValidationSuccess(registrationPage.nameInput, '#signupName');
	});

	test('Boundary check: Max length 20 characters — Success', async () => {
		await registrationPage.typeField(registrationPage.nameInput, 'A'.repeat(20));
		await registrationPage.verifyValidationSuccess(registrationPage.nameInput, '#signupName');
	});
});
