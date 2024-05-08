const apiUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

export async function fetchApi(path, method, options) {
  try {
    const defaultOptions = {};
    if (method === "POST") {
      defaultOptions.headers = {
        "Content-Type": "application/json",
      };
    }
    const response = await fetch(`${apiUrl}${path}`, {
      method,
      ...defaultOptions,
      ...options,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}
