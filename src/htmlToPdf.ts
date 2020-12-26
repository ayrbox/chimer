import puppeteer from 'puppeteer';

export const htmlToPdf = async (html: string): Promise<Buffer> => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, {
      waitUntil: 'domcontentloaded',
    });

    return await page.pdf();
  } catch (pdfErr) {
    throw pdfErr;
  } finally {
    await browser.close();
  }
};
