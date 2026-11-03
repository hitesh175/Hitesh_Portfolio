import { test, expect } from '@playwright/test';

test('statistics and certificates remain visible without entrance animation', async ({ page }) => {
  await page.setViewportSize({width:390,height:900});
  for (const reducedMotion of ['reduce', 'no-preference'] as const) {
    await page.emulateMedia({reducedMotion});
    await page.goto('/');
    await expect(page.locator('#certificates a > div')).toHaveCount(9);
    await expect(page.locator('#about .h-40')).toHaveCount(4);
    expect(await page.locator('#certificates a > div, #about .h-40').evaluateAll(elements => elements.filter(element => getComputedStyle(element).opacity !== '1').length)).toBe(0);
  }
});

test('contact failure preserves the message; retry clears it only on confirmed success', async ({ page }) => {
  let succeed = false;
  await page.route('https://api.web3forms.com/submit', route => route.fulfill({ status: succeed ? 200 : 500, contentType: 'application/json', body: JSON.stringify({success:succeed}) }));
  await page.goto('/');
  await page.getByLabel('// Your Name').fill('Audit test');
  await page.getByLabel('// Email Address', {exact:true}).fill('test@example.com');
  await page.getByLabel('// Your Message').fill('Test message retained after failure.');
  await page.getByRole('button',{name:'SEND MESSAGE',exact:true}).click();
  await expect(page.getByRole('alert')).toContainText('not sent');
  await expect(page.getByLabel('// Your Message')).toHaveValue('Test message retained after failure.');
  await expect(page.getByRole('status')).not.toContainText('successfully');
  succeed = true;
  await page.getByRole('button',{name:'SEND MESSAGE',exact:true}).click();
  await expect(page.getByRole('status')).toHaveText('Message sent successfully.');
  await expect(page.getByLabel('// Your Message')).toHaveValue('');
  expect(await page.evaluate(()=>localStorage.getItem('hitesh_portfolio_messages'))).toBeNull();
});

test('About links to both role-specific résumés', async ({ page }) => {
  await page.goto('/#about');
  for (const [title, file] of [
    ['Data Science & AI', 'Hitesh_Resume_Data_Science_AI.pdf'],
    ['Data Analytics & BI', 'Hitesh_Resume_Data_Analytics_BI.pdf'],
  ]) {
    await expect(page.getByRole('link', { name: 'View ' + title + ' résumé PDF (opens in a new tab)' })).toHaveAttribute('href', '/' + file);
    await expect(page.getByRole('link', { name: 'Download ' + title + ' résumé' })).toHaveAttribute('download', '');
  }
});

test('article deep links and keyboard dismissal work', async ({ page }) => {
  await page.goto('/#article-blog-1');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button',{name:'Close article'}).focus();
  await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page).toHaveURL(/#blog$/);
});

test('histogram bars render and update for a different cohort', async ({ page }) => {
  await page.goto('/'); await page.locator('#btn-proj-simulate-store-sales-analysis').click();
  const bars=page.getByTestId('histogram-bar'); await expect(bars).toHaveCount(8);
  await expect.poll(async()=>bars.first().evaluate(e=>e.getBoundingClientRect().height)).toBeGreaterThan(15);
  await page.getByRole('button',{name:'Gen Z',exact:true}).click();
  await expect.poll(async()=>bars.first().evaluate(e=>e.getBoundingClientRect().height)).toBeGreaterThan(24);
});

test('all visible controls are labelled and page sections have unique IDs', async ({ page }) => {
  await page.goto('/');
  const duplicates=await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);return ids.filter((id,i)=>ids.indexOf(id)!==i)});
  expect(duplicates).toEqual([]);
  for(const id of ['aircraft-analytics','supply-chain-delay','crypto-prediction','interactive-data-platform']){
    await page.locator('#btn-proj-simulate-'+id).click();
    await expect(page.locator('#project-demo [data-project-id]')).toHaveAttribute('data-project-id', id);
    await expect(page.locator('#project-demo button, #project-demo input').first()).toBeVisible();
    expect(await page.locator('input,textarea,select').evaluateAll(elements=>elements.filter(e=>!(e as HTMLInputElement).labels?.length && !e.getAttribute('aria-label')).map(e=>e.outerHTML))).toEqual([]);
  }
});

test('mobile layouts and both themes remain within the viewport', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  for(const width of [320,390,768,1440]) {
    await page.setViewportSize({width,height:900}); await page.goto('/');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    const sections=await page.locator('main > section').evaluateAll(elements=>elements.map(e=>e.id||e.querySelector('section')?.id));
    expect(sections.slice(0,2)).toEqual(['home','projects']);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({path: 'tmp/review/portfolio-' + width + '-dark.png', fullPage: false, animations: 'disabled'});
    await page.getByRole('button',{name:/Use (light|dark) theme/}).click();
    await page.screenshot({path: 'tmp/review/portfolio-' + width + '-light.png', fullPage: false, animations: 'disabled'});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
});
