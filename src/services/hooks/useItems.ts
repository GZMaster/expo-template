/**
 * Example Resource Hooks (Items)
 *
 * React Query hooks for item resource operations.
 * This serves as an example implementation that can be adapted
 * for other resources in your application.
 *
 * Demonstrates:
 * - Query hooks for fetching data
 * - Mutation hooks for create, update, delete
 * - Optimistic updates
 * - Cache invalidation strategies
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import { apiEndpoints } from '../endpoints';
import { queryKeys } from '../queryKeys';
import type {
  CreateItemRequest,
  Item,
  ItemListResponse,
  ItemResponse,
  UpdateItemRequest,
} from '../types';

/**
 * Get items list query hook
 *
 * @param filters - Optional filters for the query (page, limit, search)
 * @param enabled - Whether the query should run (default: true)
 *
 * @example
 * ```tsx
 * function ItemsScreen() {
 *   const { data, isLoading, error } = useGetItems({ page: 1, limit: 10 });
 *
 *   if (isLoading) return <Loading />;
 *   if (error) return <Error />;
 *
 *   return (
 *     <FlatList
 *       data={data?.data}
 *       renderItem={({ item }) => <ItemCard item={item} />}
 *     />
 *   );
 * }
 * ```
 */
export function useGetItems(
  filters?: { page?: number; limit?: number; search?: string },
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: queryKeys.items.list(filters),
    queryFn: async (): Promise<ItemListResponse> => {
      const response = await apiClient.get<ItemListResponse>(apiEndpoints.items.list(filters));
      return response.data;
    },
    enabled,
    staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes
  });
}

/**
 * Get single item query hook
 *
 * @param itemId - The ID of the item to fetch
 * @param enabled - Whether the query should run (default: true)
 *
 * @example
 * ```tsx
 * function ItemDetailScreen({ itemId }: { itemId: string }) {
 *   const { data: item, isLoading } = useGetItem(itemId);
 *
 *   if (isLoading) return <Loading />;
 *
 *   return (
 *     <View>
 *       <Text>{item?.title}</Text>
 *       <Text>{item?.description}</Text>
 *     </View>
 *   );
 * }
 * ```
 */
export function useGetItem(itemId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.items.detail(itemId),
    queryFn: async (): Promise<Item> => {
      const response = await apiClient.get<ItemResponse>(apiEndpoints.items.byId(itemId));
      return response.data.data;
    },
    enabled: enabled && !!itemId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Create item mutation hook
 *
 * @example
 * ```tsx
 * function CreateItemScreen() {
 *   const { mutate: createItem, isPending } = useCreateItem();
 *   const [title, setTitle] = useState('');
 *
 *   const handleCreate = () => {
 *     createItem(
 *       { title, description: 'New item' },
 *       {
 *         onSuccess: () => {
 *           // Navigate back or show success message
 *         }
 *       }
 *     );
 *   };
 *
 *   return <Button onPress={handleCreate}>Create</Button>;
 * }
 * ```
 */
export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateItemRequest): Promise<Item> => {
      const response = await apiClient.post<ItemResponse>(apiEndpoints.items.create(), data);
      return response.data.data;
    },
    onSuccess: (newItem) => {
      // Invalidate items list to refetch with new item
      queryClient.invalidateQueries({ queryKey: queryKeys.items.lists() });

      // Optionally, add the new item to the cache optimistically
      // This is useful if you want to show it immediately in a list
      queryClient.setQueryData<ItemListResponse>(queryKeys.items.list(), (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: [newItem, ...oldData.data],
          pagination: {
            ...oldData.pagination,
            total: oldData.pagination.total + 1,
          },
        };
      });
    },
    onError: (error) => {
      console.error('[useCreateItem] Create failed:', error);
    },
  });
}

/**
 * Update item mutation hook
 * Uses optimistic updates for better UX
 *
 * @example
 * ```tsx
 * function EditItemScreen({ itemId }: { itemId: string }) {
 *   const { mutate: updateItem, isPending } = useUpdateItem();
 *   const [title, setTitle] = useState('');
 *
 *   const handleUpdate = () => {
 *     updateItem(
 *       { id: itemId, data: { title } },
 *       {
 *         onSuccess: () => {
 *           // Show success message
 *         }
 *       }
 *     );
 *   };
 *
 *   return <Button onPress={handleUpdate}>Update</Button>;
 * }
 * ```
 */
export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateItemRequest }): Promise<Item> => {
      const response = await apiClient.put<ItemResponse>(apiEndpoints.items.update(id), data);
      return response.data.data;
    },
    // Optimistic update - update UI immediately, rollback on error
    onMutate: async ({ id, data }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.items.detail(id) });

      // Snapshot the previous value
      const previousItem = queryClient.getQueryData<Item>(queryKeys.items.detail(id));

      // Optimistically update to the new value
      if (previousItem) {
        queryClient.setQueryData<Item>(queryKeys.items.detail(id), {
          ...previousItem,
          ...data,
          updatedAt: new Date().toISOString(),
        });
      }

      // Return context with the snapshotted value
      return { previousItem };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (error, variables, context) => {
      if (context?.previousItem) {
        queryClient.setQueryData(queryKeys.items.detail(variables.id), context.previousItem);
      }
      console.error('[useUpdateItem] Update failed:', error);
    },
    // Always refetch after error or success to ensure consistency
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.items.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.items.lists() });
    },
  });
}

/**
 * Delete item mutation hook
 *
 * @example
 * ```tsx
 * function ItemCard({ item }: { item: Item }) {
 *   const { mutate: deleteItem, isPending } = useDeleteItem();
 *
 *   const handleDelete = () => {
 *     deleteItem(item.id, {
 *       onSuccess: () => {
 *         // Show success message
 *       }
 *     });
 *   };
 *
 *   return <Button onPress={handleDelete}>Delete</Button>;
 * }
 * ```
 */
export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string): Promise<void> => {
      await apiClient.delete(apiEndpoints.items.delete(itemId));
    },
    onSuccess: (_, itemId) => {
      // Remove item from cache
      queryClient.removeQueries({ queryKey: queryKeys.items.detail(itemId) });

      // Invalidate items list to refetch without deleted item
      queryClient.invalidateQueries({ queryKey: queryKeys.items.lists() });

      // Optionally, optimistically remove from list cache
      queryClient.setQueryData<ItemListResponse>(queryKeys.items.list(), (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((item) => item.id !== itemId),
          pagination: {
            ...oldData.pagination,
            total: oldData.pagination.total - 1,
          },
        };
      });
    },
    onError: (error) => {
      console.error('[useDeleteItem] Delete failed:', error);
    },
  });
}
