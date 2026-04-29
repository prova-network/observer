// SPDX-License-Identifier: Apache-2.0 OR MIT
// Copyright (c) 2026 Prova Network contributors.
//
// Ponder config for local-anvil development. Indexes Prova v2 contracts
// at the deterministic addresses produced by `contracts/script/Deploy.s.sol`
// against a fresh anvil instance with the standard pre-funded account 0
// as deployer.

import { createConfig } from "ponder"
import { ContentRegistryAbi } from "./abis/ContentRegistry"
import { FeeRouterAbi } from "./abis/FeeRouter"
import { ProofVerifierAbi } from "./abis/ProofVerifier"
import { ProvaTokenAbi } from "./abis/ProvaToken"
import { ProverRegistryAbi } from "./abis/ProverRegistry"
import { ProverRewardsAbi } from "./abis/ProverRewards"
import { ProverStakingAbi } from "./abis/ProverStaking"
import { StorageMarketplaceAbi } from "./abis/StorageMarketplace"

const ANVIL = {
  CHAIN_ID: 31337,
  RPC: process.env.PROVA_RPC_URL ?? "http://127.0.0.1:8545",
  // Deterministic addresses from contracts/script/Deploy.s.sol against
  // a fresh anvil with deployer = anvil account 0
  // (0xf39Fd6e51aad88F6F4ce6aB8827279cfFFb92266).
  PROVA_TOKEN:        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  PROOF_VERIFIER:     "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
  PROVER_REGISTRY:    "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  PROVER_STAKING:     "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
  CONTENT_REGISTRY:   "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
  STORAGE_MARKETPLACE: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
  FEE_ROUTER:         "0x0165878A594ca255338adfa4d48449f69242Eb8F",
  PROVER_REWARDS:     "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
} as const

// Anvil starts at block 0 every time you `anvil` so START_BLOCK = 0 is
// fine. For a long-running anvil with many fresh deploys, set this
// explicitly via the env var.
const START_BLOCK = Number(process.env.PROVA_INDEX_FROM_BLOCK ?? "0")

export default createConfig({
  database: {
    kind: "postgres",
    connectionString: process.env.DATABASE_URL ?? "postgres://ponder:ponder@localhost:17826/ponder",
  },
  chains: {
    anvil: {
      id: ANVIL.CHAIN_ID,
      rpc: ANVIL.RPC,
      pollingInterval: 2_000,
    },
  },
  contracts: {
    StorageMarketplace: {
      abi: StorageMarketplaceAbi,
      chain: "anvil",
      address: ANVIL.STORAGE_MARKETPLACE,
      startBlock: START_BLOCK,
      includeTransactionReceipts: true,
    },
    ProofVerifier: {
      abi: ProofVerifierAbi,
      chain: "anvil",
      address: ANVIL.PROOF_VERIFIER,
      startBlock: START_BLOCK,
      includeTransactionReceipts: true,
    },
    ProverStaking: {
      abi: ProverStakingAbi,
      chain: "anvil",
      address: ANVIL.PROVER_STAKING,
      startBlock: START_BLOCK,
      includeTransactionReceipts: true,
    },
    ProverRegistry: {
      abi: ProverRegistryAbi,
      chain: "anvil",
      address: ANVIL.PROVER_REGISTRY,
      startBlock: START_BLOCK,
      includeTransactionReceipts: true,
    },
    ContentRegistry: {
      abi: ContentRegistryAbi,
      chain: "anvil",
      address: ANVIL.CONTENT_REGISTRY,
      startBlock: START_BLOCK,
      includeTransactionReceipts: true,
    },
    ProverRewards: {
      abi: ProverRewardsAbi,
      chain: "anvil",
      address: ANVIL.PROVER_REWARDS,
      startBlock: START_BLOCK,
      includeTransactionReceipts: true,
    },
    FeeRouter: {
      abi: FeeRouterAbi,
      chain: "anvil",
      address: ANVIL.FEE_ROUTER,
      startBlock: START_BLOCK,
      includeTransactionReceipts: true,
    },
    ProvaToken: {
      abi: ProvaTokenAbi,
      chain: "anvil",
      address: ANVIL.PROVA_TOKEN,
      startBlock: START_BLOCK,
      includeTransactionReceipts: true,
    },
  },
})

export { ANVIL, START_BLOCK }
