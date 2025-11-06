# Join Collective Components

Components for the Join Collective multi-step flow where users can apply to become members of the collective.

## Pages

### Step 1: Basic Information (`/join`)
User provides personal information, experience, and social media links.

### Step 2: Availability Selection (`/join/step-2`)
User selects availability frequency (Weekly/Monthly) and specifies their schedule.

## Components

### `JoinCollective.tsx`
Main Join Collective page component (Step 1) that integrates all sections.

**Usage:**
```tsx
import { JoinCollective } from '@/components/join'

export default function Page() {
  return <JoinCollective />
}
```

### `JoinStep2.tsx`
Step 2 of Join Collective flow for availability selection.

**Usage:**
```tsx
import { JoinStep2 } from '@/components/join'

export default function Page() {
  return <JoinStep2 />
}
```

### `InfoSection.tsx`
Information section displaying the title, description, info items, and footer text.

**Props:**
- `title` (string, required): Section title
- `description` (string, required): Section description
- `items` (array, required): Array of info items with title and description
- `footerText` (string, optional): Additional footer text

**Example:**
```tsx
<InfoSection
  title="Join Collective"
  description="Lorem ipsum dolor sit amet..."
  items={[
    {
      title: 'Item Title',
      description: 'Item description...'
    }
  ]}
  footerText="Additional information..."
/>
```

### `AvailabilityForm.tsx`
Availability selection form for Step 2 with frequency selection and interactive calendar.

**Props:**
- `onSubmit` (function, optional): Form submission handler

**Features:**
- Decorative golden corner borders
- Frequency selection cards:
  - Weekly (with Calendar icon)
  - Monthly (with BarChart3 icon)
- Interactive calendar component
- "Join the collective team" button
- "Go Back" link to previous step

**Example:**
```tsx
<AvailabilityForm
  onSubmit={(data) => {
    console.log('Frequency:', data.frequency)
    console.log('Selected Dates:', data.selectedDates)
    console.log('Time Slots:', data.timeSlots)
  }}
/>
```

### `AvailabilityCalendar.tsx`
Interactive calendar component for selecting availability dates and time slots.

**Props:**
- `frequency` ('weekly' | 'monthly', required): Display mode
- `onSelectionChange` (function, optional): Called when dates or time slots change

