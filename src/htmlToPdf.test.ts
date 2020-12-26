import { htmlToPdf } from './htmlToPdf';

describe('htmlToPdf', () => {
  it('should return pdf buffer', async () => {
    const _html = `<!doctype html><html><body><h1>Hello Converter</h1></body></html>`;
    const buffer = await htmlToPdf(_html);
    expect(Buffer.isBuffer(buffer)).toBeTruthy();
  });
});
