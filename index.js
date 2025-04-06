require('dotenv').config();
const starkbank = require('starkbank');

// create the starkbank.Project object for credentials usage
const project = new starkbank.Project({
  environment: process.env.STARKBANK_ENVIRONMENT,
  id: process.env.STARKBANK_PROJECT_ID,
  privateKey: process.env.STARKBANK_KEY.replace(/\n/g,"")
});

// set the user in the starkbank sdk using the starkbank.Project object created
starkbank.setUser(project);

// run function - main handler
module.exports.run = async (event, context) => {
  const invoicesToCreate = await generateFilledInvoiceTemplate();

  // create the invoices using starkbank sdk
  const invoices = await starkbank.invoice.create(invoicesToCreate);

  // logging just to make sure everything happened the way we expect it to happen
  return console.log(`
    Total of invoices requested to be created: ${invoicesToCreate.length}.
    Total of invoices actually created: ${invoices.length}.
  `);
};

/**
 * Generate the invoices template, filled, to send to starkbank
 * @returns {Array<starkbank.Invoice>}
 */
const generateFilledInvoiceTemplate = () => {
  const invoiceQuantity = generateInvoiceQuantity();
  const invoiceTemplates = [];

  // utilized a regular for for this one because we don't have nothing to iterate here i.e. an array
  for (let i = 0; i < invoiceQuantity; i++) {
    let template = {
      amount: generateInvoiceAmount(),
      taxId: '012.345.678-90',
      name: generateRandomStarkName()
    }
    invoiceTemplates.push(template);
  }

  return invoiceTemplates;
}


/**
 * Generates a random number of invoices to send
 * @returns {number} quantity
 */
const generateInvoiceQuantity = () => {
  const min = Math.ceil(8);
  const max = Math.floor(12);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Create a random stark name
 * @returns {string} name
 */
const generateRandomStarkName = () => {
  const firstNames = [
    'Arya', 'Brandon', 'Eddard', 'Catelyn', 'Robb',
    'Sansa', 'Jon', 'Rickon', 'Lyanna', 'Benjen',
    'Torrhen', 'Cregan', 'Rickard', 'Branda', 'Tony'
  ];

  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];

  return `${randomFirstName} Stark`;
}


/**
 * Generate a random amount ($$) for the invoice
 * @returns {number} amount
 */
const generateInvoiceAmount = () => {
  const min = Math.ceil(1);
  const max = Math.floor(5000);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}