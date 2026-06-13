"use client";

import { useLoader } from "@/hooks/useLoader";

export default function Loader() {
  const hidden = useLoader();

  return (
    <div id="loader" className={hidden ? "hide" : ""}>
      <h2>
        <span>The</span> <span>Ummed</span> <span>Haveli</span>
      </h2>
      <p>Jaipur &bull; Rajasthan</p>
    </div>
  );
}
