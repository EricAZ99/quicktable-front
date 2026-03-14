<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputText from '../../components/InputText.vue'

const router = useRouter()

const email = ref('')
const f_name = ref('')
const l_name = ref('')
const password = ref('')
const isSubmitting = ref(false)
const error = ref('')

async function onSubmit() {
  error.value = ''
  isSubmitting.value = true
  try {
    if (!email.value || !password.value) {
      error.value = 'Email et mot de passe requis.'
      return
    }

    await new Promise((r) => setTimeout(r, 350))
    await router.push('/home')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-80px)] bg-white">
    <div class="mx-auto max-w-5xl px-4 py-10">
      <div class="mx-auto max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900">Inscription</h1>
        <p class="mt-1 text-sm text-slate-600 flex justify-between">Inscris-toi pour gérer tes activités.
          
          <RouterLink class="font-semibold text-slate-900 hover:underline" to="/login">Connexion</RouterLink></p>

        <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
          <div>
            <label class="text-sm font-medium text-slate-700" for="f_name">Nom</label>
            <InputText id="f_name" v-model="f_name" type="text" autocomplete="f_name"
              placeholder="ex: DOE" />
          </div>
          <div>
            <label class="text-sm font-medium text-slate-700" for="l_name">Prénom</label>
            <InputText id="l_name" v-model="l_name" type="text" autocomplete="l_name"
              placeholder="ex: John" />
          </div>
          <div>
            <label class="text-sm font-medium text-slate-700" for="email">Email</label>
            <InputText id="email" v-model="email" type="email" autocomplete="email"
              placeholder="ex: nom@restaurant.com" />
          </div>

          <div>
            <label class="text-sm font-medium text-slate-700" for="password">Mot de passe</label>
            <InputText id="password" v-model="password" type="password" autocomplete="current-password" />
          </div>

          <p v-if="error" class="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {{ error }}
          </p>

          <button type="submit" :disabled="isSubmitting"
            class="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60">
            {{ isSubmitting ? 'Connexion…' : 'Se connecter' }}
          </button>

          <div class="text-center text-sm text-slate-600">
            <RouterLink class="font-semibold text-slate-900 hover:underline" to="/">Retour à l’accueil</RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
