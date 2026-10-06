/**
 * GeoRisk AI — Base Service Client
 *
 * Implements the API-ready requirement (Master Prompt Section 41).
 * Uses NEXT_PUBLIC_API_URL environment variable if set, otherwise falls back
 * gracefully to local mock dataset providers.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!res.ok) {
      console.warn(`API call ${endpoint} returned status ${res.status}`);
      return null;
    }

    return (await res.json()) as T;
  } catch (err) {
    console.warn(`Network failure fetching from API ${endpoint}. Falling back to mock data.`, err);
    return null;
  }
}

