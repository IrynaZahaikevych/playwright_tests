import { test, expect } from '../fixtures/userFixtures';

test.describe('Перевірка за допомогою Storage State', () => {
	test('Успішне відкриття гаража залогіненим юзером', async ({ userGaragePage }) => {
		await expect(userGaragePage.addCarBtn).toBeVisible();
	});
});
