import { Factory } from 'rosie';
import { company, random, date, address, internet, datatype } from 'faker';

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

Factory.define<InvoiceData>('invoice')
  .attr('id', () => datatype.uuid())
  .attr('invoiceNumber', () => datatype.number())
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
      amount: datatype.float(),
    }))
  )
  .attr('currency', 'GBP')
  .attr('total', ['items'], (items: InvoiceItem[]): number =>
    items.reduce((total, { amount }) => total + amount, 0)
  );

const getInvoice = (invoiceId: string): InvoiceData => {
  const noOfItems = datatype.number({ min: 5, max: 20 });
  return Factory.build(
    'invoice',
    { id: invoiceId },
    { noOfItems }
  ) as InvoiceData;
};

export default getInvoice;
