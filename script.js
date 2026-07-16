const CONTACT_FORM_ENDPOINT = "";
const LEGACY_LEAD_STORAGE_KEYS = ["zentech_leads"];

const form = document.querySelector("#interestForm");
const note = document.querySelector("#formNote");
const submitButton = document.querySelector("#submitInterest");
const otherInterestField = document.querySelector("#otherInterestField");
const interestButtons = document.querySelectorAll(".js-interest");
const errors = {
  email: document.querySelector("#emailError"),
  interest: document.querySelector("#interestError"),
  consent: document.querySelector("#consentError"),
};

let isSubmitting = false;

function clearLegacyLeadStorage() {
  try {
    LEGACY_LEAD_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  } catch {
    // Storage can be unavailable in private or restricted browsing modes.
  }
}

function setError(field, message) {
  if (errors[field]) errors[field].textContent = message;
}

function clearErrors() {
  Object.keys(errors).forEach((field) => setError(field, ""));
}

function setFieldState(field, isInvalid) {
  if (!field) return;
  field.setAttribute("aria-invalid", String(isInvalid));
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateForm() {
  if (!form) return false;

  clearErrors();
  let isValid = true;
  const fields = form.elements;
  const email = fields.email.value.trim();
  const interest = fields.interest.value;
  const consent = fields.consent.checked;

  if (!email) {
    setError("email", "Please enter your email address.");
    setFieldState(fields.email, true);
    isValid = false;
  } else if (!isValidEmail(email)) {
    setError("email", "Please enter a valid email address.");
    setFieldState(fields.email, true);
    isValid = false;
  } else {
    setFieldState(fields.email, false);
  }

  if (!interest) {
    setError("interest", "Please select a product.");
    setFieldState(fields.interest, true);
    isValid = false;
  } else {
    setFieldState(fields.interest, false);
  }

  if (!consent) {
    setError("consent", "Please confirm you’d like to receive early access updates.");
    setFieldState(fields.consent, true);
    isValid = false;
  } else {
    setFieldState(fields.consent, false);
  }

  return isValid;
}

function buildSubmissionPayload() {
  const data = new FormData(form);
  return {
    email: data.get("email")?.toString().trim() || "",
    name: data.get("name")?.toString().trim() || "",
    interest: data.get("interest")?.toString() || "",
    otherInterest: data.get("otherInterest")?.toString().trim() || "",
  };
}

async function submitToEndpoint(payload) {
  const response = await fetch(CONTACT_FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Submission failed");
  }
}

interestButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const interest = button.getAttribute("data-interest");
    const select = form?.elements.interest;

    if (select && interest) select.value = interest;
    updateOtherInterestVisibility();
  });
});

function updateOtherInterestVisibility() {
  if (!form || !otherInterestField) return;

  const isOther = form.elements.interest.value === "Other";
  otherInterestField.hidden = !isOther;
  if (!isOther) form.elements.otherInterest.value = "";
}

if (form && note && submitButton) {
  clearLegacyLeadStorage();
  updateOtherInterestVisibility();

  form.elements.interest.addEventListener("change", updateOtherInterestVisibility);
  form.elements.interest.addEventListener("input", updateOtherInterestVisibility);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    note.textContent = "";
    updateOtherInterestVisibility();

    if (isSubmitting || !validateForm()) return;

    if (!CONTACT_FORM_ENDPOINT) {
      note.textContent = "Thanks for your interest. We’re finishing the signup flow and will open early access registration soon.";
      return;
    }

    isSubmitting = true;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
      await submitToEndpoint(buildSubmissionPayload());
      note.textContent = "You’re on the list! We’ll email you when free trials or early access become available.";
      form.reset();
      clearErrors();
      updateOtherInterestVisibility();
    } catch {
      note.textContent = "We couldn’t register your interest. Please try again soon.";
    } finally {
      isSubmitting = false;
      submitButton.disabled = false;
      submitButton.textContent = "Register Interest";
    }
  });
}
