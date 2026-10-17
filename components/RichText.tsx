import type { ReactNode } from "react";

/** Renders text with simple [label](/href) links. */
export default function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <a key={m.index} href={m[2]} className="font-semibold text-green-700 underline">
        {m[1]}
      </a>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

/** Plain-text version (link labels only), for JSON-LD. */
export function plainText(text: string) {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}
