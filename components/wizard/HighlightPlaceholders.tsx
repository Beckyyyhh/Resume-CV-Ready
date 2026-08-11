const PLACEHOLDER_RE = /(\[[^\]]+\])/g;

/** Renders text with any `[bracketed placeholder]` segments visually highlighted. */
export function HighlightPlaceholders({ text }: { text: string }) {
  if (!text) return null;
  const parts = text.split(PLACEHOLDER_RE);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          <span
            key={i}
            style={{
              backgroundColor: "#ede9fe",
              color: "#3d2c8d",
              borderRadius: 3,
              padding: "0 3px",
              fontWeight: 700,
              borderBottom: "1.5px dashed #7c6fce",
            }}
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
