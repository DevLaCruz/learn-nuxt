import type { Product } from '~~/shared/types/product';

export const useAdminProduct = async (id: string) => {
  const { data, error, status, execute, refresh, pending } = await useFetch<Product>(
    `/api/admin/product/${id}`
  );

  const createOrUpdate = async (productData: Partial<Product>, files?: File[]) => {
    const isCreating = productData.id === 0;
    const formData = new FormData();

    // Attach json data string and any uploaded files
    formData.append('data', JSON.stringify(productData));
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append('files', file);
      });
    }

    if (isCreating) {
      const response = await $fetch<{ message: string; product: Product }>('/api/admin/product', {
        method: 'POST',
        body: formData,
      });

      return response.product;
    }

    if (!isCreating) {
      try {
        const response = await $fetch<{ message: string; product: Product }>(`/api/admin/product/${id}`, {
          method: 'PATCH',
          body: formData,
        });

        return response.product;
      } catch (error) {
        throw createError({
          status: 400,
          message: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    throw createError({
      status: 501,
      message: 'Product creation is not implemented yet',
    });
  };

  return {
    data,
    error,
    status,
    execute,
    pending,

    // Methods
    createOrUpdate,
    refresh,
  };
};
