// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Prova Network contributors.
//
// Indexer for prova-network/contracts ProofVerifier (UUPS proxy).

import { ponder } from "ponder:registry"
import {
  provaDataSetCreated,
  provaDataSetDeleted,
  provaDataSetEmpty,
  provaNextProvingPeriod,
  provaPiecesAdded,
  provaPiecesRemoved,
  provaPossessionProven,
  provaProofFeePaid,
  provaProofVerifierUpgradeAnnounced,
  provaProofVerifierUpgraded,
  provaStorageProviderChanged,
} from "ponder:schema"
import { eventId, eventMeta } from "./event-utils.js"

ponder.on("ProofVerifier:DataSetCreated", async ({ event, context }) => {
  const { setId, storageProvider } = event.args
  await context.db.insert(provaDataSetCreated).values({
    id: eventId(event),
    setId,
    storageProvider,
    ...eventMeta(event),
  })
})

ponder.on("ProofVerifier:DataSetDeleted", async ({ event, context }) => {
  const { setId, deletedLeafCount } = event.args
  await context.db.insert(provaDataSetDeleted).values({
    id: eventId(event),
    setId,
    deletedLeafCount,
    ...eventMeta(event),
  })
})

ponder.on("ProofVerifier:DataSetEmpty", async ({ event, context }) => {
  const { setId } = event.args
  await context.db.insert(provaDataSetEmpty).values({
    id: eventId(event),
    setId,
    ...eventMeta(event),
  })
})

ponder.on("ProofVerifier:NextProvingPeriod", async ({ event, context }) => {
  const { setId, challengeEpoch, leafCount } = event.args
  await context.db.insert(provaNextProvingPeriod).values({
    id: eventId(event),
    setId,
    challengeEpoch,
    leafCount,
    ...eventMeta(event),
  })
})

ponder.on("ProofVerifier:PiecesAdded", async ({ event, context }) => {
  const { setId, pieceIds, pieceCids } = event.args
  // pieceCids is the on-chain Cid struct: { data: bytes }. The raw
  // hex bytes are kept verbatim here; downstream consumers can decode
  // via shared/cid-utils when they need a CID string.
  const pieces = pieceIds.map((pid: bigint, i: number) => ({
    pieceId: pid.toString(),
    cidHex: pieceCids[i]?.data ?? "",
  }))
  await context.db.insert(provaPiecesAdded).values({
    id: eventId(event),
    setId,
    pieceCount: pieceIds.length,
    pieces: JSON.stringify(pieces),
    ...eventMeta(event),
  })
})

ponder.on("ProofVerifier:PiecesRemoved", async ({ event, context }) => {
  const { setId, pieceIds } = event.args
  await context.db.insert(provaPiecesRemoved).values({
    id: eventId(event),
    setId,
    pieceCount: pieceIds.length,
    pieceIds: JSON.stringify(pieceIds.map((p: bigint) => p.toString())),
    ...eventMeta(event),
  })
})

ponder.on("ProofVerifier:PossessionProven", async ({ event, context }) => {
  const { setId, challenges } = event.args
  const challengeCount = challenges.length
  const challengeData = JSON.stringify(
    challenges.map((c: { pieceId: bigint; offset: bigint }) => ({
      pieceId: c.pieceId.toString(),
      offset: c.offset.toString(),
    })),
  )
  await context.db.insert(provaPossessionProven).values({
    id: eventId(event),
    setId,
    challengeCount,
    challenges: challengeData,
    ...eventMeta(event),
  })
})

ponder.on("ProofVerifier:ProofFeePaid", async ({ event, context }) => {
  const { setId, fee } = event.args
  await context.db.insert(provaProofFeePaid).values({
    id: eventId(event),
    setId,
    fee,
    ...eventMeta(event),
  })
})

ponder.on("ProofVerifier:StorageProviderChanged", async ({ event, context }) => {
  const { setId, oldStorageProvider, newStorageProvider } = event.args
  await context.db.insert(provaStorageProviderChanged).values({
    id: eventId(event),
    setId,
    oldStorageProvider,
    newStorageProvider,
    ...eventMeta(event),
  })
})

ponder.on("ProofVerifier:ContractUpgraded", async ({ event, context }) => {
  const { version, implementation } = event.args
  await context.db.insert(provaProofVerifierUpgraded).values({
    id: eventId(event),
    version,
    implementation,
    ...eventMeta(event),
  })
})

ponder.on("ProofVerifier:UpgradeAnnounced", async ({ event, context }) => {
  const { plannedUpgrade } = event.args
  await context.db.insert(provaProofVerifierUpgradeAnnounced).values({
    id: eventId(event),
    nextImplementation: plannedUpgrade.nextImplementation,
    afterEpoch: plannedUpgrade.afterEpoch,
    ...eventMeta(event),
  })
})
