import * as React from 'react';
import ReactDOMServer from 'react-dom/server';

export interface InvoiceIndexProps {
  name: string;
  timestamp: string;
}

const InvoiceIndex = ({ name, timestamp }: InvoiceIndexProps) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>{timestamp}</p>
    </div>
  );
};

const render = (nameInInvoice: string): string => {
  const t = new Date().toISOString();

  const content = ReactDOMServer.renderToStaticMarkup(
    <InvoiceIndex name={nameInInvoice} timestamp={t} />
  );
  return content;
};

export default render;
