// ========== BACK TO TOP BUTTON ==========
const backToTopBtn = document.getElementById("backToTop");

// Show button when scrolling down
window.addEventListener("scroll", function() {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

// When button is clicked, scroll to top
backToTopBtn.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ========== SCROLL ANIMATIONS FOR CARDS ==========
// This creates smooth fade-in and slide-up animations when cards come into view

// Get all cards that should animate on scroll
const animatedCards = document.querySelectorAll(".card-animate");

// Create an Intersection Observer to watch when cards enter the viewport
// This is more efficient than checking scroll position constantly
const cardObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    // When a card becomes visible, add the 'visible' class to trigger animation
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Stop observing this card once it's animated (optional optimization)
      cardObserver.unobserve(entry.target);
    }
  });
}, {
  // Trigger animation when card is 20% visible
  threshold: 0.2,
  // Start watching 100px before the card enters viewport
  rootMargin: "0px 0px -100px 0px"
});

// Start observing all animated cards
animatedCards.forEach(function(card) {
  cardObserver.observe(card);
});

// ========== MODAL FUNCTIONALITY ==========

// Get modal elements
const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.querySelector("#modal-overlay .modal-close");
const btnCloseModal = document.querySelector(".btn-close-modal");
const threatCards = document.querySelectorAll(".threat-card");
const practiceCards = document.querySelectorAll(".practice-card");

// Data for all 6 threats - stores information for each threat type
const threatData = {
  "phishing": {
    title: "Phishing 🎣",
    description: "Phishing is a cyber attack where scammers send fake emails or create fake websites that look like they're from your bank. They trick you into entering your login credentials, which they then steal.",
    fakeExample: "Your account is locked! Click here to verify.",
    realExample: "We never ask for passwords or OTPs via email.",
    tips: [
      "Always check the sender's email address before clicking any link",
      "Look for spelling errors or suspicious URLs",
      "Never enter your password on a page you reached via email",
      "When in doubt, contact your bank directly through official channels"
    ]
  },
  "smishing": {
    title: "Smishing 📱",
    description: "Smishing (SMS phishing) is when scammers send text messages pretending to be from your bank. These messages often contain links to fake websites or ask you to reply with sensitive information.",
    fakeExample: "Your account needs verification. Click: bit.ly/bank-verify-now",
    realExample: "Banks send official SMS without links requesting immediate action.",
    tips: [
      "Never click links in text messages from unknown numbers",
      "Verify the sender's number by checking with your bank",
      "Banks rarely send urgent requests via SMS",
      "If you're unsure, call your bank's official hotline"
    ]
  },
  "vishing": {
    title: "Vishing ☎️",
    description: "Vishing (voice phishing) happens when scammers call you pretending to be bank employees. They create urgency and pressure you into sharing your OTP, PIN, or other sensitive information.",
    fakeExample: "This is urgent! Your account will be closed unless you give us your OTP now!",
    realExample: "Banks never ask for OTPs or PINs over the phone.",
    tips: [
      "Never share your OTP or PIN with anyone, even if they claim to be from your bank",
      "Hang up and call your bank's official number to verify",
      "Real bank calls don't create panic or urgency",
      "Remember: legitimate banks don't ask for sensitive info over the phone"
    ]
  },
  "fake-investments": {
    title: "Fake Investments 💰",
    description: "Fake investment scams promise high returns with minimal risk. Scammers create fake websites and social media ads offering 'get rich quick' schemes, often targeting Filipinos with promises of doubling money or easy profits.",
    fakeExample: "Double your money in 30 days! Invest now and get 200% returns!",
    realExample: "Legitimate investments involve clear risks and are regulated by the SEC.",
    tips: [
      "Research any investment opportunity thoroughly before investing",
      "Check if the company is registered with the Securities and Exchange Commission (SEC)",
      "Be skeptical of promises of guaranteed high returns",
      "If it sounds too good to be true, it probably is"
    ]
  },
  "account-takeover": {
    title: "Account Takeover 🔐",
    description: "Account takeover occurs when hackers gain unauthorized access to your bank account. They often use weak passwords, stolen credentials from data breaches, or phishing attacks to break into accounts.",
    fakeExample: "Someone logged into your account from a new device. Click here to secure it.",
    realExample: "Banks send official notifications about account activity, but never ask you to click links to verify.",
    tips: [
      "Use strong, unique passwords for your banking accounts",
      "Enable two-factor authentication (2FA) whenever available",
      "Never reuse passwords across different accounts",
      "Regularly monitor your account for unusual activity",
      "Change your password immediately if you suspect a breach"
    ]
  },
  "malicious-apps": {
    title: "Malicious Apps 🦠",
    description: "Malicious apps are fake or compromised applications designed to steal your personal or banking information. These apps may look legitimate but contain malware that steals your data when you use them.",
    fakeExample: "Download this 'Bank Helper' app from this link to get free rewards!",
    realExample: "Only download banking apps from official app stores (Google Play, App Store).",
    tips: [
      "Only download apps from official app stores (Google Play Store, Apple App Store)",
      "Check app reviews and ratings before downloading",
      "Be cautious of apps asking for excessive permissions",
      "Never download banking apps from links in emails or messages",
      "Keep your apps updated to the latest version"
    ]
  }
};

