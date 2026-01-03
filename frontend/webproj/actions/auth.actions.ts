import { SignupSchemaType } from "@/schemas/signup.schema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function registerUser(data: SignupSchemaType) {
  const response = await fetch(
    `${API_BASE_URL}/api/register/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error || "Registration failed");
  }

  return result;
}
