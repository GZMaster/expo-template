# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Gluestack UI

This project includes [Gluestack UI v3](https://gluestack.io/ui/docs/home/overview/quick-start), a universal UI library for React Native that provides styled and accessible components.

### Installation

Gluestack UI v3 is already installed and configured in this project. The following dependencies are included:

- `@gluestack-ui/themed` - Core Gluestack UI components
- `react-native-reanimated` - Required for animations
- `react-native-gesture-handler` - Required for gesture handling
- `react-native-svg` - Required for icon components

### Configuration

The app is wrapped with `GluestackUIProvider` in `app/_layout.tsx`, which provides the necessary context for all Gluestack UI components. The provider is configured to automatically support light and dark modes based on the system color scheme.

Theme configuration can be customized in `theme/gluestack-theme.config.ts`.

### Usage

Import Gluestack UI components from `@gluestack-ui/themed`:

```tsx
import { Box, Text, Button, ButtonText, VStack, HStack } from '@gluestack-ui/themed';

function MyComponent() {
  return (
    <Box p="$4">
      <VStack space="md">
        <Text size="lg">Hello, Gluestack UI!</Text>
        <Button>
          <ButtonText>Click Me</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}
```

### Available Components

Gluestack UI provides a wide range of components including:

- **Layout**: `Box`, `VStack`, `HStack`, `Center`, `View`
- **Typography**: `Text`, `Heading`
- **Buttons**: `Button`, `ButtonText`
- **Forms**: `Input`, `Textarea`, `Checkbox`, `Radio`, `Switch`, `Select`
- **Feedback**: `Alert`, `Toast`, `Spinner`, `Progress`
- **Overlays**: `Modal`, `Popover`, `Actionsheet`, `AlertDialog`
- **Navigation**: `Tabs`, `Menu`
- **Data Display**: `Card`, `Avatar`, `Badge`, `Divider`
- **And many more...**

### Demo Screen

A demo screen showcasing basic Gluestack UI components is available in the app. Navigate to the "Gluestack" tab to see examples of:

- Box component with styling
- Text component with different sizes
- VStack and HStack layout components
- Button component with various variants

### Theme Customization

The theme can be customized by modifying `theme/gluestack-theme.config.ts`. Gluestack UI uses a token-based design system that supports:

- Custom colors
- Typography scales
- Spacing scales
- Border radius values
- And more

For detailed theme customization, refer to the [Gluestack UI Theme Documentation](https://gluestack.io/ui/docs/home/overview/quick-start).

### Documentation

For complete documentation and component APIs, visit:

- [Gluestack UI Documentation](https://gluestack.io/ui/docs/home/overview/quick-start)
- [Component Examples](https://gluestack.io/ui/docs/home/components)
- [GitHub Repository](https://github.com/gluestack/gluestack-ui)

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
