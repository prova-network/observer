// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Prova Network contributors.
//
// Indexer for prova-network/contracts ProverRewards (PROVA emission ledger).

import { ponder } from "ponder:registry"
import {
  provaQualityUpdated,
  provaRewardClaimed,
  provaRewardProofRecorded,
  provaRewardsParamChange,
} from "ponder:schema"
import { eventId, eventMeta } from "./event-utils.js"

ponder.on("ProverRewards:ProofRecorded", async ({ event, context }) => {
  const { epoch, prover, pieceCid, bytesProven, counted } = event.args
  await context.db.insert(provaRewardProofRecorded).values({
    id: eventId(event),
    epoch,
    prover,
    pieceCid,
    bytesProven,
    counted,
    ...eventMeta(event),
  })
})

ponder.on("ProverRewards:Claimed", async ({ event, context }) => {
  const { prover, epoch, amount } = event.args
  await context.db.insert(provaRewardClaimed).values({
    id: eventId(event),
    prover,
    epoch,
    amount,
    ...eventMeta(event),
  })
})

ponder.on("ProverRewards:QualityUpdated", async ({ event, context }) => {
  const { prover, successes, failures } = event.args
  await context.db.insert(provaQualityUpdated).values({
    id: eventId(event),
    prover,
    successes,
    failures,
    ...eventMeta(event),
  })
})

// ─── Governance / parameter changes ────────────────────────────────

ponder.on("ProverRewards:QualityCutoffSet", async ({ event, context }) => {
  const { previous, next } = event.args
  await context.db.insert(provaRewardsParamChange).values({
    id: eventId(event),
    kind: "QualityCutoffSet",
    oldValue: previous.toString(),
    newValue: next.toString(),
    target: null,
    ...eventMeta(event),
  })
})

ponder.on("ProverRewards:RedundancyCapSet", async ({ event, context }) => {
  const { previous, next } = event.args
  await context.db.insert(provaRewardsParamChange).values({
    id: eventId(event),
    kind: "RedundancyCapSet",
    oldValue: previous.toString(),
    newValue: next.toString(),
    target: null,
    ...eventMeta(event),
  })
})

ponder.on("ProverRewards:MarketplaceSet", async ({ event, context }) => {
  const { previous, next } = event.args
  await context.db.insert(provaRewardsParamChange).values({
    id: eventId(event),
    kind: "MarketplaceSet",
    oldValue: previous,
    newValue: next,
    target: next,
    ...eventMeta(event),
  })
})
