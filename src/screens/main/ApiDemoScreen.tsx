/**
 * API Demo Screen
 *
 * Example screen demonstrating the usage of API hooks.
 * Shows how to use queries, mutations, loading states, error handling,
 * and cache invalidation.
 */

import {
  Box,
  Button,
  ButtonText,
  Card,
  Heading,
  HStack,
  Input,
  InputField,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useState } from 'react';
import { Alert } from 'react-native';
import {
  EmptyList,
  ErrorFallback,
  LoadingSpinner,
  RefreshableFlatList,
  useToast,
} from '@/components/feedback';
import { useAppNavigation } from '@/navigation';
import type { AppTabScreenProps } from '@/navigation/types';
import { formatErrorMessage } from '@/services/errors';
import { useCreateItem, useDeleteItem, useGetItems, useUpdateItem } from '@/services/hooks';
import type { Item } from '@/services/types';

type Props = AppTabScreenProps<'Home'>;

/**
 * Item Card Component
 * Displays a single item with edit and delete actions
 */
function ItemCard({ item }: { item: Item }) {
  const toast = useToast();
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
              toast.success('Item deleted successfully');
            },
            onError: (error) => {
              toast.error(formatErrorMessage(error));
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
          toast.success('Item updated successfully');
        },
        onError: (error) => {
          toast.error(formatErrorMessage(error));
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
      <Card style={{ padding: 16 }}>
        <VStack style={{ gap: 8 }}>
          <Input>
            <InputField placeholder='Title' value={title} onChangeText={setTitle} />
          </Input>
          <Input>
            <InputField
              placeholder='Description'
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </Input>
          <HStack style={{ gap: 8 }}>
            <Button flex={1} onPress={handleUpdate} isDisabled={isUpdating || !title.trim()}>
              <ButtonText>{isUpdating ? 'Saving...' : 'Save'}</ButtonText>
            </Button>
            <Button flex={1} style={{ borderWidth: 1, borderColor: 'gray' }} onPress={handleCancel}>
              <ButtonText>Cancel</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Card>
    );
  }

  return (
    <Card style={{ padding: 16 }}>
      <VStack style={{ gap: 8 }}>
        <HStack justifyContent='space-between' alignItems='flex-start'>
          <VStack flex={1} style={{ gap: 4 }}>
            <Heading style={{ fontSize: 16 }}>{item.title}</Heading>
            {item.description && (
              <Text style={{ fontSize: 12, color: 'text-light-500' }}>{item.description}</Text>
            )}
            <Text style={{ fontSize: 12, color: 'text-light-400' }}>
              Created: {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </VStack>
        </HStack>
        <HStack style={{ gap: 8 }}>
          <Button
            flex={1}
            style={{ borderWidth: 1, borderColor: 'gray' }}
            onPress={() => setIsEditing(true)}
            isDisabled={isDeleting || isUpdating}
          >
            <ButtonText>Edit</ButtonText>
          </Button>
          <Button
            flex={1}
            style={{ borderWidth: 1, borderColor: 'gray' }}
            onPress={handleDelete}
            isDisabled={isDeleting || isUpdating}
          >
            <ButtonText color='$error600'>{isDeleting ? 'Deleting...' : 'Delete'}</ButtonText>
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
  const toast = useToast();
  const { mutate: createItem, isPending } = useCreateItem();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function handleCreate() {
    if (!title.trim()) {
      toast.warning('Title is required');
      return;
    }

    createItem(
      { title: title.trim(), description: description.trim() || undefined },
      {
        onSuccess: () => {
          setTitle('');
          setDescription('');
          toast.success('Item created successfully');
        },
        onError: (error) => {
          toast.error(formatErrorMessage(error));
        },
      },
    );
  }

  return (
    <Card style={{ padding: 16, marginBottom: 16, backgroundColor: 'background' }}>
      <VStack style={{ gap: 8 }}>
        <Heading style={{ fontSize: 16 }}>Create New Item</Heading>
        <VStack style={{ gap: 4 }}>
          <Input>
            <InputField placeholder='Title' value={title} onChangeText={setTitle} />
          </Input>
          <Input>
            <InputField
              placeholder='Description (optional)'
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
export function ApiDemoScreen(_props: Props) {
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
    return <LoadingSpinner message='Loading items...' />;
  }

  if (isError) {
    return <ErrorFallback error={error as Error} onReset={() => refetch()} />;
  }

  const items = itemsData?.data || [];

  return (
    <Box flex={1} style={{ backgroundColor: 'background' }}>
      <RefreshableFlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} />}
        ListHeaderComponent={<CreateItemForm />}
        ListEmptyComponent={
          <EmptyList
            title='No items yet'
            description='Create your first item using the form above'
          />
        }
        contentContainerStyle={{ padding: 16 }}
        onRefresh={refetch}
        refreshing={isRefetching}
      />
    </Box>
  );
}
