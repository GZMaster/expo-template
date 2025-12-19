/**
 * Profile Screen
 *
 * User profile screen displaying user information.
 */

import {
  Avatar,
  AvatarFallbackText,
  Box,
  Card,
  Heading,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { ScrollView } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useAppNavigation } from '@/navigation';
import type { AppTabScreenProps } from '@/navigation/types';

type Props = AppTabScreenProps<'Profile'>;

export function ProfileScreen(_props: Props) {
  const { user } = useAuth();
  const _navigation = useAppNavigation();

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user?.email
      ? user.email[0].toUpperCase()
      : 'U';

  return (
    <ScrollView>
      <Box flex={1} p='$4' bg='$background'>
        <VStack space='lg'>
          <VStack space='sm' alignItems='center'>
            <Avatar size='xl' bg='$primary500'>
              <AvatarFallbackText>{initials}</AvatarFallbackText>
            </Avatar>
            <Heading size='xl'>{user?.name || 'User'}</Heading>
            <Text size='md' color='$textLight500'>
              {user?.email || 'No email'}
            </Text>
          </VStack>

          <Card p='$4' bg='$backgroundLight0' borderRadius='$lg'>
            <VStack space='md'>
              <Heading size='lg'>Profile Information</Heading>
              <VStack space='sm'>
                <HStack justifyContent='space-between' py='$2'>
                  <Text color='$textLight500'>Name:</Text>
                  <Text fontWeight='$semibold'>{user?.name || 'Not set'}</Text>
                </HStack>
                <HStack justifyContent='space-between' py='$2'>
                  <Text color='$textLight500'>Email:</Text>
                  <Text fontWeight='$semibold'>{user?.email || 'Not set'}</Text>
                </HStack>
                <HStack justifyContent='space-between' py='$2'>
                  <Text color='$textLight500'>User ID:</Text>
                  <Text fontWeight='$semibold'>{user?.id || 'Not set'}</Text>
                </HStack>
              </VStack>
            </VStack>
          </Card>

          <Card p='$4' bg='$backgroundLight0' borderRadius='$lg'>
            <VStack space='md'>
              <Heading size='lg'>Actions</Heading>
              <Text color='$textLight500'>
                Navigate to Settings to manage your account preferences.
              </Text>
            </VStack>
          </Card>
        </VStack>
      </Box>
    </ScrollView>
  );
}
