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

const render = async (): Promise<[string, string]> => {
  const invoiceData = getInvoice();

  const content = ReactDOMServer.renderToStaticMarkup(
    <Invoice detail={invoiceData} />
  );

  const fullHtml = await wrapContent(content);

  return [invoiceData.id, fullHtml];
};

export default render;
