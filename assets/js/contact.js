const form = document.getElementById("contactForm1");

// Create a reusable pop-up element dynamically
const popup = document.createElement("div");
popup.style.position = "fixed";
popup.style.top = "50%";
popup.style.left = "50%";
popup.style.transform = "translate(-50%, -50%)";
popup.style.width = "400px"; // Increased width
popup.style.height = "auto";
popup.style.padding = "30px"; // Increased padding
popup.style.backgroundColor = "#fff";
popup.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)"; // Enhanced shadow
popup.style.zIndex = "1000";
popup.style.borderRadius = "15px"; // Increased border-radius
popup.style.display = "none";
popup.style.textAlign = "center";
popup.style.fontFamily = "Arial, sans-serif";
popup.style.fontSize = "18px"; // Slightly larger font size
popup.style.color = "#333";
popup.style.lineHeight = "1.6";
popup.style.opacity = "0"; // Initial opacity for animation
popup.style.transition = "opacity 0.5s, transform 0.5s"; // Smooth animation
document.body.appendChild(popup);

function showPopup(message, success = true) {
  // Show SweetAlert pop-up for both success and failure (without close button)
  Swal.fire({
    title: success ? "Success!" : "Nope!!",
    text: message,
    icon: success ? "success" : "error",
    iconColor: success ? "#4CAF50" : "#f44336",
    confirmButtonText: "OK",
    confirmButtonColor: success ? "#4CAF50" : "#f44336",
    timer: 8000,
    timerProgressBar: true,
    showCloseButton: false, // No X button
  });
}

// Helper function to toggle red borders
function toggleError(input, isError) {
  input.style.border = isError ? "2px solid red" : "";
}

// Real-time validation for individual fields
function validateField(input, regex) {
  if (!regex.test(input.value)) {
    toggleError(input, true);
    return false;
  }
  toggleError(input, false);
  return true;
}

// Real-time validation listeners
document.getElementById("full-name1").addEventListener("input", function () {
  validateField(this, /^[A-Za-z\s]+$/);
});

document.getElementById("phone1").addEventListener("input", function () {
  validateField(this, /^\d{10}$/);
});

document.getElementById("email-input1").addEventListener("input", function () {
  validateField(this, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
});

document.getElementById("message1").addEventListener("input", function () {
  toggleError(this, !this.value.trim());
});

// Form submission handling
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission

  const name = document.getElementById("full-name1");
  const phone = document.getElementById("phone1");
  const email = document.getElementById("email-input1");
  const message = document.getElementById("message1");

  let isValid = true;

  if (!name.value.trim() || !validateField(name, /^[A-Za-z\s]+$/)) {
    isValid = false;
    toggleError(name, true);
  }

  if (!phone.value.trim() || !validateField(phone, /^\d{10}$/)) {
    isValid = false;
    toggleError(phone, true);
  }

  if (
    !email.value.trim() ||
    !validateField(email, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
  ) {
    isValid = false;
    toggleError(email, true);
  }

  if (!message.value.trim()) {
    isValid = false;
    toggleError(message, true);
  }

  if (!isValid) {
    showPopup("Please fill in all required fields correctly.", false);
    return;
  }

  const formData = {
    access_key: "6e219542-1b48-4364-9994-4cb1fd6118a3", // Your Web3Forms API key
    name: name.value,
    phone: phone.value,
    email: email.value,
    message: message.value,
  };

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status === 200) {
        showPopup(
          "Before your watch makes a full round, We'll get back to you. IF NOT never look back at us..",
          true
        );
      } else {
        showPopup("Submission failed. Please try again.", false);
      }
    })
    .catch(() => {
      showPopup(
        "Failed to connect to the server. Please check your internet connection and try again.",
        false
      );
    })
    .finally(() => {
      form.reset(); // Reset the form
    });
});
