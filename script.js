const LEAD_CAPTURE_ENDPOINT = "";
const LEADS_STORAGE_KEY = "zentech_leads";
const SHEET_URL = "https://docs.google.com/spreadsheets/d/1iWgK8nm2JSOgSI3EHjzgqiA-JiCGWnM2b0B-sU9Nfhs/edit";

const form = document.querySelector("#interestForm");
const note = document.querySelector("#formNote");
const downloadButton = document.querySelector("#downloadLeads");
const interestButtons = document.querySelectorAll(".js-interest");

function getLocalLeads() {
  try {
    return JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function setLocalLeads(leads) {
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
  if (downloadButton) {
    downloadButton.hidden = leads.length === 0;
  }
}

function leadToRow(lead) {
  return [
    lead.createdAt,
    lead.name,
    lead.email,
    lead.organization,
    lead.interest,
    lead.freeTrial,
    lead.message,
    lead.sourcePage,
    "New",
    "",
    lead.profile,
    lead.consent,
  ];
}

function escapeCsv(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function downloadLocalLeads() {
  const leads = getLocalLeads();
  const headers = [
    "Created At",
    "Name",
    "Email",
    "Organization",
    "Interest Area",
    "Free Trial Interest",
    "Message",
    "Source Page",
    "Status",
    "Notes",
    "Website / LinkedIn",
    "Consent",
  ];
  const csv = [headers, ...leads.map(leadToRow)]
    .map((row) => row.map(escapeCsv).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "zentech-website-leads.csv";
  link.click();
  URL.revokeObjectURL(url);
}

interestButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const interest = button.getAttribute("data-interest");
    const select = form?.elements.interest;
    const freeTrial = form?.elements.freeTrial;

    if (select && interest) select.value = interest;
    if (freeTrial && interest === "Gut Health In and Out") freeTrial.checked = true;
  });
});

if (form && note) {
  setLocalLeads(getLocalLeads());

  downloadButton?.addEventListener("click", downloadLocalLeads);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const lead = {
      createdAt: new Date().toISOString(),
      name: data.get("name") || "",
      email: data.get("email") || "",
      organization: data.get("organization") || "",
      interest: data.get("interest") || "",
      freeTrial: data.get("freeTrial") || "No",
      message: data.get("message") || "",
      sourcePage: window.location.href,
      profile: data.get("profile") || "",
      consent: data.get("consent") || "No",
    };

    const leads = getLocalLeads();
    leads.push(lead);
    setLocalLeads(leads);

    if (LEAD_CAPTURE_ENDPOINT) {
      try {
        await fetch(LEAD_CAPTURE_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(lead),
        });
        note.textContent = `Thanks, ${lead.name || "there"}. You are on the ${lead.interest} list.`;
      } catch {
        note.textContent = `Saved locally. The lead endpoint could not be reached, so export the CSV or check the endpoint.`;
      }
    } else {
      note.innerHTML = `Thanks, ${lead.name || "there"}. Saved locally for this prototype. Connect the Apps Script endpoint to send leads to the Google Sheet database.`;
    }

    form.reset();
  });
}
