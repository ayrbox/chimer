import invoiceRenderer from './templates/invoice/index';
import express, { NextFunction, Request, Response } from 'express';

import bodyParser from 'body-parser';

import { htmlToPdf } from './htmlToPdf';

const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

app.post(
  '/pdf/:fileName',
  bodyParser.text({ type: 'text/html' }),
  async (req, res, next) => {
    const { body: htmlToConvert, params } = req;

    const fileName = `${params.fileName || 'unknown'}.pdf`;

    try {
      const pdfBuffer = await htmlToPdf(htmlToConvert);
      res.attachment(fileName);
      res.contentType('application/pdf');
      res.send(pdfBuffer);
    } catch (err) {
      next(err);
    }
  }
);

app.get('/invoice/:invoiceId', async (req, res, next: NextFunction) => {
  try {
    const { invoiceId } = req.params;
    const html = await invoiceRenderer(invoiceId);
    const pdfBuffer = await htmlToPdf(html);
    res.contentType('application/pdf');
    res.setHeader('Content-Length', pdfBuffer.length);

    if (NODE_ENV !== 'development') {
      const fileName = `${invoiceId}.pdf`;
      res.attachment(fileName);
    }

    res.send(pdfBuffer);
  } catch (err) {
    next(err);
  }
});

app.use(async (error: Error, _: Request, res: Response, next: NextFunction) => {
  if (error) {
    return res.status(500).send({
      status: 500,
      msg: error.message,
    });
  } else {
    next();
  }
});

app.listen(3000, () => {
  console.log('Listenning at 3000');
});
