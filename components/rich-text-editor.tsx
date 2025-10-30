"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import { useEffect } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  fontSize: number;
  autoFocus?: boolean;
}

export default function RichTextEditor({ content, onChange, fontSize, autoFocus = false }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: content || '<p></p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'outline-none focus:outline-none min-h-[1.6em] cursor-text tiptap-editor',
        style: `font-size: ${fontSize}px; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; user-select: text; -webkit-user-select: text; -moz-user-select: text; cursor: text;`,
        spellcheck: 'true',
      },
      handleDOMEvents: {
        mousedown: () => false, // Allow default text selection
        mouseup: () => false,
        click: () => false,
      },
    },
    autofocus: autoFocus ? 'end' : false,
  });

  useEffect(() => {
    if (editor && content && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  useEffect(() => {
    if (editor && autoFocus) {
      setTimeout(() => {
        editor.commands.focus('end');
      }, 100);
    }
  }, [editor, autoFocus]);

  if (!editor) {
    return null;
  }

  return (
    <div 
      className="w-full h-full"
      style={{
        userSelect: 'text',
        WebkitUserSelect: 'text',
        cursor: 'text',
      }}
    >
      <EditorContent 
        editor={editor} 
        className="h-full"
        style={{
          fontSize: `${fontSize}px`,
          userSelect: 'text',
          WebkitUserSelect: 'text',
          cursor: 'text',
        }}
      />
    </div>
  );
}
