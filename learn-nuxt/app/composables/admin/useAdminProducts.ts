import type { Product } from '~~/shared/types/product';
import type { Ref } from 'vue';
export const useAdminProducts = (page: Ref<number>, limit: Ref<number>) => {
  const { data, error, status, refresh, pending } = useFetch<{
    data: Product[];
    meta: { total: number; page: number; limit: number; totalPages: number };
  }>('/api/admin/product', {
    query: {
      page,
      limit,
    },
    watch: [page, limit],
  });

  const deleteProduct = async (id: number) => {
    const response = await $fetch<{ message: string; product: Product }>(`/api/admin/product/${id}`, {
      method: 'DELETE',
    });
    await refresh();
    return response;
  };

  return {
    data,
    error,
    status,
    refresh,
    pending,
    deleteProduct,
  };
};
