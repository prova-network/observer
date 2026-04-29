<div align="center">

<img src="https://raw.githubusercontent.com/prova-network/brand/main/prova-mark-light.svg#gh-light-mode-only" alt="Prova" width="80" />
<img src="https://raw.githubusercontent.com/prova-network/brand/main/prova-mark-dark.svg#gh-dark-mode-only" alt="Prova" width="80" />

# prova-network/observer

**Observability tools for the Prova Network.**
Indexed event history, live contract state, and prover/deal/proof telemetry, exposed to humans and AI agents over MCP, HTTP, and a CLI.

</div>

---

## What this is

Prova Observer indexes every event the Prova Network emits on Base, projects them into a queryable Postgres database via [Ponder](https://ponder.sh/), and serves the result through three surfaces:

- **MCP server** with a curated tool catalog so AI agents (Claude, Cursor, anything that speaks Streamable HTTP / stdio) can ask Prova questions in natural language without learning the schema.
- **HTTP API** for dashboards, alerting, and one-off SQL.
- **CLI** for local debugging and scripting.

It also pulls **live contract state** straight from Base RPC for the things that don't live in events: current stake per prover, current `parked_pieces` queue depth, Chainlink/Uniswap oracle reads, etc.

## Status

> **Early. Phase 1 (structural fork from FilOzone/foc-observer + repo setup) is complete. Phase 2 (Prova ABI + ponder config + schema rewrite) is in progress.**

Current state:

- [x] Forked from [`FilOzone/foc-observer`](https://github.com/FilOzone/foc-observer) with attribution preserved (see [`ATTRIBUTION.md`](./ATTRIBUTION.md)).
- [x] Package metadata, repo, branding swapped for Prova.
- [x] Ponder config skeleton for the three Prova chain presets (`anvil`, `base-sepolia`, `base`).
- [ ] Replace upstream ABIs (PDPVerifier, FilecoinWarmStorageService, FilecoinPayV1, etc.) with Prova v2 contracts: `StorageMarketplace`, `ProofVerifier`, `ProverStaking`, `ProverRegistry`, `ContentRegistry`, `ProverRewards`, `FeeRouter`, `ProvaToken`.
- [ ] Rewrite `indexer/src/*` event handlers for Prova event shapes.
- [ ] Rewrite `indexer/src/schema-defs.ts` table definitions for Prova.
- [ ] Replace `dealbot-client.ts`, `betterstack-client.ts`, `proving-client.ts` (FilOzone-specific) with Prova-native equivalents or remove.
- [ ] Rebuild the MCP tool catalog and prompt scaffolding around Prova entities.

Don't run this against production Base yet. The indexer config still has placeholder addresses for `base-sepolia` and `base` because the Prova v2 contract suite hasn't been deployed to those chains yet (tracked in [`prova-network/prova#1`](https://github.com/prova-network/prova/issues/1)). Local anvil flow works once you deploy the contract suite locally.

## Quick start (local anvil flow)

```bash
# 1. Spin up anvil and deploy the Prova v2 contract suite.
#    See: prova-network/prova-helm-app/README.md
anvil --port 8545 --chain-id 31337
cd /path/to/prova/contracts
forge script script/Deploy.s.sol --rpc-url http://127.0.0.1:8545 --broadcast \
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

# 2. In another shell, bring up the observer stack.
cd /path/to/prova-observer
cp .env.example .env
docker compose up
```

The MCP server will be on `http://localhost:8080/mcp`, the HTTP API on `http://localhost:8080/api`, and the indexer on `http://localhost:42069`.

## Architecture

```
┌─────────────── Base RPC (anvil / base-sepolia / base) ────────────────┐
│                                                                       │
│  Prova v2 contracts emit events:                                      │
│    StorageMarketplace, ProofVerifier, ProverStaking,                  │
│    ProverRegistry, ContentRegistry, ProverRewards,                    │
│    FeeRouter, ProvaToken                                              │
│                                                                       │
└───────────────────┬───────────────────────────────────────────────────┘
                    │
                    ▼ ponder
┌──────────── prova-network-observer-indexer ──────────────────────────┐
│  Decodes events, writes typed rows into Postgres.                    │
│  Schema in indexer/src/schema-defs.ts.                               │
└───────────────────┬───────────────────────────────────────────────────┘
                    │
                    ▼ pg
┌──────────────── Postgres (ponder schema + Prova tables) ─────────────┐
│  Append-only event history + materialized views for live state.      │
└───────────────────┬───────────────────────────────────────────────────┘
                    │
                    ▼ pg-pool + viem (RPC)
┌──────────────── prova-observer-server (Hono + MCP) ──────────────────┐
│   /mcp           streamable-HTTP MCP for AI agents                   │
│   /api/sql       gated SQL passthrough                               │
│   /api/contract  live RPC reads (stake, deal status, oracle)         │
│   /api/health    pipeline health                                     │
└───────────────────┬───────────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────── @prova-network/observer (CLI) ───────────────────────┐
│  prova-observer query "show all active deals over 1 GiB"             │
│  prova-observer mcp                                                  │
└───────────────────────────────────────────────────────────────────────┘
```

## Provenance

Prova Observer was forked from [FilOzone/foc-observer](https://github.com/FilOzone/foc-observer), authored primarily by [@rvagg](https://github.com/rvagg) for the Filecoin Onchain Cloud stack. License Apache-2.0 OR MIT, preserved here. See [`ATTRIBUTION.md`](./ATTRIBUTION.md) for per-file transplant status as the rewrite progresses.

The architectural shape of this project (Ponder + MCP + CLI) is upstream's idea. The Prova-specific work is replacing the indexed contracts, schema, tool catalog, and surface copy.

## License

Apache-2.0 OR MIT (dual). Same as upstream.
