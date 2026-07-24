import { computed, onMounted, ref, watch } from "vue";

export const useFetch = <T>(url: string | (() => string)) => {
  const data = ref<T | null>(null);
  const hasError = ref(false);
  const error = ref<Error | null>(null);
  const isLoading = ref(true);

  // Convertimos la URL en algo reactivo (computed)
  const reactiveUrl = computed(() => {
    return typeof url === "function" ? url() : url;
  });

  const fetchData = async () => {
    isLoading.value = true;
    error.value = null;
    hasError.value = false;

    try {
      const response = await fetch(reactiveUrl.value);
      if (!response.ok) throw new Error("Error en la petición");
      const responseData = await response.json();
      data.value = responseData;
    } catch (err) {
      error.value = err as any;
      hasError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  // IMPORTANTE: Observar la URL para volver a pedir datos si cambia
  watch(reactiveUrl, fetchData);

  onMounted(fetchData);

  return { data, hasError, isLoading, error };
};