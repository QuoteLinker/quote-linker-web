import { test, expect } from '@playwright/test';

test.describe('Quote Form Flow', () => {
  test('should submit an auto insurance quote request', async ({ page }) => {
    // Start at the home page
    await page.goto('/');
    
    // Navigate to the quote form
    await page.getByRole('link', { name: /get a quote/i }).click();
    
    // Ensure we're on the quote page
    expect(page.url()).toContain('/get-quote');
    
    // Select Auto Insurance
    await page.getByRole('button', { name: /auto insurance/i }).click();
    
    // Fill in personal information
    await page.getByLabel('First Name').fill('Test');
    await page.getByLabel('Last Name').fill('User');
    await page.getByLabel('Email Address').fill('test@example.com');
    await page.getByLabel('Phone Number').fill('5551234567');
    await page.getByLabel('ZIP Code').fill('90210');
    
    // Click next button
    await page.getByRole('button', { name: /next/i }).click();
    
    // Check consent checkbox
    await page.getByLabel(/consent/i).check();
    
    // Submit the form
    await page.getByRole('button', { name: /get my quotes/i }).click();
    
    // Verify redirection to thank you page
    await page.waitForURL('**/thank-you**');
    expect(page.url()).toContain('/thank-you');
    expect(page.url()).toContain('type=auto');
  });

  test('should navigate between quote form steps correctly', async ({ page }) => {
    // Start at the quote page
    await page.goto('/get-quote');
    
    // Select Life Insurance
    await page.getByRole('button', { name: /life insurance/i }).click();
    
    // Verify we moved to the personal info step
    await expect(page.getByText('Tell us about yourself')).toBeVisible();
    
    // Go back to the previous step
    await page.getByRole('button', { name: /previous/i }).click();
    
    // Verify we're back at the insurance type selection
    await expect(page.getByText('What type of insurance are you looking for?')).toBeVisible();
  });
});
