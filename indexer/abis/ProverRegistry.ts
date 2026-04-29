// Auto-generated from prova-network/contracts forge artifacts.
// Source: contracts/out/ProverRegistry.sol/ProverRegistry.json
// Regenerate via: bash scripts/generate-abis.sh
// SPDX-License-Identifier: MIT

export const ProverRegistryAbi = [
  {
    "type": "constructor",
    "inputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "FEATURE_HTTPS_SERVING",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "FEATURE_PDP",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "MAX_ENDPOINT_LENGTH",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "MAX_METADATA_LENGTH",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "bindENS",
    "inputs": [
      {
        "name": "ensNode",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "deregister",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getProver",
    "inputs": [
      {
        "name": "prover",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct ProverRegistry.Prover",
        "components": [
          {
            "name": "owner",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "endpoint",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "features",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "pricePerGibDay",
            "type": "uint128",
            "internalType": "uint128"
          },
          {
            "name": "pricePerByteServed",
            "type": "uint128",
            "internalType": "uint128"
          },
          {
            "name": "registeredAt",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "updatedAt",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "active",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "ensNode",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "metadata",
            "type": "string",
            "internalType": "string"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isActive",
    "inputs": [
      {
        "name": "prover",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "known",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "listActive",
    "inputs": [
      {
        "name": "offset",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "limit",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "result",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "nextOffset",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "proverAddresses",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "provers",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "endpoint",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "features",
        "type": "uint64",
        "internalType": "uint64"
      },
      {
        "name": "pricePerGibDay",
        "type": "uint128",
        "internalType": "uint128"
      },
      {
        "name": "pricePerByteServed",
        "type": "uint128",
        "internalType": "uint128"
      },
      {
        "name": "registeredAt",
        "type": "uint64",
        "internalType": "uint64"
      },
      {
        "name": "updatedAt",
        "type": "uint64",
        "internalType": "uint64"
      },
      {
        "name": "active",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "ensNode",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "metadata",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "register",
    "inputs": [
      {
        "name": "endpoint",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "features",
        "type": "uint64",
        "internalType": "uint64"
      },
      {
        "name": "pricePerGibDay",
        "type": "uint128",
        "internalType": "uint128"
      },
      {
        "name": "pricePerByteServed",
        "type": "uint128",
        "internalType": "uint128"
      },
      {
        "name": "metadata",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setPrice",
    "inputs": [
      {
        "name": "pricePerGibDay",
        "type": "uint128",
        "internalType": "uint128"
      },
      {
        "name": "pricePerByteServed",
        "type": "uint128",
        "internalType": "uint128"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "supportsFeature",
    "inputs": [
      {
        "name": "prover",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "feature",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalRegistered",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      {
        "name": "newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateEndpoint",
    "inputs": [
      {
        "name": "endpoint",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "features",
        "type": "uint64",
        "internalType": "uint64"
      },
      {
        "name": "metadata",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "ENSBound",
    "inputs": [
      {
        "name": "prover",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "ensNode",
        "type": "bytes32",
        "indexed": false,
        "internalType": "bytes32"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "PriceChanged",
    "inputs": [
      {
        "name": "prover",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "pricePerGibDay",
        "type": "uint128",
        "indexed": false,
        "internalType": "uint128"
      },
      {
        "name": "pricePerByteServed",
        "type": "uint128",
        "indexed": false,
        "internalType": "uint128"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ProverDeregistered",
    "inputs": [
      {
        "name": "prover",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ProverRegistered",
    "inputs": [
      {
        "name": "prover",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "endpoint",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "features",
        "type": "uint64",
        "indexed": false,
        "internalType": "uint64"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ProverUpdated",
    "inputs": [
      {
        "name": "prover",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "endpoint",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "features",
        "type": "uint64",
        "indexed": false,
        "internalType": "uint64"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "AlreadyRegistered",
    "inputs": []
  },
  {
    "type": "error",
    "name": "EndpointTooLong",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidFeatures",
    "inputs": []
  },
  {
    "type": "error",
    "name": "MetadataTooLong",
    "inputs": []
  },
  {
    "type": "error",
    "name": "NotOwner",
    "inputs": []
  },
  {
    "type": "error",
    "name": "NotRegistered",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OwnableInvalidOwner",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "OwnableUnauthorizedAccount",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ]
  }
] as const
