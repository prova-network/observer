// SPDX-License-Identifier: Apache-2.0 OR MIT
// Copyright (c) 2026 Prova Network contributors.
//
// Ponder config for Base Sepolia (testnet). Contract addresses are
// blank until the Prova v2 suite is deployed there
// (tracked in https://github.com/prova-network/prova/issues/1).
//
// PHASE 2 STUB: see ponder.config.anvil.ts for the wiring shape.

import { createConfig } from "ponder"

const BASE_SEPOLIA = {
  CHAIN_ID: 84532,
  RPC: process.env.PROVA_RPC_URL ?? "https://sepolia.base.org",
  PROVA_TOKEN:        process.env.PROVA_CONTRACT_PROVA_TOKEN        ?? "",
  PROOF_VERIFIER:     process.env.PROVA_CONTRACT_PROOF_VERIFIER     ?? "",
  PROVER_REGISTRY:    process.env.PROVA_CONTRACT_PROVER_REGISTRY    ?? "",
  PROVER_STAKING:     process.env.PROVA_CONTRACT_PROVER_STAKING     ?? "",
  CONTENT_REGISTRY:   process.env.PROVA_CONTRACT_CONTENT_REGISTRY   ?? "",
  STORAGE_MARKETPLACE: process.env.PROVA_CONTRACT_STORAGE_MARKETPLACE ?? "",
  FEE_ROUTER:         process.env.PROVA_CONTRACT_FEE_ROUTER         ?? "",
  PROVER_REWARDS:     process.env.PROVA_CONTRACT_PROVER_REWARDS     ?? "",
} as const

const START_BLOCK = Number(process.env.PROVA_INDEX_FROM_BLOCK ?? "0")

export default createConfig({
  database: {
    kind: "postgres",
    connectionString: process.env.DATABASE_URL ?? "postgres://ponder:ponder@localhost:17826/ponder",
  },
  chains: {
    "base-sepolia": {
      id: BASE_SEPOLIA.CHAIN_ID,
      rpc: BASE_SEPOLIA.RPC,
      pollingInterval: 5_000,
    },
  },
  contracts: {
    // PHASE 2 STUB: contracts blank until prova-network/prova#1 lands
    // testnet addresses.
  },
})

export { BASE_SEPOLIA, START_BLOCK }
