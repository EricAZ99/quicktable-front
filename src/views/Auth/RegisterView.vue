<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputText from '../../components/InputText.vue'
import { register } from '../../services/auth'

const router = useRouter()

const email = ref('')
const firstName = ref('')
const lastName = ref('')
const restaurantName = ref('')
const password = ref('')
const isSubmitting = ref(false)
const error = ref('')
const success = ref('')

async function onSubmit() {
  error.value = ''
  success.value = ''
  isSubmitting.value = true

  try {
    if (!firstName.value || !lastName.value || !restaurantName.value || !email.value || !password.value) {
      error.value = 'Tous les champs sont requis.'
      return
    }

    const response = await register({
      firstName: firstName.value,
      lastName: lastName.value,
      restaurantName: restaurantName.value,
      email: email.value,
      password: password.value,
    })

    success.value = response.message
    await router.push('/login')
  } catch (err) {
    error.value = err.message || 'Inscription impossible.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-80px)] bg-white flex justify-center items-center">
    <div class="mx-auto max-w-5xl px-4 py-10">
      <div class="mx-auto max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900">Inscription</h1>
        <p class="mt-1 flex justify-between text-sm text-slate-600">
          Inscris-toi pour gerer tes activites.
          <RouterLink class="ml-2 font-semibold text-slate-900 hover:underline" to="/login">
            Connexion
          </RouterLink>
        </p>

        <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
          <div>
            <label class="text-sm font-medium text-slate-700" for="last_name">Nom</label>
            <InputText
              id="last_name"
              v-model="lastName"
              type="text"
              autocomplete="family-name"
              placeholder="ex: DOE"
            />
          </div>

          <div>
            <label class="text-sm font-medium text-slate-700" for="first_name">Prenom</label>
            <InputText
              id="first_name"
              v-model="firstName"
              type="text"
              autocomplete="given-name"
              placeholder="ex: John"
            />
          </div>

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
            <label class="text-sm font-medium text-slate-700" for="restaurant_name">Nom de votre restaurant</label>
            <InputText
              id="restaurant_name"
              v-model="restaurantName"
              type="text"
              autocomplete="organization"
              placeholder="ex: Le Patio Gourmand"
            />
          </div>

          <div>
            <label class="text-sm font-medium text-slate-700" for="password">Mot de passe</label>
            <InputText id="password" v-model="password" type="password" autocomplete="new-password" />
          </div>

          <p v-if="error" class="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {{ error }}
          </p>

          <p
            v-if="success"
            class="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
          >
            {{ success }}
          </p>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {{ isSubmitting ? 'Inscription...' : "S'inscrire" }}
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
