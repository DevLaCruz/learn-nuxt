<script setup lang="ts">
// Definición de la lista de productos
const products = ref<Product[]>([
  {
    id: '1',
    slug: 'cloud-storage-saas',
    name: 'Cloud Storage Pro',
    description: 'Servicio de almacenamiento en la nube seguro y escalable...',
    price: 100,
    images: ['https://picsum.photos/600/400?random=1', 'https://picsum.photos/600/400?random=2', 'https://picsum.photos/600/400?random=3'],
    tags: ['nube', 'almacenamiento', 'SaaS', 'seguridad'],
  },
  {
    id: '2',
    slug: 'managed-it-services',
    name: 'IT Support 24/7',
    description: 'Soporte técnico y gestión integral...',
    price: 200,
    images: ['https://picsum.photos/600/400?random=4', 'https://picsum.photos/600/400?random=5', 'https://picsum.photos/600/400?random=6'],
    tags: ['soporte', 'infraestructura', 'TI', 'empresa'],
  },
  {
    id: '3',
    slug: 'cybersecurity-suite',
    name: 'CyberSecurity Suite',
    description: 'Solución completa de ciberseguridad...',
    price: 300,
    images: ['https://picsum.photos/600/400?random=7', 'https://picsum.photos/600/400?random=8', 'https://picsum.photos/600/400?random=9'],
    tags: ['ciberseguridad', 'firewall', 'protección', 'vulnerabilidad'],
  },
  {
    id: '4',
    slug: 'ai-chatbot-platform',
    name: 'Plataforma Chatbot IA',
    description: 'Plataforma inteligente para la creación...',
    price: 400,
    images: ['https://picsum.photos/600/400?random=10', 'https://picsum.photos/600/400?random=11', 'https://picsum.photos/600/400?random=12'],
    tags: ['IA', 'chatbot', 'automatización', 'servicio al cliente'],
  },
]);
</script>

<template>
  <UPageCTA
    orientation="horizontal"
    title="Productos"
    description="Descubre nuestros productos y servicios."
  >
    <template #default>
      <div class="flex items-center justify-center">
        <UIcon name="i-lucide-box" :size="150" />
      </div>
    </template>
  </UPageCTA>

  <div class="mt-10" />

  <ProductsGrid :products="products" />

  <SharedPagination :total="100" :model-value="1" :per-page="10" />
</template>