**Features:**
- **Monthly View**: Full month calendar grid
- **Weekly View**: Single week display
- **Date Selection**: Click dates to toggle selection
- **Time Slot Selection**: Select specific time slots for each date
- **Navigation**: Previous/Next month or week navigation
- **Visual Feedback**:
  - Selected dates highlighted in golden (#C9A96E)
  - Current date has golden ring
  - Shows count of selected time slots per date
- **Time Slots**: 10 available slots from 9:00 AM to 6:00 PM
- **Multi-date Support**: Select multiple dates with different time slots

**Example:**
```tsx
<AvailabilityCalendar
  frequency="weekly"
  onSelectionChange={(dates, timeSlots) => {
    console.log('Selected dates:', dates)
    console.log('Time slots by date:', timeSlots)
  }}
/>
```

**Time Slots Available:**
- 09:00 AM, 10:00 AM, 11:00 AM, 12:00 PM
- 01:00 PM, 02:00 PM, 03:00 PM, 04:00 PM
- 05:00 PM, 06:00 PM

### `JoinForm.tsx`
Comprehensive membership application form with decorative borders (Step 1).

**Props:**
- `onSubmit` (function, optional): Form submission handler

**Features:**
- Decorative golden corner borders
- First name / Last name inputs (row layout)
- Email address input
- Phone number input with helper text
- Experience field dropdown
- Trace (Optional) multi-select dropdown
- "Tell us about yourself" textarea
- Social media accounts section with:
  - Facebook input
  - X / Twitter input
  - Instagram input
  - LinkedIn input
  - "Add any other links" button
  - Dynamic "Add new link" input field
- Terms and privacy policy checkbox
- Continue button
- "Go back to Home page" link

**Form Fields:**
- **First name** (text input)
- **Last name** (text input)
- **Email address** (email input)
- **Phone number** (tel input) - with country code helper text
- **Experience field** (dropdown)
- **Trace** (multi-select dropdown, optional)
- **Tell us about yourself** (textarea)
- **Social media accounts** (optional):
  - Facebook URL
  - X / Twitter URL
  - Instagram URL
  - LinkedIn URL
  - Additional custom links
- **Terms agreement** (checkbox)

**Example:**
```tsx
<JoinForm
  onSubmit={(data) => console.log('Form submitted:', data)}
/>
```

## Page Structure

The Join Collective page includes:

1. **Navbar** - Top navigation (reused from homepage)
2. **Two-Column Layout**:
   - **Left Column**: Information section with title, description, info items, and footer text
   - **Right Column**: Comprehensive application form with decorative borders
3. **Footer** - Site footer (reused from homepage)

## Viewing the Pages

- **Step 1 (Basic Info)**: **http://localhost:3000/join**
- **Step 2 (Availability)**: **http://localhost:3000/join/step-2**

## Customization

### Updating Info Items

Edit the `infoItems` array in `JoinCollective.tsx`:

```tsx
const infoItems = [
  {
    title: 'Your Title',
    description: 'Your description...'
  },
  {
    title: 'Another Title',
    description: 'Another description...'
  }
]
```

### Form Customization

Customize form fields in `JoinForm.tsx`:
- Add/remove input fields
- Modify dropdown options (Experience field, Trace)
- Change social media platforms
- Adjust validation rules
- Customize helper text

### Social Media Links

The form includes pre-defined social media inputs:
- Facebook
- X / Twitter
- Instagram
- LinkedIn

Users can also add custom links using the "Add any other links" button.

## Responsive Design

All components are fully responsive:
- **Desktop**: Two-column layout (info + form side by side)
- **Tablet/Mobile**: Single column stacked layout
- Form layout adapts: 2-column name fields → 1-column on mobile
- All inputs optimized for touch
- Text scales appropriately

## Integration with Homepage

The Join Collective page reuses these homepage components:
- `Navbar` - Site navigation
- `Footer` - Site footer

This ensures consistency across the site.

## Styling

Key design elements:
- **Background**: Gradient from black to neutral-900
- **Form Border**: Neutral-800 with golden corner accents
- **Accent Color**: #C9A96E (golden)
- **Text Colors**: White for titles, neutral-400 for body text
- **Input Styles**: Dark backgrounds with neutral-700 borders
- **Focus States**: Golden border on focus (#C9A96E)
- **Fonts**: IBM Plex Sans for headings, system fonts for body

## Form Features

### Dynamic Link Addition

Users can add multiple custom links:
1. Click "Add any other links" button
2. Input field appears
3. Press Enter or click + icon to save
4. Repeat for multiple links

### Helper Text

Key helper texts included:
- **Phone number**: "Don't forget to write the phone number with your country code"
- **Trace**: "Select as many project as you wish"

### Decorative Borders

Form features golden corner borders (6px × 6px) at all four corners, matching the design system used in other form components (Submission Form, Support Section).

## Form Validation

The form includes basic HTML5 validation:
- Required fields: First name, Last name, Email
- Email format validation
- Phone number format (tel input)
- Checkbox required for terms agreement

Additional custom validation can be added in the `onSubmit` handler.

## Accessibility

- All form inputs have associated labels
- Semantic HTML elements used throughout
- Focus states clearly visible
- Helper text properly associated with inputs
- Keyboard navigation supported

## Multi-Step Flow

The Join Collective process is divided into two steps:

### Step 1: Basic Information (`/join`)
Users provide:
- Personal details (name, email, phone)
- Professional information (experience field)
- Project interests (trace selection)
- About themselves (textarea)
- Social media links (optional)

After completing, users click "Continue" to proceed to Step 2.

### Step 2: Availability Selection (`/join/step-2`)
Users specify:
- Availability frequency (Weekly or Monthly)
- Availability schedule (calendar/schedule component)

After completing, users click "Join the collective team" to submit the full application.

Users can navigate back to Step 1 using the "Go Back" link.

## Calendar Features

The `AvailabilityCalendar` component provides a full-featured availability selection system:

### How It Works

1. **Select Frequency**: Choose between Weekly or Monthly view
2. **Pick Dates**: Click on calendar dates to select/deselect them
3. **Choose Time Slots**: After selecting dates, click on a date to see time slot options
4. **Configure Times**: Select specific time slots (e.g., 9:00 AM, 2:00 PM) for each date
5. **Submit**: All selected dates and time slots are included in the form submission

### User Experience

- **Visual Indicators**:
  - Selected dates: Golden background
  - Current date: Golden ring
  - Slot count badge: Shows number of time slots per date
- **Easy Navigation**: Previous/Next buttons for month or week
- **Multi-selection**: Select multiple dates with different time slots
- **Flexible**: Works for both weekly and monthly scheduling needs
