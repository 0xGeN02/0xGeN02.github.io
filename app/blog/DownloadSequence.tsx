"use client";
import { useEffect, useRef, useState } from "react";

const PACKAGES = [
    { tag: "typescript", name: "react", ver: "18.2.0", size: "15000", color: "#61dafb" },
    { tag: "c", name: "time.h", ver: "1.0.0", size: "2000", color: "#f38ba8" },
    { tag: "rust", name: "tokio", ver: "1.28.0", size: "2300", color: "#a6e3a1" },
    { tag: "python", name: "pytorch", ver: "2.5.0", size: "12000", color: "#f9e2af" },
    { tag: "solidity", name: "chainlink", ver: "4.9.0", size: "8000", color: "#89b4fa" },
];

const PHASES = {
    RESOLVING: "resolving",
    DOWNLOADING: "downloading",
    INSTALLING: "installing",
    DONE: "done",
};

const STYLES = {
    container: {
        background: "#1e1e2e",
        color: "#cdd6f4",
    },
    header: {
        marginBottom: "1.2rem",
    },
    subHeader: {
        color: "#585b70",
        marginBottom: "0.8rem",
    },
    packageListHeader: {
        marginBottom: "0.6rem",
        color: "#cba6f7",
        fontSize: "11px",
        letterSpacing: "0.05em",
    },
    progressBar: {
        margin: "1rem 0 0.5rem",
    },
    logDivider: {
        color: "#585b70",
        margin: "0.5rem 0 0.3rem",
    },
};

type PkgState = "pending" | "downloading" | "done";

interface Props {
    onDone: () => void;
}

export default function BlogBootSequence({ onDone }: Props) {
    const [pkgStates, setPkgStates] = useState<PkgState[]>(PACKAGES.map(() => "pending"));
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState(PHASES.RESOLVING);
    const [installIdx, setInstallIdx] = useState(-1);
    const [, setLogLines] = useState<string[]>([]);
    const cancelled = useRef(false);

    function updatePkgState(index: number, state: PkgState) {
        setPkgStates((prev) => {
            const next = [...prev];
            next[index] = state;
            return next;
        });
    }

    useEffect(() => {
        cancelled.current = false;
        const speeds = PACKAGES.map(() => Math.random() * 8 + 6);
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
                        updatePkgState(i, "done");
                    } else {
                        updatePkgState(i, "downloading");
                    }
                }
            });

            setProgress(pcts.reduce((a, b) => a + b, 0) / PACKAGES.length);

            if (!allDone) {
                requestAnimationFrame(tick);
            } else {
                setTimeout(() => {
                    if (!cancelled.current) {
                        setPhase(PHASES.INSTALLING);
                        setInstallIdx(0);
                    }
                }, 400);
            }
        }

        const t1 = setTimeout(() => {
            if (cancelled.current) return;
            setPhase(PHASES.DOWNLOADING);
            requestAnimationFrame(tick);
        }, 700);

        return () => {
            cancelled.current = true;
            clearTimeout(t1);
        };
    }, []);

    useEffect(() => {
        if (phase !== PHASES.INSTALLING || installIdx < 0) return;
        if (installIdx >= PACKAGES.length) {
            setTimeout(() => {
                if (!cancelled.current) setPhase(PHASES.DONE);
            }, 400);
            return;
        }

        const t = setTimeout(() => {
            if (!cancelled.current) {
                setLogLines((prev) => [...prev, `installing ${PACKAGES[installIdx].ver}`]);
                setInstallIdx((i) => i + 1);
            }
        }, 90 + Math.random() * 80);

        return () => clearTimeout(t);
    }, [phase, installIdx]);

    useEffect(() => {
        if (phase !== PHASES.DONE) return;
        const t = setTimeout(() => {
            if (!cancelled.current) onDone();
        }, 900);
        return () => clearTimeout(t);
    }, [phase, onDone]);

    function renderPackages() {
        return PACKAGES.map((pkg, i) => {
            const state = pkgStates[i];
            return (
                <div key={`${pkg.tag}/${pkg.name}`} style={{ display: "flex", alignItems: "center", gap: "8px", lineHeight: "1.7" }}>
                    <span style={{ color: "#585b70" }}>[</span>
                    <span
                        style={{
                            color: state === "done" ? "#a6e3a1" : state === "downloading" ? "#cba6f7" : "#585b70",
                            minWidth: "20px",
                            fontSize: "11px",
                        }}
                    >
                        {state === "done" ? "OK" : state === "downloading" ? "DL" : "──"}
                    </span>
                    <span style={{ color: "#585b70" }}>]</span>
                    <span style={{ color: pkg.color, minWidth: "180px" }}>{pkg.tag}/{pkg.name}</span>
                    <span style={{ color: "#a6adc8", fontSize: "11px" }}>{pkg.size}</span>
                </div>
            );
        });
    }

    function renderProgressBar() {
        const filledBlocks = Math.floor(progress / 100 * 30);
        const emptyBlocks = 30 - filledBlocks;

        return (
            <div style={STYLES.progressBar}>
                {phase === PHASES.DOWNLOADING ? (
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
        );
    }

    return (
        <div
            className="min-h-screen w-full flex flex-col justify-center px-6 py-12 font-mono text-sm"
            style={STYLES.container}
        >
            <div className="max-w-2xl mx-auto w-full">
                <div style={STYLES.header}>
                    <span style={{ color: "#cba6f7" }}>:: </span>
                    <span style={{ color: "#89b4fa" }}>blog</span>
                    <span style={{ color: "#585b70" }}> v1.0.0 — dependency resolver</span>
                </div>

                <div style={STYLES.subHeader}>
                    {phase === PHASES.RESOLVING ? "resolving transaction..." : "transaction resolved"}
                </div>

                <div style={STYLES.packageListHeader}>packages ({PACKAGES.length})</div>
                {renderPackages()}

                {phase !== PHASES.RESOLVING && renderProgressBar()}

                {phase === PHASES.DONE && (
                    <>
                        <div style={STYLES.logDivider}>─────────────────────────────────</div>
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
            </div>
        </div>
    );
}