// Data for all 6 best practices - stores information for each practice
const practiceData = {
  "official-apps": {
    title: "Use Official Apps ✅",
    description: "Always use official banking apps or websites. Download apps only from official app stores like Google Play Store or Apple App Store.",
    fakeExample: "Download this 'Bank Helper' app from this link for rewards!",
    realExample: "Only download banking apps from official app stores (Google Play, App Store).",
    tips: [
      "Verify the app developer name matches your bank's official name",
      "Check the number of downloads and read recent reviews",
      "Look for the official bank logo and branding",
      "Never download banking apps from links in emails or messages"
    ]
  },
  "never-share-otp": {
    title: "Never Share OTP or PIN 🔒",
    description: "Never share your One-time Password (OTP) or PIN with anyone. Banks will never ask for these credentials through phone calls, emails, or messages.",
    fakeExample: "We need your OTP to verify your account. Reply with the code you received.",
    realExample: "Banks never ask for OTPs or PINs through any communication channel.",
    tips: [
      "OTPs are only for your use during login or transactions",
      "Never share your OTP even if someone claims to be from your bank",
      "If someone asks for your OTP, it's definitely a scam",
      "Report any requests for your OTP to your bank immediately"
    ]
  },
  "verify-links": {
    title: "Verify Links 🧠",
    description: "Verify links before clicking. Scammers use fake URLs that look similar to real bank websites to trick you into entering your credentials.",
    fakeExample: "Click here: www.bankofphi1ippines.com (note the fake domain)",
    realExample: "Always check the URL - official banks use their registered domain names.",
    tips: [
      "Hover over links to see the actual URL before clicking",
      "Look for 'https://' and a padlock icon in the address bar",
      "Check for spelling errors or suspicious characters in the URL",
      "When in doubt, type the bank's website address directly in your browser"
    ]
  },
  "enable-2fa": {
    title: "Enable 2FA 📱",
    description: "Enable two-factor authentication (2FA) whenever possible for an extra layer of security. This adds a second verification step beyond your password.",
    fakeExample: "2FA is optional and not necessary for your account.",
    realExample: "2FA significantly improves account security and is recommended by all banks.",
    tips: [
      "2FA requires both your password and a second verification (like an OTP)",
      "Even if someone gets your password, they can't access your account without 2FA",
      "Most banks offer 2FA through SMS, email, or authenticator apps",
      "Enable 2FA in your bank's security settings"
    ]
  },
  "avoid-public-wifi": {
    title: "Avoid Public Wi-Fi 🚫",
    description: "Avoid logging in using public Wi-Fi networks. Use your mobile data or secure networks instead to protect your banking information.",
    fakeExample: "It's safe to use banking apps on any Wi-Fi network.",
    realExample: "Public Wi-Fi networks are often unsecured and can expose your data.",
    tips: [
      "Public Wi-Fi networks can be easily intercepted by hackers",
      "Use your mobile data connection when accessing banking apps",
      "If you must use Wi-Fi, use a VPN (Virtual Private Network)",
      "Never access banking accounts on unsecured public networks"
    ]
  },
  "monitor-regularly": {
    title: "Monitor Regularly 🔔",
    description: "Monitor your account regularly for unusual activity. Report suspicious transactions immediately to your bank.",
    fakeExample: "Small unauthorized transactions are normal and don't need reporting.",
    realExample: "Any suspicious activity, no matter how small, should be reported immediately.",
    tips: [
      "Check your account balance and transactions daily",
      "Set up transaction alerts via SMS or email",
      "Review your monthly statements carefully",
      "Report any unauthorized transactions immediately to your bank"
    ]
  }
};

