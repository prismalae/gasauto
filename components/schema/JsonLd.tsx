/**
 * Renders a JSON-LD block. Content is our own static data, so the stringify is
 * safe; we escape `<` defensively so a stray sequence can never break out of
 * the script element.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
