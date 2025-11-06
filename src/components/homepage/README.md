# Homepage Components

This directory contains all the components needed to build the "Trace of The Tide" homepage based on the Figma design.

## Components

### `Homepage.tsx`
The main homepage component that integrates all sections together.

**Usage:**
```tsx
import { Homepage } from '@/components/homepage'

export default function Page() {
  return <Homepage />
}
```

### `Navbar.tsx`
Responsive navigation bar with logo, navigation links, and authentication buttons.

**Features:**
- Mobile-responsive with hamburger menu
- Sticky positioning
- Backdrop blur effect
- Navigation links: Fields, Be a neighbor, Gift a trace, Trace a story
- Login/Sign up buttons

### `Hero.tsx`
Hero section with main heading and call-to-action.

**Features:**
- Responsive text sizing
- Gradient background
- "Trace The Living Archive" heading
- Descriptive text
- Call-to-action button

### `CardGrid.tsx`
Grid of content cards with honeycomb layout.

**Features:**
- Responsive layouts:
  - Desktop (lg+): Honeycomb layout with CardFillers
  - Tablet: 2-3 column grid
  - Mobile: Single column
- Uses ContentCard and CardFiller components
- Automatic filler placement for honeycomb effect
- Sample data with author, date, and descriptions
- Smooth hover interactions

### `Card.tsx`
**[DEPRECATED]** Original hexagonal card component (kept for backward compatibility).

### `ContentCard.tsx`
Modern content card component with hexagonal image masking.

**Props:**
- `title` (string, required): Card title
- `author` (string, optional): Author name
- `date` (string, optional): Date string
- `category` (string, optional): Category name
- `description` (string, optional): Card description (shown on hover)
- `imageUrl` (string, optional): Image URL for card background
- `showEdition` (boolean, optional): Show edition label, defaults to true
- `editionLabel` (string, optional): Edition label text, defaults to "Edition"
- `icon` (React.ReactNode, optional): Icon to display at top of card

**Features:**
- Hexagonal-masked image background
- Metadata display (author with avatar, date with icon, category)
- Hover state reveals description
- Edition label badge
- Optional top icon
- Smooth animations

### `CardFiller.tsx`
Hexagonal filler/spacer component for honeycomb grid layout.

**Props:**
- `state` ('Up' | 'Right' | 'Left' | 'Down', optional): Filler orientation, defaults to 'Right'

**Features:**
- Different orientations for grid spacing
- SVG-based hexagonal shapes
- Matches card design aesthetic

### `ShareStory.tsx`
Call-to-action section encouraging users to share their stories.

**Features:**
- Icon with rotated background
- Heading and description
- Call-to-action button
- Decorative background SVG

### `Footer.tsx`
Comprehensive footer with multiple columns and links.

**Features:**
- Brand information with logo
- Social media links
- Palestine section with story links
- Fields section with trail links
- Contact information
- Legal links (Privacy Policy, Terms of Service, GDPR)
- Fully responsive layout

## Viewing the Homepage

To view the homepage, navigate to:
```
/homepage
```

Or use the component directly in any page:
```tsx
import { Homepage } from '@/components/homepage'
```

## Customization

### Colors
The homepage uses a custom color palette:
- Primary: `#C9A96E` (golden)
- Dark: `#332217` (dark brown)
- Background: `#171717` (neutral-900)
- Text: `#FFFFFF` (white) and `#A3A3A3` (neutral-400)

### Fonts
- Headings: IBM Plex Sans
- Body: Inter

### Updating Card Data
Edit the `cardsData` array in `CardGrid.tsx`:
```tsx
const cardsData = [
  {
    id: 1,
    title: 'Your Card Title',
    author: 'Author Name',
    date: 'Jan 2024',
    category: 'Category Name', // optional
    description: 'Card description shown on hover',
  },
  // ... more cards
]
```

Or fetch data from an API:
```tsx
const [cards, setCards] = useState([])

useEffect(() => {
  fetch('/api/cards')
    .then(res => res.json())
    .then(data => setCards(data))
}, [])
```

Each card in the grid automatically gets:
- Image from placeholder URL (update in CardGrid.tsx)
- Icon (Layers icon by default)
- Edition label

## Responsive Breakpoints

The components use Tailwind's default breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## Notes

- All components use the `'use client'` directive as they include interactive elements
- The design is optimized for both light and dark modes (currently dark theme)
- Images in cards use placeholder URLs from Unsplash - replace with actual content
