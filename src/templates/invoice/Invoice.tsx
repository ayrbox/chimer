import * as React from "react";
import { readFileSync } from "fs";
import Paper from "../../components/Paper";
import { InvoiceData } from "../../utils/getInvoice";

import format from "date-fns/format";
import Head from "../../components/Head";
import Body from "../../components/Body";

export interface InvoiceIndexProps {
  detail: InvoiceData;
}

const invoiceCss = readFileSync("./src/styles/invoice.css").toString();

const Invoice = ({ detail }: InvoiceIndexProps) => {
  return (
    <Paper>
      <>
        <Head>{invoiceCss}</Head>
        <Body>
          <div>
            <h1>Simple invoice example for Chimer PDF</h1>
            Find the code on{" "}
            <a href="https://github.com/ayrbox/chimer">Chimer</a>.
            <br />
            <br />
            <br />
            <div className="invoice-box">
              <table cellPadding="0" cellSpacing="0">
                <tr className="top">
                  <td colSpan={2}>
                    <table>
                      <tr>
                        <td>
                          Invoice #: {detail.invoiceNumber}
                          <br />
                          Created: {format(detail.createdDate, "MMMM dd, yyyy")}
                          <br />
                          Due: {format(detail.dueDate, "MMMM dd, yyyy")}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr className="information">
                  <td colSpan={2}>
                    <table>
                      <tr>
                        <td>
                          {detail.companyName}
                          <br />
                          {detail.companyAddress}
                        </td>
                        <td>{detail.companyEmail}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr className="heading">
                  <td>Description</td>
                  <td>Price</td>
                </tr>
                {detail.items.map(({ id, description, amount }) => (
                  <tr className="item" key={id}>
                    <td>{description}</td>
                    <td>
                      {amount} {detail.currency}
                    </td>
                  </tr>
                ))}

                <tr className="total">
                  <td></td>
                  <td>
                    Total: {detail.total.toFixed(2)} {detail.currency}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </Body>
      </>
    </Paper>
  );
};

export default Invoice;
