# Authentication Components

Components for user authentication including sign-up and login flows with dark theme design and hexagonal branding.

## Components

### `SignUpPage.tsx`
Complete sign-up page with hexagonal background pattern, logo, and form.

**Usage:**
```tsx
import { SignUpPage } from '@/components/auth'

export default function Page() {
  return <SignUpPage />
}
```

**Features:**
- Hexagonal background pattern (subtle, 5% opacity)
- Gradient background overlay
- Centered layout with logo
- Title and description text
- Sign-up form with decorative borders
- "Back to Home page" footer link

### `SignUpForm.tsx`
Sign-up form component with validation and decorative borders.

**Props:**
- `onSubmit` (function, optional): Form submission handler

**Features:**
- Decorative golden corner borders
- First name / Last name inputs (side by side)
- Email address input with icon
- Password input with show/hide toggle
- Password visibility toggle (Eye icon)
- Terms and privacy policy checkbox
- "Create a new account" button
- "Already have an account? Login" link
- Form validation (required fields, min password length)

**Form Fields:**
- First name (required, text)
- Last name (required, text)
- Email address (required, email format)
- Password (required, min 8 characters)
- Terms agreement (required, checkbox)

**Icons:**
- User icon for name fields
- Mail icon for email field
- Lock icon for password field
- Eye/EyeOff for password visibility toggle

**Example:**
```tsx
<SignUpForm
  onSubmit={(data) => {
    console.log('First Name:', data.firstName)
    console.log('Last Name:', data.lastName)
    console.log('Email:', data.email)
    console.log('Password:', data.password)
  }}
/>
```

## Page Structure

The Sign Up page includes:

1. **Hexagonal Background**: SVG pattern with subtle opacity
2. **Background Gradient**: Dark gradient overlay
3. **Logo**: Three golden hexagons at the top
4. **Header Section**:
   - Title: "Create a new account"
   - Description text
5. **Form Container**: Centered card with golden corner decorations
6. **Form Fields**: Name, email, password inputs
7. **Footer Link**: "Back to Home page"

## Viewing the Page

Visit: **http://localhost:3000/auth/signup**

## Styling

Key design elements:
- **Background**: Dark gradient (black to neutral-900)
- **Pattern**: Hexagonal SVG pattern with 5% opacity
- **Form Border**: Neutral-800 with golden corner accents
- **Accent Color**: #C9A96E (golden)
- **Text Colors**: White for titles, neutral-400 for body text
- **Input Styles**: Dark backgrounds with neutral-700 borders
- **Focus States**: Golden border on focus (#C9A96E)

## Form Validation

The form includes:
- HTML5 validation for required fields
- Email format validation
- Password minimum length (8 characters)
- Terms checkbox required before submission
- Disabled submit button until terms are accepted

## Password Field

Features:
- Masked input by default
- Show/hide toggle button with Eye/EyeOff icons
- Minimum 8 characters validation
- Placeholder text with character hint

## Navigation

Links included:
- **Login**: For existing users → `/auth/login`
- **Terms**: Terms of service → `/terms`
- **Privacy Policy**: Privacy policy → `/privacy`
- **Home**: Back to homepage → `/`

## Integration

This is a standalone sign-up page that can be:
- Used for initial account creation
- Integrated with authentication APIs
- Connected to password setup flow
- Linked from login page and marketing pages

## Differences from Register Page

This sign-up form is simpler than `/auth/register`:
- **Sign Up**: Basic info (name, email, password) - initial account creation
- **Register**: Comprehensive profile (social media, availability, projects, etc.) - full profile setup

The sign-up page is typically the first step, followed by the more detailed registration process.

---

### `LoginPage.tsx`
Complete login page with hexagonal background pattern, logo, and form.

**Usage:**
```tsx
import { LoginPage } from '@/components/auth'

export default function Page() {
  return <LoginPage />
}
```

**Features:**
- Hexagonal background pattern (subtle, 5% opacity)
- Gradient background overlay
- Centered layout with logo
- "Welcome back!" title and description text
- Login form with decorative borders
- "Back to Home page" footer link

### `LoginForm.tsx`
Login form component with validation, error handling, and decorative borders.

**Props:**
- `onSubmit` (function, optional): Form submission handler - receives `{ email, password, rememberMe }`
- `loading` (boolean, optional): Shows loading state on submit button
- `error` (string, optional): Displays error message above form fields

**Features:**
- Decorative golden corner borders
- Email address input with icon
- Password input with show/hide toggle
- Password visibility toggle (Eye icon)
- "Remember me" checkbox
- "Forgot password?" link
- "Log in" button with loading state
- "Don't have an account? Sign up" link
- Form validation (required fields, min password length)
- Error message display with dark theme styling

**Form Fields:**
- Email address (required, email format)
- Password (required, min 8 characters)
- Remember me (optional, checkbox)

**Icons:**
- Mail icon for email field
- Lock icon for password field
- Eye/EyeOff for password visibility toggle

**Example:**
```tsx
<LoginForm
  onSubmit={(data) => {
    console.log('Email:', data.email)
    console.log('Password:', data.password)
    console.log('Remember Me:', data.rememberMe)
  }}
  loading={false}
  error=""
/>
```

**Integration with NextAuth:**
The login page at `/auth/login` integrates with NextAuth for authentication:
```tsx
const handleSubmit = async (data) => {
  const result = await signIn('credentials', {
    email: data.email,
    password: data.password,
    redirect: false,
  })

  if (result?.ok) {
    router.push('/')
  }
}
```

## Viewing the Pages

- **Sign Up**: http://localhost:3000/auth/signup
- **Login**: http://localhost:3000/auth/login

## Shared Design Elements

Both auth pages share:
- **Background**: Dark gradient (black to neutral-900)
- **Pattern**: Hexagonal SVG pattern with 5% opacity
- **Logo**: Three golden hexagons (#C9A96E)
- **Form Border**: Neutral-800 with golden corner accents
- **Accent Color**: #C9A96E (golden)
- **Text Colors**: White for titles, neutral-400 for body text
- **Input Styles**: Dark backgrounds with neutral-700 borders
- **Focus States**: Golden border on focus (#C9A96E)

## Form Validation

Both forms include:
- HTML5 validation for required fields
- Email format validation
- Password minimum length (8 characters)
- Disabled states and loading indicators

## Password Field

Both forms feature:
- Masked input by default
- Show/hide toggle button with Eye/EyeOff icons
- Minimum 8 characters validation
- Placeholder text with character hint

## Navigation

Links included across auth pages:
- **Login** → `/auth/login` (from Sign Up)
- **Sign Up** → `/auth/signup` (from Login)
- **Forgot Password** → `/auth/forgot-password` (from Login)
- **Terms** → `/terms` (from Sign Up)
- **Privacy Policy** → `/privacy` (from Sign Up)
- **Home** → `/` (from both pages)
