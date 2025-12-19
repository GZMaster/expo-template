# Form Components

Comprehensive form validation system using React Hook Form and Zod, integrated with Gluestack UI components.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Components](#components)
- [Validation Schemas](#validation-schemas)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)
- [Common Patterns](#common-patterns)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)

## Overview

This form system provides:

- **Type-safe validation** with Zod schemas
- **Seamless integration** with React Hook Form
- **Gluestack UI components** for consistent styling
- **Reusable form components** for all input types
- **Automatic error handling** and display
- **Accessibility** built-in
- **Toast notifications** integration

## Installation

The required packages are already installed:

```bash
npm install react-hook-form @hookform/resolvers zod
```

## Quick Start

### 1. Create a Zod schema

```typescript
import { z } from 'zod';
import { emailSchema, passwordSchema } from '@/schemas';

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
```

### 2. Use in your screen

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/forms';
import { loginSchema, type LoginFormData } from '@/schemas';

function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  async function onSubmit(data: LoginFormData) {
    // Handle form submission
    console.log(data);
  }

  return (
    <View>
      <FormInput
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your email"
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        required
      />

      <FormInput
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        error={errors.password}
        secureTextEntry
        required
      />

      <Button onPress={handleSubmit(onSubmit)} isDisabled={isSubmitting}>
        <ButtonText>Login</ButtonText>
      </Button>
    </View>
  );
}
```

## Components

### FormInput

Text input component for single-line text, email, password, etc.

```typescript
<FormInput
  control={control}
  name="email"
  label="Email Address"
  placeholder="Enter your email"
  error={errors.email}
  keyboardType="email-address"
  autoCapitalize="none"
  required
/>
```

**Props:**
- `control` - React Hook Form control object
- `name` - Field name (must match schema)
- `label` - Field label (optional)
- `placeholder` - Input placeholder
- `error` - Error object from formState.errors
- `required` - Show required indicator
- `disabled` - Disable input
- `secureTextEntry` - Hide text (for passwords)
- `keyboardType` - Keyboard type
- `autoCapitalize` - Auto-capitalization
- `autoComplete` - Auto-complete type
- `maxLength` - Maximum character length
- `returnKeyType` - Return key type
- `onSubmitEditing` - Callback on submit

### FormTextarea

Multi-line text input component.

```typescript
<FormTextarea
  control={control}
  name="message"
  label="Message"
  placeholder="Enter your message"
  error={errors.message}
  numberOfLines={4}
  maxLength={500}
  required
/>
```

**Props:**
- Same as FormInput, plus:
- `numberOfLines` - Number of visible lines

### FormSelect

Dropdown/picker component.

```typescript
<FormSelect
  control={control}
  name="country"
  label="Country"
  placeholder="Select your country"
  error={errors.country}
  options={[
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
  ]}
  required
/>
```

**Props:**
- `options` - Array of `{ label: string, value: string | number }`

### FormCheckbox

Checkbox component for boolean values.

```typescript
<FormCheckbox
  control={control}
  name="acceptTerms"
  label="I accept the terms and conditions"
  error={errors.acceptTerms}
  required
/>
```

### FormRadio

Radio button group component.

```typescript
<FormRadio
  control={control}
  name="gender"
  label="Gender"
  error={errors.gender}
  options={[
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ]}
  required
/>
```

### FormSwitch

Toggle switch component.

```typescript
<FormSwitch
  control={control}
  name="notifications"
  label="Enable notifications"
  error={errors.notifications}
/>
```

### FormDatePicker

Date picker component (basic implementation).

```typescript
<FormDatePicker
  control={control}
  name="birthDate"
  label="Birth Date"
  placeholder="YYYY-MM-DD"
  error={errors.birthDate}
/>
```

**Note:** For production, integrate a proper date picker library like `@react-native-community/datetimepicker`.

### FormError

Standalone error message component.

```typescript
<FormError error={errors.fieldName} />
```

### FormLabel

Standalone label component.

```typescript
<FormLabel required>Email Address</FormLabel>
```

## Validation Schemas

### Common Schemas

Reusable schemas available in `@/schemas/common.schema.ts`:

- `emailSchema` - Email validation
- `passwordSchema` - Password with strength requirements (8+ chars, uppercase, lowercase, number, special char)
- `simplePasswordSchema` - Basic password (6+ chars)
- `phoneSchema` - Phone number validation
- `urlSchema` - URL validation
- `nameSchema` - Name validation (2-50 chars)
- `usernameSchema` - Username validation (alphanumeric + underscore/hyphen)
- `termsAcceptanceSchema` - Boolean that must be true
- `ageSchema` - Age validation (18-120)
- And more...

### Auth Schemas

Authentication schemas in `@/schemas/auth.schema.ts`:

- `loginSchema` - Email + password
- `signupSchema` - Full signup with password confirmation
- `simpleSignupSchema` - Basic signup with optional name
- `forgotPasswordSchema` - Email only
- `resetPasswordSchema` - Password + confirmation
- `changePasswordSchema` - Current + new password
- `emailVerificationSchema` - 6-digit code
- `twoFactorAuthSchema` - 6-digit code

### Profile Schemas

Profile schemas in `@/schemas/profile.schema.ts`:

- `editProfileSchema` - User profile fields
- `settingsSchema` - User preferences
- `contactFormSchema` - Contact form
- `feedbackFormSchema` - Feedback with rating
- `addressSchema` - Address fields
- `socialLinksSchema` - Social media URLs
- `accountDeletionSchema` - Account deletion confirmation

## Usage Examples

### Basic Form

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/forms';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
});

type FormData = z.infer<typeof schema>;

function MyForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '' },
  });

  return (
    <>
      <FormInput control={control} name="name" error={errors.name} />
      <FormInput control={control} name="email" error={errors.email} />
    </>
  );
}
```

### Form with Toast Notifications

```typescript
import { useToast } from '@/components/feedback';

function MyForm() {
  const toast = useToast();
  const { control, handleSubmit } = useForm({...});

  async function onSubmit(data) {
    try {
      await api.submit(data);
      toast.success('Form submitted successfully!');
    } catch (error) {
      toast.error('Submission failed');
    }
  }

  return <Button onPress={handleSubmit(onSubmit)}>Submit</Button>;
}
```

### Using useFormWithToast Hook

```typescript
import { useFormWithToast } from '@/hooks';

function MyForm() {
  const {
    control,
    handleSubmitWithToast,
    formState: { errors },
  } = useFormWithToast<FormData>(
    {
      resolver: zodResolver(schema),
      defaultValues: {...},
    },
    {
      successMessage: 'Form submitted successfully!',
      errorMessage: 'Failed to submit form',
    }
  );

  async function onSubmit(data) {
    await api.submit(data);
  }

  return <Button onPress={handleSubmitWithToast(onSubmit)}>Submit</Button>;
}
```

### Password Confirmation

```typescript
const schema = z.object({
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
```

### Conditional Validation

```typescript
const schema = z.object({
  hasCompany: z.boolean(),
  companyName: z.string().optional(),
}).refine(
  (data) => {
    if (data.hasCompany) {
      return data.companyName && data.companyName.length > 0;
    }
    return true;
  },
  {
    message: 'Company name is required',
    path: ['companyName'],
  }
);
```

### Array Validation

```typescript
const schema = z.object({
  tags: z.array(z.string().min(1)).min(1, 'At least one tag required'),
  items: z.array(z.object({
    name: z.string().min(1),
    quantity: z.number().min(1),
  })).min(1),
});
```

## Best Practices

### 1. Validation Mode

Use `onBlur` mode for better UX:

```typescript
useForm({
  mode: 'onBlur', // Validate when field loses focus
  reValidateMode: 'onBlur', // Re-validate on blur after first submission
});
```

### 2. Default Values

Always provide default values:

```typescript
useForm({
  defaultValues: {
    email: '',
    password: '',
    rememberMe: false,
  },
});
```

### 3. Error Handling

Always pass error prop to form components:

```typescript
<FormInput
  control={control}
  name="email"
  error={errors.email} // Important!
/>
```

### 4. Submission State

Disable submit button during submission:

```typescript
<Button
  onPress={handleSubmit(onSubmit)}
  isDisabled={isSubmitting}
>
  <ButtonText>{isSubmitting ? 'Submitting...' : 'Submit'}</ButtonText>
</Button>
```

### 5. Form Reset

Reset form after successful submission:

```typescript
async function onSubmit(data) {
  await api.submit(data);
  reset(); // Reset to default values
  // or
  reset(data); // Reset to new values (clears isDirty)
}
```

### 6. Type Safety

Use inferred types from Zod schemas:

```typescript
export const mySchema = z.object({...});
export type MyFormData = z.infer<typeof mySchema>;

const { control } = useForm<MyFormData>({...});
```

### 7. Reusable Schemas

Create reusable schema pieces:

```typescript
// common.schema.ts
export const emailSchema = z.string().email();

// auth.schema.ts
import { emailSchema } from './common.schema';
export const loginSchema = z.object({
  email: emailSchema, // Reuse!
  password: z.string().min(1),
});
```

### 8. Server Errors

Set server errors on form fields:

```typescript
try {
  await api.submit(data);
} catch (error) {
  if (error.field) {
    setError(error.field, {
      type: 'server',
      message: error.message,
    });
  }
}
```

## Common Patterns

### Multi-step Forms

```typescript
const [step, setStep] = useState(1);

function nextStep() {
  // Validate current step fields
  trigger(['step1Field1', 'step1Field2']).then((isValid) => {
    if (isValid) setStep(2);
  });
}
```

### Dynamic Fields

```typescript
const { fields, append, remove } = useFieldArray({
  control,
  name: 'items',
});

return fields.map((field, index) => (
  <FormInput
    key={field.id}
    control={control}
    name={`items.${index}.name`}
    error={errors.items?.[index]?.name}
  />
));
```

### Dependent Fields

```typescript
const watchHasCompany = watch('hasCompany');

return (
  <>
    <FormCheckbox control={control} name="hasCompany" />
    {watchHasCompany && (
      <FormInput control={control} name="companyName" />
    )}
  </>
);
```

## API Reference

### Utilities

#### `getErrorMessage(error: FieldError | undefined): string | undefined`

Extract error message from field error.

#### `hasErrors(errors: FieldErrors): boolean`

Check if form has any errors.

#### `formatValidationErrors(error: ZodError): Record<string, string>`

Format Zod errors for display.

#### `getPasswordStrength(password: string): 'weak' | 'medium' | 'strong'`

Check password strength.

## Troubleshooting

### Error: "control is undefined"

Make sure you're passing the `control` object from `useForm`:

```typescript
const { control } = useForm(); // Get control
<FormInput control={control} {...} /> // Pass it
```

### Validation not triggering

Check your validation mode:

```typescript
useForm({
  mode: 'onBlur', // or 'onChange', 'onSubmit'
});
```

### TypeScript errors with field names

Ensure field names match the schema:

```typescript
const schema = z.object({
  email: z.string(), // Field is "email"
});

<FormInput name="email" {...} /> // Name must match
```

### Form not resetting

Call `reset()` after submission:

```typescript
async function onSubmit(data) {
  await api.submit(data);
  reset(); // Reset form
}
```

### Errors not displaying

Always pass the error prop:

```typescript
<FormInput
  control={control}
  name="email"
  error={errors.email} // Don't forget this!
/>
```

## Additional Resources

- [React Hook Form Docs](https://react-hook-form.com/)
- [Zod Docs](https://zod.dev/)
- [Gluestack UI Docs](https://gluestack.io/ui/docs)

## Examples

See the following files for complete examples:

- `src/screens/auth/LoginScreen.tsx` - Basic login form
- `src/screens/auth/SignupScreen.tsx` - Signup with password confirmation
- `src/screens/auth/ForgotPasswordScreen.tsx` - Simple email form
- `src/screens/profile/EditProfileScreen.tsx` - Complex profile form
- `src/screens/examples/FormsExampleScreen.tsx` - All components showcase
