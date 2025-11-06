# Trip Components

Components for the Trip/Adventure booking page that displays trip details, journey timeline, and booking functionality.

## Components

### `TripPage.tsx`
Main Trip page component that integrates all sections.

**Props:**
- `heroImageUrl` (string, optional): Hero banner image URL
- `title` (string, required): Trip title
- `tags` (string[], optional): Trip tags (e.g., "AVAILABLE", "Museums")
- `fromLocation` (string, required): Starting location
- `toLocation` (string, required): Destination location
- `date` (string, required): Trip date
- `duration` (string, required): Trip duration (e.g., "4 nights, 3 days")
- `groupSize` (string, required): Group size (e.g., "6-12 people")
- `languages` (string, required): Languages spoken (e.g., "English, Arabic")
- `price` (number, required): Trip price in dollars
- `aboutText` (string, required): Trip description
- `highlights` (string[], required): Array of trip highlights
- `routeStops` (array, required): Array of journey stops with details

**Usage:**
```tsx
import { TripPage } from '@/components/trip'

export default function Page() {
  return (
    <TripPage
      title="Amazing Swiss Adventure"
      fromLocation="Interlaken, Swiss"
      toLocation="Zermatt, Swiss"
      date="August 15, 2025"
      duration="4 nights, 3 days"
      groupSize="6-12 people"
      languages="English, Arabic"
      price={850}
      aboutText="Description here..."
      highlights={['Highlight 1', 'Highlight 2']}
      routeStops={[...]}
    />
  )
}
```

### `TripHero.tsx`
Hero section with dramatic background image, title, tags, and route.

**Props:**
- `imageUrl` (string, optional): Hero image URL
- `title` (string, required): Trip title
- `tags` (string[], optional): Trip tags
- `fromLocation` (string, required): Starting location
- `toLocation` (string, required): Destination location

**Features:**
- Full-width hero image (360px height)
- Dark overlay for text readability
- Tags displayed as badges
- Route display with arrow

**Example:**
```tsx
<TripHero
  imageUrl="https://example.com/hero.jpg"
  title="Swiss Mountain Adventure"
  tags={['AVAILABLE', 'Museums']}
  fromLocation="Interlaken, Swiss"
  toLocation="Zermatt, Swiss"
/>
```

### `TripInfoCard.tsx`
Information card displaying trip stats (date, duration, group size, languages).

**Props:**
- `date` (string, required): Trip date
- `duration` (string, required): Trip duration
- `groupSize` (string, required): Group size
- `languages` (string, required): Languages

**Features:**
- 4-column grid layout (responsive)
- Icons for each stat (Calendar, Clock, Users, Globe)
- Semi-transparent background with border
- Golden accent color for icons

**Example:**
```tsx
<TripInfoCard
  date="August 15, 2025"
  duration="4 nights, 3 days"
  groupSize="6-12 people"
  languages="English, Arabic"
/>
```

### `BookingForm.tsx`
Sticky booking form with price display and input fields.

**Props:**
- `price` (number, required): Trip price
- `onSubmit` (function, optional): Form submission handler

**Features:**
- Sticky positioning (stays visible on scroll)
- Full name and email inputs (required)
- Optional additional message textarea
- Price display
- "Book Now" button with golden color
- Terms and conditions text

**Form Fields:**
- Full Name (required)
- Email Address (required)
- Additional message (optional, textarea)

**Example:**
```tsx
<BookingForm
  price={850}
  onSubmit={(data) => console.log('Booking submitted:', data)}
/>
```

### `RouteStop.tsx`
Individual stop/milestone on the journey timeline.

**Props:**
- `number` (number, required): Stop number
- `title` (string, required): Stop title
- `date` (string, required): Stop date
- `time` (string, required): Stop time
- `description` (string, required): Stop description
- `location` (string, optional): GPS coordinates or location name
- `imageUrl` (string, optional): Stop image URL
- `isLast` (boolean, optional): Whether this is the last stop, defaults to false

