/**
 * Renders a schema.org JSON-LD block. Server component (no hooks) so it drops
 * straight into a layout or page. The `<` → `<` replacement is the
 * escaping Next's own docs recommend, closing the XSS vector in
 * JSON.stringify output.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
