import { Factory } from 'rosie';

import { company, random, date, address, internet } from 'faker';

export interface InvoiceItem {
  id: number;
  description: string;
  amount: number;
}

export interface InvoiceData {
  id: string;
  invoiceNumber: number;
  createdDate: Date;
  dueDate: Date;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  items: InvoiceItem[];
  total: number;
  currency: string;
}

Factory.define('invoice')
  .attr('id', () => random.uuid())
  .attr('invoiceNumber', () => random.number())
  .attr('createdDate', () => date.recent())
  .attr('dueDate', () => date.soon(30))
  .attr('companyName', () => company.companyName())
  .attr('companyAddress', () => address.streetAddress())
  .attr('companyEmail', () => internet.email())
  .option('noOfItems', 5)
  .attr('items', ['noOfItems'], (noOfItems) =>
    new Array(noOfItems).fill(null).map((_, id) => ({
      id,
      description: random.words(),
      amount: random.float(),
    }))
  )
  .attr('currency', 'GBP')
  .attr('total', ['items'], (items: InvoiceItem[]) =>
    items.reduce((total, { amount }) => total + amount, 0)
  );

const getInvoice = (): InvoiceData => {
  const noOfItems = random.number({ min: 5, max: 20 });
  return Factory.build('invoice', {}, { noOfItems }) as InvoiceData;
};

export default getInvoice;
