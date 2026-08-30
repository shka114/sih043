// ==========================================================================
// SAMADHAN SETU — Frontend AI Service
// Handles client-side communication with backend AI API endpoints
// ==========================================================================

/**
 * Sends problem details to the server-side AI Problem Analysis API.
 * 
 * @param {Object} params
 * @param {string} params.title - Problem Title
 * @param {string} params.description - Problem Description
 * @param {string} [params.location] - Location (Optional)
 * @returns {Promise<Object>} Analysis result containing { category, severity, keywords, solutions }
 */
async function analyzeProblemWithAI({ title, description, location = "" }) {
  if (!title || !title.trim()) {
    throw new Error("Please provide a Problem Title before analyzing with AI.");
  }
  if (!description || !description.trim()) {
    throw new Error("Please provide a Problem Description before analyzing with AI.");
  }

  const clientKey = localStorage.getItem('gemini_api_key') || '';
  const payload = {
    title: title.trim(),
    description: description.trim(),
    location: (location || "").trim(),
    apiKey: clientKey
  };

  let response;
  try {
    response = await fetch("/api/ai/analyze-problem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  } catch (networkErr) {
    throw new Error("Could not connect to the backend server. Please make sure the Python server is running.");
  }

  let data;
  try {
    data = await response.json();
  } catch (parseErr) {
    throw new Error("Server returned an invalid non-JSON response.");
  }

  if (!response.ok) {
    const errorMsg = (data && data.error) ? data.error : `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { analyzeProblemWithAI };
}
