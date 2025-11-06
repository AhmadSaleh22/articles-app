# Collection Components

Components for the Collection page that displays historical content organized in timeline sections.

## Components

### `Collection.tsx`
Main Collection page component that integrates all sections.

**Props:**
- `title` (string, optional): Collection title, defaults to "Collection name"
- `description` (string, optional): Collection description
- `bannerImageUrl` (string, optional): Hero banner image URL

**Usage:**
```tsx
import { Collection } from '@/components/collection'

export default function Page() {
  return (
    <Collection
      title="Collection name"
      description="Description text here..."
      bannerImageUrl="https://example.com/banner.jpg"
    />
  )
}
```

### `HeroBanner.tsx`
Large hero banner image displayed at the top of the collection page.

**Props:**
- `imageUrl` (string, optional): Banner image URL

**Features:**
- Full-width banner with rounded corners
- 320px height
- Fallback gradient background if no image provided

**Example:**
```tsx
<HeroBanner imageUrl="https://example.com/banner.jpg" />
```

### `TimelineSection.tsx`
Collapsible timeline section with decorative corner borders.

**Props:**
- `title` (string, required): Section title (e.g., "Explore the past")
- `fromDate` (string, required): Start date for the timeline
- `toDate` (string, required): End date for the timeline
- `items` (array, required): Array of timeline items
- `defaultExpanded` (boolean, optional): Whether section is expanded by default, defaults to false
- `showMoreLabel` (string, optional): Label for "show more" button, defaults to "Show more"
- `totalCount` (number, optional): Total number of items (for pagination display)

**Features:**
- Collapsible sections with chevron indicator
- Decorative corner borders matching design system
- Date range display with calendar icons
- Vertical timeline line connecting items
- Show more functionality with item count
- Smooth expand/collapse animation

**Example:**
```tsx
<TimelineSection
  title="Explore the current"
  fromDate="1940"
  toDate="1950"
  defaultExpanded={true}
  items={[
    {
      id: 1,
      date: 'November 2, 1944',
      title: 'Historical Event',
      description: 'Event description...',
      imageUrl: 'https://example.com/image.jpg'
    }
  ]}
  totalCount={10}
/>
```

### `TimelineCard.tsx`
Individual content card with hexagonal image for timeline items.

**Props:**
- `date` (string, required): Event date
- `title` (string, required): Event title
- `description` (string, required): Event description
- `imageUrl` (string, optional): Card image URL
- `onClick` (function, optional): Click handler

**Features:**
- Calendar icon indicator
- Hexagonal image with clip-path
- Title with IBM Plex Sans font
- Two-line description clamp
- Hover state with background highlight

**Example:**
```tsx
<TimelineCard
  date="November 2, 1944"
  title="Assassination of Lord Moyne"
  description="Zionist militants of the Lehi group assassinate British Minister..."
  imageUrl="https://example.com/image.jpg"
  onClick={() => console.log('Card clicked')}
/>
```

## Page Structure

The Collection page includes:

1. **Navbar** - Top navigation (reused from homepage)
2. **Hero Banner** - Large banner image
3. **Breadcrumb & Header** - Collection title, description, and contribute button
4. **Search & Filters** - Search input and filter tabs (reused from Open Call page)
5. **Timeline Sections** - Collapsible sections with historical content
   - Explore the past (collapsed by default)
   - Explore the current (expanded by default with sample items)
   - Explore the future (collapsed by default)
6. **Share Your Story** - Call-to-action section (reused from homepage)
7. **Footer** - Site footer (reused from homepage)

## Viewing the Page

Visit: **http://localhost:3000/collection**

## Customization

### Updating Timeline Data

Edit the `timelineData` array in `Collection.tsx`:

```tsx
const timelineData = [
  {
    id: 'past',
    title: 'Explore the past',
    fromDate: '1900',
    toDate: '1940',
    defaultExpanded: false,
    items: [
      {
        id: 1,
        date: 'May 15, 1920',
        title: 'Your Event Title',
        description: 'Your event description...',
        imageUrl: 'https://example.com/image.jpg'
      }
    ],
    totalCount: 20
  }
]
```

Or fetch from an API:

```tsx
const [timelineData, setTimelineData] = useState([])

useEffect(() => {
  fetch('/api/collections/123/timeline')
    .then(res => res.json())
    .then(data => setTimelineData(data))
}, [])
```

### Hexagonal Images

Timeline card images use CSS clip-path for hexagonal masking:
```css
clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
```

Size: 120px × 128px

### Timeline Section Styling

Sections feature decorative corner borders:
- 6px × 6px corner elements
- Border color: neutral-800
- Top and bottom corners for visual consistency

## Responsive Design

All components are fully responsive:
- **Desktop**: Full-width layout with proper spacing
- **Tablet**: Adjusted padding and font sizes
- **Mobile**: Stacked layouts, full-width cards
- Collapsible sections work on all screen sizes

## Integration with Other Pages

The Collection page reuses these components:
- `Navbar` - Site navigation (from homepage)
- `SearchInput` - Search field (from Open Call page)
- `FilterTabs` - Content filters (from Open Call page)
- `ShareStory` - Call-to-action section (from homepage)
- `Footer` - Site footer (from homepage)

This ensures consistency across the site.

## Styling

Key design elements:
- **Background**: Gradient from black to neutral-900
- **Accent Color**: #C9A96E (golden)
- **Border Color**: #333333 (neutral-800)
- **Text Colors**: White for titles, neutral-400/500 for secondary text
- **Fonts**: IBM Plex Sans for headings, Inter for body text
- **Animations**: Smooth transitions for hover states and expand/collapse
