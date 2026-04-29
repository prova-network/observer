// Auto-generated from prova-network/contracts forge artifacts.
// Source: contracts/out/ContentRegistry.sol/ContentRegistry.json
// Regenerate via: bash scripts/generate-abis.sh
// SPDX-License-Identifier: MIT

export const ContentRegistryAbi = [
  {
    "type": "constructor",
    "inputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "admin",
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
    "name": "bindENS",
    "inputs": [
      {
        "name": "commpHash",
        "type": "bytes32",
        "internalType": "bytes32"
      },
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
    "name": "clearActiveDeal",
    "inputs": [
      {
        "name": "commpHash",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "expectedDealId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "commpByENS",
    "inputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "contentByHash",
    "inputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "activeDealId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "pieceSize",
        "type": "uint64",
        "internalType": "uint64"
      },
      {
        "name": "firstSeen",
        "type": "uint64",
        "internalType": "uint64"
      },
      {
        "name": "lastUpdated",
        "type": "uint64",
        "internalType": "uint64"
      },
      {
        "name": "ensNode",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getContent",
    "inputs": [
      {
        "name": "commpHash",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct ContentRegistry.Content",
        "components": [
          {
            "name": "owner",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "activeDealId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "pieceSize",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "firstSeen",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "lastUpdated",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "ensNode",
            "type": "bytes32",
            "internalType": "bytes32"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "hasActiveDeal",
    "inputs": [
      {
        "name": "commpHash",
        "type": "bytes32",
        "internalType": "bytes32"
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
    "name": "marketplace",
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
    "name": "registerContent",
    "inputs": [
      {
        "name": "commpHash",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "dealId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "pieceSize",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "resolveENS",
    "inputs": [
      {
        "name": "ensNode",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct ContentRegistry.Content",
        "components": [
          {
            "name": "owner",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "activeDealId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "pieceSize",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "firstSeen",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "lastUpdated",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "ensNode",
            "type": "bytes32",
            "internalType": "bytes32"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "setMarketplace",
    "inputs": [
      {
        "name": "_marketplace",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferAdmin",
    "inputs": [
      {
        "name": "newAdmin",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "unbindENS",
    "inputs": [
      {
        "name": "commpHash",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "ContentDealUpdated",
    "inputs": [
      {
        "name": "commpHash",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "oldDealId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "newDealId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ContentRegistered",
    "inputs": [
      {
        "name": "commpHash",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "owner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "dealId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "pieceSize",
        "type": "uint64",
        "indexed": false,
        "internalType": "uint64"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ENSBound",
    "inputs": [
      {
        "name": "commpHash",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "ensNode",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "by",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ENSUnbound",
    "inputs": [
      {
        "name": "commpHash",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "ensNode",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "MarketplaceSet",
    "inputs": [
      {
        "name": "oldMarketplace",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newMarketplace",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "ContentNotFound",
    "inputs": []
  },
  {
    "type": "error",
    "name": "ENSAlreadyBound",
    "inputs": []
  },
  {
    "type": "error",
    "name": "ENSNotBoundHere",
    "inputs": []
  },
  {
    "type": "error",
    "name": "NotContentOwner",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OnlyAdmin",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OnlyMarketplace",
    "inputs": []
  }
] as const
