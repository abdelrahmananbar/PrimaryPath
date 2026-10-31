import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

const button = (page: Page, name: string | RegExp, exact = false) => page.getByRole('button', { name, exact }).first()
const dialogButton = (page: Page, name: string) => page.getByRole('dialog').getByRole('button', { name })

test('login shows every role and fits one laptop screen', async ({ page }) => {
  await page.setViewportSize({ width: 1536, height: 730 })
  await page.goto('/#/')
  for (const role of ['Student', 'Teacher', 'Parent', 'Counsellor']) {
    await expect(button(page, role)).toBeVisible()
  }
  await page.waitForTimeout(300)
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  expect(height).toBeLessThanOrEqual(730)
})

test('each role logs in to its own home page', async ({ page }) => {
  const routes: [string, string, RegExp][] = [
    ['Student', "Let's go!", /#\/s\/map$/],
    ['Teacher', 'Log in', /#\/t$/],
    ['Parent', 'Log in', /#\/parent$/],
    ['Counsellor', 'Log in', /#\/counsellor$/],
  ]
  for (const [role, cta, url] of routes) {
    await page.goto('/#/')
    await button(page, role).click()
    await button(page, cta).click()
    await expect(page).toHaveURL(url)
  }
})

test('student cannot send a blurry paper until it is retaken and checked', async ({ page }) => {
  await page.goto('/#/s/upload')
  await button(page, 'Take a photo').click()
  const send = button(page, 'Send to your teacher')
  await expect(send).toBeDisabled()
  await page.getByRole('button', { name: 'Retake' }).nth(1).click()
  await send.click()
  const confirm = button(page, 'Yes, send it!')
  await expect(confirm).toBeDisabled()
  for (const box of await page.getByRole('checkbox').all()) await box.check()
  await confirm.click()
  await expect(page).toHaveURL(/#\/s\/sent$/)
})

test('opening a result clears its mailbox notification', async ({ page }) => {
  await page.goto('/#/s/mail')
  await expect(page.getByRole('link', { name: /Mailbox, 2 new/ })).toBeVisible()
  await button(page, 'Read', true).click()
  await expect(page).toHaveURL(/#\/s\/result$/)
  await expect(page.getByRole('link', { name: /Mailbox, 1 new/ })).toBeVisible()
})

test('language switch changes the student page to German', async ({ page }) => {
  await page.goto('/#/s/result')
  await button(page, 'DE', true).click()
  await expect(page.getByRole('heading', { name: 'Bruchrechnen · mein Ergebnis' })).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('lang', 'de')
})

test('riddle gives feedback, and beating it earns a sticker', async ({ page }) => {
  await page.goto('/#/s/riddle')
  await expect(button(page, 'Check!')).toBeDisabled()
  await button(page, '2/3', true).click()
  await expect(page.getByRole('alert')).toContainText('Not quite')
  await button(page, '3/4', true).click()
  await button(page, 'Check!').click()
  await expect(page.getByText('Yes! 3/4 is bigger.')).toBeVisible()
  await button(page, 'Next riddle').click()
  await expect(page.getByRole('link', { name: '5 stickers' })).toBeVisible()
})

test('teacher must check low-confidence OCR text before grading', async ({ page }) => {
  await page.goto('/#/t/grade/scans')
  const next = button(page, 'Next: Confirm grades')
  await expect(next).toBeDisabled()
  await page.getByLabel('Corrected word').fill('denominator')
  await button(page, 'Looks right').click()
  await expect(next).toBeEnabled()
})

test('overriding an AI grade requires a reason', async ({ page }) => {
  await page.goto('/#/t/grade/grades')
  await button(page, 'Change grade').click()
  await dialogButton(page, '2').click()
  const save = dialogButton(page, 'Save change')
  await expect(save).toBeDisabled()
  await page.getByPlaceholder('Why are you changing it?').fill('Partly right reasoning.')
  await save.click()
  await expect(page.getByText('Q4 group, 7 papers')).toBeVisible()
})

test('a red flag can be dismissed and restored, or assigned', async ({ page }) => {
  await page.goto('/#/t/grade/gaps')
  await button(page, 'Dismiss flag').click()
  await dialogButton(page, 'Dismiss flag').click()
  await expect(page.getByText('Red flag dismissed. Lina won’t get a Guardian.')).toBeVisible()
  await button(page, 'Undo').click()
  await button(page, 'Assign Guardian').click()
  await dialogButton(page, 'Assign Guardian').click()
  await expect(page.getByText('Fraction Guardian assigned to Lina')).toBeVisible()
})

test('edited feedback updates the pupil preview', async ({ page }) => {
  await page.goto('/#/t/grade/feedback')
  await page.getByLabel('Feedback draft').fill('Great effort, Lina')
  await expect(page.getByRole('complementary').getByText('Great effort, Lina')).toBeVisible()
  await expect(page.getByText('3 words, reading age 8 to 9')).toBeVisible()
})

test('publishing asks for confirmation and offers undo', async ({ page }) => {
  await page.goto('/#/t/grade/publish')
  await button(page, 'Publish results').click()
  await dialogButton(page, 'Publish results').click()
  await expect(page).toHaveURL(/#\/t\/published$/)
  await expect(page.getByText(/Undo \(\d+s\)/)).toBeVisible()
})

test('parent can switch between children on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#/parent')
  await button(page, 'Choose a child').click()
  await button(page, /Adam A\./).click()
  await expect(page.getByText('Adam knows his shapes well')).toBeVisible()
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
  expect(overflow).toBe(false)
})
