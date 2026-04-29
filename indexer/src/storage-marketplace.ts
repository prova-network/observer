// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Prova Network contributors.
//
// Indexer for prova-network/contracts StorageMarketplace.

import { ponder } from "ponder:registry"
import {
  provaDealAccepted,
  provaDealCancelled,
  provaDealCompleted,
  provaDealProposed,
  provaDealSlashed,
  provaMarketplaceParamChange,
  provaProofRecorded,
} from "ponder:schema"
import { eventId, eventMeta } from "./event-utils.js"

ponder.on("StorageMarketplace:DealProposed", async ({ event, context }) => {
  const { dealId, client, prover, commpHash, pieceSize, durationSeconds, totalPayment } = event.args
  await context.db.insert(provaDealProposed).values({
    id: eventId(event),
    dealId,
    client,
    prover,
    commpHash,
    pieceSize,
    durationSeconds,
    totalPayment,
    ...eventMeta(event),
  })
})

ponder.on("StorageMarketplace:DealAccepted", async ({ event, context }) => {
  const { dealId, prover, dataSetId, endsAt } = event.args
  await context.db.insert(provaDealAccepted).values({
    id: eventId(event),
    dealId,
    prover,
    dataSetId,
    endsAt,
    ...eventMeta(event),
  })
})

ponder.on("StorageMarketplace:DealCompleted", async ({ event, context }) => {
  const { dealId, finalPaidOut } = event.args
  await context.db.insert(provaDealCompleted).values({
    id: eventId(event),
    dealId,
    finalPaidOut,
    ...eventMeta(event),
  })
})

ponder.on("StorageMarketplace:DealCancelled", async ({ event, context }) => {
  const { dealId, refund } = event.args
  await context.db.insert(provaDealCancelled).values({
    id: eventId(event),
    dealId,
    refund,
    ...eventMeta(event),
  })
})

ponder.on("StorageMarketplace:DealSlashed", async ({ event, context }) => {
  const { dealId, prover, slashedAmount, refunded } = event.args
  await context.db.insert(provaDealSlashed).values({
    id: eventId(event),
    dealId,
    prover,
    slashedAmount,
    refunded,
    ...eventMeta(event),
  })
})

ponder.on("StorageMarketplace:ProofRecorded", async ({ event, context }) => {
  const { dealId, proofCount, paymentReleased } = event.args
  await context.db.insert(provaProofRecorded).values({
    id: eventId(event),
    dealId,
    proofCount,
    paymentReleased,
    ...eventMeta(event),
  })
})

// ─── Governance / parameter changes ────────────────────────────────
// Collapsed into a single audit table so the UI doesn't need a separate
// row class per knob.

ponder.on("StorageMarketplace:ProtocolFeeChanged", async ({ event, context }) => {
  const { oldBps, newBps } = event.args
  await context.db.insert(provaMarketplaceParamChange).values({
    id: eventId(event),
    kind: "ProtocolFeeChanged",
    oldValue: oldBps.toString(),
    newValue: newBps.toString(),
    ...eventMeta(event),
  })
})

ponder.on("StorageMarketplace:SlashPerFaultChanged", async ({ event, context }) => {
  const { oldValue, newValue } = event.args
  await context.db.insert(provaMarketplaceParamChange).values({
    id: eventId(event),
    kind: "SlashPerFaultChanged",
    oldValue: oldValue.toString(),
    newValue: newValue.toString(),
    ...eventMeta(event),
  })
})

ponder.on("StorageMarketplace:TreasuryChanged", async ({ event, context }) => {
  const { oldTreasury, newTreasury } = event.args
  await context.db.insert(provaMarketplaceParamChange).values({
    id: eventId(event),
    kind: "TreasuryChanged",
    oldValue: oldTreasury,
    newValue: newTreasury,
    ...eventMeta(event),
  })
})

ponder.on("StorageMarketplace:ProverRewardsSet", async ({ event, context }) => {
  const { previous, next } = event.args
  await context.db.insert(provaMarketplaceParamChange).values({
    id: eventId(event),
    kind: "ProverRewardsSet",
    oldValue: previous,
    newValue: next,
    ...eventMeta(event),
  })
})
