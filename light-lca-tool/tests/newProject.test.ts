import { test, expect } from '@playwright/test';

test.describe('New Project Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/newProject');
	});

	test('should display the form and create a new project', async ({ page }) => {
		// Check for the presence of the form title
		await expect(page.locator('h1')).toHaveText('Create a new project');

		// Check for the presence of the form elements
		await expect(page.locator('label[for="name"]')).toHaveText('Project name:');
		await expect(page.locator('label[for="owner"]')).toHaveText('Owner:');
		await expect(page.locator('label[for="areaOfProduction"]')).toHaveText('Area of production:');

		// Fill in the form
		await page.fill('input[name="name"]', 'Test Project');
		await page.fill('input[name="owner"]', 'John Doe');
		await page.selectOption('select[name="areaOfProduction"]', { index: 0 });

		// Submit the form
		await page.click('button:has-text("Save")');

		// Check for the success alert
		const alert = page.locator('aside.alert.variant-filled-success');
		await expect(alert).toBeVisible();
		await expect(alert.locator('h3')).toHaveText('Success');
		await expect(alert.locator('p')).toHaveText(/Project created/);

		// Click the redirection button in the alert
		await alert.locator('button:has-text("Back to selection.")').click();

		// Check for redirection to the selection page
		await page.waitForURL('/');
	});
});
