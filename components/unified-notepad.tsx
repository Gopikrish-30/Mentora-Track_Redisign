"use client";

import { useState, useRef, useEffect } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import ResizableImageExtension from 'tiptap-extension-resize-image';
import {
  X,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Highlighter,
  Save,
  Undo,
  Redo,
  Image as ImageIcon,
  Pencil,
  Eraser,
} from "lucide-react";

interface UnifiedNotepadProps {
  trackId: string;
  onClose: () => void;
  embedded?: boolean;
}

export default function UnifiedNotepad({ trackId, onClose, embedded = false }: UnifiedNotepadProps) {
  const [fontSize, setFontSize] = useState(16);
  const [drawingMode, setDrawingMode] = useState(false);
  const [penColor, setPenColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const savedCanvasDataRef = useRef<ImageData | null>(null);

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
      ResizableImageExtension.configure({
        inline: false,
        allowBase64: true,
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'outline-none focus:outline-none prose prose-sm max-w-none min-h-full p-6 cursor-text',
        style: `font-size: ${fontSize}px; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;`,
        spellcheck: 'true',
      },
      handlePaste: (view, event) => {
        const items = event.clipboardData?.items;
        if (!items) return false;

        // Check for images in clipboard
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            event.preventDefault();
            const file = items[i].getAsFile();
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const url = e.target?.result as string;
                editor?.chain().focus().setImage({ src: url }).run();
              };
              reader.readAsDataURL(file);
            }
            return true;
          }
        }
        return false;
      },
    },
  });

  // Load saved content
  useEffect(() => {
    const saved = localStorage.getItem(`notepad_${trackId}`);
    if (saved && editor) {
      try {
        const data = JSON.parse(saved);
        editor.commands.setContent(data.content || '');
      } catch (e) {
        console.error("Failed to load notes:", e);
      }
    }
  }, [trackId, editor]);

  // Save notes
  const saveNotes = () => {
    if (editor) {
      localStorage.setItem(
        `notepad_${trackId}`,
        JSON.stringify({ 
          content: editor.getHTML(), 
          savedAt: new Date().toISOString() 
        })
      );
      alert("Notes saved successfully!");
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editor) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        editor.chain().focus().setImage({ src: url }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  // Drawing handlers - Simple and smooth
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.strokeStyle = penColor;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (isDrawing && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.closePath();
      }
    }
    setIsDrawing(false);
  };

  // Initialize canvas and keep it sized properly
  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current && editorContainerRef.current) {
        const container = editorContainerRef.current;
        const canvas = canvasRef.current;
        
        // Save current drawing
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        if (tempCtx) {
          tempCtx.drawImage(canvas, 0, 0);
        }
        
        // Resize to cover entire scrollable area with padding
        const width = Math.max(container.scrollWidth, container.clientWidth);
        const height = Math.max(container.scrollHeight, container.clientHeight, 2000);
        
        canvas.width = width;
        canvas.height = height;
        
        // Restore drawing
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(tempCanvas, 0, 0);
          ctx.strokeStyle = penColor;
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
        }
      }
    };

    updateCanvasSize();
    
    // Update on window resize
    window.addEventListener('resize', updateCanvasSize);
    
    // Also update when content might have changed
    const timer = setInterval(updateCanvasSize, 2000);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update pen color when it changes
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = penColor;
      }
    }
  }, [penColor]);

  // Toggle drawing mode
  const toggleDrawingMode = () => {
    setDrawingMode(!drawingMode);
    if (!drawingMode && editor) {
      editor.setEditable(false);
    } else if (editor) {
      editor.setEditable(true);
    }
  };

  // Clear all drawings
  const clearDrawings = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };



  if (!editor) {
    return null;
  }

  return (
    <div className={embedded ? "h-full flex flex-col bg-white dark:bg-[#1f1f1f]" : "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"}>
      <div className={embedded ? "bg-white dark:bg-[#1f1f1f] h-full flex flex-col" : "bg-white dark:bg-[#1f1f1f] rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col"}>
        
        {/* Header */}
        {!embedded && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Course Notepad</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Take notes just like MS Word</p>
            </div>
            {onClose && (
              <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            )}
          </div>
        )}

        {/* Toolbar */}
        <div className={`flex items-center gap-1 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] ${embedded ? 'px-3 py-2' : 'px-4 py-2'}`}>
          {/* Undo/Redo */}
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-30 disabled:cursor-not-allowed"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-30 disabled:cursor-not-allowed"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-1" />

          {/* Pen Tool */}
          <button
            onClick={toggleDrawingMode}
            className={`p-1.5 rounded transition-colors ${
              drawingMode ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            title="Pen (Draw/Scribble)"
          >
            <Pencil className="w-4 h-4" />
          </button>

          {drawingMode && (
            <>
              <input
                type="color"
                value={penColor}
                onChange={(e) => setPenColor(e.target.value)}
                className="w-7 h-7 rounded cursor-pointer border border-gray-300 dark:border-gray-700"
                title="Pen Color"
              />
              <button
                onClick={clearDrawings}
                className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                title="Clear All Drawings"
              >
                <Eraser className="w-4 h-4" />
              </button>
            </>
          )}

          <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-1" />

          {/* Text Formatting */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('bold') ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('italic') ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('underline') ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            title="Underline"
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffeb3b' }).run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('highlight') ? "bg-yellow-300 dark:bg-yellow-600 text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            title="Highlight"
          >
            <Highlighter className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-1" />

          {/* Font Size */}
          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="px-2 py-1 text-xs border border-gray-200 dark:border-gray-700 rounded hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none transition-colors bg-white dark:bg-[#1f1f1f] text-gray-900 dark:text-gray-100"
          >
            <option value={12}>12px</option>
            <option value={14}>14px</option>
            <option value={16}>16px</option>
            <option value={18}>18px</option>
            <option value={20}>20px</option>
            <option value={24}>24px</option>
            <option value={32}>32px</option>
          </select>

          <div className="flex-1" />

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              title="Insert Image"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={saveNotes}
              className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              title="Save"
            >
              <Save className="w-4 h-4" />
            </button>
            {embedded && onClose && (
              <>
                <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-1" />
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-gray-500 dark:text-gray-400"
                  title="Close"
                >
                  <X size={16} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 overflow-auto bg-white dark:bg-[#343541] relative" ref={editorContainerRef}>
          <div className="relative min-h-full">
            <EditorContent 
              editor={editor} 
              className="relative z-0 dark-mode-editor"
              style={{
                fontSize: `${fontSize}px`,
                pointerEvents: drawingMode ? 'none' : 'auto',
              }}
            />
            {/* Drawing Canvas Overlay - Always visible, covers all content */}
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 z-10"
              style={{
                cursor: drawingMode ? 'crosshair' : 'default',
                pointerEvents: drawingMode ? 'auto' : 'none',
              }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
