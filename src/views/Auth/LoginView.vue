<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputText from '../../components/InputText.vue'
import { login } from '../../services/auth'

const router = useRouter()

const email = ref('')
const password = ref('')
const isSubmitting = ref(false)
const error = ref('')

async function onSubmit() {
  if (isSubmitting.value) {
    return
  }

  error.value = ''
  const normalizedEmail = email.value.trim().toLowerCase()
  const normalizedPassword = password.value.trim()

  if (!normalizedEmail || !normalizedPassword) {
    error.value = 'Email et mot de passe requis.'
    return
  }

  isSubmitting.value = true

  try {
    const response = await login({
      email: normalizedEmail,
      password: normalizedPassword,
    })

    if (!response?.token || !response?.user) {
      throw new Error('Reponse de connexion invalide.')
    }

    localStorage.setItem('user_authenticated', JSON.stringify(response))
    await router.push('/admin-home')
  } catch (err) {
    error.value = err.message || 'Connexion impossible.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-80px)] bg-white flex justify-center items-center">
    <div class="mx-auto max-w-5xl px-4 py-10">
      <div class="mx-auto max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900">Login</h1>
        <p class="mt-1 flex justify-between text-sm text-slate-600">
          Connecte-toi pour acceder a ton espace.
          <RouterLink class="ml-2 font-semibold text-slate-900 hover:underline" to="/register">
            S'inscrire
          </RouterLink>
        </p>

        <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
          <div>
            <label class="text-sm font-medium text-slate-700" for="email">Email</label>
            <InputText
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="ex: nom@restaurant.com"
            />
          </div>

          <div>
            <label class="text-sm font-medium text-slate-700" for="password">Mot de passe</label>
            <InputText id="password" v-model="password" type="password" autocomplete="current-password" />
          </div>

          <p v-if="error" class="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {{ error }}
          </p>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {{ isSubmitting ? 'Connexion...' : 'Se connecter' }}
          </button>

          <div class="text-center text-sm text-slate-600">
            <RouterLink class="font-semibold text-slate-900 hover:underline" to="/">
              Retour a l'accueil
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
