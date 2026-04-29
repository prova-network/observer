// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Prova Network contributors.
//
// Indexer for prova-network/contracts FeeRouter.

import { ponder } from "ponder:registry"
import {
  provaFeeRouterParamChange,
  provaFeeRouterWithdrawn,
  provaFeesBurned,
  provaFeesHeld,
} from "ponder:schema"
import { eventId, eventMeta } from "./event-utils.js"

ponder.on("FeeRouter:FeesHeld", async ({ event, context }) => {
  const { usdcAmount } = event.args
  await context.db.insert(provaFeesHeld).values({
    id: eventId(event),
    usdcAmount,
    ...eventMeta(event),
  })
})

ponder.on("FeeRouter:FeesBurned", async ({ event, context }) => {
  const { usdcIn, provaOut } = event.args
  await context.db.insert(provaFeesBurned).values({
    id: eventId(event),
    usdcIn,
    provaOut,
    ...eventMeta(event),
  })
})

ponder.on("FeeRouter:Withdrawn", async ({ event, context }) => {
  const { token, to, amount } = event.args
  await context.db.insert(provaFeeRouterWithdrawn).values({
    id: eventId(event),
    token,
    to,
    amount,
    ...eventMeta(event),
  })
})

ponder.on("FeeRouter:ModeChanged", async ({ event, context }) => {
  const { oldMode, newMode } = event.args
  await context.db.insert(provaFeeRouterParamChange).values({
    id: eventId(event),
    kind: "ModeChanged",
    oldValue: oldMode.toString(),
    newValue: newMode.toString(),
    ...eventMeta(event),
  })
})

ponder.on("FeeRouter:BurnShareChanged", async ({ event, context }) => {
  const { oldBps, newBps } = event.args
  await context.db.insert(provaFeeRouterParamChange).values({
    id: eventId(event),
    kind: "BurnShareChanged",
    oldValue: oldBps.toString(),
    newValue: newBps.toString(),
    ...eventMeta(event),
  })
})

ponder.on("FeeRouter:MaxSlippageChanged", async ({ event, context }) => {
  const { oldBps, newBps } = event.args
  await context.db.insert(provaFeeRouterParamChange).values({
    id: eventId(event),
    kind: "MaxSlippageChanged",
    oldValue: oldBps.toString(),
    newValue: newBps.toString(),
    ...eventMeta(event),
  })
})

ponder.on("FeeRouter:MaxSwapPerCallChanged", async ({ event, context }) => {
  const { oldMax, newMax } = event.args
  await context.db.insert(provaFeeRouterParamChange).values({
    id: eventId(event),
    kind: "MaxSwapPerCallChanged",
    oldValue: oldMax.toString(),
    newValue: newMax.toString(),
    ...eventMeta(event),
  })
})

ponder.on("FeeRouter:SwapPoolFeeChanged", async ({ event, context }) => {
  const { oldFee, newFee } = event.args
  await context.db.insert(provaFeeRouterParamChange).values({
    id: eventId(event),
    kind: "SwapPoolFeeChanged",
    oldValue: oldFee.toString(),
    newValue: newFee.toString(),
    ...eventMeta(event),
  })
})

ponder.on("FeeRouter:SwapRouterChanged", async ({ event, context }) => {
  const { oldRouter, newRouter } = event.args
  await context.db.insert(provaFeeRouterParamChange).values({
    id: eventId(event),
    kind: "SwapRouterChanged",
    oldValue: oldRouter,
    newValue: newRouter,
    ...eventMeta(event),
  })
})
