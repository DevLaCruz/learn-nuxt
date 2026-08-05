<script setup lang="ts">
const props = defineProps<{
  slug: string;
}>();

const { isLoggedIn, user } = useAuthentication();

const { data, status, refresh } = useFetch(
  `/api/product/${props.slug}/reviews`,
  {
    server: false,
    lazy: true,
  }
);

const hasUserPostedReview = computed(() => {
  return data.value?.hasUserPostedReview || false;
});

const handleReviewPosted = async () => {
  await refresh();
};
</script>

<template>
  <ClientOnly>
    <UCard class="mb-8" icon="i-lucide-star">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-star" class="text-primary-500 text-2xl" />
          <div>
            <h2 class="text-xl font-semibold">Reseñas</h2>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Nuestras reseñas de clientes satisfechos.
            </p>
          </div>
        </div>
        
        <ModalReview
          v-if="isLoggedIn && !hasUserPostedReview"
          :slug="slug"
          :user="user"
          @review-posted="handleReviewPosted"
          button-label="Añadir reseña"
        />
        <p v-else-if="!isLoggedIn" class="text-sm text-gray-500 italic">
          Inicia sesión para dejar una reseña
        </p>
      </div>
    </UCard>

    <div
      v-if="status === 'pending'"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <USkeleton class="w-full h-48 rounded-md mb-4" />
      <USkeleton class="w-full h-48 rounded-md mb-4" />
      <USkeleton class="w-full h-48 rounded-md mb-4" />
    </div>

    <!-- Usamos grid estándar para evitar dependencia estricta de UPageColumns de Nuxt UI Pro si no está disponible, pero conservando el look -->
    <div v-else-if="data?.productReviews && data.productReviews.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard
        v-for="(review, index) in data.productReviews"
        :key="index"
        class="fade-in flex flex-col justify-between"
      >
        <div>
          <p class="text-gray-700 dark:text-gray-300 italic mb-4">
            "{{ review.review }}"
          </p>
        </div>

        <template #footer>
          <div class="flex items-center gap-1 mb-2">
            <UIcon
              name="i-lucide-star"
              class="text-primary-500 text-lg"
              v-for="star in review.rating"
              :key="star"
            />
            <UIcon
              name="i-lucide-star"
              class="text-gray-300 dark:text-gray-600 text-lg"
              v-for="emptyStar in (5 - review.rating)"
              :key="'empty-' + emptyStar"
            />
          </div>
          <div class="flex items-center gap-3 mt-3">
            <UAvatar :alt="review.name" size="md" />
            <div>
              <p class="font-medium text-sm text-gray-900 dark:text-white">{{ review.name }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ review.userTitle }}</p>
            </div>
          </div>
        </template>
      </UCard>
    </div>
    
    <div v-else class="text-center py-10 text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      Aún no hay reseñas para este producto. ¡Sé el primero en opinar!
    </div>
  </ClientOnly>
</template>

<style scoped>
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
