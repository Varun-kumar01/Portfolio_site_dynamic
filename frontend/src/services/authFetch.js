export async function authFetch(input, init = {}) {
  const token = localStorage.getItem("adminToken");

  const headers = new Headers(init.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(input, {
    ...init,
    headers,
    cache: "no-store",
  });
}