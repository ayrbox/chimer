import * as React from "react";
import ReactDOMServer from "react-dom/server";

import getInvoice from "../../utils/getInvoice";

import Invoice from "./Invoice";

const render = async (invoiceId: string): Promise<string> => {
  const invoiceData = getInvoice(invoiceId);
  const content = ReactDOMServer.renderToStaticMarkup(
    <Invoice detail={invoiceData} />
  );

  return content;
};

export default render;
