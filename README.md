# ledger-bootcamp

A mini deposit-refund system for Encode Club that allows users to deposit 250 USDC (from whatever platform they are using) and receive an automatic refund if certain conditions are met.

The refund condition would be a minimum 90% attendence time. The authorized Encode Club accounts would be able to approve the refund...etc.

Smart Contract for Deposit and Refund: Manages the logic for depositing USDC, tracking attendance, and processing refunds.

Frontend Application: Interfaces with the smart contract for users and staff. Allows users to deposit USDC and view their attendance and refund status. Allows authorized accounts to verify and approve refunds.

Oracles or Integrations for Attendance Tracking: Reliable tracking and recording of attendance data which would likely need to interface with the educational platform's backend. (Not too familiar with oracles though)

This project is generated with the [create-solana-dapp](https://github.com/solana-developers/create-solana-dapp) generator.

## Getting Started

### Prerequisites

- Node v18.18.0 or higher

- Rust v1.70.0 or higher
- Anchor CLI 0.29.0 or higher (we use 0.29.0 here)
- Solana CLI 1.17.0 or higher

### Development

1. Make sure you are at localnet, build the anchor program and deploy it:

```shell
cd anchor
anchor build
```

2. Open a termial:

```shell
solana-test-validator
```

3. Open a terminal:

```shell
solana logs
```

4. Open a terminal and run the web2 backend api server (make sure the environment of mongdb is ready):

```shell
cd web2-api
npm run dev
```

5. Open another terminal and run the react app (make sure at the root directory):

```shell
npm run dev
```

6.  open http://localhost:3000 and make sure you have installed the browser wallet plugin like Phantom, set it to the development and use the local network

## Apps

### anchor

This is a Solana program written in Rust using the Anchor framework.

#### Commands

You can use any normal anchor commands. Either move to the `anchor` directory and run the `anchor` command or prefix the command with `npm run`, eg: `npm run anchor`.

#### Sync the program id:

Running this command will create a new keypair in the `anchor/target/deploy` directory and save the address to the Anchor config file and update the `declare_id!` macro in the `./src/lib.rs` file of the program.

You will manually need to update the constant in `anchor/lib/basic-exports.ts` to match the new program id.

```shell
npm run anchor keys sync
```

#### Build the program:

```shell
npm run anchor-build
```

#### Start the test validator with the program deployed:

```shell
npm run anchor-localnet
```

#### Run the tests

```shell
npm run anchor-test
```

#### Deploy to Devnet

```shell
npm run anchor deploy --provider.cluster devnet
```

### ExpressJS Web2 backend

We use MongoDB as the backend database.

You can host MongoDB by yourself, or use the cloud solutions like [mongodb atlas](https://www.mongodb.com/cloud/atlas)

Create a `.env` file at the `web2-api` directory:

```
DB_PASSWORD=[DB_PASSWORD]
```

Modify the connection string at `web2-api/index.js` (**TODO**)

Then:

```shell
cd web2-api
npm run dev
```

Add the organizer:

```shell
cd web-api
npm run manage
```

### React App

This is a React app that uses the Anchor generated client to interact with the Solana program.

#### Commands

Start the web app

```shell
npm run dev
```

Build the web app

```shell
npm run build
```
