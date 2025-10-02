# Background Animation Component

## Overview
A modern, canvas-based particle animation system for portfolio websites. Features interactive particles, gradient waves, and smooth animations.

## Features
- **Canvas-based particles** with mouse interaction
- **Gradient wave effects** for depth
- **Responsive design** that adapts to all screen sizes
- **Performance optimized** with automatic particle count adjustment
- **Accessibility friendly** with reduced motion support
- **Mobile optimized** with reduced complexity on smaller screens

## Usage

### Basic Implementation
```jsx
import BackgroundAnimation from './components/BackgroundAnimation';

function App() {
  return (
    <div className="app">
      <BackgroundAnimation />
      {/* Your content here */}
    </div>
  );
}
```

### Styling
The component includes its own CSS file (`BackgroundAnimation.css`) with:
- Canvas positioning and styling
- Gradient overlays
- Wave animations
- Responsive breakpoints
- Accessibility features

## Customization

### Particle Count
The component automatically adjusts particle count based on screen size:
- Desktop: Up to 100 particles
- Mobile: Reduced count for performance

### Colors
Default colors can be modified in the Particle class:
```javascript
this.color = Math.random() > 0.5 ? '#06b6d4' : '#a78bfa';
```

### Animation Speed
Adjust animation speeds in the CSS:
```css
@keyframes gradientShift {
  /* Change duration for different speeds */
  animation: gradientShift 20s ease infinite;
}
```

## Performance Features
- **Hardware acceleration** with `will-change` and `transform3d`
- **Automatic cleanup** of event listeners and animation frames
- **Responsive particle count** based on screen size
- **Reduced motion support** for accessibility
- **Mobile optimizations** with fewer elements

## Browser Support
- Modern browsers with Canvas API support
- ES6+ JavaScript features
- CSS Grid and Flexbox
- CSS Custom Properties (CSS Variables)

## File Structure
```
src/components/
├── BackgroundAnimation.jsx    # Main component
├── BackgroundAnimation.css    # Styling and animations
└── README.md                  # This documentation
```
