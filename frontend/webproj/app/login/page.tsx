"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { loginUser } from "@/actions/auth.actions";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/* ============================
   ZOD SCHEMA
============================ */
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

/* ============================
   PAGE
============================ */
export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  /* ============================
     SUBMIT HANDLER
  ============================ */
  async function onSubmit(data: LoginSchemaType) {
    try {
      const result = await loginUser(data);

      // Store JWT tokens
      localStorage.setItem("access_token", result.access);
      localStorage.setItem("refresh_token", result.refresh);

      setMessage("Login successful!");
      router.push("/");

    } catch (error: any) {
      setMessage(error.message || "Login failed");
    }
  }

  /* ============================
     UI
  ============================ */
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </Form>

      {message && (
        <p className="mt-4 text-center text-sm text-red-500">
          {message}
        </p>
      )}

      <p className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-blue-500 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
