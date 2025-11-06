# Article Components

Components for the Article Detail page that displays individual articles with submission forms and support options.

## Components

### `ArticleDetail.tsx`
Main Article Detail page component that integrates all sections.

**Props:**
- `title` (string, required): Article title
- `author` (string, required): Author name
- `date` (string, required): Publication date
- `category` (string, required): Article category
- `edition` (string, optional): Edition label
- `content` (string, required): Article content (paragraphs separated by \n\n)
- `images` (string[], optional): Array of image URLs for hexagonal display

**Usage:**
```tsx
import { ArticleDetail } from '@/components/article'

export default function Page() {
  return (
    <ArticleDetail
      title="Article Title"
      author="Author Name"
      date="May 17, 1939"
      category="Politics"
      edition="1939 Edition"
      content="Article content here..."
      images={['url1', 'url2', 'url3', 'url4']}
    />
  )
}
```

### `ArticleHeader.tsx`
Article title and metadata display.

**Props:**
- `title` (string, required): Article title
- `author` (string, required): Author name
- `date` (string, required): Publication date
- `category` (string, required): Article category
- `edition` (string, optional): Edition badge text, defaults to "Edition"

**Features:**
- Large title with IBM Plex Sans font
- Edition badge with golden color
- Author avatar with icon
- Date and category icons
- Responsive text sizing

**Example:**
```tsx
<ArticleHeader
  title="British Restrict Jewish Immigration to Palestine"
  author="Historical Archive"
  date="May 17, 1939"
  category="Politics"
  edition="1939 Edition"
/>
```

### `SubmissionForm.tsx`
Story submission form with file upload.

**Props:**
- `onSubmit` (function, optional): Form submission handler

**Features:**
- Decorative bordered container with golden corner accents
- Two-column responsive layout for name fields
- Email and phone inputs with validation
- Experience field dropdown
- "Tell us about yourself" textarea
- Country and city dropdowns
- File upload with drag-and-drop support
- File preview with remove option
- Terms and conditions checkbox
- Submit button
- "Go back to Home page" link

**Form Fields:**
- First name / Last name (row layout)
- Email address
- Phone number (with helper text)
- Experience field (dropdown)
- Tell us about yourself (textarea)
- Country / City (row layout)
- File upload (PDF, DOC, DOCX, TXT - max 10MB)
- Terms agreement checkbox

**Example:**
```tsx
<SubmissionForm
  onSubmit={(data) => console.log('Form submitted:', data)}
/>
```

### `SupportSection.tsx`
Call-to-action for supporting the article/trace.

**Props:**
- `onSupport` (function, optional): Support button click handler

**Features:**
- Decorative bordered container with golden corner accents
- Heart icon with golden fill
- Title and description text
- Support button
- Additional info text

**Example:**
```tsx
<SupportSection
  onSupport={() => console.log('Support clicked')}
/>
```

## Page Structure

The Article Detail page includes:

1. **Navbar** - Top navigation (reused from homepage)
2. **Article Header** - Title, author, date, category, edition badge
3. **Two-Column Layout**:
   - **Left Column (2/3 width)**:
     - Hexagonal images grid (up to 4 images)
     - Article content with paragraphs
   - **Right Column (1/3 width)**:
     - Submission form
     - Support section
4. **Footer** - Site footer (reused from homepage)

## Viewing the Page

Visit: **http://localhost:3000/article**

## Customization

### Updating Article Data

Edit the props passed to `ArticleDetail` in your page component:

```tsx
<ArticleDetail
  title="Your Article Title"
  author="Author Name"
  date="Date String"
  category="Category"
  edition="Edition Label"
  content="Paragraph 1\n\nParagraph 2\n\nParagraph 3"
  images={['image1.jpg', 'image2.jpg']}
/>
```

Or fetch from an API:

```tsx
const [article, setArticle] = useState(null)

useEffect(() => {
  fetch('/api/articles/123')
    .then(res => res.json())
    .then(data => setArticle(data))
}, [])

return article && <ArticleDetail {...article} />
```

### Hexagonal Images

The images are displayed in a 2-column grid with hexagonal clip-path:
- Maximum of 4 images shown
- Responsive sizing
- Maintains hexagonal shape with CSS clip-path

### Form Customization

Customize form fields in `SubmissionForm.tsx`:
- Add/remove input fields
- Modify dropdown options
- Change validation rules
- Adjust file upload settings

## Responsive Design

All components are fully responsive:
- **Desktop**: Two-column layout (article content + sidebar)
- **Tablet/Mobile**: Single column stacked layout
- Flexible form layouts
- Touch-optimized inputs
- Readable text at all sizes

## Integration with Homepage

The Article Detail page reuses these homepage components:
- `Navbar` - Site navigation
- `Footer` - Site footer

This ensures consistency across the site.

## Styling

Key design elements:
- **Background**: Gradient from black to neutral-900
- **Accent Color**: #C9A96E (golden)
- **Text Color**: White and neutral shades
- **Border Decorations**: Golden corner accents on forms
- **Fonts**: IBM Plex Sans for headings, system fonts for body
