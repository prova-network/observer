#!/usr/bin/env bash
# Regenerate indexer/abis/*.ts from prova-network/contracts forge artifacts.
#
# Requires: a checkout of prova-network/contracts (or the umbrella prova
# monorepo) at $PROVA_CONTRACTS_DIR with forge build artifacts present
# under out/<Name>.sol/<Name>.json.
#
# Defaults to the layout used in development: ../prova/contracts.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CONTRACTS_DIR="${PROVA_CONTRACTS_DIR:-${ROOT}/../prova/contracts}"

if [[ ! -d "$CONTRACTS_DIR/out" ]]; then
  echo "✗ $CONTRACTS_DIR/out not found." >&2
  echo "  Build the contracts first (forge build) or set PROVA_CONTRACTS_DIR." >&2
  exit 1
fi

ABIS_OUT="$ROOT/indexer/abis"
mkdir -p "$ABIS_OUT"

# Foundry artifact basename: TS export name
declare -a TARGETS=(
  "ProvaToken:ProvaTokenAbi"
  "ProofVerifier:ProofVerifierAbi"
  "ProverRegistry:ProverRegistryAbi"
  "ProverStaking:ProverStakingAbi"
  "ContentRegistry:ContentRegistryAbi"
  "StorageMarketplace:StorageMarketplaceAbi"
  "FeeRouter:FeeRouterAbi"
  "ProverRewards:ProverRewardsAbi"
)

# Wipe stale ABIs in the output directory so we don't keep a renamed
# contract's old file around.
find "$ABIS_OUT" -maxdepth 1 -type f -name '*.ts' -delete

for entry in "${TARGETS[@]}"; do
  name="${entry%%:*}"
  export_name="${entry##*:}"
  artifact="$CONTRACTS_DIR/out/${name}.sol/${name}.json"
  if [[ ! -f "$artifact" ]]; then
    echo "WARN: $artifact missing, skipping $name" >&2
    continue
  fi
  out_path="$ABIS_OUT/${name}.ts"
  python3 - "$artifact" "$out_path" "$export_name" "$name" <<'PY'
import json
import sys
from pathlib import Path

artifact, out_path, export_name, name = sys.argv[1:5]
abi = json.loads(Path(artifact).read_text())["abi"]
header = (
    f"// Auto-generated from prova-network/contracts forge artifacts.\n"
    f"// Source: contracts/out/{name}.sol/{name}.json\n"
    f"// Regenerate via: bash scripts/generate-abis.sh\n"
    f"// SPDX-License-Identifier: MIT\n\n"
)
body = header + f"export const {export_name} = " + json.dumps(abi, indent=2) + " as const\n"
Path(out_path).write_text(body)
PY
  echo "  wrote $out_path"
done

echo ""
echo "✓ ABIs regenerated at $ABIS_OUT"
ls -1 "$ABIS_OUT"
