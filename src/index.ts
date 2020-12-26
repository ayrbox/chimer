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

app.listen(3000, () => {
  console.log('Listenning at 3000');
});
