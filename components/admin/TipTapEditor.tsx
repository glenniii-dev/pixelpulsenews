"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdStrikethroughS,
  MdTitle,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdCode,
  MdLink,
  MdClear,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
} from "react-icons/md";
import { IconType } from "react-icons";

interface TipTapEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const ToolbarButton = ({
  icon: Icon,
  onClick,
  active = false,
  title,
}: {
  icon: IconType;
  onClick: () => void;
  active?: boolean;
  title?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded text-white transition ${
      active ? "bg-blue-600" : "bg-slate-900 hover:bg-slate-700"
    }`}
    title={title}
  >
    <Icon size={18} />
  </button>
);

const Toolbar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const setLink = () => {
    const url = window.prompt("Enter URL");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-300 bg-slate-800">
      {/* Text styling */}
      <ToolbarButton
        icon={MdFormatBold}
        title="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
      />
      <ToolbarButton
        icon={MdFormatItalic}
        title="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
      />
      <ToolbarButton
        icon={MdFormatUnderlined}
        title="Underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive("underline")}
      />
      <ToolbarButton
        icon={MdStrikethroughS}
        title="Strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
      />

      {/* Headings */}
      <ToolbarButton
        icon={MdTitle}
        title="Heading 1"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        active={editor.isActive("heading", { level: 1 })}
      />
      <ToolbarButton
        icon={MdTitle}
        title="Heading 2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive("heading", { level: 2 })}
      />

      {/* Lists */}
      <ToolbarButton
        icon={MdFormatListBulleted}
        title="Bullet List"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
      />
      <ToolbarButton
        icon={MdFormatListNumbered}
        title="Numbered List"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
      />

      {/* Block styles */}
      <ToolbarButton
        icon={MdFormatQuote}
        title="Blockquote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
      />
      <ToolbarButton
        icon={MdCode}
        title="Code Block"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive("codeBlock")}
      />

      {/* Links */}
      <ToolbarButton
        icon={MdLink}
        title="Link"
        onClick={setLink}
        active={editor.isActive("link")}
      />

      {/* Text Alignment */}
      <div className="w-px h-6 bg-slate-600 mx-1" />
      <ToolbarButton
        icon={MdFormatAlignLeft}
        title="Align Left"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        active={editor.isActive({ textAlign: "left" })}
      />
      <ToolbarButton
        icon={MdFormatAlignCenter}
        title="Align Center"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        active={editor.isActive({ textAlign: "center" })}
      />
      <ToolbarButton
        icon={MdFormatAlignRight}
        title="Align Right"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        active={editor.isActive({ textAlign: "right" })}
      />
      <ToolbarButton
        icon={MdFormatAlignJustify}
        title="Justify"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        active={editor.isActive({ textAlign: "justify" })}
      />

      {/* Clear */}
      <div className="ml-auto" />
      <ToolbarButton
        icon={MdClear}
        title="Clear Formatting"
        onClick={() =>
          editor.chain().focus().clearNodes().unsetAllMarks().unsetTextAlign().run()
        }
      />
    </div>
  );
};

export default function TipTapEditor({
  value,
  onChange,
  placeholder = "Start writing…",
}: TipTapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2] },
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Link.configure({ openOnClick: false }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "left",
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none p-4 min-h-[300px] text-white " +
          "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2 " +
          "[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-3 [&_h2]:mb-1 " +
          "[&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 " +
          "[&_a]:text-blue-400 hover:[&_a]:underline " +
          "[&_blockquote]:border-l-4 [&_blockquote]:pl-3 [&_blockquote]:italic " +
          "[&_code]:bg-slate-800 [&_code]:text-orange-300 [&_code]:px-1 [&_code]:rounded " +
          "[&_[style*='text-align:left']]:text-left [&_[style*='text-align:center']]:text-center [&_[style*='text-align:right']]:text-right [&_[style*='text-align:justify']]:text-justify",
        placeholder,
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (!editor) return;
    const currentHtml = editor.getHTML();
    if (value !== currentHtml) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  return (
    <div className="rounded-lg overflow-hidden border border-slate-300 bg-slate-900">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}