import { test } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage.js';
import { openRegistrationForm } from '../helpers/Registration.js';

test.describe('Validation Last Name field', () => {
	let registrationPage;

	test.beforeEach(async ({ page }) => {
		registrationPage = new RegistrationPage(page);
		await openRegistrationForm(page);
	});

	test('Mandatory: Yes — "Last name required"', async () => {
		await registrationPage.lastNameInput.focus();
		await registrationPage.lastNameInput.blur();
		await registrationPage.verifyValidationError(
			registrationPage.lastNameInput,
			'#signupLastName',
			'Last name required',
		);
	});

	test('Wrong data — "Last name is invalid"', async () => {
		await registrationPage.typeField(registrationPage.lastNameInput, 'Іван');
		await registrationPage.verifyValidationError(
			registrationPage.lastNameInput,
			'#signupLastName',
			'Last name is invalid',
		);
	});

	test('Wrong length min — "Last name has to be from 2 to 20 characters long"', async () => {
		await registrationPage.typeField(registrationPage.lastNameInput, 'A');
		await registrationPage.verifyValidationError(
			registrationPage.lastNameInput,
			'#signupLastName',
			'Last name has to be from 2 to 20 characters long',
		);
	});

	test('Wrong length max — "Last name has to be from 2 to 20 characters long"', async () => {
		await registrationPage.typeField(registrationPage.lastNameInput, 'A'.repeat(21));
		await registrationPage.verifyValidationError(
			registrationPage.lastNameInput,
			'#signupLastName',
			'Last name has to be from 2 to 20 characters long',
		);
	});

	test('Trim check: Field with spaces only — "Last name is invalid"', async () => {
		await registrationPage.typeField(registrationPage.lastNameInput, '   ');
		await registrationPage.verifyValidationError(
			registrationPage.lastNameInput,
			'#signupLastName',
			'Last name is invalid',
		);
	});

	test('Trim check: Valid name with spaces along borders — Success', async () => {
		await registrationPage.typeField(registrationPage.lastNameInput, '  Ab  ');
		await registrationPage.verifyValidationSuccess(registrationPage.lastNameInput, '#signupLastName');
	});

	test('Boundary check: Min length 2 characters — Success', async () => {
		await registrationPage.typeField(registrationPage.lastNameInput, 'Ab');
		await registrationPage.verifyValidationSuccess(registrationPage.lastNameInput, '#signupLastName');
	});

	test('Boundary check: Max length 20 characters — Success', async () => {
		await registrationPage.typeField(registrationPage.lastNameInput, 'A'.repeat(20));
		await registrationPage.verifyValidationSuccess(registrationPage.lastNameInput, '#signupLastName');
	});
});