**Features:**
- Numbered circle indicator
- Vertical line connecting stops (except for last stop)
- Date and time display with icons
- Description text
- Optional image display
- GPS coordinates/location display
- Responsive layout

**Example:**
```tsx
<RouteStop
  number={1}
  title="Journey schedule title"
  date="Month 00, 1234"
  time="00:00 PM"
  description="Lorem ipsum dolor sit amet..."
  location="Lat: 46.6863, Lng: 7.8632"
  imageUrl="https://example.com/image.jpg"
  isLast={false}
/>
```

## Page Structure

The Trip page includes:

1. **Navbar** - Top navigation (reused from homepage)
2. **Hero Section** - Large hero image with title, tags, and route
3. **Two-Column Layout**:
   - **Left Column (2/3 width)**:
     - Trip info card (date, duration, group size, languages)
     - About this trip section
     - Trip highlights with checkmarks
     - Tab controls (Trip timeline / Route map)
     - Journey timeline with route stops
   - **Right Column (1/3 width)**:
     - Sticky booking form
4. **Share Your Story** - Call-to-action section (reused from homepage)
5. **Footer** - Site footer (reused from homepage)

## Viewing the Page

Visit: **http://localhost:3000/trip**

## Customization

### Updating Trip Data

Edit the props passed to `TripPage` in your page component:

```tsx
<TripPage
  title="Your Trip Title"
  fromLocation="Start Location"
  toLocation="End Location"
  date="Date String"
  duration="Duration String"
  groupSize="Size String"
  languages="Languages String"
  price={850}
  aboutText="Your trip description..."
  highlights={[
    'Highlight 1',
    'Highlight 2',
    'Highlight 3'
  ]}
  routeStops={[
    {
      id: 1,
      title: 'Stop Title',
      date: 'Date',
      time: 'Time',
      description: 'Description',
      location: 'Location',
      imageUrl: 'Image URL'
    }
  ]}
/>
```

Or fetch from an API:

```tsx
const [tripData, setTripData] = useState(null)

useEffect(() => {
  fetch('/api/trips/123')
    .then(res => res.json())
    .then(data => setTripData(data))
}, [])

return tripData && <TripPage {...tripData} />
```

### Tab Controls

The page includes tabs for switching between:
- **Trip timeline**: Displays journey stops with details
- **Route map**: Placeholder for map view (to be implemented)

Toggle functionality is built-in with state management.

### Sticky Booking Form

The booking form uses `sticky top-24` positioning to remain visible as users scroll through trip details.

## Responsive Design

All components are fully responsive:
- **Desktop**: Two-column layout (trip details + booking form)
- **Tablet**: Adjusted spacing, form moves below content
- **Mobile**: Single column stacked layout
- Trip info card: 4 columns → 2 columns → 1 column
- All text and spacing scales appropriately

## Integration with Other Pages

The Trip page reuses these components:
- `Navbar` - Site navigation (from homepage)
- `ShareStory` - Call-to-action section (from homepage)
- `Footer` - Site footer (from homepage)

This ensures consistency across the site.

## Styling

Key design elements:
- **Background**: Gradient from black to neutral-900
- **Accent Color**: #C9A96E (golden)
- **Border Color**: #737373 (neutral-700)
- **Text Colors**: White for titles, neutral-400 for body text
- **Fonts**: IBM Plex Sans for headings, Inter for body text
- **Form Styles**: Dark inputs with golden focus borders
- **Icons**: Lucide React icons throughout

## Features

- **Hero Image**: Dramatic full-width hero with overlay
- **Quick Stats**: At-a-glance trip information
- **Highlights**: Two-column grid with checkmark icons
- **Journey Timeline**: Numbered stops with vertical line connector
- **Sticky Booking**: Form stays visible during scroll
- **Tab Navigation**: Switch between timeline and map views
- **Responsive Forms**: All inputs optimized for mobile
