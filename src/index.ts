import invoiceRenderer from "./templates/invoice";
import express, { NextFunction, Request, Response } from "express";

import bodyParser from "body-parser";

import { htmlToPdf } from "./htmlToPdf";
import HttpError from "./Errors/HttpError";

const NODE_ENV = process.env.NODE_ENV || "development";

const PORT = 3080;

const app = express();

app.post(
  "/pdf/:fileName",
  bodyParser.text({ type: "text/html" }),
  async (req, res, next) => {
    const { body: htmlToConvert, params } = req;
    const fileName = `${params.fileName || "unknown"}.pdf`;

    try {
      const pdfBuffer = await htmlToPdf(htmlToConvert);
      res.attachment(fileName);
      res.contentType("application/pdf");
      res.send(pdfBuffer);
    } catch (err: any) {
      next(new HttpError(500, "Unable to convert html to pdf.", err));
    }
  }
);

app.get("/invoice/:invoiceId", async (req, res, next: NextFunction) => {
  try {
    const { invoiceId } = req.params;
    const html = await invoiceRenderer(invoiceId);
    const pdfBuffer = await htmlToPdf(html);
    res.contentType("application/pdf");
    res.setHeader("Content-Length", pdfBuffer.length);

    if (NODE_ENV !== "development") {
      const fileName = `${invoiceId}.pdf`;
      res.attachment(fileName);
    }
    res.send(pdfBuffer);
  } catch (err: any) {
    next(
      new HttpError(err.status || 500, "Unable to generate pdf invoice.", err)
    );
  }
});

app.use(
  async (error: HttpError, _: Request, res: Response, next: NextFunction) => {
    if (error) {
      const { status, message, stack } = error;
      console.error(message, stack); // to be replaced by logger
      return res.status(status).send({
        status,
        msg: message,
      });
    } else {
      next();
    }
  }
);

app.listen(PORT, () => {
  console.log(`Listenning at ${PORT}`);
});
