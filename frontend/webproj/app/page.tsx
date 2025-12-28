"use client";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { formSchema } from "./schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [buttonText, setButtonText] =  useState("Submit");
  const form = useForm <z.infer<typeof formSchema>>({defaultValues: {name: "",description: ""}, resolver: zodResolver(formSchema )});
  async function onSubmit(data: z.infer<typeof formSchema>) {
    setButtonText("Submitting...");
    try {
      const response = await fetch("http://localhost:8000/api/add/items/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField name="name" control={form.control} render={({field}) => (
           
           <FormItem>
            <FormLabel>NAME</FormLabel>
            <Input placeholder="name" {...field} />
            </FormItem>
          )}>
          </FormField>

          <FormField name="description" control={form.control} render={({field}) => (
           
           <FormItem>
            <FormLabel>Description</FormLabel>
            <Input placeholder="describe" {...field} />
            </FormItem>
          )}>
          </FormField>

          <Button type="submit">{buttonText}</Button>
        </form>
      </Form>
    </div>
  );
}
