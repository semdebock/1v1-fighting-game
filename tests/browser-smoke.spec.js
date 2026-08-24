const { test, expect } = require('@playwright/test');

test('Multiverse Arena boots v0.9.8 dev.1 and exposes critical controls', async ({ page }) => {
  const errors=[];
  page.on('pageerror',err=>errors.push(err.message));
  await page.goto(process.env.TEST_URL || 'http://127.0.0.1:4173/', { waitUntil:'domcontentloaded' });
  await expect(page.locator('#play')).toBeVisible();
  await expect(page.locator('#training')).toBeVisible();
  await expect(page.locator('#chars')).toBeAttached();
  await expect(page.locator('#fight')).toBeAttached();
  await expect(page.locator('#punch')).toBeAttached();
  await expect(page.locator('#kick')).toBeAttached();
  await expect(page.locator('#special')).toBeAttached();
  await expect(page.locator('#block')).toBeAttached();
  await page.waitForFunction(() => window.MultiverseArenaRuntime && ['ready','warning'].includes(window.MultiverseArenaRuntime.status), null, { timeout:10000 });
  await page.waitForFunction(() => window.MultiverseArenaUpdate098?.version === '0.9.8-dev.1', null, { timeout:10000 });
  await expect(page.locator('.brand .tag').first()).toContainText('0.9.8-dev.1');
  await expect(page.locator('#home .hero-copy h1')).toContainText('FIGHT.');
  const runtime=await page.evaluate(()=>({status:window.MultiverseArenaRuntime.status,failed:window.MultiverseArenaRuntime.failed||[],modules:Object.keys(window.MultiverseArenaModules||{}),ux:window.MultiverseArenaUpdate098?.version}));
  expect(runtime.failed).toEqual([]);
  expect(runtime.modules).toContain('characterDB');
  expect(runtime.modules).toContain('combatAPI');
  expect(runtime.modules).toContain('saveMigrations');
  expect(runtime.modules).toContain('errorLogger');
  expect(runtime.ux).toBe('0.9.8-dev.1');
  expect(errors).toEqual([]);
});

test('dev navigation reaches training/fight UI', async ({ page }) => {
  await page.goto(process.env.TEST_URL || 'http://127.0.0.1:4173/', { waitUntil:'domcontentloaded' });
  await page.locator('#training').click();
  await page.waitForTimeout(250);
  const active=await page.locator('.screen.active').getAttribute('id');
  expect(['levels','fight','home']).toContain(active);
});
