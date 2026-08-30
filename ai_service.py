"""
SAMADHAN SETU — AI Problem Analysis Service
Provides server-side AI integration to analyze grassroots societal problems.
"""

import os
import json
import re
import ssl
import urllib.request
import urllib.error


def _get_ssl_context():
    """
    Creates a strictly verified SSL context using certifi's trusted CA bundle
    if available, otherwise standard default SSL context.
    Ensures SSL certificate verification remains fully enabled.
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


def get_api_key():
    """Retrieve AI API key securely from environment variables."""
    # Ensure fresh read or reload from env
    _load_env_file()
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("AI_API_KEY")
    return api_key.strip() if api_key else None


def _clean_json_text(raw_text):
    """Strip markdown formatting or code blocks to extract pure JSON."""
    text = raw_text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
    return text.strip()


def analyze_problem(title, description, location=""):
    """
    Analyze a societal problem using the Gemini API.

    Returns:
        dict with keys: 'category', 'severity', 'keywords', 'solutions'
    Raises:
        ValueError, RuntimeError, or urllib.error.URLError
    """
    api_key = get_api_key()
    if not api_key:
        raise ValueError(
            "AI API key is not configured. Please set the GEMINI_API_KEY or AI_API_KEY environment variable."
        )

    model = os.environ.get("GEMINI_MODEL", "gemini-3.6-flash").strip()
    api_url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"

    location_info = f"Location: {location.strip()}\n" if location and location.strip() else ""

    prompt = f"""You are an expert societal problem analyst for 'Samadhan Setu', a community innovation platform.
Analyze the following grassroots societal problem submitted by a citizen/community:

Title: {title.strip()}
{location_info}Description: {description.strip()}

Task:
Analyze this problem and return a JSON object with the following EXACT structure:
{{
  "category": "<A concise domain name, e.g., Healthcare, Education, Environment, Agriculture, Infrastructure, Livelihoods & Craft, Women & Child Development, Rural Development, Public Services, Digital Inclusion>",
  "severity": "<Exact one of: 'Low', 'Medium', 'High', 'Critical'>",
  "keywords": ["<keyword 1>", "<keyword 2>", "<keyword 3>", ...],
  "solutions": [
    "<Practical, feasible grassroots/technological solution 1>",
    "<Practical, feasible grassroots/technological solution 2>",
    "<Practical, feasible grassroots/technological solution 3>"
  ]
}}

Rules:
1. 'severity' MUST be one of exactly: "Low", "Medium", "High", "Critical".
2. 'solutions' MUST contain between 3 and 5 practical, actionable solutions suitable for students, innovators, NGOs, or local government to implement.
3. 'keywords' MUST contain 3 to 6 relevant tags/keywords.
4. Output ONLY valid JSON. Do not include extra conversational text.
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
    req = urllib.request.Request(
        api_url,
        data=req_data,
        headers={"Content-Type": "application/json"}
    )

    try:
        ssl_ctx = _get_ssl_context()
        with urllib.request.urlopen(req, timeout=30, context=ssl_ctx) as response:
            res_body = response.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        error_details = ""
        try:
            err_json = json.loads(e.read().decode("utf-8"))
            if "error" in err_json and "message" in err_json["error"]:
                # Sanitize error message to avoid leaking any key
                msg = err_json["error"]["message"]
                error_details = f": {msg}"
        except Exception:
            pass
        raise RuntimeError(f"AI API request failed with HTTP {e.code}{error_details}")
    except urllib.error.URLError as e:
        raise RuntimeError(f"Network error while contacting AI service: {e.reason}")
    except Exception as e:
        raise RuntimeError(f"Failed to communicate with AI service: {str(e)}")

    # Parse response from Gemini
    try:
        data = json.loads(res_body)
        candidates = data.get("candidates", [])
        if not candidates:
            raise ValueError("No analysis generated by the AI model.")
        
        content_parts = candidates[0].get("content", {}).get("parts", [])
        if not content_parts:
            raise ValueError("Empty response parts from AI model.")
        
        raw_text = content_parts[0].get("text", "")
        cleaned_json = _clean_json_text(raw_text)
        result = json.loads(cleaned_json)
    except json.JSONDecodeError:
        raise ValueError("AI model returned an invalid JSON response structure.")
    except Exception as e:
        raise ValueError(f"Failed to process AI response: {str(e)}")

    # Validate output structure
    category = result.get("category")
    if not category or not isinstance(category, str):
        result["category"] = "General Societal Issue"
    else:
        result["category"] = category.strip()

    # Validate severity
    raw_severity = str(result.get("severity", "")).strip().title()
    if raw_severity in VALID_SEVERITIES:
        result["severity"] = raw_severity
    else:
        matched = False
        for s in VALID_SEVERITIES:
            if s.lower() == raw_severity.lower():
                result["severity"] = s
                matched = True
                break
        if not matched:
            result["severity"] = "Medium"

    # Validate keywords
    keywords = result.get("keywords")
    if not isinstance(keywords, list) or len(keywords) == 0:
        result["keywords"] = [result["category"], "Community Impact"]
    else:
        result["keywords"] = [str(k).strip() for k in keywords if str(k).strip()]

    # Validate solutions (must be 3-5 items)
    solutions = result.get("solutions")
    if not isinstance(solutions, list) or len(solutions) < 3:
        raise ValueError("AI model did not generate sufficient practical solutions (minimum 3 required).")
    
    # Ensure items are strings and limit to 5
    cleaned_solutions = [str(s).strip() for s in solutions if str(s).strip()]
    if len(cleaned_solutions) < 3:
        raise ValueError("AI model returned fewer than 3 valid solution descriptions.")
    
    result["solutions"] = cleaned_solutions[:5]

    return {
        "category": result["category"],
        "severity": result["severity"],
        "keywords": result["keywords"],
        "solutions": result["solutions"]
    }


def handle_analyze_problem_request(raw_body):
    """
    HTTP Controller for /api/ai/analyze-problem endpoint.

    Args:
        raw_body: bytes or string of the raw HTTP request body

    Returns:
        (status_code, response_dict)
    """
    # 1. Parse JSON body
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

    # 2. Validate required fields
    title = payload.get("title")
    if not title or not isinstance(title, str) or not title.strip():
        return 400, {"error": "Missing or empty required field: 'title'"}

    description = payload.get("description")
    if not description or not isinstance(description, str) or not description.strip():
        return 400, {"error": "Missing or empty required field: 'description'"}

    location = payload.get("location", "")
    if not isinstance(location, str):
        location = str(location)

    # 3. Call AI Service
    try:
        analysis = analyze_problem(title=title, description=description, location=location)
        return 200, analysis
    except ValueError as e:
        err_str = str(e)
        if "API key is not configured" in err_str:
            return 500, {"error": err_str}
        return 502, {"error": f"Invalid data from AI service: {err_str}"}
    except RuntimeError as e:
        return 502, {"error": str(e)}
    except Exception as e:
        return 500, {"error": f"Unexpected server error during AI analysis: {str(e)}"}
