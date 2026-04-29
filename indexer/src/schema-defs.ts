/**
 * Prova Observer table definitions: the single source of truth.
 *
 * Consumed by:
 * - ponder.schema.ts: generates Ponder onchainTable() calls
 * - shared/table-metadata.ts: generates agent context descriptions
 *
 * No Ponder-specific imports here. Plain data only.
 *
 * Naming convention: every table is prefixed `prova_`. Per-event tables
 * are an immutable append-only log of decoded chain events. A future
 * Phase 3 will add `prova_*_state` views that materialize current
 * per-entity state from those event streams; for now query by joining
 * the event tables.
 */

export type ColType = "bigint" | "int" | "text" | "hex" | "bool"

export interface ColDef {
  type: ColType
  nullable?: boolean
  note?: string
}

export interface TableDef {
  description: string
  /** Non-standard columns (standard tx/block metadata added automatically) */
  columns: Record<string, ColDef>
  /** Column names to index (in addition to automatic indexes on standard fields) */
  indexes?: string[]
}

export const STANDARD_COLUMNS: Record<string, ColDef> = {
  id: { type: "text", note: "blockHash-logIndex" },
  txHash: { type: "hex" },
  txFrom: { type: "hex", note: "sender" },
  txValue: { type: "bigint", note: "ETH (Base native) sent, in wei (18 dec)" },
  gasUsed: { type: "bigint" },
  effectiveGasPrice: { type: "bigint" },
  blockNumber: { type: "bigint" },
  timestamp: { type: "bigint", note: "unix seconds (Base block timestamp)" },
}

