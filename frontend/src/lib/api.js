const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function fetchWithAuth(endpoint, token) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new Error(
      typeof data === "string"
        ? `API error: ${response.status} - ${data}`
        : `API error: ${response.status} - ${JSON.stringify(data)}`
    );
  }

  return data;
}