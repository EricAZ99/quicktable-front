<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const mainClass = computed(() =>
  route.name === 'landing-page' ? 'mx-auto max-w-none p-0' : 'mx-auto h-full py-10',
)
</script>

<template>
  <div class="w-dvw h-dvh overflow-x-hidden overflow-hidden bg-slate-50">
    <!-- <header v-if="route.name == 'landing-page'" class="border-b">
      <nav class="mx-auto flex max-w-5xl items-center gap-4 p-4">
        <RouterLink class="text-sm font-medium hover:underline" to="/">Accueil</RouterLink>
        <RouterLink class="text-sm font-medium hover:underline" to="/home">Demo</RouterLink>
        <RouterLink class="text-sm font-medium hover:underline" to="/about">About</RouterLink>
        <RouterLink class="ml-auto text-sm font-medium hover:underline" to="/login">Login</RouterLink>
      </nav>
    </header> -->

    <main :class="mainClass">
      <RouterView />
    </main>
  </div>
</template>
