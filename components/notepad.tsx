
"use client";

import { useState, useRef, useEffect } from "react";
import {
  X,
  Type,
  Pencil,
  Eraser,
  Image as ImageIcon,
  Bold,
  Italic,
  Underline,
  Highlighter,
  Trash2,
  Save,
  Undo,
  Redo,
} from "lucide-react";
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('./rich-text-editor'), {
  ssr: false,
});

interface NotepadProps {
  courseId: string;
  onClose?: () => void;
  embedded?: boolean;
}

type Tool = "text" | "draw" | "erase" | "highlight";
type TextStyle = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  highlight: boolean;
  size: number;
};

interface TextElement {
  id: string;
  type: "text";
  content: string;
  x: number;
  y: number;
  style: TextStyle;
  width: number;
}

interface ImageElement {
  id: string;
  type: "image";
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DrawElement {
  id: string;
  type: "draw";
  points: { x: number; y: number }[];
  color: string;
  width: number;
}

type CanvasElement = TextElement | ImageElement | DrawElement;

export default function Notepad({ courseId, onClose, embedded = false }: NotepadProps) {
  const [tool, setTool] = useState<Tool>("text");
  const [textStyle, setTextStyle] = useState<TextStyle>({
    bold: false,
    italic: false,
    underline: false,
    highlight: false,
    size: 16,
  });
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentDraw, setCurrentDraw] = useState<{ x: number; y: number }[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [history, setHistory] = useState<CanvasElement[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [drawColor, setDrawColor] = useState("#000000");
  const [drawWidth, setDrawWidth] = useState(2);
  const [highlightColor, setHighlightColor] = useState("#ffeb3b");
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLDivElement>(null);

  // Load saved notes for this course
  useEffect(() => {
    const saved = localStorage.getItem(`notepad_${courseId}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setElements(data.elements || []);
        setHistory([data.elements || []]);
      } catch (e) {
        console.error("Failed to load notes:", e);
      }
    }
  }, [courseId]);

  // Save notes
  const saveNotes = () => {
    localStorage.setItem(
      `notepad_${courseId}`,
      JSON.stringify({ elements, savedAt: new Date().toISOString() })
    );
    alert("Notes saved successfully!");
  };

  // Add to history
  const addToHistory = (newElements: CanvasElement[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setElements(newElements);
  };

  // Undo
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(history[historyIndex - 1]);
    }
  };

  // Redo
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(history[historyIndex + 1]);
    }
  };

  // Handle canvas click for text
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tool === "text" && e.target === canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newText: TextElement = {
        id: Date.now().toString(),
        type: "text",
        content: "",
        x,
        y,
        style: { ...textStyle },
        width: 400,
      };

      const newElements = [...elements, newText];
      addToHistory(newElements);
      setSelectedElement(newText.id);
      setTimeout(() => {
        textInputRef.current?.focus();
        // Place cursor at the start
        const range = document.createRange();
        const sel = window.getSelection();
        if (textInputRef.current && sel) {
          range.setStart(textInputRef.current, 0);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }, 10);
    }
  };

  // Handle drawing
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((tool === "draw" || tool === "erase" || tool === "highlight") && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setIsDrawing(true);
      setCurrentDraw([{ x, y }]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDrawing && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCurrentDraw([...currentDraw, { x, y }]);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && currentDraw.length > 0) {
      const newDraw: DrawElement = {
        id: Date.now().toString(),
        type: "draw",
        points: currentDraw,
        color: tool === "highlight" ? highlightColor : tool === "erase" ? "#ffffff" : drawColor,
        width: tool === "highlight" ? 20 : tool === "erase" ? 30 : drawWidth,
      };
      addToHistory([...elements, newDraw]);
      setIsDrawing(false);
      setCurrentDraw([]);
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const newImage: ImageElement = {
            id: Date.now().toString(),
            type: "image",
            src: event.target?.result as string,
            x: 50,
            y: 50,
            width: Math.min(img.width, 400),
            height: Math.min(img.height, 400) * (img.height / img.width),
          };
          addToHistory([...elements, newImage]);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle text change
  const handleTextChange = (id: string, content: string) => {
    const newElements = elements.map((el) =>
      el.id === id && el.type === "text" ? { ...el, content } : el
    );
    setElements(newElements);
  };

  // Handle text input for contentEditable
  const handleTextInput = (id: string, e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.textContent || "";
    handleTextChange(id, content);
    
    // If content is empty, remove the element
    if (!content.trim()) {
      const newElements = elements.filter(el => el.id !== id);
      setElements(newElements);
      setSelectedElement(null);
    }
  };

  // Handle text blur (commit to history)
  const handleTextBlur = () => {
    addToHistory(elements);
    setSelectedElement(null);
  };

  // Delete element
  const deleteElement = (id: string) => {
    addToHistory(elements.filter((el) => el.id !== id));
  };

  // Clear all
  const clearAll = () => {
    if (confirm("Are you sure you want to clear all notes?")) {
      addToHistory([]);
    }
  };

  // Render path for drawing
  const renderPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return "";
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    return path;
  };

  // Wrapper component based on mode
  const Wrapper = embedded ? "div" : "div";
  const wrapperClassName = embedded 
    ? "h-full flex flex-col bg-white"
    : "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4";
  
  const containerClassName = embedded
    ? "bg-white h-full flex flex-col"
    : "bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col";

  return (
    <Wrapper className={wrapperClassName}>
      <div className={containerClassName}>
        {/* Header */}
        {!embedded && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Course Notepad</h2>
              <p className="text-sm text-gray-500">Take notes, draw, and organize your thoughts</p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        )}

        {/* Toolbar */}
        <div className={`flex items-center gap-1 border-b border-gray-200 bg-white ${embedded ? 'px-3 py-2' : 'px-4 py-2'}`}>
          {/* Undo/Redo */}
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-gray-300 mx-1" />

          {/* Tool Selection */}
          <button
            onClick={() => setTool("text")}
            className={`p-1.5 rounded transition-colors ${
              tool === "text" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"
            }`}
            title="Text"
          >
            <Type className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool("draw")}
            className={`p-1.5 rounded transition-colors ${
              tool === "draw" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"
            }`}
            title="Draw"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool("highlight")}
            className={`p-1.5 rounded transition-colors ${
              tool === "highlight" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"
            }`}
            title="Highlight"
          >
            <Highlighter className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool("erase")}
            className={`p-1.5 rounded transition-colors ${
              tool === "erase" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"
            }`}
            title="Eraser"
          >
            <Eraser className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-gray-300 mx-1" />

          {/* Text Formatting (only when text tool is selected) */}
          {tool === "text" && (
            <>
              <button
                onClick={() => setTextStyle({ ...textStyle, bold: !textStyle.bold })}
                className={`p-1.5 rounded transition-colors ${
                  textStyle.bold ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"
                }`}
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTextStyle({ ...textStyle, italic: !textStyle.italic })}
                className={`p-1.5 rounded transition-colors ${
                  textStyle.italic ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"
                }`}
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTextStyle({ ...textStyle, underline: !textStyle.underline })}
                className={`p-1.5 rounded transition-colors ${
                  textStyle.underline ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"
                }`}
                title="Underline"
              >
                <Underline className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTextStyle({ ...textStyle, highlight: !textStyle.highlight })}
                className={`p-1.5 rounded transition-colors ${
                  textStyle.highlight ? "bg-yellow-300 text-gray-900" : "text-gray-600 hover:bg-gray-100"
                }`}
                title="Highlight Text"
              >
                <Highlighter className="w-4 h-4" />
              </button>

              <div className="w-px h-5 bg-gray-300 mx-1" />

              <select
                value={textStyle.size}
                onChange={(e) => setTextStyle({ ...textStyle, size: Number(e.target.value) })}
                className="px-2 py-1 text-xs border border-gray-200 rounded hover:border-gray-300 focus:outline-none transition-colors"
              >
                <option value={12}>12px</option>
                <option value={14}>14px</option>
                <option value={16}>16px</option>
                <option value={18}>18px</option>
                <option value={20}>20px</option>
                <option value={24}>24px</option>
                <option value={32}>32px</option>
              </select>
            </>
          )}

          {/* Drawing Options */}
          {(tool === "draw" || tool === "highlight") && (
            <>
              <div className="w-px h-5 bg-gray-300 mx-1" />
              {tool === "draw" && (
                <>
                  <input
                    type="color"
                    value={drawColor}
                    onChange={(e) => setDrawColor(e.target.value)}
                    className="w-7 h-7 rounded cursor-pointer border border-gray-300"
                    title="Pen Color"
                  />
                  <select
                    value={drawWidth}
                    onChange={(e) => setDrawWidth(Number(e.target.value))}
                    className="px-2 py-1 text-xs border border-gray-200 rounded hover:border-gray-300 focus:outline-none transition-colors"
                  >
                    <option value={1}>Thin</option>
                    <option value={2}>Normal</option>
                    <option value={4}>Thick</option>
                    <option value={6}>Very Thick</option>
                  </select>
                </>
              )}
              {tool === "highlight" && (
                <input
                  type="color"
                  value={highlightColor}
                  onChange={(e) => setHighlightColor(e.target.value)}
                  className="w-7 h-7 rounded cursor-pointer border border-gray-300"
                  title="Highlight Color"
                />
              )}
            </>
          )}

          <div className="flex-1" />

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
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
              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
              title="Save"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={clearAll}
              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Clear All"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            {embedded && onClose && (
              <>
                <div className="w-px h-5 bg-gray-300 mx-1" />
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-500"
                  title="Close"
                >
                  <X size={16} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Canvas Area */}
        <div className={`flex-1 overflow-auto bg-gray-50 ${embedded ? 'p-3' : 'p-6'}`}>
          <div
            ref={canvasRef}
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="relative bg-white rounded-lg shadow-sm min-h-full"
            style={{
              cursor:
                tool === "text"
                  ? "text"
                  : tool === "draw"
                  ? "crosshair"
                  : tool === "erase"
                  ? "cell"
                  : tool === "highlight"
                  ? "crosshair"
                  : "default",
              minHeight: "800px",
            }}
          >
            {/* Render SVG for drawings */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {elements
                .filter((el): el is DrawElement => el.type === "draw")
                .map((draw) => (
                  <path
                    key={draw.id}
                    d={renderPath(draw.points)}
                    stroke={draw.color}
                    strokeWidth={draw.width}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={draw.color.includes("ffeb3b") ? 0.5 : 1}
                  />
                ))}
              {/* Current drawing */}
              {isDrawing && currentDraw.length > 0 && (
                <path
                  d={renderPath(currentDraw)}
                  stroke={tool === "highlight" ? highlightColor : tool === "erase" ? "#ffffff" : drawColor}
                  strokeWidth={tool === "highlight" ? 20 : tool === "erase" ? 30 : drawWidth}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={tool === "highlight" ? 0.5 : 1}
                />
              )}
            </svg>

            {/* Render text elements */}
            {elements
              .filter((el): el is TextElement => el.type === "text")
              .map((text) => (
                <div
                  key={text.id}
                  className="absolute"
                  style={{
                    left: text.x,
                    top: text.y,
                    width: text.width,
                    userSelect: 'text',
                    WebkitUserSelect: 'text',
                    cursor: 'text',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedElement(text.id);
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation(); // Prevent canvas drawing when selecting text
                  }}
                >
                  <RichTextEditor
                    content={text.content}
                    onChange={(newContent) => handleTextChange(text.id, newContent)}
                    fontSize={text.style.size}
                    autoFocus={selectedElement === text.id}
                  />
                </div>
              ))}

            {/* Render image elements */}
            {elements
              .filter((el): el is ImageElement => el.type === "image")
              .map((img) => (
                <div
                  key={img.id}
                  className="absolute group"
                  style={{
                    left: img.x,
                    top: img.y,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt="Uploaded"
                    style={{
                      width: img.width,
                      height: img.height,
                    }}
                    className="rounded shadow-sm"
                  />
                  <button
                    onClick={() => deleteElement(img.id)}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
