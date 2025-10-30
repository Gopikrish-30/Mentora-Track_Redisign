# Read Mode Feature 📖

## Overview
The Read Mode feature provides a distraction-free, fullscreen reading experience for learners. It hides all UI elements except the lesson content, allowing users to focus entirely on their learning material.

## Features

### 🎯 Fullscreen Experience
- Takes over the entire browser window (100vw x 100vh)
- Removes all sidebars, panels, and navigation elements
- Only displays the lesson content in a centered, optimized layout

### 🎨 Clean Interface
- Minimal top header with essential controls
- Centered content (max-width: 5xl) for optimal reading
- Generous padding for comfortable reading
- Smooth fade-in animation when entering read mode

### 🌓 Theme Support
- Maintains dark/light theme preference in read mode
- Quick theme toggle button in the header
- Optimized background colors for both themes

### ⌨️ Keyboard Shortcuts
- **ESC** - Exit read mode instantly
- Easy access to exit without scrolling

### 🎛️ Multiple Entry Points
1. **Header Button** - "Read Mode" button in the top navigation bar
2. **Floating Action Button** - Blue floating button in bottom-right corner
   - Always visible while scrolling
   - Expands to show "Read Mode" label on hover
   - Eye icon for quick recognition

## User Experience

### Entering Read Mode
Users can activate read mode by:
1. Clicking the "Read Mode" button in the header (next to Share)
2. Clicking the floating blue button with the eye icon (bottom-right)

### In Read Mode
- Clean, distraction-free environment
- Content is centered and optimized for reading
- Sticky header with:
  - Green pulse indicator showing "Read Mode Active"
  - ESC hint reminder
  - Theme toggle button
  - Exit button

### Exiting Read Mode
Users can exit by:
1. Clicking the "Exit" button in the header
2. Clicking the X icon in the header
3. Pressing the ESC key on keyboard

## Technical Implementation

### State Management
```typescript
const [readMode, setReadMode] = useState(false)
```

### Fullscreen Styling
```css
position: fixed
inset: 0
z-index: 9999
width: 100vw
height: 100vh
```

### Escape Key Handler
```typescript
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && readMode) {
      setReadMode(false)
    }
  }
  window.addEventListener('keydown', handleEscape)
  return () => window.removeEventListener('keydown', handleEscape)
}, [readMode])
```

## Benefits

1. **Enhanced Focus** - Removes all distractions for better concentration
2. **Better Reading Experience** - Optimized typography and spacing
3. **Flexibility** - Easy to enter and exit as needed
4. **Accessibility** - Keyboard shortcut support
5. **Responsive** - Works on all screen sizes

## Future Enhancements

Potential improvements:
- Font size controls
- Reading progress indicator
- Auto-scroll feature
- Reading time estimate
- Bookmark current position
- Background color customization
- Font family selection
- Line height adjustment

## Usage Tips

- Use read mode for long-form content and detailed lessons
- Toggle dark mode in read mode for night reading
- Use ESC key for quick exit when multitasking
- Floating button stays accessible while scrolling through content
