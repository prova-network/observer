# Attribution — prova-network/observer

Forked from [`FilOzone/foc-observer`](https://github.com/FilOzone/foc-observer), authored primarily by [@rvagg](https://github.com/rvagg) for the Filecoin Onchain Cloud (FOC) stack on Filecoin mainnet. License: Apache-2.0 OR MIT (dual), preserved.

The Prova fork keeps upstream's overall architecture (Ponder indexer + MCP server + CLI) and replaces the indexed contracts, the schema, the tool catalog, and the surface copy.

## Per-file transplant status

| File | Status | Notes |
| --- | --- | --- |
| `README.md` | rewritten | Prova framing + status checklist + Prova architecture diagram. |
| `client/package.json` | rewritten | `@prova-network/observer`, Prova metadata, `prova-observer` bin. |
| `server/package.json` | rewritten | `prova-observer-server`. |
| `indexer/package.json` | rewritten | `prova-network-observer-indexer`. |
| `indexer/abis/*` | **pending** | Replace `PDPVerifier`, `FilecoinWarmStorageService`, `FilecoinPayV1`, `ServiceProviderRegistry`, `SessionKeyRegistry`, `FilBeamOperator` with Prova v2 contracts: `StorageMarketplace`, `ProofVerifier`, `ProverStaking`, `ProverRegistry`, `ContentRegistry`, `ProverRewards`, `FeeRouter`, `ProvaToken`. |
| `indexer/ponder.config.mainnet.ts` | replaced | New `ponder.config.base.ts`, `ponder.config.base-sepolia.ts`, `ponder.config.anvil.ts` with Prova chain ids and contract address slots. |
| `indexer/ponder.config.calibnet.ts` | replaced | Calibnet has no analog in Prova; the anvil preset takes its role for local dev. |
| `indexer/ponder.schema.ts` | kept (skeleton) | Schema generator stays; the `TABLES` definition in `schema-defs.ts` is what gets rewritten. |
| `indexer/src/schema-defs.ts` | **pending** | Drop FOC-specific tables (`filbeam_*`, `filecoin_pay_*`, `sp_registry_*`, `session_keys_*`, `fwss_*`, `pdp_*`). Add Prova tables: `prova_deal`, `prova_data_set`, `prova_proof`, `prova_stake_event`, `prova_registry_entry`, `prova_content`, `prova_reward`, `prova_fee_burn`, `prova_token_transfer`. |
| `indexer/src/cid-utils.ts` | kept | CommP / CIDv2 helpers carry over (Prova uses the same encoding). |
| `indexer/src/event-utils.ts` | kept | Generic event helpers carry over. |
| `indexer/src/filbeam.ts` | **pending delete** | FilBeam (CDN bandwidth ledger) has no Prova analog. |
| `indexer/src/filecoin-pay.ts` / `filecoin-pay-burns.ts` | **pending delete** | Replaced by `prova_fee_burns.ts` against `FeeRouter`. |
| `indexer/src/fwss.ts` / `storacha-fwss.ts` | **pending delete** | Replaced by a new `prova_marketplace.ts` against `StorageMarketplace`. |
| `indexer/src/pdp-verifier.ts` | **pending rewrite** | Same upstream PDP shape; needs Prova `ProofVerifier` ABI + event names. |
| `indexer/src/sp-registry.ts` | **pending rewrite** | Replaced by a `prova_prover_registry.ts` against `ProverRegistry`. |
| `indexer/src/session-keys.ts` | **pending delete** | No Prova analog yet. |
| `client/src/cli.ts` | **pending rewrite** | CLI command surface needs Prova-shaped queries. |
| `client/src/mcp-client.ts` / `mcp-proxy.ts` | kept | Generic MCP plumbing carries over. |
| `server/src/main.ts` | kept | Server entrypoint is generic. |
| `server/src/routes.ts` | **pending rewrite** | Endpoint paths and shapes are Prova-specific. |
| `server/src/contract-reader.ts` | **pending rewrite** | Reads Prova contracts via viem; ABIs swap with the indexer. |
| `server/src/ponder-client.ts` | kept | Generic Ponder GraphQL client. |
| `server/src/sql-validator.ts` | kept | Generic SQL gating, allowlist of tables updated when the schema changes. |
| `server/src/networks.ts` | **pending rewrite** | Switch from Filecoin chain (314) / calibnet (314159) to Base (8453) / Base Sepolia (84532) / anvil (31337). |
| `server/src/dealbot-client.ts` | **pending delete** | DealBot is FilOzone-internal; Prova has no equivalent yet. |
| `server/src/betterstack-client.ts` | kept (optional) | Logging integration is generic; the MCP tools that rely on it become opt-in. |
| `server/src/proving-client.ts` | **pending rewrite** | Replaced by direct reads against Prova `ProofVerifier` rather than the FilOzone PDP Explorer subgraph. |
| `server/src/subgraph-client.ts` | **pending delete** | The PDP Explorer subgraph is FilOzone infrastructure; Prova reads its own indexer. |
| `server/src/mcp-handler.ts` | **pending rewrite** | MCP tool catalog redesigned around Prova entities (deals, provers, proofs, stake, content, emissions, burns, oracle). |
| `shared/system-context.ts` | **pending rewrite** | The natural-language schema description that gets fed to AI agents must reflect Prova's tables and semantics. |
| `shared/table-metadata.ts` | **pending rewrite** | Table-level metadata (descriptions, indexes, sample queries). |
| `docker-compose.yml` / `docker-compose.reindex.yml` | **pending edit** | Service names + image tags swap from `foc-observer-*` to `prova-observer-*`. |
| `.env.example` | rewritten | Variables renamed (`PROVA_RPC_URL`, `PROVA_NETWORK`, `PROVA_CONTRACTS_*`). |
| `.github/*` | **pending edit** | Workflow names + repo references swap. |

## License headers

Files inherited from upstream keep `Copyright (c) 2024-2026 Protocol Labs and rvagg + foc-observer contributors. License: Apache-2.0 OR MIT.` Prova-specific rewrites add `Copyright (c) 2026 Prova Network contributors.` alongside.
