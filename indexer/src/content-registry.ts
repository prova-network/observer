// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Prova Network contributors.
//
// Indexer for prova-network/contracts ContentRegistry.

import { ponder } from "ponder:registry"
import {
  provaContentDealUpdated,
  provaContentEnsBound,
  provaContentEnsUnbound,
  provaContentRegistered,
} from "ponder:schema"
import { eventId, eventMeta } from "./event-utils.js"

ponder.on("ContentRegistry:ContentRegistered", async ({ event, context }) => {
  const { commpHash, owner, dealId, pieceSize } = event.args
  await context.db.insert(provaContentRegistered).values({
    id: eventId(event),
    commpHash,
    owner,
    dealId,
    pieceSize,
    ...eventMeta(event),
  })
})

ponder.on("ContentRegistry:ContentDealUpdated", async ({ event, context }) => {
  const { commpHash, oldDealId, newDealId } = event.args
  await context.db.insert(provaContentDealUpdated).values({
    id: eventId(event),
    commpHash,
    oldDealId,
    newDealId,
    ...eventMeta(event),
  })
})

ponder.on("ContentRegistry:ENSBound", async ({ event, context }) => {
  const { commpHash, ensNode, by } = event.args
  await context.db.insert(provaContentEnsBound).values({
    id: eventId(event),
    commpHash,
    ensNode,
    by,
    ...eventMeta(event),
  })
})

ponder.on("ContentRegistry:ENSUnbound", async ({ event, context }) => {
  const { commpHash, ensNode } = event.args
  await context.db.insert(provaContentEnsUnbound).values({
    id: eventId(event),
    commpHash,
    ensNode,
    ...eventMeta(event),
  })
})
