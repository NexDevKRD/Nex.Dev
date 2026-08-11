import "./tech.css";

/**
 * Brand mark for a tool.
 *
 * The SVGs in public/icons are single-colour simple-icons with a baked-in grey
 * fill, which washes out on white and disappears on black. Masking the file and
 * painting it with `currentColor` instead keeps the real logo shape but lets it
 * inherit readable contrast in either theme.
 *
 * Tools with no brand mark (JWT, bcrypt, chi …) render as a bare name. A
 * stand-in bullet just read as a row of loud accent blocks.
 */
export function TechIcon({ slug }: { slug: string | null }) {
  if (!slug) return null;
  return (
    <span
      className="tech-ic"
      aria-hidden
      style={{ ["--ic" as string]: `url("/icons/${slug}.svg")` }}
    />
  );
}
