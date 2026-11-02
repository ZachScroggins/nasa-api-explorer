const ALLOWED_TAGS = new Set(["a", "b", "br", "em", "i", "strong"])

/**
 * Keeps a small set of inline tags from NASA-authored HTML and drops the rest.
 * Links keep only an http(s) href and always open in a new tab.
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<(script|style|iframe|object)[\s\S]*?<\/\1>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (tag, rawName: string, attrs) => {
      const name = rawName.toLowerCase()
      if (!ALLOWED_TAGS.has(name)) return ""
      if (tag.startsWith("</")) return `</${name}>`
      if (name === "br") return "<br>"
      if (name !== "a") return `<${name}>`

      const href = /href\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1]?.trim()
      if (!href || !/^https?:\/\//i.test(href)) return "<a>"
      return `<a href="${href.replace(/"/g, "&quot;")}" target="_blank" rel="noreferrer">`
    })
    .trim()
}

/** Removes every tag and decodes the handful of entities NASA text uses. */
export function stripHtml(html: string): string {
  return decodeEntities(
    html.replace(/<br\s*\/?>|<\/p>/gi, " ").replace(/<[^>]+>/g, "")
  )
    .replace(/\s+/g, " ")
    .trim()
}

export function decodeEntities(text: string): string {
  return text
    .replace(/&#0?38;|&amp;/g, "&")
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
}
