"""
SAMADHAN SETU — AI Problem Analysis Service (SIH26043)
Provides server-side Google Gemini AI integration with resilient societal NLP fallback.
"""

import os
import json
import re
import ssl
import urllib.request
import urllib.error


def _get_ssl_context():
    """
    Creates a verified SSL context using certifi's trusted CA bundle
    if available, otherwise standard default SSL context.
    """
    try:
        import certifi
        return ssl.create_default_context(cafile=certifi.where())
    except Exception:
        return ssl.create_default_context()


def _load_env_file():
    """Lightweight .env file loader for local development without external dependencies."""
    env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
    if os.path.isfile(env_path):
        try:
            with open(env_path, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if not line or line.startswith("#") or "=" not in line:
                        continue
                    key, val = line.split("=", 1)
                    key = key.strip()
                    val = val.strip().strip("'\"")
                    if key and key not in os.environ:
                        os.environ[key] = val
        except Exception:
            pass


_load_env_file()

VALID_SEVERITIES = ["Low", "Medium", "High", "Critical"]


def get_api_key(client_key=None):
    """Retrieve AI API key from client payload, .env file, or environment variables."""
    if client_key and isinstance(client_key, str) and client_key.strip():
        return client_key.strip()

    _load_env_file()
    api_key = (
        os.environ.get("GEMINI_API_KEY")
        or os.environ.get("AI_API_KEY")
        or os.environ.get("GOOGLE_API_KEY")
    )
    return api_key.strip() if api_key else None


def _clean_json_text(raw_text):
    """Strip markdown formatting or code blocks to extract pure JSON."""
    text = raw_text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
    return text.strip()


def _intelligent_societal_analysis(title, description, location=""):
    """
    High-precision Societal Innovation NLP Engine.
    Evaluates domain category, severity, keywords and actionable grassroots/technical solutions.
    """
    combined = (f"{title} {description} {location}").lower()

    # Domain Classification Rules
    category = "General Societal Issue"
    solutions = []
    keywords = ["Grassroots Innovation", "Community Impact"]

    if any(k in combined for k in ["water", "fluoride", "borewell", "handpump", "drinking", "contamination", "arsenic", "chlorine", "phc", "doctor", "health", "hospital", "clinic", "medicine", "maternal", "sanitation"]):
        if any(k in combined for k in ["water", "fluoride", "borewell", "handpump", "drinking", "well"]):
            category = "Healthcare & Water"
            keywords = ["Clean Water Supply", "Fluoride Mitigation", "Community Gravity Filter", "Water Quality Testing", "Public Health"]
            solutions = [
                "Deploy a zero-power gravity laterite clay and sal-wood biochar filtration unit on village handpumps to filter fluoride and heavy metals.",
                "Install a decentralized solar-powered UV purification kiosk managed by local Self Help Groups (SHGs) with nominal ₹0.10/L token recharge.",
                "Institute a student IoT water-quality monitoring node (TDS, pH, turbidity) sending automated alerts to the district Jal Jeevan Mission dashboard.",
                "Conduct community rainwater harvesting and groundwater recharging around village wells to reduce seasonal aquifer drying."
            ]
        else:
            category = "Healthcare"
            keywords = ["Telemedicine", "Primary Health Center", "Maternal Care", "Diagnostic Devices", "Rural Health"]
            solutions = [
                "Deploy a portable digital diagnostic kit (blood pressure, hemoglobin, ECG) for ASHA workers with offline sync.",
                "Establish a solar-backed Telemedicine booth at Gram Panchayat connected to District Sadar Hospital specialists.",
                "Implement a localized vaccine and antivenom cold-chain monitoring sensor network with SMS threshold alerts."
            ]
    elif any(k in combined for k in ["school", "education", "student", "teacher", "class", "study", "learning", "dialects", "kurukh", "tribal", "book", "reading", "arithmetic"]):
        category = "Education"
        keywords = ["Digital Classroom", "Bilingual Audiobooks", "Rural Schools", "Offline Content Box", "Foundational Literacy"]
        solutions = [
            "Install an offline solar-powered Raspberry Pi content server (GyanSetu Box) streaming interactive bilingual storybooks in regional tribal dialects without internet.",
            "Develop gamified physical-digital tactile flashcards and arithmetic kits for multi-grade classroom learning.",
            "Establish a student-volunteer peer tutoring circle paired with mobile solar projector units for evening village study sessions."
        ]
    elif any(k in combined for k in ["artisan", "dokra", "metal", "craft", "middlemen", "weaving", "handloom", "livelihood", "pottery", "sohrai", "lac", "bamboo"]):
        category = "Livelihoods & Craft"
        keywords = ["Artisan Market Linkage", "Dokra Metal Craft", "Direct Fair Trade", "Packaging Standardization", "SHG Enterprise"]
        solutions = [
            "Build a simplified, voice-assisted WhatsApp digital catalog for tribal artisan SHGs to receive direct retail and exhibition orders.",
            "Standardize low-cost corrugated protective packaging designed by industrial design students to prevent courier transit damage.",
            "Establish a community tooling common facility center with energy-efficient induction furnace for safer bell-metal casting.",
            "Partner with e-commerce platforms and CSR marketing channels for fair minimum support pricing and GI-tag certification."
        ]
    elif any(k in combined for k in ["farmer", "crop", "agriculture", "tomato", "vegetable", "spoilage", "cold storage", "irrigation", "soil", "harvest", "seed", "pest", "millet"]):
        category = "Agriculture"
        keywords = ["Micro Cold Storage", "Post-Harvest Preservation", "Solar Irrigation", "Farmer Co-operative", "Fair Market Linkage"]
        solutions = [
            "Construct a low-cost zero-energy evaporative cooling brick chamber (ZECC) to extend vegetable shelf life from 2 to 9 days without electricity.",
            "Install a community-shared 2-ton solar DC micro-cold storage unit operated on Pay-As-You-Store model by women farmer collectives.",
            "Deploy low-cost solar drip irrigation kits coupled with mobile soil moisture sensors to maximize rabi crop yields.",
            "Create a decentralized village agro-processing micro-unit (tomato puree / dehydrated vegetable flakes) to convert surplus harvest into shelf-stable goods."
        ]
    elif any(k in combined for k in ["waste", "garbage", "plastic", "dumping", "pollution", "forest", "drain", "sewage", "cleanliness", "river"]):
        category = "Environment & Sanitation"
        keywords = ["Decentralized Composting", "Solid Waste Management", "Plastic Segregation", "Eco Sanitation", "Community Monitoring"]
        solutions = [
            "Set up decentralized aerobic composting pits adjacent to the market to convert organic vegetable waste into high-grade organic manure.",
            "Implement a community waste segregation incentive program rewarding shopkeepers with clean stall certifications and subsidized municipal trash bags.",
            "Deploy low-cost trash skimmers and mesh barrier traps in drainage outflows to stop plastics from polluting local water bodies."
        ]
    elif any(k in combined for k in ["road", "bridge", "connectivity", "solar pump", "electricity", "grid", "power", "transport", "street light"]):
        category = "Infrastructure"
        keywords = ["Rural Connectivity", "Off-Grid Solar", "Community Micro-Grid", "Village Infrastructure", "Public Transit"]
        solutions = [
            "Deploy modular solar DC micro-grids with lithium ferro-phosphate storage for reliable lighting and pump operations.",
            "Implement low-cost bamboo-reinforced gravel road stabilization techniques for all-weather hamlet connectivity.",
            "Set up smart automatic solar street lighting with motion sensors near village centers and school crossings."
        ]
    else:
        category = "Public Services & Innovation"
        keywords = ["Civic Grievance Resolution", "Grassroots Empowerment", "Digital Inclusion", "Panchayat Coordination"]
        solutions = [
            "Establish a digitized grievance tracking registry connected to block administration with SMS status updates for citizens.",
            "Deploy mobile facilitation kiosks to assist elders and rural residents with direct benefit transfers and certificate verification.",
            "Form an interdisciplinary university student innovation task force to conduct on-site field feasibility trials."
        ]

    # Severity Assessment
    severity = "Medium"
    if any(k in combined for k in ["death", "poison", "critical", "severe", "disease", "emergency", "fluoride contamination", "arsenic", "danger", "starvation"]):
        severity = "Critical"
    elif any(k in combined for k in ["high", "loss", "daily", "struggle", "spoilage", "dry", "broken", "major", "suffering", "no water"]):
        severity = "High"
    elif any(k in combined for k in ["minor", "slow", "low", "slight"]):
        severity = "Low"

    return {
        "category": category,
        "severity": severity,
        "keywords": keywords,
        "solutions": solutions[:4],
        "engine": "Societal Innovation NLP Engine (Active Offline/Online)"
    }


def _gemini_remote_analysis(api_key, title, description, location=""):
    """Call Google Gemini Generative AI API."""
    models_to_try = [
        os.environ.get("GEMINI_MODEL", "").strip() or "gemini-2.0-flash",
        "gemini-1.5-flash",
        "gemini-1.5-pro"
    ]

    location_info = f"Location: {location.strip()}\n" if location and location.strip() else ""

    prompt = f"""You are an expert societal problem analyst for 'Samadhan Setu', a community innovation platform in Jharkhand, India.
Analyze the following grassroots societal problem submitted by a citizen/community:

Title: {title.strip()}
{location_info}Description: {description.strip()}

Task:
Analyze this problem and return a JSON object with the following EXACT structure:
{{
  "category": "<A concise domain name, e.g., Healthcare & Water, Education, Environment & Sanitation, Agriculture, Infrastructure, Livelihoods & Craft, Women & Child Development, Rural Development, Public Services>",
  "severity": "<Exact one of: 'Low', 'Medium', 'High', 'Critical'>",
  "keywords": ["<keyword 1>", "<keyword 2>", "<keyword 3>", "<keyword 4>"],
  "solutions": [
    "<Practical, feasible grassroots/technological solution 1>",
    "<Practical, feasible grassroots/technological solution 2>",
    "<Practical, feasible grassroots/technological solution 3>",
    "<Practical, feasible grassroots/technological solution 4>"
  ]
}}

Rules:
1. 'severity' MUST be one of exactly: "Low", "Medium", "High", "Critical".
2. 'solutions' MUST contain between 3 and 5 practical, actionable solutions suitable for students, innovators, NGOs, or local government to implement.
3. 'keywords' MUST contain 3 to 6 relevant tags.
4. Output ONLY valid JSON.
"""

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.2
        }
    }

    req_data = json.dumps(payload).encode("utf-8")
    ssl_ctx = _get_ssl_context()

    last_error = None
    for model in models_to_try:
        if not model:
            continue
        api_url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
        req = urllib.request.Request(
            api_url,
            data=req_data,
            headers={"Content-Type": "application/json"}
        )

        try:
            with urllib.request.urlopen(req, timeout=18, context=ssl_ctx) as response:
                res_body = response.read().decode("utf-8")
                data = json.loads(res_body)
                candidates = data.get("candidates", [])
                if candidates:
                    parts = candidates[0].get("content", {}).get("parts", [])
                    if parts:
                        raw_text = parts[0].get("text", "")
                        cleaned = _clean_json_text(raw_text)
                        parsed = json.loads(cleaned)

                        # Validate fields
                        cat = str(parsed.get("category", "General Societal Issue")).strip()
                        raw_sev = str(parsed.get("severity", "Medium")).strip().title()
                        sev = raw_sev if raw_sev in VALID_SEVERITIES else "Medium"
                        kw = parsed.get("keywords", ["Community Impact"])
                        if not isinstance(kw, list) or not kw:
                            kw = [cat, "Grassroots Innovation"]
                        sols = parsed.get("solutions", [])
                        if not isinstance(sols, list) or len(sols) < 2:
                            sols = [
                                "Form multidisciplinary student-researcher team to conduct on-site field survey.",
                                "Develop low-cost sustainable prototype using locally available resources.",
                                "Partner with local Gram Panchayat and CSR foundation for pilot deployment."
                            ]

                        return {
                            "category": cat,
                            "severity": sev,
                            "keywords": [str(k) for k in kw][:6],
                            "solutions": [str(s) for s in sols][:5],
                            "engine": f"Google Gemini ({model})"
                        }
        except Exception as e:
            last_error = str(e)
            continue

    raise RuntimeError(f"Gemini API request failed across models: {last_error}")


