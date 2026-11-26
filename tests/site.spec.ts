import { test, expect } from "@playwright/test";
const routes = [
  "about",
  "services",
  "technology",
  "sustainability",
  "investors",
  "stories",
  "careers",
];
test("seven direct pages, refresh, navigation and browser back", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("새벽을 여는 MNDW");
  for (const route of routes) {
    const response = await page.goto("/" + route);
    expect(response?.status()).toBe(200);
    await page.reload();
    await expect(page.locator("h1")).toBeVisible();
    await page.getByRole("link", { name: "MNDW 홈", exact: true }).click();
    await expect(page).toHaveURL(/\/$/);
    await page.goBack();
    await expect(page).toHaveURL(new RegExp("/" + route + "$"));
  }
  expect(errors).toEqual([]);
});
test("published content appears while empty sections stay hidden", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.locator(".story-grid"),
  ).toHaveCount(0);
  await expect(page.locator(".service-feature")).toHaveCount(1);
  await expect(page.locator(".timeline li")).toHaveCount(2);
  for (const route of ["", ...routes]) {
    await page.goto("/" + route);
    const invalid = await page
      .locator("a")
      .evaluateAll(
        (nodes) =>
          nodes.filter(
            (a) =>
              !a.getAttribute("href") ||
              ["#", "undefined"].includes(a.getAttribute("href")!),
          ).length,
      );
    expect(invalid).toBe(0);
  }
  await page.goto("/investors");
  await expect(
    page.getByText("현재 공개된 투자 자료가 없습니다."),
  ).toBeVisible();
  const response = await page.goto("/services/not-registered");
  expect(response?.status()).toBe(404);
});
test("desktop and small mobile fit; keyboard disclosure opens all seven menus", async ({
  page,
}) => {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: width === 1440 ? 900 : 844 });
    await page.goto("/");
    await page.waitForTimeout(2200);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (width < 820) {
      const toggle = page.getByRole("button", { name: "메뉴" });
      await toggle.focus();
      await page.keyboard.press("Enter");
      const nav = page.getByRole("navigation", { name: "모바일 주 메뉴" });
      await expect(nav.getByRole("link")).toHaveCount(7);
      await expect(nav.getByRole("link").first()).toBeFocused();
      for (let i = 0; i < 6; i++) await page.keyboard.press("Tab");
      await expect(nav.getByRole("link").last()).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(toggle).toBeFocused();
      await expect(nav).toHaveCount(0);
      await toggle.click();
      await page
        .getByRole("navigation", { name: "모바일 주 메뉴" })
        .getByRole("link", { name: "서비스 Our services" })
        .click();
      await expect(page).toHaveURL(/\/services$/);
      await expect(nav).toHaveCount(0);
      await page.goto("/");
      await page.waitForTimeout(2100);
    }
    await page.screenshot({
      path: `../../work/home-${width}.png`,
      fullPage: true,
    });
  }
});
test("scroll and menu respond during sunrise; reduced motion starts complete", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".hero")).toHaveAttribute("data-ready", "true");
  await page.mouse.move(195, 300);
  await page.mouse.wheel(0, 600);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(0);
  await page.goto("/");
  await page.getByRole("button", { name: "메뉴" }).click();
  await expect(
    page.getByRole("navigation", { name: "모바일 주 메뉴" }),
  ).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".hero-caption")).toHaveCSS("opacity", "1");
  await expect(page.locator(".dawn-sky")).toHaveCSS("display", "none");
});
test("production excludes preview and all sample detail pages", async ({
  page,
}) => {
  test.skip(process.env.TEST_PREVIEW === "1");
  for (const route of [
    "/preview",
    "/preview/services/sample",
    "/preview/stories/sample",
    "/preview/investors/sample",
    "/preview/careers/sample",
  ]) {
    const res = await page.goto(route);
    expect(res?.status()).toBe(404);
    await expect(
      page.getByText(
        "개발 전용 미리보기 · 아래 예시는 실제 회사 자료가 아닙니다.",
      ),
    ).toHaveCount(0);
  }
});
test("development populated templates and detail back navigation", async ({
  page,
}) => {
  test.skip(process.env.TEST_PREVIEW !== "1");
  await page.goto("/preview");
  await expect(page.locator(".service-feature")).toHaveCount(1);
  await expect(page.locator(".timeline li")).toHaveCount(1);
  await expect(page.locator(".story")).toHaveCount(1);
  for (const route of ["services", "stories", "investors", "careers"]) {
    await page.goto("/preview/" + route);
    await page.locator(`a[href="/preview/${route}/sample"]`).first().click();
    await expect(page).toHaveURL(new RegExp("/preview/" + route + "/sample$"));
    await page.reload();
    await expect(page.locator("h1")).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL(new RegExp("/preview/" + route + "$"));
  }
});

test("team, undated history, game and recruitment links", async ({page}) => {
  await page.goto('/about');
  for(const name of ['김건우','고동현','박강민']) await expect(page.locator('.team-list')).toContainText(name);
  await expect(page.locator('.timeline')).toContainText('11월 23일');
  await expect(page.locator('.timeline')).toContainText('우수상');
  await expect(page.locator('.timeline time')).toHaveCount(0);
  await page.goto('/services/poop-wars');
  await expect(page.getByRole('link',{name:'게임 플레이하기'})).toHaveAttribute('href','https://mndw100.github.io/poop-wars/');
  await page.goto('/careers/always-open');
  await expect(page.getByRole('link',{name:'지원하기'})).toHaveAttribute('href','mailto:god640388@gmail.com');
});
