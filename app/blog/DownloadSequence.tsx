"use client";
import { useEffect, useRef, useState } from "react";

import { BLOG_PACKAGES } from "@/app/blog/data";

const PACKAGES = BLOG_PACKAGES;

type PkgState = "pending" | "downloading" | "done";

interface Props {
    onDone: () => void;
}

export default function BlogBootSequence({ onDone }: Props) {
    const [pkgStates, setPkgStates] = useState<PkgState[]>(PACKAGES.map(() => "pending"));
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<"resolving" | "downloading" | "installing" | "done">("resolving");
    const [installIdx, setInstallIdx] = useState(-1);
    const [logLines, setLogLines] = useState<string[]>([]);
    const cancelled = useRef(false);

    useEffect(() => {
    cancelled.current = false;

    function startDownload() {
    const speeds = PACKAGES.map(() => Math.random() * 15 + 6);
    const pcts = PACKAGES.map(() => 0);
    const done = PACKAGES.map(() => false);

    function tick() {
        if (cancelled.current) return;
        let allDone = true;

        PACKAGES.forEach((_, i) => {
            if (!done[i]) {
                allDone = false;
                pcts[i] = Math.min(100, pcts[i] + speeds[i]);
                if (pcts[i] >= 100) {
                    done[i] = true;
                    setPkgStates(prev => {
                        const next = [...prev];
                        next[i] = "done";
                        return next;
                    });
                } else {
                    setPkgStates(prev => {
                        const next = [...prev];
                        if (next[i] === "pending") next[i] = "downloading";
                        return next;
                    });
                }
            }
        });

        const total = pcts.reduce((a, b) => a + b, 0) / (PACKAGES.length * 100) * 100;
        setProgress(total);

        if (!allDone) {
            setTimeout(tick, 60);
        } else {
            setTimeout(() => {
                if (!cancelled.current) {
                    setPhase("installing");
                    setInstallIdx(0);
                }
            }, 400);
        }
    }

    tick();
    }

        // Phase 1: resolving
    const t1 = setTimeout(() => {
        if (cancelled.current) return;
        setPhase("downloading");
        startDownload();
    }, 700);

    return () => {
        cancelled.current = true;
        clearTimeout(t1);
    };
    }, []);

    useEffect(() => {
        if (phase !== "installing" || installIdx < 0) return;
        if (installIdx >= PACKAGES.length) {
            setTimeout(() => {
                if (!cancelled.current) setPhase("done");
            }, 400);
            return;
        }

        const p = PACKAGES[installIdx];
        // Usar un temporizador para actualizar los logs de forma asíncrona
        const t = setTimeout(() => {
            if (!cancelled.current) {
                setLogLines((prev) => [...prev, `installing ${p.name}`]);
                setInstallIdx((i) => i + 1); // Incrementar el índice
            }
        }, 90 + Math.random() * 80);

        return () => clearTimeout(t);
    }, [phase, installIdx]);

    useEffect(() => {
        if (phase !== "done") return;
        const t = setTimeout(() => {
            if (!cancelled.current) onDone();
        }, 900);
        return () => clearTimeout(t);
    }, [phase, onDone]);

    const filledBlocks = Math.floor(progress / 100 * 30);
    const emptyBlocks  = 30 - filledBlocks;

    return (
    <div
        className="min-h-screen w-full flex flex-col justify-center px-6 py-12 font-mono text-sm"
        style={{ background: "#1e1e2e", color: "#cdd6f4" }}
    >
        <div className="max-w-2xl mx-auto w-full">

        {/* Header */}
        <div style={{ marginBottom: "1.2rem" }}>
            <span style={{ color: "#cba6f7" }}>:: </span>
            <span style={{ color: "#89b4fa" }}>blog</span>
            <span style={{ color: "#585b70" }}> v0.1.0 — dependency resolver</span>
        </div>

        <div style={{ color: "#585b70", marginBottom: "0.8rem" }}>
            {phase === "resolving" ? "resolving transaction..." : "transaction resolved"}
        </div>

        {/* Package list */}
        <div style={{ marginBottom: "0.6rem", color: "#cba6f7", fontSize: "11px", letterSpacing: "0.05em" }}>
            packages ({PACKAGES.length})
        </div>
        {PACKAGES.map((pkg, i) => {
            const state = pkgStates[i];
            return (
            <div key={`${pkg.tag}/${pkg.name}`} style={{ display: "flex", alignItems: "center", gap: "8px", lineHeight: "1.7" }}>
                <span style={{ color: "#585b70" }}>[</span>
                <span style={{
                color: state === "done" ? "#a6e3a1" : state === "downloading" ? "#cba6f7" : "#585b70",
                minWidth: "20px",
                fontSize: "11px",
                }}>
                {state === "done" ? "OK" : state === "downloading" ? "DL" : "──"}
                </span>
                <span style={{ color: "#585b70" }}>]</span>
                <span style={{ color: pkg.color, minWidth: "180px" }}>{pkg.tag}/{pkg.name}</span>
                <span style={{ color: "#a6adc8", fontSize: "11px" }}>{pkg.size}</span>
            </div>
            );
        })}

        {/* Progress bar */}
        {phase !== "resolving" && (
            <div style={{ margin: "1rem 0 0.5rem" }}>
            {phase === "downloading" ? (
                <>
                <span style={{ color: "#585b70" }}>downloading: </span>
                <span style={{ color: "#585b70" }}>[</span>
                <span style={{ color: "#cba6f7" }}>{"█".repeat(filledBlocks)}</span>
                <span style={{ color: "#313244" }}>{"░".repeat(emptyBlocks)}</span>
                <span style={{ color: "#585b70" }}>]</span>
                {" "}
                <span style={{ color: "#cba6f7" }}>{Math.round(progress)}%</span>
                </>
            ) : (
                <span style={{ color: "#a6e3a1" }}>:: download complete</span>
            )}
            </div>
        )}

        {/* Install log */}
        {phase !== "resolving" && phase !== "downloading" && (
            <>
            <div style={{ color: "#585b70", margin: "0.5rem 0 0.3rem" }}>─────────────────────────────────</div>
            <div style={{ marginBottom: "0.3rem" }}>
                <span style={{ color: "#cba6f7" }}>:: </span>installing packages...
            </div>
            {logLines.map((line, i) => (
                <div key={i} style={{ color: "#585b70" }}>
                installing <span style={{ color: PACKAGES[i]?.color ?? "#cdd6f4" }}>
                    {PACKAGES[i]?.tag}/{PACKAGES[i]?.name}
                </span>
                <span style={{ color: "#a6e3a1" }}> ✓</span>
                </div>
            ))}
            </>
        )}

        {/* Summary */}
        {phase === "done" && (
            <>
            <div style={{ color: "#585b70", margin: "0.5rem 0 0.3rem" }}>─────────────────────────────────</div>
            <div>
                <span style={{ color: "#cba6f7" }}>:: </span>
                <span style={{ color: "#a6e3a1" }}>transaction complete</span>
            </div>
            <div style={{ marginTop: "0.2rem" }}>
                <span style={{ color: "#585b70" }}>installed: </span>
                <span style={{ color: "#89b4fa" }}>{PACKAGES.length} packages</span>
                <span style={{ color: "#585b70", marginLeft: "1rem" }}>size: </span>
                <span style={{ color: "#f9e2af" }}>
                {(PACKAGES.reduce((a, p) => a + parseInt(p.size), 0) / 1024).toFixed(1)} MiB
                </span>
            </div>
            <div style={{ marginTop: "0.6rem" }}>
                <span style={{ color: "#a6e3a1" }}>✓ </span>
                blog is ready — entering...
            </div>
            </>
        )}

        {/* Cursor */}
        {phase !== "done" && <span className="cursor-blink" style={{ marginTop: "0.5rem", display: "inline-block" }} />}
        </div>
    </div>
    );
}