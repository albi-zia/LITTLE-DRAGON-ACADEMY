/* ==========================================================================
   CONTACT FORM — builds a pre-filled WhatsApp message from the enquiry form
   and redirects the visitor straight into a WhatsApp chat with the academy.

   To change the WhatsApp number, edit WHATSAPP_NUMBER below. Use the full
   number with country code and no spaces, symbols or leading zero
   (e.g. India 95392 01008 becomes 919539201008).
   ========================================================================== */

const WHATSAPP_NUMBER = "919539201008";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('enquiryForm');
  if (!form) return;

  const status = document.getElementById('formStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name'].value.trim();
    const age = form.elements['age'].value.trim();
    const phone = form.elements['phone'].value.trim();
    const experience = form.elements['experience'].value;
    const program = form.elements['program'].value;

    let hasError = false;
    const setError = (field, message) => {
      const el = document.getElementById('err-' + field);
      if (el) el.textContent = message || '';
      if (message) hasError = true;
    };

    setError('name', name ? '' : 'Please enter your name.');
    setError('phone', phone ? '' : 'Please enter a contact number.');
    setError('age', '');
    setError('experience', experience ? '' : 'Please choose one.');
    setError('program', program ? '' : 'Please choose one.');

    if (hasError) {
      if (status) status.textContent = '';
      return;
    }

    const lines = [
      "Hi Little Dragon Martial Arts Academy! I'd like to enquire about joining.",
      "",
      "Name: " + name,
      "Age: " + (age || "Not specified"),
      "Contact Number: " + phone,
      "Experience: " + experience,
      "Interested Program: " + program
    ];
    const message = lines.join("\n");
    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);

    if (status) status.textContent = 'Redirecting you to WhatsApp…';
    setTimeout(() => {
      window.location.href = url;
    }, 500);
  });
});
