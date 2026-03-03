import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Laravel \+ React App/);
});

test('counter button works', async ({ page }) => {
  await page.goto('/');

  // Get the button by its text content
  const button = page.getByRole('button', { name: /count is/ });
  
  // Expect initial count to be 0
  await expect(button).toHaveText('count is 0');
  
  // Click button and check it increments
  await button.click();
  await expect(button).toHaveText('count is 1');
  
  await button.click();
  await expect(button).toHaveText('count is 2');
});
