"use client";

import { useEffect, useState, useCallback } from "react";

type Phase = "in" | "done";

export default function Loader() {
  const [phase, setPhase] = useState<Phase>("in");

  const finish = useCallback(() => setPhase("done"), []);

  useEffect(() => {
    if (phase === "done") return;
    const timer = setTimeout(() => setPhase("done"), 1400);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <div
      id="loader"
      className={phase === "done" ? "hide" : ""}
      onClick={finish}
      role="presentation"
    >
      <div className="loader-stage">
        <div className="loader-name show">
          <h2>
            <span>The</span> <span>Ummed</span> <span>Haveli</span>
          </h2>
          <span className="loader-name-line" aria-hidden />
          <p>At The Airport</p>
        </div>
      </div>
    </div>
  );
}
