"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { CheckCheckIcon } from "lucide-react";
// import { currentUser } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
import { createPostAction } from "@/app/action";
import { useAuth } from "@clerk/nextjs";

export default function NewSkillPage() {
  const { isLoaded, userId } = useAuth();
  // Define the form schema
  const formSchema = z.object({
    title: z.string().min(1),
    content: z
      .string()
      .min(10, "Describe your issue using at least 50 characters."),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(data: FormValues) {
    // console.log("form submitted");
    // console.log(data);

    createPostAction(data, userId!);

    // toast.custom(() => (
    //   <Alert className='border-green-600 text-green-600 sm:w-122 dark:border-green-400 dark:text-green-400 *:[svg]:row-span-1'>
    //     <CheckCheckIcon />
    //     <AlertTitle>Issue submitted successfully! Our team will reach out to you shortly.</AlertTitle>
    //   </Alert>
    // ))
  }

  return (
    <>
      <section className="flex justify-center items-center w-full my-auto">
        <Card className="w-full max-w-sm shadow-none ">
          <CardHeader>
            <CardTitle>What did you learn today?</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-xs space-y-6"
            >
              {/* Email Field */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="Title"
                      autoComplete="email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Message Textarea Field */}
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Please Enter the learing
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Provide detailed information about your issue"
                      className="min-h-30 resize-none"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