def analyze_problem(title, description, location="", client_api_key=None):
    """
    Analyze a societal problem using Google Gemini if API key is configured,
    otherwise automatically use the built-in Societal NLP Engine.
    """
    api_key = get_api_key(client_api_key)

    if api_key:
        try:
            return _gemini_remote_analysis(api_key, title, description, location)
        except Exception as e:
            print(f"[AI Service Warning] Gemini Cloud API error ({e}), falling back to Societal NLP Engine.")

    # Graceful intelligent fallback
    return _intelligent_societal_analysis(title, description, location)


def handle_analyze_problem_request(raw_body):
    """
    HTTP Controller for /api/ai/analyze-problem endpoint.
    """
    if not raw_body:
        return 400, {"error": "Request body cannot be empty"}

    try:
        if isinstance(raw_body, bytes):
            raw_body = raw_body.decode("utf-8")
        payload = json.loads(raw_body)
    except Exception:
        return 400, {"error": "Invalid JSON in request body"}

    if not isinstance(payload, dict):
        return 400, {"error": "Request payload must be a JSON object"}

    title = payload.get("title")
    if not title or not isinstance(title, str) or not title.strip():
        return 400, {"error": "Missing or empty required field: 'title'"}

    description = payload.get("description")
    if not description or not isinstance(description, str) or not description.strip():
        return 400, {"error": "Missing or empty required field: 'description'"}

    location = payload.get("location", "")
    if not isinstance(location, str):
        location = str(location)

    client_api_key = payload.get("apiKey", "")

    try:
        analysis = analyze_problem(
            title=title,
            description=description,
            location=location,
            client_api_key=client_api_key
        )
        return 200, analysis
    except Exception as e:
        return 500, {"error": f"Unexpected error during AI analysis: {str(e)}"}

