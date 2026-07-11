# Experience Images Guide

## Overview

Your experience section now supports multiple images per entry, displayed as a grid/collage layout.

## How to Add Images

### Step 1: Prepare Your Images

1. Create images for your experiences (screenshots, photos, diagrams, etc.)
2. Place them in the `assets/images/experience/` directory
3. Use descriptive filenames (e.g., `gcf-1.png`, `gcf-2.png`, `gcf-dashboard.png`)

### Step 2: Update the JOURNEY Data

In `js/main.js`, find the `JOURNEY` array and update your entries:

#### Single Image
```javascript
{
  id: 'gcf',
  lane: 3,
  kind: 'work-acid',
  label: 'Technical Business Partner · GCF',
  start: dy(2025, 7),
  end: dy(2026, 7),
  role: 'Technical Business Partner',
  company: 'Green Climate Fund (GCF) · under UNFCCC',
  location: 'Songdo, KR',
  period: 'Jul 2025 - Jul 2026',
  bullets: [
    'Led management of 18+ cross-departmental IT initiatives...',
    'End-to-end planning and execution of GCF\'s first-ever Tech & AI Exhibition...',
  ],
  tags: ['Microsoft Fabric', 'NetCDF', 'NLP', 'Next.js'],
  image: 'assets/images/experience/gcf-main.png',  // Single image
}
```

#### Multiple Images (Gallery)
```javascript
{
  id: 'gcf',
  lane: 3,
  kind: 'work-acid',
  label: 'Technical Business Partner · GCF',
  start: dy(2025, 7),
  end: dy(2026, 7),
  role: 'Technical Business Partner',
  company: 'Green Climate Fund (GCF) · under UNFCCC',
  location: 'Songdo, KR',
  period: 'Jul 2025 - Jul 2026',
  bullets: [
    'Led management of 18+ cross-departmental IT initiatives...',
    'End-to-end planning and execution of GCF\'s first-ever Tech & AI Exhibition...',
  ],
  tags: ['Microsoft Fabric', 'NetCDF', 'NLP', 'Next.js'],
  images: [  // Multiple images as array
    'assets/images/experience/gcf-dashboard.png',
    'assets/images/experience/gcf-api.png',
    'assets/images/experience/gcf-ai-exhibition.png',
    'assets/images/experience/gcf-budgeting.png',
  ],
}
```

### Step 3: Image Guidelines

- **Recommended resolution**: 1200x675 (16:9) or similar
- **Format**: PNG, JPG, or WEBP
- **File size**: Under 500KB per image for fast loading
- **Content**: Screenshots, project photos, diagrams, team photos

### Gallery Layouts

The number of images determines the layout:

- **1 image**: Full-width display
- **2 images**: Side-by-side (2 columns)
- **3 images**: First image full-width, bottom row with 2 images
- **4 images**: 2x2 grid

### Missing Images

If an image fails to load, a placeholder will appear with the filename, making it easy to identify which image is missing.

## Directory Structure Example

```
assets/
  images/
    experience/
      gym-robotics.png
      bsc-rwth.png
      ta-python.png
      ra-api.png
      oelmuehle-intranet.png
      gcf-dashboard.png
      gcf-api.png
      gcf-ai-exhibition.png
      gcf-budgeting.png
      hackseoul-2025.png
      kaist-campus.png
```

## Troubleshooting

**Images not appearing?**
- Check that the file paths in your JOURNEY array are correct
- Ensure images exist in the `assets/images/experience/` directory
- Check the browser console for 404 errors

**Text overlap?**
- The text now has improved wrapping and spacing
- On mobile, the layout automatically stacks for better readability

## Future Enhancements

Consider adding:
- Image captions for each photo
- Lightbox for enlarged views
- Lazy loading for better performance