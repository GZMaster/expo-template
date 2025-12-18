/**
 * API Demo Screen
 * 
 * Example screen demonstrating the usage of API hooks.
 * Shows how to use queries, mutations, loading states, error handling,
 * and cache invalidation.
 */

import { formatErrorMessage } from '@/api/errors';
import {
  useCreateItem,
  useDeleteItem,
  useGetItems,
  useUpdateItem,
} from '@/api/hooks';
import type { Item } from '@/api/types';
import { useAppNavigation } from '@/navigation';
import type { AppTabScreenProps } from '@/navigation/types';
import {
  Box,
  Button,
  ButtonText,
  Card,
  Heading,
  HStack,
  Input,
  InputField,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { Alert, FlatList, RefreshControl } from 'react-native';

type Props = AppTabScreenProps<'Home'>;

/**
 * Item Card Component
 * Displays a single item with edit and delete actions
 */
function ItemCard({ item }: { item: Item }) {
  const { mutate: deleteItem, isPending: isDeleting } = useDeleteItem();
  const { mutate: updateItem, isPending: isUpdating } = useUpdateItem();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description || '');

  function handleDelete() {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteItem(item.id, {
            onSuccess: () => {
              Alert.alert('Success', 'Item deleted successfully');
            },
            onError: (error) => {
              Alert.alert('Error', formatErrorMessage(error));
            },
          });
        },
      },
    ]);
  }

  function handleUpdate() {
    updateItem(
      {
        id: item.id,
        data: { title, description: description || undefined },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          Alert.alert('Success', 'Item updated successfully');
        },
        onError: (error) => {
          Alert.alert('Error', formatErrorMessage(error));
        },
      },
    );
  }

  function handleCancel() {
    setTitle(item.title);
    setDescription(item.description || '');
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <Card p="$4" bg="$backgroundLight0" borderRadius="$lg" mb="$2">
        <VStack space="md">
          <Input>
            <InputField
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
          </Input>
          <Input>
            <InputField
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </Input>
          <HStack space="sm">
            <Button
              flex={1}
              onPress={handleUpdate}
              isDisabled={isUpdating || !title.trim()}
            >
              <ButtonText>{isUpdating ? 'Saving...' : 'Save'}</ButtonText>
            </Button>
            <Button flex={1} variant="outline" onPress={handleCancel}>
              <ButtonText>Cancel</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Card>
    );
  }

  return (
    <Card p="$4" bg="$backgroundLight0" borderRadius="$lg" mb="$2">
      <VStack space="sm">
        <HStack justifyContent="space-between" alignItems="flex-start">
          <VStack flex={1} space="xs">
            <Heading size="md">{item.title}</Heading>
            {item.description && (
              <Text size="sm" color="$textLight500">
                {item.description}
              </Text>
            )}
            <Text size="xs" color="$textLight400">
              Created: {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </VStack>
        </HStack>
        <HStack space="sm">
          <Button
            flex={1}
            variant="outline"
            size="sm"
            onPress={() => setIsEditing(true)}
            isDisabled={isDeleting || isUpdating}
          >
            <ButtonText>Edit</ButtonText>
          </Button>
          <Button
            flex={1}
            variant="outline"
            size="sm"
            bg="$error50"
            borderColor="$error300"
            onPress={handleDelete}
            isDisabled={isDeleting || isUpdating}
          >
            <ButtonText color="$error600">
              {isDeleting ? 'Deleting...' : 'Delete'}
            </ButtonText>
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
}

/**
 * Create Item Form Component
 */
function CreateItemForm() {
  const { mutate: createItem, isPending } = useCreateItem();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function handleCreate() {
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }

    createItem(
      { title: title.trim(), description: description.trim() || undefined },
      {
        onSuccess: () => {
          setTitle('');
          setDescription('');
          Alert.alert('Success', 'Item created successfully');
        },
        onError: (error) => {
          Alert.alert('Error', formatErrorMessage(error));
        },
      },
    );
  }

  return (
    <Card p="$4" bg="$backgroundLight0" borderRadius="$lg" mb="$4">
      <VStack space="md">
        <Heading size="lg">Create New Item</Heading>
        <VStack space="sm">
          <Input>
            <InputField
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
          </Input>
          <Input>
            <InputField
              placeholder="Description (optional)"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </Input>
          <Button onPress={handleCreate} isDisabled={isPending || !title.trim()}>
            <ButtonText>{isPending ? 'Creating...' : 'Create Item'}</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </Card>
  );
}

/**
 * Main API Demo Screen
 */
export function ApiDemoScreen({ }: Props) {
  const navigation = useAppNavigation();
  const {
    data: itemsData,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useGetItems({ page: 1, limit: 20 });

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg="$background">
        <VStack space="md" alignItems="center">
          <Spinner size="large" />
          <Text>Loading items...</Text>
        </VStack>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box flex={1} p="$4" bg="$background" justifyContent="center">
        <Card p="$4" bg="$error50" borderRadius="$lg">
          <VStack space="md" alignItems="center">
            <Heading size="lg" color="$error600">
              Error Loading Items
            </Heading>
            <Text color="$error600" textAlign="center">
              {formatErrorMessage(error)}
            </Text>
            <Button onPress={() => refetch()}>
              <ButtonText>Retry</ButtonText>
            </Button>
            <Button variant="outline" onPress={() => navigation.goBack()}>
              <ButtonText>Go Back</ButtonText>
            </Button>
          </VStack>
        </Card>
      </Box>
    );
  }

  const items = itemsData?.data || [];

  return (
    <Box flex={1} bg="$background">
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} />}
        ListHeaderComponent={<CreateItemForm />}
        ListEmptyComponent={
          <Card p="$4" bg="$backgroundLight0" borderRadius="$lg">
            <Text textAlign="center" color="$textLight500">
              No items found. Create your first item above!
            </Text>
          </Card>
        }
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => refetch()}
          />
        }
      />
    </Box>
  );
}
