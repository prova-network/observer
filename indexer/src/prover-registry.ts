// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Prova Network contributors.
//
// Indexer for prova-network/contracts ProverRegistry.

import { ponder } from "ponder:registry"
import {
  provaEnsBound,
  provaPriceChanged,
  provaProverDeregistered,
  provaProverRegistered,
  provaProverUpdated,
} from "ponder:schema"
import { eventId, eventMeta } from "./event-utils.js"

ponder.on("ProverRegistry:ProverRegistered", async ({ event, context }) => {
  const { prover, endpoint, features } = event.args
  await context.db.insert(provaProverRegistered).values({
    id: eventId(event),
    prover,
    endpoint,
    features,
    ...eventMeta(event),
  })
})

ponder.on("ProverRegistry:ProverUpdated", async ({ event, context }) => {
  const { prover, endpoint, features } = event.args
  await context.db.insert(provaProverUpdated).values({
    id: eventId(event),
    prover,
    endpoint,
    features,
    ...eventMeta(event),
  })
})

ponder.on("ProverRegistry:ProverDeregistered", async ({ event, context }) => {
  const { prover } = event.args
  await context.db.insert(provaProverDeregistered).values({
    id: eventId(event),
    prover,
    ...eventMeta(event),
  })
})

ponder.on("ProverRegistry:PriceChanged", async ({ event, context }) => {
  const { prover, pricePerGibDay, pricePerByteServed } = event.args
  await context.db.insert(provaPriceChanged).values({
    id: eventId(event),
    prover,
    pricePerGibDay,
    pricePerByteServed,
    ...eventMeta(event),
  })
})

ponder.on("ProverRegistry:ENSBound", async ({ event, context }) => {
  const { prover, ensNode } = event.args
  await context.db.insert(provaEnsBound).values({
    id: eventId(event),
    prover,
    ensNode,
    ...eventMeta(event),
  })
})
