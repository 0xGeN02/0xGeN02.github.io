---
title: "Setting up a Reth execution client on Arch Linux"
description: "A walkthrough of compiling Reth from source, configuring JWT auth, and connecting to a CL client like Lighthouse for a full Ethereum node."
date: "2024-11-12"
tags: ["blockchain", "rust", "ethereum"]
language: "Rust"
draft: false
---

## Why Reth?

Reth is a modern Ethereum execution client written in Rust by Paradigm. Compared to Geth, it offers significantly faster sync times, lower memory usage, and a cleaner codebase that's easier to audit.

## Prerequisites

You'll need Rust installed via `rustup`, plus a few system deps:

```bash
sudo pacman -S gcc make libclang
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## Compiling from source

```bash
git clone https://github.com/paradigmxyz/reth
cd reth
cargo build --release --bin reth
```

This will take a while. Grab a coffee.

## JWT auth setup

Both the execution client and the consensus client need to share a JWT secret to communicate over the Engine API:

```bash
openssl rand -hex 32 > /etc/ethereum/jwt.hex
chmod 600 /etc/ethereum/jwt.hex
```

## Running Reth

```bash
./target/release/reth node \
  --authrpc.jwtsecret /etc/ethereum/jwt.hex \
  --authrpc.addr 127.0.0.1 \
  --authrpc.port 8551 \
  --http \
  --http.api eth,net,web3
```

## Connecting Lighthouse

Once Reth is syncing, point Lighthouse at it:

```bash
lighthouse bn \
  --network mainnet \
  --execution-endpoint http://localhost:8551 \
  --execution-jwt /etc/ethereum/jwt.hex \
  --checkpoint-sync-url https://mainnet.checkpoint.sigp.io
```

Checkpoint sync will get your beacon node to the head of the chain in minutes rather than days.

## Monitoring

You can check sync status via the JSON-RPC:

```bash
curl -X POST http://localhost:8545 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
```

Once `eth_syncing` returns `false`, you're fully synced.
