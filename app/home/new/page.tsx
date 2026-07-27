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
import {
  AlertCircle,
  BookmarkIcon,
  CheckCheckIcon,
  Flame,
  Loader2,
  MoveLeft,
  ShieldCheckIcon,
  TrashIcon,
  Trophy,
} from "lucide-react";
// import { currentUser } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
import { createPostAction } from "@/app/action";
import { useAuth } from "@clerk/nextjs";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import dynamic from "next/dynamic";
import Confetti from "react-confetti";

// const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });
import Editor, { EditorRef } from "@/components/Editor";
import { useRef } from "react";
import Link from "next/link";
import { useState } from "react";
import PublishedBlog from "@/components/PublishedBlog";
import { MenuBar } from "@/components/MenuBar";

export default function NewSkillPage() {
  const editorRef = useRef<EditorRef>(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error state

  /////////////////
  const { isLoaded, userId } = useAuth();
  // Define the form schema
  const formSchema = z.object({
    title: z.string().min(1),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;
  ///seting up edtor here only
  const editor = useEditor({
    // 1. Load the extensions
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
    ],
    // 2. Set default content (can be HTML or JSON)
    content: "<p>Start writing your log...</p>",
    // 3. Inject your Tailwind classes directly into the editable area
    editorProps: {
      attributes: {
        class: "max-w-none w-full min-h-[400px] p-4 sm:p-6 md:p-8 outline-none",
      },
    },
  });

  async function onSubmit(data: FormValues) {
    //grabbing tile and content

    let titleData = data.title;
    const contentData =
      editorRef.current?.getContent() || "what you learing today";
    // console.log(content);
    let updatedData = { title: titleData, content: contentData };

    try {
      await createPostAction(updatedData, userId!);
      // throw Error("failed");
      setShowSuccess(true);
    } catch (error) {
      setErrorMessage(
        "Something went wrong. Please check your connection and try again.",
      );
    }
  }

  // function handlePublish() {
  //   const content = editorRef.current?.getContent();
  //   console.log(content);
  // }

  //////////////////////////////////////////////////
  const handleCloseAndReset = () => {
    setShowSuccess(false); // Hide the banner
    form.reset({ title: "" }); // Clear the title input
    editor?.commands.setContent("anything new in Mind?"); // Clear the Tiptap edito
  };

  return (
    <>
      {errorMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="flex flex-col items-center justify-center max-w-md p-8 text-center border-destructive border rounded-xl shadow-lg bg-card">
            <AlertCircle className="w-16 h-16 text-destructive mb-6" />
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Publish Failed
            </h2>
            <p className="text-muted-foreground mb-8">{errorMessage}</p>
            <div className="flex gap-4 w-full">
              {/* Lets them close the banner and try clicking publish again without losing their text */}
              <Button
                onClick={() => setErrorMessage(null)}
                variant="outline"
                className="w-full"
              >
                Go back to Editor
              </Button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed top-1/2 left-1/2 z-50 grid justify-center items-center  backdrop-blur-sm w-full h-full -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center justify-center gap-5 bg-popover p-5 rounded-lg">
            <p className="text-2xl font-bold text-green-400">
              Daily Log Completed
            </p>
            <Flame className="text-red-400" />
            <p className="text-sm ">Consisteny is Key</p>

            {/* <button onClick={handleCloseAndReset}>close</button> */}
            <Button
              onClick={handleCloseAndReset}
              className="from-destructive via-destructive/60 to-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 border-0 bg-transparent bg-linear-to-r bg-size-[200%_auto] text-white hover:bg-transparent hover:bg-position-[99%_center]"
            >
              <TrashIcon />
              Close
            </Button>
            <Confetti
              className="w-full h-full z-1000"
              numberOfPieces={200}
              recycle={true}
            />
          </div>
        </div>
      )}

      <section className="  md:min-w-3xl mx-auto py-8 px-4">
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) =>
            console.log("Form Errors:", errors),
          )}
          className=""
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

          <FieldLabel className="my-4">Share your learing</FieldLabel>

          <div className="w-full rounded-xl border  shadow-sm  ">
            {editor && <MenuBar editor={editor} />}

            <EditorContent editor={editor} />
          </div>

          <div className="flex justify-between items-center py-4">
            <Link href="/home">
              {" "}
              <Button className="group">
                <MoveLeft className="transition-transform duration-200 group-hover:translate-x-0.5" />
                Back to home
                {/* <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" /> */}
              </Button>
            </Link>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600/10 text-green-600 hover:bg-green-600/20 focus-visible:border-green-600/40 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:hover:bg-green-400/20 dark:focus-visible:border-green-400/40 dark:focus-visible:ring-green-400/40"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  Publish
                  <ShieldCheckIcon />
                </>
              )}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
