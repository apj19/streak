"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";

import { forwardRef, useImperativeHandle } from "react";

// export interface EditorRef {
//   getContent: () => string;
// }
interface Props {
  data: string;
}

const TiptapEditor = ({ data }: Props) => {
  const editorContent = JSON.parse(data);
  // console.log(editorContent);
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
    content: editorContent || "failed to load",
    // 3. Inject your Tailwind classes directly into the editable area
    editorProps: {
      attributes: {
        class: "max-w-none w-full p-4 sm:p-6 md:p-8 outline-none",
      },
    },
    editable: false,
  });

  // console.log(data);

  return (
    // This is the outer container wrapper we styled earlier
    <div className="w-full  md:min-w-3xl ">
      {/* {editor && <MenuBar editor={editor} />} */}

      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
