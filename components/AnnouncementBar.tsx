"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/content/site";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="announce" role="region" aria-label="Site announcement">
      <div className="site-container announce-inner">
        <p>
          <span aria-hidden="true">// </span>
          {site.announcement.text} - <Link href="/#contact">reach out</Link>
        </p>
        <button type="button" className="announce-close" onClick={() => setVisible(false)} aria-label="Dismiss announcement">
          <span aria-hidden="true">x</span>
        </button>
      </div>
    </div>
  );
}
