document.addEventListener("DOMContentLoaded", () => {
    // Only run intro animation on the index page
    const introScreen = document.getElementById("intro-screen");
    const mainContent = document.getElementById("main-content");
    
    if (introScreen && mainContent) {
        // Wait 3.5 seconds for CSS animations to finish, then reveal main content
        setTimeout(() => {
            introScreen.style.opacity = '0';
            setTimeout(() => {
                introScreen.style.display = 'none';
                mainContent.classList.remove("hidden");
                
                // Slight fade in for main content
                mainContent.style.opacity = '0';
                mainContent.style.transition = 'opacity 1s ease-in';
                setTimeout(() => mainContent.style.opacity = '1', 50);

            }, 1000);
        }, 3500);
    }
});

// WhatsApp Redirect Function
function sendToWhatsApp() {
    // Replace this with your actual Academy WhatsApp Number (include country code, e.g., 91 for India)
    const phoneNumber = "919539201008"; // Based on the banner provided
    
    // Get form values
    const name = document.getElementById("wa-name").value;
    const age = document.getElementById("wa-age").value;
    const experience = document.getElementById("wa-exp").value;
    const service = document.getElementById("wa-service").value;
    
    // Validation
    if (!name || !age) {
        alert("Please fill in your Name and Age before submitting.");
        return;
    }

    // Format message
    const message = `*New Enrollment Inquiry*\n\n` +
                    `*Name:* ${name}\n` +
                    `*Age:* ${age}\n` +
                    `*Experience Level:* ${experience}\n` +
                    `*Interested Service:* ${service}\n\n` +
                    `I would like to know more about joining the academy!`;
                    
    // Encode for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Construct WhatsApp API URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
}
