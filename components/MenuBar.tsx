"use client";
import { useEditorState } from "@tiptap/react";
import type { Editor } from "@tiptap/react";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  RemoveFormatting,
  Eraser,
  Pilcrow,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  SquareTerminal,
  Quote,
  Minus,
  CornerDownLeft,
  Undo2,
  Redo2,
} from "lucide-react";

export const MenuBar = ({ editor }: { editor: Editor }) => {
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isStrike: ctx.editor.isActive("strike"),
      // You can also check if an action is currently allowed (e.g., inside a code block)
      canBold: ctx.editor.can().chain().focus().toggleBold().run(),
    }),
  });

  return (
    <div className="control-group">
      <div className="button-group flex flex-wrap items-center gap-1 border-b bg-muted/10 p-2">
        {/* History Group */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().undo().run()}
          title="Undo"
        >
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().redo().run()}
          // disabled={!editorState.canRedo}
          title="Redo"
        >
          <Redo2 className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Text Formatting Group */}
        <Button
          // variant={editorState.isBold ? "secondary" : "ghost"}
          variant="ghost"
          size="icon"
          className={`px-3 py-1 font-bold rounded-md transition-colors ${
            state.isBold
              ? "bg-accent text-accent-foreground"
              : "bg-transparent text-foreground hover:bg-muted hover:text-muted-foreground"
          }`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          // disabled={!editorState.canBold}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          // variant={editorState.isItalic ? "secondary" : "ghost"}
          variant="ghost"
          size="icon"
          className={`px-3 py-1 font-bold rounded-md transition-colors ${
            state.isItalic
              ? "bg-accent text-accent-foreground"
              : "bg-transparent text-foreground hover:bg-muted hover:text-muted-foreground"
          }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          // disabled={!editorState.canItalic}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          // variant={editorState.isStrike ? "secondary" : "ghost"}
          variant="ghost"
          size="icon"
          className={`px-3 py-1 font-bold rounded-md transition-colors ${
            state.isStrike
              ? "bg-accent text-accent-foreground"
              : "bg-transparent text-foreground hover:bg-muted hover:text-muted-foreground"
          }`}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          // disabled={!editorState.canStrike}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          // variant={editorState.isCode ? "secondary" : "ghost"}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleCode().run()}
          // disabled={!editorState.canCode}
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Clear formatting Group */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          // disabled={!editorState.canClearMarks}
          title="Clear Marks"
        >
          <RemoveFormatting className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().clearNodes().run()}
          title="Clear Blocks"
        >
          <Eraser className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Headings & Blocks Group */}
        <Button
          // variant={editorState.isParagraph ? "secondary" : "ghost"}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().setParagraph().run()}
          title="Paragraph"
        >
          <Pilcrow className="h-4 w-4" />
        </Button>
        <Button
          // variant={editorState.isHeading1 ? "secondary" : "ghost"}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          // variant={editorState.isHeading2 ? "secondary" : "ghost"}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          // variant={editorState.isHeading3 ? "secondary" : "ghost"}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button
          // variant={editorState.isHeading4 ? "secondary" : "ghost"}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          title="Heading 4"
        >
          <Heading4 className="h-4 w-4" />
        </Button>
        <Button
          // variant={editorState.isHeading5 ? "secondary" : "ghost"}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          title="Heading 5"
        >
          <Heading5 className="h-4 w-4" />
        </Button>
        <Button
          // variant={editorState.isHeading6 ? "secondary" : "ghost"}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          title="Heading 6"
        >
          <Heading6 className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Lists Group */}
        <Button
          // variant={editorState.isBulletList ? "secondary" : "ghost"}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          // variant={editorState.isOrderedList ? "secondary" : "ghost"}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Other Structure Group */}
        <Button
          // variant={editorState.isCodeBlock ? "secondary" : "ghost"}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          title="Code Block"
        >
          <SquareTerminal className="h-4 w-4" />
        </Button>
        <Button
          // variant={editorState.isBlockquote ? "secondary" : "ghost"}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().setHardBreak().run()}
          title="Hard Break (Line Break)"
        >
          <CornerDownLeft className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
