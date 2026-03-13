<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="min-h-screen">
    <header v-if="route.name !== 'landing-page'" class="border-b">
      <nav class="mx-auto flex items-center gap-4 p-4">
        <RouterLink class="text-sm font-medium hover:underline" to="/">Accueil</RouterLink>
        <RouterLink class="text-sm font-medium hover:underline" to="/home">Démo</RouterLink>
        <RouterLink class="text-sm font-medium hover:underline" to="/about">About</RouterLink>
      </nav>
    </header>

    <main class="">
      <RouterView />
    </main>
  </div>
</template>
