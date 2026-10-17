"use client";

import { createContext, useContext, type ReactNode } from "react";

/**
 * Lets a server page pass server-rendered content into a legacy client page.
 * The legacy page renders <LegacySlot /> where the extra content belongs (usually just above the footer),
 * so long-form copy and FAQs stay in the HTML without adding client JavaScript.
 */
export const LegacySlotContext = createContext<ReactNode>(null);

export default function LegacySlot() {
  return <>{useContext(LegacySlotContext)}</>;
}
