# Mars Habitat Builder - Design Guidelines

## Design Approach
**Reference-Based Approach** drawing inspiration from:
- **Surviving Mars / Offworld Trading Company**: Clean sci-fi UI with resource management overlays
- **Kerbal Space Program**: Accessible space simulation aesthetics
- **Notion/Linear**: Modern, clean information architecture for panels
- **Space exploration visual language**: NASA imagery, Mars rover photography

**Key Design Principles**:
1. Futuristic realism: Grounded in actual Mars aesthetics with sci-fi polish
2. Information clarity: Resource data must be instantly readable
3. Tactile interactions: Drag-and-drop should feel physical and responsive
4. Educational immersion: Design reinforces the Mars environment context

---

## Core Design Elements

### A. Color Palette

**Primary Colors (Mars Theme)**:
- **Mars Surface**: 15 45% 35% (rust-red, main background)
- **Mars Dust**: 25 35% 45% (warm orange-brown, secondary surfaces)
- **Mars Sky**: 200 15% 20% (dark dusty blue, deep backgrounds)

**Accent Colors**:
- **Tech Blue**: 200 85% 55% (interactive elements, selection highlights)
- **Energy Yellow**: 45 90% 60% (power indicators, solar panels)
- **Bio Green**: 145 65% 50% (oxygen/plants, life support systems)

**UI Backgrounds**:
- **Panel Dark**: 220 20% 15% (inventory/resource panel backgrounds, semi-transparent overlays)
- **Panel Light**: 220 15% 25% (hover states, elevated surfaces)

**Semantic Colors**:
- **Success/Positive**: 145 65% 50% (resource gains)
- **Warning**: 35 85% 55% (resource warnings)
- **Critical**: 0 75% 55% (resource depletion)

### B. Typography

**Font Families** (via Google Fonts):
- **Primary**: "Orbitron" (headings, titles, futuristic sci-fi aesthetic)
- **Secondary**: "Rajdhani" (body text, UI labels, clean geometric sans)
- **Monospace**: "JetBrains Mono" (resource numbers, technical data)

**Type Scale**:
- **Title**: Orbitron, 32px/700 (game title)
- **Heading**: Orbitron, 24px/600 (section headers)
- **Subheading**: Rajdhani, 18px/600 (inventory items, tooltips)
- **Body**: Rajdhani, 16px/400 (descriptions, help text)
- **Caption**: Rajdhani, 14px/500 (resource labels)
- **Data**: JetBrains Mono, 16px/600 (resource values)

### C. Layout System

**Spacing Primitives** (Tailwind units):
- **Core units**: 2, 4, 6, 8, 12, 16 (consistent rhythm)
- **Component spacing**: p-4, p-6, p-8
- **Section gaps**: gap-4, gap-6, gap-8
- **Margins**: m-2, m-4, m-6

**Grid Structure**:
- **Main Canvas**: Full-width, variable height (Mars surface workspace)
- **Sidebar Inventory**: Fixed 320px width, right-aligned, full-height
- **Top Resource Bar**: Full-width, fixed 80px height
- **Bottom Controls**: Centered, auto-width buttons

---

## D. Component Library

### 1. Mars Canvas (Main Workspace)
- **Background**: Mars surface texture overlay with subtle noise grain
- **Grid**: Optional translucent grid overlay (1px lines, 15% opacity) for precise placement
- **Placement Zone**: Highlight with 200 85% 55% glow (10% opacity) on hover
- **Selected Item**: Blue outline (2px solid, 200 85% 55%), corner handles for rotation

### 2. Inventory Panel
- **Container**: Semi-transparent dark panel (220 20% 15% with 90% opacity)
- **Header**: "INVENTORY" in Orbitron, 24px, with glowing underline
- **Item Cards**: 
  - Grid layout (2 columns)
  - 140px × 140px cards
  - Background: 220 15% 25%
  - Border: 1px solid 220 30% 35%
  - Hover: Lift effect (translateY(-4px)), border glows 200 85% 55%
  - Icon: 64px centered, with quantity badge (bottom-right corner)
  - Label: Rajdhani 14px, centered below icon

