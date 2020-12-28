import invoiceRenderer from './templates/invoice/index';

import express from 'express';
import bodyParser from 'body-parser';

import { htmlToPdf } from './htmlToPdf';

const app = express();

app.post(
  '/pdf/:fileName',
  bodyParser.text({ type: 'text/html' }),
  async (req, res) => {
    const { body: htmlToConvert, params } = req;

    const fileName = `${params.fileName || 'unknown'}.pdf`;

    try {
      const pdfBuffer = await htmlToPdf(htmlToConvert);
      res.attachment(fileName);
      res.contentType('application/pdf');
      res.send(pdfBuffer);
    } catch (err) {
      throw err;
    }
  }
);

app.get('/invoice', async (_, res) => {
  try {
    const html = await invoiceRenderer();
    const pdfBuffer = await htmlToPdf(html);
    res.contentType('application/pdf');
    res.setHeader('Content-Length', pdfBuffer.length);

    // TODO: read node env from process.evn
    const NODE_ENV = 'development';
    if (NODE_ENV !== 'development') {
      const fileName = `test-invoice.pdf`;
      res.attachment(fileName);
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    }

    res.send(pdfBuffer);
  } catch (err) {
    throw err;
  }
});

app.listen(3000, () => {
  console.log('Listenning at 3000');
});
