import { expect } from '@playwright/test';

export class RegistrationPage {
	/**
	 * @param {import('@playwright/test').Page} page
	 */
	constructor(page) {
		this.page = page;

		this.nameInput = page.locator('#signupName');
		this.lastNameInput = page.locator('#signupLastName');
		this.emailInput = page.locator('#signupEmail');
		this.passwordInput = page.locator('#signupPassword');
		this.repeatPasswordInput = page.locator('#signupRepeatPassword');

		this.registerBtn = page.locator('button.btn-primary:has-text("Register")');
	}

	getErrorMessage(inputSelector) {
		return this.page.locator(`${inputSelector} ~ .invalid-feedback`);
	}

	get redColor() {
		return 'rgb(220, 53, 69)';
	}

	async typeField(element, text) {
		await element.clear();
		await element.fill(text);
		await element.blur();
	}

	async verifyValidationError(element, selectorStr, expectedText) {
		const error = this.getErrorMessage(selectorStr);
		await expect(error).toBeVisible();
		await expect(error).toHaveText(expectedText);
		await expect(element).toHaveCSS('border-color', this.redColor);
	}

	async verifyValidationSuccess(element, selectorStr) {
		const error = this.getErrorMessage(selectorStr);

		await this.page.waitForTimeout(200);

		if (await error.isVisible()) {
			const errorText = await error.innerText();
			if (errorText.length === 0) {
				return;
			}
		}

		if (textNotContainsSpaces(await element.inputValue())) {
			await expect(error).not.toBeVisible();
			await expect(element).not.toHaveCSS('border-color', this.redColor);
		}
	}
}

function textNotContainsSpaces(text) {
	return !text.startsWith(' ') && !text.endsWith(' ');
}
