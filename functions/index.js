const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const axios = require("axios");

const CALLMEBOT_PHONE = "919641682925";   // your WhatsApp number, country code, no + no spaces
const CALLMEBOT_APIKEY = "YOUR_API_KEY";  // the key CallMeBot sent you

async function sendWhatsApp(message) {
  const url = `https://api.callmebot.com/whatsapp.php?phone=${CALLMEBOT_PHONE}&text=${encodeURIComponent(message)}&apikey=${CALLMEBOT_APIKEY}`;
  await axios.get(url);
}

// Note: collection name is "enquary" (matches your Firestore spelling exactly)
exports.notifyOnEnquiry = onDocumentCreated("enquary/{docId}", async (event) => {
  const data = event.data.data();
  const message =
    `📩 New Enquiry!\n` +
    `Name: ${data.name || "-"}\n` +
    `Phone: ${data.phone || "-"}\n` +
    `Email: ${data.email || "-"}\n` +
    `City: ${data.city || "-"}\n` +
    `Course: ${data.course || "-"}`;
  await sendWhatsApp(message);
});

exports.notifyOnEnrollment = onDocumentCreated("enrollment/{docId}", async (event) => {
  const data = event.data.data();
  const message =
    `✅ New Enrollment!\n` +
    `Name: ${data.name || "-"}\n` +
    `Phone: ${data.phone || "-"}\n` +
    `Email: ${data.email || "-"}\n` +
    `Course: ${data.course || "-"}\n` +
    `Occupation: ${data.occupation || "-"}\n` +
    `Investment: ${data.investment || "-"}\n` +
    `Experience: ${data.experience || "-"}`;
  await sendWhatsApp(message);
});