import { expect } from '@playwright/test';

export class GaragePage {
	/**
	 * @param {import('@playwright/test').Page} page
	 */
	constructor(page) {
		this.page = page;

		this.addCarBtn = page.locator('button', { hasText: 'Add car' });
		this.brandSelect = page.locator('#addCarBrand');
		this.modelSelect = page.locator('#addCarModel');
		this.mileageInput = page.locator('#addCarMileage');
		this.submitAddCarBtn = page.locator('.modal-footer .btn-primary');
		this.modalContent = page.locator('.modal-content');
		this.firstCarItem = page.locator('.car-item').first();
		this.expensesNavBtn = page.locator('a[href="/panel/expenses"]').first();
		this.expensesTable = page.locator('.expenses-table');
		this.mainPanelPage = page.locator('main, .panel-page');
	}

	async navigate() {
		await this.page.goto('/panel/garage');
	}

	async fillCarForm(brand, model, mileage) {
		await this.brandSelect.selectOption({ label: brand });
		await this.modelSelect.selectOption({ label: model });
		await this.mileageInput.fill(mileage.toString());
	}
}