### 3. Resource Bar
- **Container**: Glass-morphic panel at top (backdrop-blur, 220 20% 15% with 85% opacity)
- **Resource Meters**:
  - Horizontal progress bars (4 resources: Oxygen, Power, Water, Food)
  - Width: 200px each, height: 32px
  - Background: 220 30% 20%
  - Fill colors: Oxygen (145 65% 50%), Power (45 90% 60%), Water (200 85% 55%), Food (25 70% 50%)
  - Animated fill on change (0.3s ease-out)
  - Icon + value on left (JetBrains Mono)
  - Percentage bar with gradient overlay

### 4. Habitat Items (Draggable Objects)
- **Visual Treatment**: Isometric-style 2D sprites with slight depth
- **Shadow**: Drop shadow (0 4px 12px rgba(0, 0, 0, 0.4)) for elevation
- **Drag State**: Scale up (1.05), cursor: grabbing, increased shadow
- **Rotation**: 90-degree snapping with smooth transition (0.2s ease)
- **Item Types**:
  - Dome (120px × 100px, semi-transparent habitat bubble)
  - Solar Panel (80px × 60px, blue metallic finish)
  - Bed (60px × 40px, compact module)
  - Plant Pod (50px × 50px, green bio-dome)
  - Water Tank (70px × 80px, cylindrical container)

### 5. Tooltips
- **Background**: 220 20% 15% with 95% opacity, 2px border (200 85% 55%)
- **Padding**: p-4
- **Content**: 
  - Item name (Rajdhani 16px/600)
  - Resource impact (icons + values in green/red)
  - Placement hint text
- **Arrow**: CSS triangle pointing to item
- **Animation**: Fade-in (0.2s), slight translateY(-4px)

### 6. Action Buttons
- **Primary**: 
  - Background: 200 85% 55%
  - Text: White, Rajdhani 16px/600
  - Padding: px-6 py-3
  - Hover: Brightness increase, glow effect
- **Secondary (Delete/Clear)**:
  - Border: 1px solid 0 75% 55%
  - Background: Transparent
  - Text: 0 75% 55%
  - Hover: Background fill with 10% opacity
- **Icon Buttons** (Rotate, Save):
  - 40px × 40px circular
  - Background: 220 15% 25%
  - Icon: 24px from Heroicons
  - Hover: Background 220 15% 35%

### 7. Modals & Overlays
- **Welcome Screen**: Full-screen overlay on first visit
  - Centered card (max-w-2xl)
  - Tutorial text + "Start Building" CTA
- **Save Confirmation**: Toast notification, top-right corner
  - Background: 145 65% 50% (success green)
  - Slide-in animation from right
  - Auto-dismiss after 3s

---

## E. Interactions & Animations

**Drag-and-Drop**:
- Smooth cursor following (no lag)
- Semi-transparent ghost on drag (60% opacity)
- Snap-to-grid option with visual feedback

**Transitions**:
- Component hover: 0.2s ease-out
- Resource bar updates: 0.3s ease-out
- Item placement: 0.15s cubic-bezier(0.4, 0, 0.2, 1)
- Panel expansions: 0.25s ease-in-out

**Micro-interactions**:
- Button press: Scale down (0.95) on active
- Item selection: Pulse glow effect (1s infinite)
- Resource warning: Gentle shake animation when below 20%

**Sound Effects** (Web Audio API):
- Placement: Soft "thunk" (low frequency)
- Deletion: Quick "whoosh" (mid frequency)
- Button click: Subtle "beep" (high frequency)
- Resource warning: Alert tone (when critical)

---

## Images

**Mars Background**:
- Large, high-resolution Mars surface texture (2048px × 1536px minimum)
- Realistic rocky terrain with reddish-brown tones
- Placement: Full canvas background, subtle parallax scroll effect
- Overlay: Slight vignette (darker edges) and atmospheric haze

**Item Icons**:
- Use Font Awesome or Heroicons for UI controls (save, rotate, delete)
- Custom 64px × 64px PNG sprites for habitat items with transparent backgrounds
- Style: Clean, isometric-inspired, consistent line weights

This design creates a professional, immersive Mars simulation experience with clear information hierarchy and satisfying tactile interactions.