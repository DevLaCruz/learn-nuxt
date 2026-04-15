<!-- A pesar de no tener nombre de 2 palabras, al estar en una carpeta "shared" el nombre final sera SharedHeader -->

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import NuxtUI from '../icons/NuxtUI.vue';

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'Products',
  to: '/products',
  //icon: 'i-lucide-book-open',
  active: route.path.startsWith('/products')
}, {
  label: 'Pricing',
  to: '/pricing',
  // icon: 'i-lucide-box',
  active: route.path.startsWith('/pricing')
}, {
  label: 'About',
  //icon: 'i-simple-icons-figma',
  to: '/about',
  //target: '_blank'

}, {
  label: 'Contact',
  //icon: 'i-lucide-rocket',
  to: '/contact',
  // target: '_blank'
}])

const responsiveMenu = ref([
    ...items.value,
    {
        label: 'Sign in',
        to: '/login',
        active:route.path.startsWith('/login')
    }
    

])
</script>

<template>
  <UHeader
    :toggle="{
      color: 'primary',
      variant: 'subtle',
      class: 'rounded-full'
    }"
  >
    <template #title>
      <!-- <Logo class="h-6 w-auto" /> -->
       <IconsNuxtUI class="h-6 w-auto"/>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/ui"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>


      <UButton color="primary" variant="solid" icon="i-heroicons-user-circle" to="/login" label="Login"/>

    </template>

    <template #body>
      <UNavigationMenu :items="responsiveMenu" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>

