import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Завантажуємо змінні оточення з файлу .env
dotenv.config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
	testDir: './tests',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

	use: {
		/* Значення беруться безпосередньо з вашого файлу .env */
		baseURL: process.env.BASE_URL,

		/* Автоматична HTTP Basic Auth через змінні оточення */
		httpCredentials: {
			username: process.env.HTTP_CREDENTIALS_USER,
			password: process.env.HTTP_CREDENTIALS_PASS,
		},

		/* Create screenshot automatically if the test fails */
		screenshot: 'only-on-failure',

		/* Record video of the test run if it fails */
		video: 'retain-on-failure',

		/* Capture trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
	],
});
