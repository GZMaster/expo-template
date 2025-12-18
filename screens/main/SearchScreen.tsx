/**
 * Search Screen
 * 
 * Search functionality screen.
 * Placeholder for search implementation.
 */

import type { AppTabScreenProps } from '@/navigation/types';
import { Box, Heading, Input, InputField, Text, VStack } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';

type Props = AppTabScreenProps<'Search'>;

export function SearchScreen({ }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView>
      <Box flex={1} p="$4" bg="$background">
        <VStack space="lg">
          <VStack space="sm">
            <Heading size="2xl">Search</Heading>
            <Text size="md" color="$textLight500">
              Search for content, users, or anything else.
            </Text>
          </VStack>

          <Input>
            <InputField
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
            />
          </Input>

          {searchQuery ? (
            <Box p="$4" bg="$backgroundLight0" borderRadius="$lg">
              <Text color="$textLight500">
                Search results for "{searchQuery}" will appear here.
              </Text>
            </Box>
          ) : (
            <Box p="$4" bg="$backgroundLight0" borderRadius="$lg">
              <Text color="$textLight500" textAlign="center">
                Enter a search query to get started.
              </Text>
            </Box>
          )}
        </VStack>
      </Box>
    </ScrollView>
  );
}
