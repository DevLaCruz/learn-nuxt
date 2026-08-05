<script setup lang="ts">
import { ref, computed, h, resolveComponent } from 'vue';
import type { TableColumn } from '@nuxt/ui';
import type { Product } from '~~/shared/types/product';
import { formatCurrency } from '~~/shared/utils/format-currency';
import { dayMonthYearFormat } from '~~/shared/utils/date-formats';

const UBadge = resolveComponent('UBadge');
const UButton = resolveComponent('UButton');
const NuxtLink = resolveComponent('NuxtLink');

const toast = useToast();

const page = ref(1);
const limit = ref(10);

const { data: response, pending, refresh, deleteProduct } = useAdminProducts(page, limit);

const products = computed(() => response.value?.data || []);
const total = computed(() => response.value?.meta?.total || 0);

const handleDelete = async (id: number, name: string) => {
  if (!confirm(`¿Estás seguro de que deseas eliminar el producto "${name}"?`)) {
    return;
  }

  try {
    await deleteProduct(id);
    toast.add({
      title: 'Producto eliminado',
      description: `El producto "${name}" fue eliminado correctamente (soft delete).`,
      color: 'success',
    });
  } catch (error: any) {
    toast.add({
      title: 'Error al eliminar',
      description: error?.message || 'No se pudo eliminar el producto.',
      color: 'error',
    });
  }
};

const columns: TableColumn<Product>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => `#${row.getValue('id')}`,
  },
  // Image
  {
    accessorKey: 'images',
    header: 'Imagen',
    cell: ({ row }) => {
      const images = row.getValue('images') as string[];
      const url = Array.isArray(images) && images.length > 0 ? images[0] : '';

      if (!url)
        return h(
          'span',
          {
            class: 'text-gray-400 text-xs',
          },
          'Sin imagen'
        );

      return h('img', {
        src: url,
        alt: 'Imagen del producto',
        style:
          'width: 40px; height: 40px; object-fit: cover; border-radius: 0.375rem;',
      });
    },
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      const productName = row.getValue('name') as string;
      const productId = row.getValue('id') as number;

      return h(
        NuxtLink,
        {
          to: `/dashboard/product/${productId}`,
          class: 'text-indigo-600 dark:text-indigo-400 hover:underline font-medium cursor-pointer',
        },
        () => productName
      );
    },
  },
  {
    accessorKey: 'description',
    header: 'Descripción',
    cell: ({ row }) => {
      const desc = String(row.getValue('description') || '');
      return h(
        'div',
        {
          class: 'max-w-xs truncate text-gray-500 dark:text-gray-400',
          title: desc,
        },
        desc.length > 40 ? desc.slice(0, 40) + '...' : desc
      );
    },
  },
  {
    accessorKey: 'price',
    header: 'Precio',
    cell: ({ row }) => formatCurrency(Number(row.getValue('price'))),
  },
  {
    accessorKey: 'tags',
    header: 'Etiquetas',
    cell: ({ row }) => {
      const tags = row.getValue('tags') as string[];
      if (!Array.isArray(tags) || tags.length === 0) return '-';
      return h(
        'div',
        { class: 'flex flex-wrap gap-1' },
        tags.map((tag) =>
          h(
            UBadge,
            {
              size: 'xs',
              color: 'primary',
              variant: 'subtle',
              class: 'mr-0.5',
            },
            () => tag
          )
        )
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Creado',
    cell: ({ row }) => {
      const value = row.getValue('createdAt');
      return value ? dayMonthYearFormat(new Date(value as string)) : '-';
    },
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const productId = row.getValue('id') as number;
      const productName = row.getValue('name') as string;

      return h(
        'div',
        { class: 'flex items-center gap-1' },
        [
          h(UButton, {
            icon: 'i-lucide-edit',
            size: 'xs',
            color: 'neutral',
            variant: 'ghost',
            to: `/dashboard/product/${productId}`,
            title: 'Editar producto',
          }),
          h(UButton, {
            icon: 'i-lucide-trash-2',
            size: 'xs',
            color: 'error',
            variant: 'ghost',
            onClick: () => handleDelete(productId, productName),
            title: 'Eliminar producto',
          }),
        ]
      );
    },
  },
];
</script>

<template>
  <div class="space-y-6">
    <!-- Header with Action Button -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Productos
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Gestiona y organiza tu catálogo de productos
        </p>
      </div>
      <UButton
        to="/dashboard/product/0"
        icon="i-lucide-plus"
        label="Agregar Producto"
        color="primary"
        size="lg"
      />
    </div>

    <!-- Nuxt UI v3 Table -->
    <UCard class="overflow-hidden">
      <UTable
        :data="products"
        :columns="columns"
        :loading="pending"
        class="flex-1"
      />

      <template #footer v-if="total > limit">
        <div class="flex justify-end p-2">
          <UPagination
            v-model="page"
            :page-count="limit"
            :total="total"
          />
        </div>
      </template>
    </UCard>
  </div>
</template>