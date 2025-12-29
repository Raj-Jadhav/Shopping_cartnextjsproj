"use client";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { formSchema } from "./schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const [buttonText, setButtonText] = useState("Submit");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { name: "", description: "" },
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setButtonText("Submitting...");
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://localhost:8000/api/add/items/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setButtonText("Submitted!");
      } else {
        setButtonText("Submit Failed");
      }
    } catch (error) {
      setButtonText("Submit Failed");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Add Item</h1>
        <Button onClick={handleLogout} variant="outline">Logout</Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField name="name" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>NAME</FormLabel>
              <Input placeholder="name" {...field} />
            </FormItem>
          )} />
          <FormField name="description" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <Input placeholder="describe" {...field} />
            </FormItem>
          )} />
          <Button type="submit">{buttonText}</Button>
        </form>
      </Form>
    </div>
  );
}
