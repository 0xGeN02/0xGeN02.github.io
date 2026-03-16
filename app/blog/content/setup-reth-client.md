---
title: "Running a full Ethereum node with Reth + Lighthouse"
description: "A step-by-step guide to deploying a Rust-based Ethereum execution client paired with Lighthouse consensus using Docker Compose."
date: "12-11-2025"
tags: ["blockchain", "dev-ops"]
language: ["Bash", "Docker"]
draft: false
---

## Why Reth?

[Reth](https://github.com/paradigmxyz/reth) is a modern Ethereum execution client written in Rust by Paradigm. Compared to Geth it offers significantly faster sync times, lower memory footprint, and a cleaner codebase that's easier to audit. Paired with [Lighthouse](https://github.com/sigp/lighthouse) as the consensus client, you get a fully open-source, Rust-native node stack.

Running your own node means you don't rely on third-party RPC providers like Alchemy or Infura. You can submit transactions, query state, and run validators with full sovereignty.

## Prerequisites

Before starting, make sure you have:

* A machine with at least **16 GB RAM** and **2 TB SSD** (HDD will bottleneck sync badly)
* **Ubuntu 22.04** or any recent Debian-based distro
* Open ports: `8545` (HTTP RPC), `8551` (Engine API), `9000` (Lighthouse P2P)

### Install Docker

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
```

```bash
# Add Docker's official GPG key
sudo install -m 0755 -d /usr/share/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  | sudo gpg --dearmor -o /usr/share/keyrings/docker.gpg
```

```bash
# Add the repository
. /etc/os-release
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $VERSION_CODENAME stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

```bash
# Install
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo usermod -aG docker $USER && newgrp docker
```

Using the official Docker repo instead of `docker.io` from apt ensures you get the latest stable release with Compose v2 included.

### Verify

```bash
docker --version
docker compose version
```

## Project structure

```bash
mkdir -p ~/reth-node && cd ~/reth-node
```

Everything will live under this directory:

```bash
reth-node/
├── docker-compose.yml
├── secrets/
│   └── jwt.hex          # shared auth secret between EL and CL
└── data/
    ├── reth/            # execution client chaindata
    └── lighthouse/      # consensus client state
```

## Generate the JWT secret

The Engine API — the channel between the execution client (Reth) and the consensus client (Lighthouse) — requires mutual authentication via a shared JWT secret. Without it, the two clients won't talk to each other.

```bash
mkdir -p ./secrets
openssl rand -hex 32 > ./secrets/jwt.hex
chmod 600 ./secrets/jwt.hex
```

Both containers will mount this file as read-only at `/jwt.hex`.

## Docker Compose

```yaml
services:
  reth:
    image: ghcr.io/paradigmxyz/reth:latest
    container_name: reth
    restart: unless-stopped
    volumes:
      - ./data/reth:/data
      - ./secrets/jwt.hex:/jwt.hex:ro
    ports:
      - "8545:8545"   # HTTP JSON-RPC
      - "8551:8551"   # Engine API (CL ↔ EL)
    command: >
      node
      --chain mainnet
      --datadir /data
      --authrpc.jwtsecret /jwt.hex
      --authrpc.addr 0.0.0.0
      --authrpc.port 8551
      --http
      --http.addr 0.0.0.0
      --http.port 8545
      --http.api eth,net,web3

  lighthouse:
    image: sigp/lighthouse:latest
    container_name: lighthouse
    restart: unless-stopped
    depends_on:
      - reth
    volumes:
      - ./data/lighthouse:/root/.lighthouse
      - ./secrets/jwt.hex:/jwt.hex:ro
    ports:
      - "9000:9000/tcp"
      - "9000:9000/udp"   # P2P discovery
    command: >
      lighthouse bn
      --network mainnet
      --execution-endpoint http://reth:8551
      --execution-jwt /jwt.hex
      --checkpoint-sync-url https://mainnet.checkpoint.sigp.io
      --disable-deposit-contract-sync
```

A few things worth noting:

* `--checkpoint-sync-url` makes Lighthouse download a recent finalized state instead of syncing from genesis — this cuts initial sync from days to hours.
* `--http.api eth,net,web3` exposes only the namespaces you need. Don't expose `admin` or `debug` on a public interface.
* `depends_on: reth` ensures Lighthouse starts after Reth, but doesn't wait for Reth to be *ready* — the `restart: unless-stopped` policy handles transient startup failures.

## Start the node

```bash
docker compose up -d
```

Follow logs in real time:

```bash
docker compose logs -f reth
docker compose logs -f lighthouse
```

On first startup, Reth will initialize the database and start downloading headers. Lighthouse will fetch the checkpoint state and begin following the chain. Expect both to print a lot during the first few minutes — that's normal.

## Verify sync status

Query Reth directly over JSON-RPC:

```bash
curl -s -X POST http://localhost:8545 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' | jq
```

**`false`** means the execution client is fully synced. Any other response is an object like:

```json
{
  "currentBlock": "0x13a4f1c",
  "highestBlock": "0x13a5002",
  "startingBlock": "0x0"
}
```

Where `currentBlock` is where Reth is now and `highestBlock` is the chain tip. The gap closes over time.

For Lighthouse, check beacon chain sync:

```bash
curl -s http://localhost:5052/eth/v1/node/syncing | jq
```

`"is_syncing": false` means the consensus client has caught up.

## Useful commands

Update to the latest images:

```bash
docker compose pull
docker compose up -d
```

Stop without removing data:

```bash
docker compose down
```

Restart a single service:

```bash
docker compose restart reth
```

Check disk usage:

```bash
du -sh ./data/reth ./data/lighthouse
```

## What's next

Once your node is fully synced you have a few natural directions:

* **Monitoring** — add a Prometheus + Grafana stack. Reth exposes metrics at `localhost:9001` out of the box.
* **Validator** — run `lighthouse vc` pointed at your beacon node to start earning attestation rewards.
* **MEV-Boost** — connect [mev-boost](https://github.com/flashbots/mev-boost) between Lighthouse and Reth to access the block builder market.
* **Secure the RPC** — if you expose `8545` externally, put NGINX in front with rate limiting and token auth.
