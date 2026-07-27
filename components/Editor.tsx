"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";

import { forwardRef, useImperativeHandle } from "react";

export interface EditorRef {
  getContent: () => string;
}

const TiptapEditor = forwardRef<EditorRef>((props, ref) => {
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

  useImperativeHandle(ref, () => ({
    getContent: () => {
      const json = editor?.getJSON();

      return JSON.stringify(json) || "";
    },
  }));

  return (
    // This is the outer container wrapper we styled earlier
    <div className="w-full rounded-xl border  shadow-sm  ">
      {editor && <MenuBar editor={editor} />}

      <EditorContent editor={editor} />
    </div>
  );
});

export default TiptapEditor;
