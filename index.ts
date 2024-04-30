import puppeteer from 'puppeteer';

const url = 'https://www.scoop.solar/case-studies/';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(url);

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  const articleLinks = await page.evaluate(async () => {
    const articles = Array.from(document.querySelectorAll(".elementor-post__thumbnail__link"));
    return articles.map((article) => ({
      url: article.getAttribute('href')
    }))
  });
  console.log(articleLinks);

  articleLinks.map(async (link) => {
    if (!link.url) throw new Error('No URL found');
    await page.goto(link.url);
    console.log('Navigating to: ', link.url);
  });



  

  await browser.close();
})();