// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Prova Network contributors.
//
// Indexer for prova-network/contracts ProverStaking.

import { ponder } from "ponder:registry"
import {
  provaCommittedBytesChanged,
  provaSlashed,
  provaStaked,
  provaStakingParamChange,
  provaUnstakeRequested,
  provaWithdrawn,
} from "ponder:schema"
import { eventId, eventMeta } from "./event-utils.js"

ponder.on("ProverStaking:Staked", async ({ event, context }) => {
  const { prover, amount, newTotal } = event.args
  await context.db.insert(provaStaked).values({
    id: eventId(event),
    prover,
    amount,
    newTotal,
    ...eventMeta(event),
  })
})

ponder.on("ProverStaking:UnstakeRequested", async ({ event, context }) => {
  const { prover, amount, endsAt } = event.args
  await context.db.insert(provaUnstakeRequested).values({
    id: eventId(event),
    prover,
    amount,
    endsAt,
    ...eventMeta(event),
  })
})

ponder.on("ProverStaking:Withdrawn", async ({ event, context }) => {
  const { prover, amount } = event.args
  await context.db.insert(provaWithdrawn).values({
    id: eventId(event),
    prover,
    amount,
    ...eventMeta(event),
  })
})

ponder.on("ProverStaking:Slashed", async ({ event, context }) => {
  const { prover, amount, by, reason } = event.args
  await context.db.insert(provaSlashed).values({
    id: eventId(event),
    prover,
    amount,
    by,
    reason,
    ...eventMeta(event),
  })
})

ponder.on("ProverStaking:CommittedBytesChanged", async ({ event, context }) => {
  const { prover, newCommittedBytes } = event.args
  await context.db.insert(provaCommittedBytesChanged).values({
    id: eventId(event),
    prover,
    newCommittedBytes,
    ...eventMeta(event),
  })
})

// ─── Governance / parameter changes ────────────────────────────────

ponder.on("ProverStaking:MinStakePerGibChanged", async ({ event, context }) => {
  const { oldValue, newValue } = event.args
  await context.db.insert(provaStakingParamChange).values({
    id: eventId(event),
    kind: "MinStakePerGibChanged",
    oldValue: oldValue.toString(),
    newValue: newValue.toString(),
    target: null,
    ...eventMeta(event),
  })
})

ponder.on("ProverStaking:MinStakePerTiBChanged", async ({ event, context }) => {
  const { oldValue, newValue } = event.args
  await context.db.insert(provaStakingParamChange).values({
    id: eventId(event),
    kind: "MinStakePerTiBChanged",
    oldValue: oldValue.toString(),
    newValue: newValue.toString(),
    target: null,
    ...eventMeta(event),
  })
})

ponder.on("ProverStaking:MinStakeUsdPerTiBChanged", async ({ event, context }) => {
  const { oldValue, newValue } = event.args
  await context.db.insert(provaStakingParamChange).values({
    id: eventId(event),
    kind: "MinStakeUsdPerTiBChanged",
    oldValue: oldValue.toString(),
    newValue: newValue.toString(),
    target: null,
    ...eventMeta(event),
  })
})

ponder.on("ProverStaking:OracleStalenessChanged", async ({ event, context }) => {
  const { oldValue, newValue } = event.args
  await context.db.insert(provaStakingParamChange).values({
    id: eventId(event),
    kind: "OracleStalenessChanged",
    oldValue: oldValue.toString(),
    newValue: newValue.toString(),
    target: null,
    ...eventMeta(event),
  })
})

ponder.on("ProverStaking:PriceOracleChanged", async ({ event, context }) => {
  const { oldOracle, newOracle } = event.args
  await context.db.insert(provaStakingParamChange).values({
    id: eventId(event),
    kind: "PriceOracleChanged",
    oldValue: oldOracle,
    newValue: newOracle,
    target: newOracle,
    ...eventMeta(event),
  })
})

ponder.on("ProverStaking:AuthorizedControllerSet", async ({ event, context }) => {
  const { controller, authorized } = event.args
  await context.db.insert(provaStakingParamChange).values({
    id: eventId(event),
    kind: "AuthorizedControllerSet",
    oldValue: null,
    newValue: authorized ? "true" : "false",
    target: controller,
    ...eventMeta(event),
  })
})