export const TABLES: Record<string, TableDef> = {
  // ─── StorageMarketplace ─────────────────────────────────────────────
  prova_deal_proposed: {
    description: "A client proposed a storage deal. Escrow has been taken at this point.",
    columns: {
      dealId: { type: "bigint" },
      client: { type: "hex" },
      prover: { type: "hex" },
      commpHash: { type: "hex", note: "32-byte CommPv2 digest" },
      pieceSize: { type: "bigint", note: "padded piece size in bytes" },
      durationSeconds: { type: "bigint" },
      totalPayment: { type: "bigint", note: "USDC, 6 dec (or configured payment token)" },
    },
    indexes: ["dealId", "client", "prover", "commpHash"],
  },
  prova_deal_accepted: {
    description: "Prover accepted the deal by creating a data set on ProofVerifier.",
    columns: {
      dealId: { type: "bigint" },
      prover: { type: "hex" },
      dataSetId: { type: "bigint", note: "ProofVerifier setId for this deal" },
      endsAt: { type: "bigint", note: "unix seconds when storage period ends" },
    },
    indexes: ["dealId", "prover", "dataSetId"],
  },
  prova_deal_completed: {
    description: "Deal reached its endsAt and was settled by anyone calling completeDeal().",
    columns: {
      dealId: { type: "bigint" },
      finalPaidOut: { type: "bigint", note: "total USDC paid to prover over the deal's life" },
    },
    indexes: ["dealId"],
  },
  prova_deal_cancelled: {
    description: "Client cancelled a Proposed deal that the prover never accepted; escrow refunded.",
    columns: {
      dealId: { type: "bigint" },
      refund: { type: "bigint", note: "USDC returned to client" },
    },
    indexes: ["dealId"],
  },
  prova_deal_slashed: {
    description: "Prover faulted on a deal; their bonded stake was slashed and the client was refunded.",
    columns: {
      dealId: { type: "bigint" },
      prover: { type: "hex" },
      slashedAmount: { type: "bigint", note: "PROVA burned (18 dec)" },
      refunded: { type: "bigint", note: "USDC returned to client" },
    },
    indexes: ["dealId", "prover"],
  },
  prova_proof_recorded: {
    description: "Marketplace listener recorded a successful proof; streaming USDC released to prover.",
    columns: {
      dealId: { type: "bigint" },
      proofCount: { type: "bigint", note: "cumulative proofs for this deal" },
      paymentReleased: { type: "bigint", note: "USDC released on this proof event (18 dec note: USDC has 6 dec, but this column carries raw base units)" },
    },
    indexes: ["dealId"],
  },
  prova_marketplace_param_change: {
    description: "Governance changes to marketplace parameters (protocol fee, slash-per-fault, treasury, prover-rewards address).",
    columns: {
      kind: { type: "text", note: "ProtocolFeeChanged | SlashPerFaultChanged | TreasuryChanged | ProverRewardsSet" },
      oldValue: { type: "text", nullable: true, note: "stringified old value (varies by kind)" },
      newValue: { type: "text", nullable: true, note: "stringified new value (varies by kind)" },
    },
    indexes: ["kind"],
  },

  // ─── ProofVerifier ──────────────────────────────────────────────────
  prova_data_set_created: {
    description: "A new data set was created on ProofVerifier (typically when a deal is accepted).",
    columns: {
      setId: { type: "bigint" },
      storageProvider: { type: "hex" },
    },
    indexes: ["setId", "storageProvider"],
  },
  prova_data_set_deleted: {
    description: "Storage provider deleted a data set; outstanding leaf count recorded.",
    columns: {
      setId: { type: "bigint" },
      deletedLeafCount: { type: "bigint" },
    },
    indexes: ["setId"],
  },
  prova_data_set_empty: {
    description: "All pieces removed from a data set; ready for deletion.",
    columns: {
      setId: { type: "bigint" },
    },
    indexes: ["setId"],
  },
  prova_pieces_added: {
    description: "Pieces appended to a data set. CIDs are stored as a JSON array of hex-encoded bytes for the on-chain Cid struct.",
    columns: {
      setId: { type: "bigint" },
      pieceCount: { type: "int" },
      pieces: { type: "text", nullable: true, note: "JSON [{pieceId: string, cidHex: string}]" },
    },
    indexes: ["setId"],
  },
  prova_pieces_removed: {
    description: "Pieces removed from a data set at the start of a proving period.",
    columns: {
      setId: { type: "bigint" },
      pieceCount: { type: "int" },
      pieceIds: { type: "text", nullable: true, note: "JSON [string] of pieceIds" },
    },
    indexes: ["setId"],
  },
  prova_next_proving_period: {
    description: "Storage provider advanced to a new proving period; new challenge epoch sampled.",
    columns: {
      setId: { type: "bigint" },
      challengeEpoch: { type: "bigint", note: "block number at which the next challenge is sampled" },
      leafCount: { type: "bigint" },
    },
    indexes: ["setId"],
  },
  prova_possession_proven: {
    description: "Storage provider submitted a successful proof of possession for the current challenge.",
    columns: {
      setId: { type: "bigint" },
      challengeCount: { type: "int", nullable: true },
      challenges: { type: "text", nullable: true, note: "JSON [{pieceId: string, offset: string}]" },
    },
    indexes: ["setId"],
  },
  prova_proof_fee_paid: {
    description: "ETH proof fee paid by the storage provider when submitting possessionProven().",
    columns: {
      setId: { type: "bigint" },
      fee: { type: "bigint", note: "ETH wei, 18 dec" },
    },
    indexes: ["setId"],
  },
  prova_storage_provider_changed: {
    description: "Storage provider for a data set changed (rare; v1 marketplace treats this as deal termination).",
    columns: {
      setId: { type: "bigint" },
      oldStorageProvider: { type: "hex" },
      newStorageProvider: { type: "hex" },
    },
    indexes: ["setId", "oldStorageProvider", "newStorageProvider"],
  },
  prova_proof_verifier_upgraded: {
    description: "ProofVerifier UUPS proxy was upgraded to a new implementation.",
    columns: {
      version: { type: "text", note: "semver string from upstream PDP" },
      implementation: { type: "hex" },
    },
  },
  prova_proof_verifier_upgrade_announced: {
    description: "An upgrade was announced for ProofVerifier (effective at a future block).",
    columns: {
      nextImplementation: { type: "hex" },
      afterEpoch: { type: "bigint" },
    },
  },

  // ─── ProverStaking ──────────────────────────────────────────────────
  prova_staked: {
    description: "Prover staked PROVA.",
    columns: {
      prover: { type: "hex" },
      amount: { type: "bigint", note: "PROVA wei (18 dec) added in this event" },
      newTotal: { type: "bigint", note: "prover's new staked total" },
    },
    indexes: ["prover"],
  },
  prova_unstake_requested: {
    description: "Prover moved staked PROVA into the unbonding queue.",
    columns: {
      prover: { type: "hex" },
      amount: { type: "bigint", note: "PROVA wei moving to unbonding" },
      endsAt: { type: "bigint", note: "unix seconds when unbonding completes" },
    },
    indexes: ["prover"],
  },
  prova_withdrawn: {
    description: "Prover withdrew their fully-unbonded PROVA back to their wallet.",
    columns: {
      prover: { type: "hex" },
      amount: { type: "bigint" },
    },
    indexes: ["prover"],
  },
  prova_slashed: {
    description: "Prover was slashed for misbehavior; PROVA was burned (no recipient pool in current spec).",
    columns: {
      prover: { type: "hex" },
      amount: { type: "bigint", note: "PROVA burned" },
      by: { type: "hex", note: "authorized controller that triggered the slash" },
      reason: { type: "hex", note: "32-byte reason tag" },
    },
    indexes: ["prover", "by"],
  },
  prova_committed_bytes_changed: {
    description: "Prover's committed-bytes counter moved (from accepting / completing / faulting deals).",
    columns: {
      prover: { type: "hex" },
      newCommittedBytes: { type: "bigint" },
    },
    indexes: ["prover"],
  },
  prova_staking_param_change: {
    description: "Governance changes to staking parameters (per-TiB minimum, USD floor, oracle, oracle staleness, authorized controllers).",
    columns: {
      kind: { type: "text", note: "MinStakePerGibChanged | MinStakePerTiBChanged | MinStakeUsdPerTiBChanged | OracleStalenessChanged | PriceOracleChanged | AuthorizedControllerSet" },
      oldValue: { type: "text", nullable: true },
      newValue: { type: "text", nullable: true },
      target: { type: "hex", nullable: true, note: "target address for AuthorizedControllerSet / PriceOracleChanged" },
    },
    indexes: ["kind", "target"],
  },

  // ─── ProverRegistry ─────────────────────────────────────────────────
  prova_prover_registered: {
    description: "Prover registered with the ProverRegistry, advertising endpoint and feature bitmap.",
    columns: {
      prover: { type: "hex" },
      endpoint: { type: "text" },
      features: { type: "bigint", note: "uint64 feature bitmap (1=PDP, 2=HTTPS_SERVING, ...)" },
    },
    indexes: ["prover"],
  },
  prova_prover_updated: {
    description: "Prover updated their endpoint and/or feature bitmap.",
    columns: {
      prover: { type: "hex" },
      endpoint: { type: "text" },
      features: { type: "bigint" },
    },
    indexes: ["prover"],
  },
  prova_prover_deregistered: {
    description: "Prover soft-deleted their registry entry (active=false).",
    columns: {
      prover: { type: "hex" },
    },
    indexes: ["prover"],
  },
  prova_price_changed: {
    description: "Prover updated their advertised pricing.",
    columns: {
      prover: { type: "hex" },
      pricePerGibDay: { type: "bigint", note: "wei per GiB per day" },
      pricePerByteServed: { type: "bigint", note: "wei per byte of HTTPS retrieval traffic" },
    },
    indexes: ["prover"],
  },
  prova_ens_bound: {
    description: "Prover bound their address to an ENS node (registry side).",
    columns: {
      prover: { type: "hex" },
      ensNode: { type: "hex" },
    },
    indexes: ["prover"],
  },

  // ─── ContentRegistry ────────────────────────────────────────────────
  prova_content_registered: {
    description: "A piece (commpHash) was registered as the active content for a deal.",
    columns: {
      commpHash: { type: "hex" },
      owner: { type: "hex" },
      dealId: { type: "bigint" },
      pieceSize: { type: "bigint" },
    },
    indexes: ["commpHash", "owner", "dealId"],
  },
  prova_content_deal_updated: {
    description: "A piece's active dealId was switched (the previous deal completed; a successor deal took over).",
    columns: {
      commpHash: { type: "hex" },
      oldDealId: { type: "bigint" },
      newDealId: { type: "bigint" },
    },
    indexes: ["commpHash", "newDealId"],
  },
  prova_content_ens_bound: {
    description: "A commp was bound to an ENS node (per-content side).",
    columns: {
      commpHash: { type: "hex" },
      ensNode: { type: "hex" },
      by: { type: "hex" },
    },
    indexes: ["commpHash", "ensNode"],
  },
  prova_content_ens_unbound: {
    description: "A commp ENS binding was removed.",
    columns: {
      commpHash: { type: "hex" },
      ensNode: { type: "hex" },
    },
    indexes: ["commpHash", "ensNode"],
  },

  // ─── ProverRewards (PROVA emission ledger) ──────────────────────────
  prova_reward_proof_recorded: {
    description: "Marketplace called recordProof() on ProverRewards; an emission credit accrued for this prover-epoch.",
    columns: {
      epoch: { type: "bigint", note: "emission epoch (block-aligned per spec)" },
      prover: { type: "hex" },
      pieceCid: { type: "hex" },
      bytesProven: { type: "bigint" },
      counted: { type: "bool", note: "false = redundancy cap or self-deal blocked the credit" },
    },
    indexes: ["prover", "epoch", "pieceCid"],
  },
  prova_reward_claimed: {
    description: "Prover claimed accrued emission rewards for one or more epochs.",
    columns: {
      prover: { type: "hex" },
      epoch: { type: "bigint" },
      amount: { type: "bigint", note: "PROVA released" },
    },
    indexes: ["prover", "epoch"],
  },
  prova_quality_updated: {
    description: "Quality multiplier inputs (recent successes vs failures) updated for a prover.",
    columns: {
      prover: { type: "hex" },
      successes: { type: "bigint" },
      failures: { type: "bigint" },
    },
    indexes: ["prover"],
  },
  prova_rewards_param_change: {
    description: "Governance changes to emission parameters (quality cutoff, redundancy cap, marketplace pointer).",
    columns: {
      kind: { type: "text", note: "QualityCutoffSet | RedundancyCapSet | MarketplaceSet" },
      oldValue: { type: "text", nullable: true },
      newValue: { type: "text", nullable: true },
      target: { type: "hex", nullable: true },
    },
    indexes: ["kind"],
  },

  // ─── FeeRouter (1% USDC fee → PROVA burn) ──────────────────────────
  prova_fees_held: {
    description: "USDC fees received by FeeRouter and held (Hold mode).",
    columns: {
      usdcAmount: { type: "bigint", note: "USDC base units (6 dec)" },
    },
  },
  prova_fees_burned: {
    description: "FeeRouter swapped USDC into PROVA and burned the PROVA, completing the deflationary fee path.",
    columns: {
      usdcIn: { type: "bigint", note: "USDC base units consumed" },
      provaOut: { type: "bigint", note: "PROVA wei burned" },
    },
  },
  prova_fee_router_withdrawn: {
    description: "Owner pulled held USDC out of FeeRouter (admin-only path).",
    columns: {
      token: { type: "hex" },
      to: { type: "hex" },
      amount: { type: "bigint" },
    },
    indexes: ["token", "to"],
  },
  prova_fee_router_param_change: {
    description: "Governance changes to FeeRouter parameters (mode, burn share, slippage, swap cap, pool fee, swap router).",
    columns: {
      kind: { type: "text", note: "ModeChanged | BurnShareChanged | MaxSlippageChanged | MaxSwapPerCallChanged | SwapPoolFeeChanged | SwapRouterChanged" },
      oldValue: { type: "text", nullable: true },
      newValue: { type: "text", nullable: true },
    },
    indexes: ["kind"],
  },

  // ─── ProvaToken (ERC-20 transfers) ─────────────────────────────────
  prova_token_transfer: {
    description: "PROVA ERC-20 Transfer event. Burns are encoded as transfers to address(0); mints are from address(0).",
    columns: {
      from: { type: "hex" },
      to: { type: "hex" },
      amount: { type: "bigint", note: "PROVA wei (18 dec)" },
    },
    indexes: ["from", "to"],
  },
}
