import { expect, test } from '@playwright/test';

test('judge changes the street and sees the result reverse', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /A crossing.*can hide/i })).toBeVisible();
  await page.locator('#experiment').scrollIntoViewIfNeeded();
  await expect(page.getByTestId('result')).toContainText('EXCEEDS THE CLEAR VIEW');
  await page.getByRole('button', { name: 'More room' }).click();
  await expect(page.getByTestId('result')).toContainText('CLEAR VIEW EXCEEDS');
  await expect(page.locator('#speed')).toHaveValue('15');
  await expect(page.locator('#setback')).toHaveValue('35');
  await expect(page).toHaveURL(/speed=15.*setback=35/);
  await page.reload();
  await expect(page.locator('#speed')).toHaveValue('15');
  await expect(page.getByTestId('result')).toContainText('CLEAR VIEW EXCEEDS');
  expect(errors).toEqual([]);
});

test('reduced motion retains a readable street diagram', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#experiment').scrollIntoViewIfNeeded();
  await expect(page.locator('.street-scene')).toHaveAttribute('data-renderer', 'diagram');
  await expect(page.getByRole('img', { name: /Top-down crossing diagram/ }).first()).toBeVisible();
});
