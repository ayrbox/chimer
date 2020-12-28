import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import getInvoice from '../../utils/getInvoice';

import Invoice from './Invoice';

const readFile = promisify(fs.readFile);

const wrapContent = async (contentHtml: string): Promise<string> => {
  const layoutFile = path.join(__dirname, 'layout.html');
  const layoutHtml = await readFile(layoutFile, 'utf-8');

  return layoutHtml.replace('<%content%>', contentHtml);
};

const render = async (invoiceId: string): Promise<string> => {
  const invoiceData = getInvoice(invoiceId);

  const content = ReactDOMServer.renderToStaticMarkup(
    <Invoice detail={invoiceData} />
  );

  return await wrapContent(content);
};

export default render;
