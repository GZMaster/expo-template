/**
 * Gluestack UI Demo Screen
 * 
 * This screen demonstrates basic Gluestack UI components including:
 * - Box: Container component for layout
 * - Text: Typography component
 * - Button: Interactive button with variants
 * - VStack: Vertical stack layout
 * - HStack: Horizontal stack layout
 * 
 * All components automatically support light and dark modes.
 */

import { ScrollView } from 'react-native';
import {
  Box,
  Text,
  Button,
  ButtonText,
  VStack,
  HStack,
  Heading,
  Divider,
} from '@gluestack-ui/themed';

export default function GluestackDemoScreen() {
  return (
    <ScrollView>
      <Box flex={1} p="$4" bg="$background">
        <VStack space="lg">
          {/* Header Section */}
          <Box>
            <Heading size="xl" mb="$2">
              Gluestack UI Demo
            </Heading>
            <Text size="md" color="$textLight500">
              This screen demonstrates basic Gluestack UI components with light and dark mode support.
            </Text>
          </Box>

          <Divider />

          {/* Box Component Demo */}
          <Box>
            <Heading size="lg" mb="$3">
              Box Component
            </Heading>
            <Box
              p="$4"
              bg="$primary100"
              borderRadius="$md"
              borderWidth={1}
              borderColor="$primary300">
              <Text>
                This is a Box component with padding, background color, border radius, and border.
                Box is the fundamental layout component in Gluestack UI.
              </Text>
            </Box>
          </Box>

          {/* Text Component Demo */}
          <Box>
            <Heading size="lg" mb="$3">
              Text Component
            </Heading>
            <VStack space="sm">
              <Text size="xs">Extra Small Text</Text>
              <Text size="sm">Small Text</Text>
              <Text size="md">Medium Text (default)</Text>
              <Text size="lg">Large Text</Text>
              <Text size="xl">Extra Large Text</Text>
              <Text size="2xl" bold>
                Bold 2XL Text
              </Text>
            </VStack>
          </Box>

          {/* VStack Component Demo */}
          <Box>
            <Heading size="lg" mb="$3">
              VStack (Vertical Stack)
            </Heading>
            <VStack space="md" p="$4" bg="$gray100" borderRadius="$md">
              <Box p="$2" bg="$white" borderRadius="$sm">
                <Text>Item 1</Text>
              </Box>
              <Box p="$2" bg="$white" borderRadius="$sm">
                <Text>Item 2</Text>
              </Box>
              <Box p="$2" bg="$white" borderRadius="$sm">
                <Text>Item 3</Text>
              </Box>
            </VStack>
          </Box>

          {/* HStack Component Demo */}
          <Box>
            <Heading size="lg" mb="$3">
              HStack (Horizontal Stack)
            </Heading>
            <HStack space="md" p="$4" bg="$gray100" borderRadius="$md">
              <Box flex={1} p="$2" bg="$white" borderRadius="$sm" alignItems="center">
                <Text>Left</Text>
              </Box>
              <Box flex={1} p="$2" bg="$white" borderRadius="$sm" alignItems="center">
                <Text>Center</Text>
              </Box>
              <Box flex={1} p="$2" bg="$white" borderRadius="$sm" alignItems="center">
                <Text>Right</Text>
              </Box>
            </HStack>
          </Box>

          {/* Button Component Demo */}
          <Box>
            <Heading size="lg" mb="$3">
              Button Component
            </Heading>
            <VStack space="md">
              <Button>
                <ButtonText>Primary Button</ButtonText>
              </Button>

              <Button variant="outline">
                <ButtonText>Outline Button</ButtonText>
              </Button>

              <Button variant="link">
                <ButtonText>Link Button</ButtonText>
              </Button>

              <HStack space="sm">
                <Button flex={1} size="sm">
                  <ButtonText>Small</ButtonText>
                </Button>
                <Button flex={1} size="md">
                  <ButtonText>Medium</ButtonText>
                </Button>
                <Button flex={1} size="lg">
                  <ButtonText>Large</ButtonText>
                </Button>
              </HStack>

              <Button isDisabled>
                <ButtonText>Disabled Button</ButtonText>
              </Button>
            </VStack>
          </Box>

          {/* Combined Example */}
          <Box>
            <Heading size="lg" mb="$3">
              Combined Example
            </Heading>
            <Box p="$4" bg="$primary50" borderRadius="$lg" borderWidth={1} borderColor="$primary200">
              <VStack space="md">
                <Text size="lg" bold>
                  Welcome to Gluestack UI
                </Text>
                <Text>
                  This example combines multiple Gluestack UI components to create a cohesive layout.
                  All components automatically adapt to light and dark mode.
                </Text>
                <HStack space="sm" mt="$2">
                  <Button flex={1}>
                    <ButtonText>Get Started</ButtonText>
                  </Button>
                  <Button flex={1} variant="outline">
                    <ButtonText>Learn More</ButtonText>
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </Box>
        </VStack>
      </Box>
    </ScrollView>
  );
}

