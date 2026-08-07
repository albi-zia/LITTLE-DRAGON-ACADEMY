/* ==========================================================================
   NOTICES DATA — edit this file to publish a new notice.
   You do NOT need to touch notices.html or notices.js.

   To add a notice, copy one of the objects below and add it to the TOP
   of the array (newest first). Fields:

     title  — required. Short headline, e.g. "Autumn Grading Camp — Oct 12"
     date   — required. Any readable string, e.g. "12 Oct 2026"
     image  — optional. Path to an image in /media/images/. Leave as ""
              (empty string) for a text-only notice card.
     body   — required. 1–3 sentences of notice text.

   To remove a notice, delete its whole { ... } block (including the
   comma after it). Do not delete the square brackets [ ] at the start
   and end of the file.
   ========================================================================== */

const NOTICES = [
  {
    title: "Sample Notice — Replace With Your Announcement",
    date: "Edit this date",
    image: "",
    body: "This is placeholder text so you can see how a notice looks on the page. Replace the title, date and body with your real announcement, or delete this whole object once you've added your own notices."
  },
  {
    title: "Sample Notice With A Photo",
    date: "Edit this date",
    image: "media/images/notice-example.jpg",
    body: "Notices can optionally include a photo — just point the image field at a file inside media/images/. If the file isn't there yet, the card shows a clean placeholder instead of a broken image."
  },
  {
    title: "New Batch Enrolments Open",
    date: "Edit this date",
    image: "",
    body: "A good example of a real notice: announcing new batch timings, a grading date, or a holiday closure. Keep it short — one or two sentences reads best on the card."
  }
];
