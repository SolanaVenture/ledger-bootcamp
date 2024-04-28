export type LedgerBootcamp = {
  "version": "0.1.0",
  "name": "ledger_bootcamp",
  "instructions": [
    {
      "name": "greet",
      "accounts": [],
      "args": []
    },
    {
      "name": "initBootcampEscrow",
      "accounts": [
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bootcampId",
          "type": "string"
        }
      ]
    }
  ]
};

export const IDL: LedgerBootcamp = {
  "version": "0.1.0",
  "name": "ledger_bootcamp",
  "instructions": [
    {
      "name": "greet",
      "accounts": [],
      "args": []
    },
    {
      "name": "initBootcampEscrow",
      "accounts": [
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bootcampId",
          "type": "string"
        }
      ]
    }
  ]
};
