# Open Call Components

Components for the Open Call page that displays active calls for submissions, contributions, and participation.

## Components

### `OpenCall.tsx`
Main Open Call page component that integrates all sections.

**Usage:**
```tsx
import { OpenCall } from '@/components/opencall'

export default function Page() {
  return <OpenCall />
}
```

### `PageHeader.tsx`
Header section with title, description, and optional contribute button.

**Props:**
- `title` (string, required): Page title
- `description` (string, required): Page description
- `showButton` (boolean, optional): Show contribute button, defaults to false
- `buttonText` (string, optional): Button text, defaults to "Contribute"
- `onButtonClick` (function, optional): Button click handler

**Example:**
```tsx
<PageHeader
  title="Open Call"
  description="Submit your work to our latest call for submissions"
  showButton={true}
  onButtonClick={() => console.log('Contribute clicked')}
/>
```

### `CallCard.tsx`
Individual call submission card with hexagonal icon image.

**Props:**
- `title` (string, required): Call title
- `creator` (string, required): Creator name
- `timeline` (string, required): Timeline (e.g., "16 days")
- `description` (string, required): Call description
- `buttonText` (string, optional): Button text, defaults to "Join now!"
- `imageUrl` (string, optional): Hexagonal icon image URL
- `onJoin` (function, optional): Join button click handler

**Features:**
- Hexagonal image icon at top
- Creator avatar with initial
- Timeline with clock icon
- Description with line clamp
- Join button

**Example:**
```tsx
<CallCard
  title="Summer Photography Contest"
  creator="John Doe"
  timeline="30 days"
  description="Share your best summer moments..."
  imageUrl="/path/to/image.jpg"
  onJoin={() => console.log('Joined!')}
/>
```

### `SearchInput.tsx`
Search input field for filtering content.

**Props:**
- `placeholder` (string, optional): Placeholder text, defaults to "Search content..."
- `onSearch` (function, optional): Search handler, receives search value

**Example:**
```tsx
<SearchInput
  placeholder="Search calls..."
  onSearch={(value) => console.log('Searching for:', value)}
/>
```

### `FilterTabs.tsx`
Content type filters and sorting options.

**Props:**
- `onFilterChange` (function, optional): Filter change handler
- `onSortChange` (function, optional): Sort change handler

**Features:**
- Content type filters (Show all, Articles, Videos, Audio, Slides)
- Active state highlighting
- Sort by dropdown
- Additional filters button

**Example:**
```tsx
<FilterTabs
  onFilterChange={(filter) => console.log('Filter:', filter)}
  onSortChange={(sort) => console.log('Sort:', sort)}
/>
```

## Page Structure

The Open Call page includes:

1. **Navbar** - Top navigation (reused from homepage)
2. **Page Header** - Title and description
3. **Search & Filters** - Search input and filter tabs
4. **Cards Grid** - 3-column grid of call cards
5. **Share Your Story** - Call-to-action section (reused from homepage)
6. **Footer** - Site footer (reused from homepage)

## Viewing the Page

Visit: **http://localhost:3000/open-call**

## Customization

### Updating Call Data

Edit the `callsData` array in `OpenCall.tsx`:

```tsx
const callsData = [
  {
    id: 1,
    title: 'Your Call Title',
    creator: 'Creator Name',
    timeline: '30 days',
    description: 'Your call description...',
  },
  // ... more calls
]
```

Or fetch from an API:

```tsx
const [calls, setCalls] = useState([])

useEffect(() => {
  fetch('/api/open-calls')
    .then(res => res.json())
    .then(data => setCalls(data))
}, [])
```

### Grid Layout

The card grid is responsive:
- **Desktop (lg+)**: 3 columns
- **Tablet (md)**: 2 columns
- **Mobile**: 1 column

Adjust in `OpenCall.tsx`:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

## Responsive Design

All components are fully responsive with:
- Flexible layouts that adapt to screen size
- Mobile-friendly navigation
- Touch-optimized buttons
- Readable text at all sizes

## Integration with Homepage

The Open Call page reuses these homepage components:
- `Navbar` - Site navigation
- `ShareStory` - Call-to-action section
- `Footer` - Site footer

This ensures consistency across the site.
