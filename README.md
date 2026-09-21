## LEAP Dev NextJS Take Home Test

This is a very basic Book Store with static data and simple CRUD support.

Push this up to a public Github repository please. We will assess both code and commits in order to discern how you approach problem-solving.

---

Please implement the following:

1. Use a component library to make the UI and UX more appealing and user friendly.

I chose [shadcn/ui](https://ui.shadcn.com). Rather than pulling in a themed component
package as an opaque `node_modules` dependency, its CLI generates the actual component
source (built on Base UI's accessible, unstyled primitives) directly into
`src/components/ui/`, styled with Tailwind classes the project already uses. That means:
- No separate styling system to reconcile with Tailwind (unlike e.g. Chakra UI or
  Mantine, which bring their own CSS engines).
- The components are fully owned and editable — useful for the later tasks, since the
  same setup directly supplies the `Dialog` used to rebuild the book modal, the
  `AlertDialog` used for the delete confirmation, and a full set of light/dark theme
  CSS variables for the dark mode switcher.
- It's the current de-facto standard for Next.js + Tailwind projects, so the resulting
  code should look familiar to most reviewers.

Beyond swapping components in, this pass also reworked the gallery's information
architecture, checked against how real bookstores (Bookshop.org, Barnes & Noble, Amazon)
lay out a book-listing grid:
- Each card now shows only what's needed to scan quickly — cover, title, author, and
  price as a colored tag — and drops the description, matching every site checked. The
  cover image is also shown uncropped (`object-fit: contain`) instead of the original
  fill-crop, so no part of the artwork is cut off.
- Clicking a card opens a side panel with every field the data actually has, including
  several that had no UI at all before (genres, publisher, publication date, ISBN,
  pages, stock). Edit and Delete moved off the card and into that panel, so the grid
  itself stays uncluttered.
- Editing happens inline, field-by-field, inside that same panel rather than jumping to
  a separate popup.

2. Implement dark mode that includes a switcher to go back to light mode.

3. Deleting a book displays a JavaScript alert. Replace this with modern UX.

4. Add a rating system that goes up to 5 stars.

5. There is a bug in the code. Find it and fix it.

The bug was in `handleUpdateBook` in `src/app/page.tsx`. When saving an edit, the updated
book was merged as `{ ...updatedBook, ...book }` — spreading the *stale* original book
object last, so its old field values always overwrote the incoming edits. In effect,
saving a change in the edit form had no visible effect: the book reverted to its
pre-edit state every time. The fix swaps the spread order to `{ ...book, ...updatedBook }`,
so the edited fields are applied on top of (and correctly override) the original book.

Good luck and have fun!

---

## Notes for Reviewers

- **Package manager:** this project uses pnpm (see `pnpm-lock.yaml` / `pnpm-workspace.yaml`). Run `pnpm install` rather than `npm install`/`yarn install` to match the locked dependency versions. A fresh `pnpm install` shouldn't prompt for anything — the native build-script approvals for `sharp`/`@tailwindcss/oxide` are already recorded in `pnpm-workspace.yaml`.
- **Data is in-memory only:** there's no backend, so all CRUD operations (add/edit/delete) only update React state. Refreshing the page resets the book list back to `public/data.json` — that's expected, not a bug.
- **No lint/test scripts:** none were configured in the original starter, and none were added.
