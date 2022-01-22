import puppeteer from "puppeteer";

const { CHROME_EXECUTABLE_PATH } = process.env;

export const htmlToPdf = async (html: string): Promise<Buffer> => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: CHROME_EXECUTABLE_PATH, // executablePath is required to be run from docker but not from local machine
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, {
      waitUntil: "domcontentloaded",
    });

    return await page.pdf({ format: "a4" });
  } catch (pdfErr) {
    throw pdfErr;
  } finally {
    await browser.close();
  }
};
