// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Prova Network contributors.
//
// Indexer for prova-network/contracts ProvaToken (ERC-20 transfers).
// Approval events are intentionally ignored; mints (from=0x0) and
// burns (to=0x0) come through as ordinary Transfer rows and are
// filterable downstream.

import { ponder } from "ponder:registry"
import { provaTokenTransfer } from "ponder:schema"
import { eventId, eventMeta } from "./event-utils.js"

ponder.on("ProvaToken:Transfer", async ({ event, context }) => {
  const { from, to, value } = event.args
  await context.db.insert(provaTokenTransfer).values({
    id: eventId(event),
    from,
    to,
    amount: value,
    ...eventMeta(event),
  })
})
