import { test, expect } from '@playwright/test';
import { openRegistrationForm } from '../helpers/Registration.js';
import { RegistrationPage } from '../pages/RegistrationPage.js';

test.describe('ДЗ 29.1. Завдання 2: API тести для створення машин', () => {
	let apiContext;

	test.beforeEach(async ({ page }) => {
		await openRegistrationForm(page);
		const registrationPage = new RegistrationPage(page);

		const uniqueEmail = `qaapiuser${Date.now()}@example.com`;
		const validPassword = 'SecurePass1';

		await registrationPage.typeField(registrationPage.nameInput, 'ApiUser');
		await registrationPage.typeField(registrationPage.lastNameInput, 'Tester');
		await registrationPage.typeField(registrationPage.emailInput, uniqueEmail);
		await registrationPage.typeField(registrationPage.passwordInput, validPassword);
		await registrationPage.typeField(registrationPage.repeatPasswordInput, validPassword);

		await registrationPage.registerBtn.click();

		await expect(page).toHaveURL(/.*panel\/garage/);

		apiContext = page.request;
	});

	test('1. Позитивний сценарій: Успішне створення машини з валідними даними', async () => {
		const requestBody = {
			carBrandId: 1,
			carModelId: 1,
			mileage: 122,
		};

		const response = await apiContext.post('/api/cars', {
			data: requestBody,
		});

		expect(response.status()).toBe(201);

		const responseBody = await response.json();
		expect(responseBody.status).toBe('ok');
		expect(responseBody.data.carBrandId).toBe(requestBody.carBrandId);
		expect(responseBody.data.carModelId).toBe(requestBody.carModelId);
		expect(responseBody.data.mileage).toBe(requestBody.mileage);
		expect(responseBody.data.id).toBeDefined();
	});

	test('2. Негативний сценарій: Створення машини з від`ємним пробігом', async () => {
		const requestBody = {
			carBrandId: 1,
			carModelId: 1,
			mileage: -50,
		};

		const response = await apiContext.post('/api/cars', {
			data: requestBody,
		});

		expect(response.status()).toBe(400);

		const responseBody = await response.json();
		expect(responseBody.status).toBe('error');
		expect(responseBody.message).toBe('Mileage has to be from 0 to 999999');
	});

	test('3. Негативний сценарій: Створення машини без обов`язкового поля mileage', async () => {
		const requestBody = {
			carBrandId: 1,
			carModelId: 1,
		};

		const response = await apiContext.post('/api/cars', {
			data: requestBody,
		});

		const responseBody = await response.json();
		console.log('Фактична помилка для Тесту 3:', responseBody);

		expect(response.status()).toBe(400);
		expect(responseBody.status).toBe('error');
		expect(responseBody.message).toBe('Mileage is required');
	});
});
