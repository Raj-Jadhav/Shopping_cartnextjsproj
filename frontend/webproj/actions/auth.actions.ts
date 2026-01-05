import { SignupSchemaType } from "@/schemas/signup.schema";

export async function registerUser(data: SignupSchemaType) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  const contentType = res.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    throw new Error(await res.text());
  }

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Registration failed");
  }

  return result;
}

// LOGIN ACTION
export async function loginUser(data: {
  username: string;
  password: string;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  const contentType = res.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    throw new Error(await res.text());
  }

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Login failed");
  }

  return result;
}
