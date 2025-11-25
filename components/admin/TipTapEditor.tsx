"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { useEffect, useRef, useState } from "react";

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
  MdImage,
} from "react-icons/md";

import type { IconType } from "react-icons";

interface TipTapEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const DynamicUploadButton = ({ editor }: { editor: any }) => {
  const [Comp, setComp] = useState<any>(null);
  useEffect(() => {
    let mounted = true;
    import("@uploadthing/react").then((m) => {
      const C = m?.UploadButton ?? (m?.generateUploadButton ? m.generateUploadButton() : null);
      if (mounted) setComp(() => C);
    });
    return () => { mounted = false; };
  }, []);
  if (!Comp) return <div>Loading UploadButton…</div>;
  return (
    <Comp
      endpoint="editorImages"
      onClientUploadComplete={(res: any) => {
        // Log result and insert image when URL is present
        // eslint-disable-next-line no-console
        console.log('[uploadthing] client upload complete', res);
        if (editor && res && Array.isArray(res) && res[0] && res[0].url) {
          editor.chain().focus().setImage({ src: res[0].url }).run();
        }
      }}
      onUploadError={(err: any) => {
        // eslint-disable-next-line no-console
        console.error('[uploadthing] client upload error', err);
        try {
          alert('Image upload failed: ' + (err?.message ?? JSON.stringify(err)));
        } catch (e) {}
      }}
    />
  );
};

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
    onClick={onClick}
    type="button"
    title={title}
    className={`p-2 rounded transition text-white ${
      active ? "bg-blue-600" : "bg-slate-900 hover:bg-slate-700"
    }`}
  >
    <Icon size={18} />
  </button>
);

const Toolbar = ({ editor }: { editor: any }) => {
  const uploadRef = useRef<HTMLDivElement | null>(null);
  const [UploadButtonComp, setUploadButtonComp] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    // Dynamically import the UploadButton from @uploadthing/react on client
    import("@uploadthing/react").then((m) => {
      const Comp = m?.UploadButton ?? (m?.generateUploadButton ? m.generateUploadButton() : null);
      if (mounted) setUploadButtonComp(() => Comp);
    }).catch(() => {
      // ignore; component will remain null
    });
    return () => { mounted = false; };
  }, []);

  if (!editor) return null;

  const handleImageUpload = () => {
    // Find the file input inside the UploadButton wrapper and trigger it
    if (uploadRef.current) {
      const input = uploadRef.current.querySelector("input[type=file]") as HTMLInputElement | null;
      if (input) {
        input.click();
        return;
      }
    }

    // Fallback: open a native file picker
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      if (!input.files) return;

      // Try to use dynamic UploadButton's behavior by uploading via fetch to your API
      // as a minimal fallback, we won't attempt upload here.
    };

    input.click();
  };

  const setLink = () => {
    const url = window.prompt("Enter URL");
    if (!url) return editor.chain().focus().unsetLink().run();

    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-800 border-b border-slate-700">
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

      <ToolbarButton
        icon={MdLink}
        title="Link"
        onClick={setLink}
        active={editor.isActive("link")}
      />

      <ToolbarButton
        icon={MdImage}
        title="Insert Image"
        onClick={handleImageUpload}
      />

      {/* Hidden wrapper for UploadButton; we render it so its internal file input can be triggered */}
       {/* Upload button directly in toolbar */}
       {UploadButtonComp && (
         <div className="ml-2">
           {/* @ts-ignore */}
           <UploadButtonComp
             endpoint="editorImages"
             onClientUploadComplete={(res: any) => {
              // eslint-disable-next-line no-console
              console.log('[uploadthing] toolbar upload complete', res);
              if (!res || !Array.isArray(res) || !res[0] || !res[0].url) {
                // eslint-disable-next-line no-console
                console.error('[uploadthing] no url returned', res);
                alert("Image upload failed or no URL returned. See console.");
                return;
              }
              editor.chain().focus().setImage({ src: res[0].url }).run();
             }}
            onUploadError={(err: any) => {
              // eslint-disable-next-line no-console
              console.error('[uploadthing] toolbar upload error', err);
              try { alert('Image upload failed: ' + (err?.message ?? JSON.stringify(err))); } catch (e) {}
            }}
           />
         </div>
       )}

      <div className="w-px h-6 bg-gray-500 mx-2" />

      <ToolbarButton
        icon={MdFormatAlignLeft}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        active={editor.isActive({ textAlign: "left" })}
      />
      <ToolbarButton
        icon={MdFormatAlignCenter}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        active={editor.isActive({ textAlign: "center" })}
      />
      <ToolbarButton
        icon={MdFormatAlignRight}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        active={editor.isActive({ textAlign: "right" })}
      />
      <ToolbarButton
        icon={MdFormatAlignJustify}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        active={editor.isActive({ textAlign: "justify" })}
      />

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
    extensions: [
      StarterKit,
      Underline,
      Image,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    // Avoid SSR hydration mismatches — render editor only on client
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none p-4 min-h-[300px] text-white " +
          "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 " +
          "[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3 " +
          "[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2 " +
          "[&_h4]:text-lg [&_h4]:font-medium [&_h4]:mt-4 [&_h4]:mb-2 " +
          "[&_ul]:list-disc [&_ul]:ml-6 [&_ul]:my-2 " +
          "[&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:my-2 " +
          "[&_li]:my-1 " +
          "[&_blockquote]:border-l-4 [&_blockquote]:border-slate-600 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-400 [&_blockquote]:my-4 " +
          "[&_code]:bg-slate-800 [&_code]:text-orange-300 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm " +
          "[&_[style*='text-align:left']]:text-left [&_[style*='text-align:center']]:text-center [&_[style*='text-align:right']]:text-right [&_[style*='text-align:justify']]:text-justify " +
          "[&_a]:text-blue-400 [&_a]:underline hover:[&_a]:text-blue-300",
        placeholder,
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      {/* Visible test UploadButton for debugging */}
       {/* UploadButton moved to toolbar above */}
    </div>
  );
// Visible test UploadButton for debugging
function TestUploadButton({ editor }: { editor: any }) {
  const [Comp, setComp] = useState<any>(null);
  useEffect(() => {
    let mounted = true;
    import("@uploadthing/react").then((m) => {
      const C = m?.UploadButton ?? (m?.generateUploadButton ? m.generateUploadButton() : null);
      if (mounted) setComp(() => C);
    });
    return () => { mounted = false; };
  }, []);
  if (!Comp) return <div>Loading UploadButton…</div>;
  return (
    <Comp
      endpoint="editorImages"
      onClientUploadComplete={(res: any) => {
        // eslint-disable-next-line no-console
        console.log('[uploadthing] test button upload complete', res);
        if (editor && res && Array.isArray(res) && res[0] && res[0].url) {
          editor.chain().focus().setImage({ src: res[0].url }).run();
        }
      }}
      onUploadError={(err: any) => {
        // eslint-disable-next-line no-console
        console.error('[uploadthing] test button upload error', err);
        try { alert('Image upload failed: ' + (err?.message ?? JSON.stringify(err))); } catch (e) {}
      }}
    />
  );
}
}
