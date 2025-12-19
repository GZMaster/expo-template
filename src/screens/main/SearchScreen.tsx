/**
 * Search Screen
 *
 * Search functionality screen.
 * Placeholder for search implementation.
 */

import { Box, Heading, Input, InputField, Text, VStack } from '@gluestack-ui/themed';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import type { AppTabScreenProps } from '@/navigation/types';

type Props = AppTabScreenProps<'Search'>;

export function SearchScreen(_props: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView>
      <Box flex={1} style={{ padding: 16, backgroundColor: 'background' }}>
        <VStack style={{ gap: 16 }}>
          <VStack style={{ gap: 8 }}>
            <Heading style={{ fontSize: 24 }}>Search</Heading>
            <Text style={{ fontSize: 16, color: 'text-light-500' }}>
              Search for content, users, or anything else.
            </Text>
          </VStack>

          <Input>
            <InputField
              placeholder='Search...'
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize='none'
            />
          </Input>

          {searchQuery ? (
            <Box style={{ padding: 16, backgroundColor: 'background-light-0', borderRadius: 16 }}>
              <Text style={{ fontSize: 16, color: 'text-light-500' }}>
                Search results for "{searchQuery}" will appear here.
              </Text>
            </Box>
          ) : (
            <Box style={{ padding: 16, backgroundColor: 'background-light-0', borderRadius: 16 }}>
              <Text color='$textLight500' textAlign='center'>
                Enter a search query to get started.
              </Text>
            </Box>
          )}
        </VStack>
      </Box>
    </ScrollView>
  );
}