// Function to open the modal with threat or practice information
function openModal(type, data) {
  // Update modal content with the data
  document.querySelector(".modal-title").textContent = data.title;
  document.querySelector(".modal-description").textContent = data.description;
  
  // Update fake and real examples
  const fakeExampleBox = document.querySelector(".example-fake .example-text");
  const realExampleBox = document.querySelector(".example-real .example-text");
  fakeExampleBox.textContent = data.fakeExample;
  realExampleBox.textContent = data.realExample;
  
  // Clear and populate tips list
  const tipsList = document.querySelector(".tips-list");
  tipsList.innerHTML = "";
  
  // Add each tip as a list item
  data.tips.forEach(function(tip) {
    const li = document.createElement("li");
    li.textContent = tip;
    tipsList.appendChild(li);
  });
  
  // Show the modal with fade-in effect
  modalOverlay.classList.add("active");
  
  // Prevent body scrolling when modal is open
  document.body.style.overflow = "hidden";
}

// Function to close the modal
function closeModal() {
  // Hide the modal
  modalOverlay.classList.remove("active");
  
  // Restore body scrolling
  document.body.style.overflow = "auto";
}

// Add click event listeners to all threat cards
threatCards.forEach(function(card) {
  card.addEventListener("click", function() {
    const threatType = card.getAttribute("data-threat");
    const data = threatData[threatType];
    if (data) {
      openModal("threat", data);
    }
  });
});

// Add click event listeners to all practice cards
practiceCards.forEach(function(card) {
  card.addEventListener("click", function() {
    const practiceType = card.getAttribute("data-practice");
    const data = practiceData[practiceType];
    if (data) {
      openModal("practice", data);
    }
  });
});

// Close modal when clicking the X button
if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

// Close modal when clicking the "Close" button
if (btnCloseModal) {
  btnCloseModal.addEventListener("click", closeModal);
}

// Close modal when clicking outside the modal content (on the overlay)
modalOverlay.addEventListener("click", function(event) {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

// Close modal when pressing the Escape key
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" && modalOverlay.classList.contains("active")) {
    closeModal();
  }
});

// ========== REPORT A SCAM FORM FUNCTIONALITY ==========

// Get form and success modal elements
const reportForm = document.getElementById("report-scam-form");
const successModal = document.getElementById("success-modal");
const successModalClose = successModal.querySelector(".modal-close");
const btnCloseSuccess = document.querySelector(".btn-close-success");

// Function to open the success modal
function openSuccessModal() {
  successModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Function to close the success modal
function closeSuccessModal() {
  successModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Handle form submission
if (reportForm) {
  reportForm.addEventListener("submit", function(event) {
    // Prevent the form from actually submitting (since there's no backend)
    event.preventDefault();
    
    // Clear the form
    reportForm.reset();
    
    // Show the success modal
    openSuccessModal();
  });
}

// Close success modal when clicking the X button
if (successModalClose) {
  successModalClose.addEventListener("click", closeSuccessModal);
}

// Close success modal when clicking the "Close" button
if (btnCloseSuccess) {
  btnCloseSuccess.addEventListener("click", closeSuccessModal);
}

// Close success modal when clicking outside
successModal.addEventListener("click", function(event) {
  if (event.target === successModal) {
    closeSuccessModal();
  }
});

// Close success modal when pressing Escape
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" && successModal.classList.contains("active")) {
    closeSuccessModal();
  }
});