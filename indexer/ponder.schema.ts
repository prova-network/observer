/**
 * Ponder schema, generated from src/schema-defs.ts.
 *
 * Do not edit table definitions here. Edit schema-defs.ts instead.
 * This file translates the shared definitions into Ponder's onchainTable() format.
 */

import { onchainTable, index } from "ponder"
import { TABLES, STANDARD_COLUMNS, type ColType } from "./src/schema-defs.js"

// Ponder's column-defn arg is overloaded as `Record | (t) => Record`. We want
// the function form to extract the columns-builder parameter type.
type ColumnsFn = Extract<Parameters<typeof onchainTable>[1], (...args: never[]) => unknown>
type TableBuilder = Parameters<ColumnsFn>[0]

function buildColumn(t: TableBuilder, type: ColType, nullable: boolean) {
  const col = type === "bigint" ? t.bigint()
    : type === "int" ? t.integer()
    : type === "hex" ? t.hex()
    : type === "bool" ? t.boolean()
    : t.text()
  return nullable ? col : col.notNull()
}

function buildTable(name: string) {
  const def = TABLES[name]!
  return onchainTable(name, (t) => {
    const cols: Record<string, ReturnType<typeof buildColumn>> = {}

    // Standard columns
    cols.id = t.text().primaryKey()
    for (const [colName, colDef] of Object.entries(STANDARD_COLUMNS)) {
      if (colName === "id") continue
      cols[colName] = buildColumn(t, colDef.type, colDef.nullable ?? false)
    }

    // Table-specific columns
    for (const [colName, colDef] of Object.entries(def.columns)) {
      cols[colName] = buildColumn(t, colDef.type, colDef.nullable ?? false)
    }

    return cols
  // biome-ignore lint/suspicious/noExplicitAny: dynamic index generation
  }, (table: any) => {
    if (!def.indexes?.length) return {}
    // biome-ignore lint/suspicious/noExplicitAny: dynamic index generation
    const indexes: Record<string, any> = {}
    for (const col of def.indexes) {
      indexes[`${col}Idx`] = index().on(table[col])
    }
    return indexes
  })
}

// Generate all table exports
// biome-ignore lint/suspicious/noExplicitAny: dynamic table generation
const tables: Record<string, any> = {}
for (const name of Object.keys(TABLES)) {
  tables[name] = buildTable(name)
}

// ─── Named camelCase exports for handler imports ──────────────────────
// Naming convention: snake_case `prova_x_y_z` table → `provaXYZ` export.

// StorageMarketplace
export const provaDealProposed              = tables.prova_deal_proposed
export const provaDealAccepted              = tables.prova_deal_accepted
export const provaDealCompleted             = tables.prova_deal_completed
export const provaDealCancelled             = tables.prova_deal_cancelled
export const provaDealSlashed               = tables.prova_deal_slashed
export const provaProofRecorded             = tables.prova_proof_recorded
export const provaMarketplaceParamChange    = tables.prova_marketplace_param_change

// ProofVerifier
export const provaDataSetCreated            = tables.prova_data_set_created
export const provaDataSetDeleted            = tables.prova_data_set_deleted
export const provaDataSetEmpty              = tables.prova_data_set_empty
export const provaPiecesAdded               = tables.prova_pieces_added
export const provaPiecesRemoved             = tables.prova_pieces_removed
export const provaNextProvingPeriod         = tables.prova_next_proving_period
export const provaPossessionProven          = tables.prova_possession_proven
export const provaProofFeePaid              = tables.prova_proof_fee_paid
export const provaStorageProviderChanged    = tables.prova_storage_provider_changed
export const provaProofVerifierUpgraded     = tables.prova_proof_verifier_upgraded
export const provaProofVerifierUpgradeAnnounced = tables.prova_proof_verifier_upgrade_announced

// ProverStaking
export const provaStaked                    = tables.prova_staked
export const provaUnstakeRequested          = tables.prova_unstake_requested
export const provaWithdrawn                 = tables.prova_withdrawn
export const provaSlashed                   = tables.prova_slashed
export const provaCommittedBytesChanged     = tables.prova_committed_bytes_changed
export const provaStakingParamChange        = tables.prova_staking_param_change

// ProverRegistry
export const provaProverRegistered          = tables.prova_prover_registered
export const provaProverUpdated             = tables.prova_prover_updated
export const provaProverDeregistered        = tables.prova_prover_deregistered
export const provaPriceChanged              = tables.prova_price_changed
export const provaEnsBound                  = tables.prova_ens_bound

// ContentRegistry
export const provaContentRegistered         = tables.prova_content_registered
export const provaContentDealUpdated        = tables.prova_content_deal_updated
export const provaContentEnsBound           = tables.prova_content_ens_bound
export const provaContentEnsUnbound         = tables.prova_content_ens_unbound

// ProverRewards
export const provaRewardProofRecorded       = tables.prova_reward_proof_recorded
export const provaRewardClaimed             = tables.prova_reward_claimed
export const provaQualityUpdated            = tables.prova_quality_updated
export const provaRewardsParamChange        = tables.prova_rewards_param_change

// FeeRouter
export const provaFeesHeld                  = tables.prova_fees_held
export const provaFeesBurned                = tables.prova_fees_burned
export const provaFeeRouterWithdrawn        = tables.prova_fee_router_withdrawn
export const provaFeeRouterParamChange      = tables.prova_fee_router_param_change

// ProvaToken
export const provaTokenTransfer             = tables.prova_token_transfer
