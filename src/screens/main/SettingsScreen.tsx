/**
 * Settings Screen
 *
 * Application settings and preferences screen.
 */

import { Box, Card, Heading, HStack, Switch, Text, VStack } from '@gluestack-ui/themed';
import { ScrollView } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { AppTabScreenProps } from '@/navigation/types';

type Props = AppTabScreenProps<'Settings'>;

export function SettingsScreen(_props: Props) {
  const { user, logout } = useAuth();
  const colorScheme = useColorScheme();

  async function handleLogout() {
    await logout();
    // Navigation will happen automatically via RootNavigator when isAuthenticated changes
  }

  return (
    <ScrollView>
      <Box style={{ padding: 16, backgroundColor: 'background' }}>
        <VStack style={{ gap: 16 }}>
          <VStack style={{ gap: 8 }}>
            <Heading style={{ fontSize: 24 }}>Settings</Heading>
            <Text style={{ fontSize: 16, color: 'text-light-500' }}>
              Manage your app preferences and account settings.
            </Text>
          </VStack>

          <Card style={{ padding: 16, backgroundColor: 'background-light-0', borderRadius: 16 }}>
            <VStack style={{ gap: 16 }}>
              <Heading style={{ fontSize: 16 }}>Appearance</Heading>
              <HStack
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 8,
                }}
              >
                <VStack flex={1}>
                  <Text style={{ fontWeight: 'medium' }}>Dark Mode</Text>
                  <Text style={{ fontSize: 12, color: 'text-light-500' }}>
                    Current: {colorScheme === 'dark' ? 'Dark' : 'Light'}
                  </Text>
                </VStack>
                <Switch
                  value={colorScheme === 'dark'}
                  onValueChange={() => {
                    // TODO: Implement theme toggle
                    console.log('Theme toggle not implemented yet');
                  }}
                />
              </HStack>
            </VStack>
          </Card>

          <Card style={{ padding: 16, backgroundColor: 'background-light-0', borderRadius: 16 }}>
            <VStack style={{ gap: 16 }}>
              <Heading style={{ fontSize: 16 }}>Account</Heading>
              <VStack style={{ gap: 4 }}>
                <Text style={{ fontSize: 12, color: 'text-light-500' }}>Logged in as:</Text>
                <Text style={{ fontWeight: 'semibold' }}>{user?.email || 'Unknown'}</Text>
              </VStack>
            </VStack>
          </Card>

          <Card style={{ padding: 16, backgroundColor: 'background-light-0', borderRadius: 16 }}>
            <VStack style={{ gap: 16 }}>
              <Heading style={{ fontSize: 16 }}>About</Heading>
              <VStack style={{ gap: 4 }}>
                <Text style={{ fontSize: 12, color: 'text-light-500' }}>App Version:</Text>
                <Text style={{ fontWeight: 'semibold' }}>1.0.0</Text>
              </VStack>
            </VStack>
          </Card>

          <Box
            style={{
              padding: 16,
              backgroundColor: 'error-50',
              borderRadius: 16,
              borderWidth: 1,
              borderColor: 'error-300',
            }}
          >
            <VStack style={{ gap: 8 }}>
              <Heading style={{ fontSize: 16, color: 'error-600' }}>Danger Zone</Heading>
              <Text style={{ fontSize: 12, color: 'error-600' }}>
                Log out of your account. You'll need to sign in again to access the app.
              </Text>
              <Box style={{ marginTop: 8 }}>
                <Box
                  style={{
                    backgroundColor: 'error-500',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'semibold' }}>Logout</Text>
                </Box>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </ScrollView>
  );
}
