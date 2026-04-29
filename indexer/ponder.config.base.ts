// SPDX-License-Identifier: Apache-2.0 OR MIT
// Copyright (c) 2026 Prova Network contributors.
//
// Ponder config for Base mainnet. Contract addresses are blank until
// the Prova v2 suite is deployed there (post-TGE).
//
// PHASE 2 STUB: see ponder.config.anvil.ts for the wiring shape.

import { createConfig } from "ponder"

const BASE = {
  CHAIN_ID: 8453,
  RPC: process.env.PROVA_RPC_URL ?? "https://mainnet.base.org",
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
    base: {
      id: BASE.CHAIN_ID,
      rpc: BASE.RPC,
      pollingInterval: 12_000,
    },
  },
  contracts: {
    // PHASE 2 STUB: contracts blank until Prova mainnet deploy.
  },
})

export { BASE, START_BLOCK }
