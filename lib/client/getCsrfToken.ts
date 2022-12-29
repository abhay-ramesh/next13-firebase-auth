export async function getCsrfToken(): Promise<string> {
  return await fetch("/api/auth/csrfToken").then((res) => res.json());
}
