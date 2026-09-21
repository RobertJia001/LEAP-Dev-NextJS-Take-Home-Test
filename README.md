## LEAP Dev NextJS Take Home Test

This is a very basic Book Store with static data and simple CRUD support.

Push this up to a public Github repository please. We will assess both code and commits in order to discern how you approach problem-solving.

---

Please implement the following:

1. Use a component library to make the UI and UX more appealing and user friendly.

[Explain here why you chose the one you did]

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
