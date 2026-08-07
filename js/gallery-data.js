/* ==========================================================================
   GALLERY DATA — edit this file to add photos and videos to the Media page.
   You do NOT need to touch gallery.html or gallery.js.

   To add an item, copy one of the objects below and add it anywhere in
   the array. Fields:

     type    — required. Either "image" or "video".
     src     — required. Path to the file:
                 photos → media/images/yourfile.jpg
                 videos → media/videos/yourfile.mp4
     poster  — video only. Path to a thumbnail image shown before play.
               Leave as "" to use a plain placeholder instead.
     caption — required. Short label shown on hover, e.g. "Summer Camp 2026".

   Files that don't exist yet will automatically show a clean placeholder
   tile instead of a broken image/video, so it's safe to write out entries
   in advance and drop the real files into /media/ later.
   ========================================================================== */

const GALLERY = [
  { type: "image", src: "media/images/gallery-1.jpg", caption: "Add your photo — gallery-1.jpg" },
  { type: "image", src: "media/images/gallery-2.jpg", caption: "Add your photo — gallery-2.jpg" },
  { type: "image", src: "media/images/gallery-3.jpg", caption: "Add your photo — gallery-3.jpg" },
  { type: "video", src: "media/videos/gallery-1.mp4", poster: "", caption: "Add your video — gallery-1.mp4" },
  { type: "image", src: "media/images/gallery-4.jpg", caption: "Add your photo — gallery-4.jpg" },
  { type: "image", src: "media/images/gallery-5.jpg", caption: "Add your photo — gallery-5.jpg" },
  { type: "video", src: "media/videos/gallery-2.mp4", poster: "", caption: "Add your video — gallery-2.mp4" },
  { type: "image", src: "media/images/gallery-6.jpg", caption: "Add your photo — gallery-6.jpg" }
];
