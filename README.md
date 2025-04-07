# Stark Invoice Generator

This project is a tool for generating invoices using the Stark Bank API. It is implemented as an AWS Lambda function, scheduled to run periodically using the Serverless Framework.

## Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started)
- A Stark Bank account and API key

## Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/your-username/stark-invoice-generator.git
  cd stark-invoice-generator
  ```

2. Install dependencies:
  ```bash
  npm install
  ```
  Or, if using yarn:
  ```bash
  yarn install
  ```

## Configuration

1. Create a `.env` file in the root directory and add the following environment variables:
  ```env
  STARKBANK_KEY=your_private_key_here
  STARKBANK_PROJECT_ID=your_project_id_here
  STARKBANK_ENVIRONMENT=sandbox # or production
  ```

2. Replace `your_private_key_here` with your actual Stark Bank private key (in PEM format, with line breaks replaced by `\n`).

3. Replace `your_project_id_here` with your actual Stark Bank project ID.

## Running Locally

To test the Lambda function locally, use the `serverless-offline` plugin:

1. Start the offline environment:
  ```bash
  serverless offline
  ```

2. The function will be available locally and can be triggered based on the configured schedule or manually via the Serverless Framework.

## Deploying to AWS

In order to deploy, you should have serverless framework CLI already configured with your AWS Account credentials.

To deploy the function to AWS, run:
```bash
serverless deploy
```