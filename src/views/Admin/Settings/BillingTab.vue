<script setup>
import InputText from '../../../components/InputText.vue'
import PrimaryButton from '../../../components/PrimaryButton.vue'

defineProps({
    billing: { type: Object, required: true },
    plans: { type: Array, required: true },
    onSave: { type: Function, required: true },
})
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="bg-white rounded-2xl border p-6 flex flex-col gap-4">
            <div>
                <p class="font-semibold text-slate-800">Plan actuel</p>
                <p class="text-xs text-slate-400 mt-0.5">Choisissez le plan adapté à votre activité</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div v-for="plan in plans" :key="plan.key" @click="billing.plan = plan.key"
                    class="rounded-xl border p-4 cursor-pointer transition-all duration-200"
                    :class="billing.plan === plan.key ? 'border-slate-800 bg-slate-50' : 'hover:border-slate-300'">
                    <div class="flex items-center justify-between mb-2">
                        <p class="font-semibold text-slate-800 text-sm">{{ plan.label }}</p>
                        <div v-if="billing.plan === plan.key"
                            class="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center">
                            <div class="w-2 h-2 rounded-full bg-white" />
                        </div>
                    </div>
                    <p class="text-lg font-bold text-slate-800 mb-2">{{ plan.price }}</p>
                    <ul class="flex flex-col gap-1">
                        <li v-for="feature in plan.features" :key="feature"
                            class="text-xs text-slate-500 flex items-center gap-1">
                            <svg class="w-3 h-3 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {{ feature }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-2xl border p-6 flex flex-col gap-4">
            <p class="font-semibold text-slate-800">Informations de paiement</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="text-xs font-medium text-slate-600">Email de facturation</label>
                    <InputText v-model="billing.billing_email" placeholder="billing@exemple.fr" type="email" />
                </div>
                <div>
                    <label class="text-xs font-medium text-slate-600">Carte enregistrée</label>
                    <div class="mt-1 flex items-center gap-2 rounded-xl border px-3 py-2 bg-slate-50">
                        <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                        </svg>
                        <span class="text-sm text-slate-600">•••• •••• •••• {{ billing.card_last4 }}</span>
                        <span class="text-xs text-slate-400 ml-auto">{{ billing.card_expiry }}</span>
                    </div>
                </div>
            </div>
            <label class="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:bg-slate-50">
                <div>
                    <p class="text-sm font-medium text-slate-700">Renouvellement automatique</p>
                    <p class="text-xs text-slate-400">Renouveler automatiquement l'abonnement à échéance</p>
                </div>
                <div @click="billing.auto_renew = !billing.auto_renew"
                    class="w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 cursor-pointer"
                    :class="billing.auto_renew ? 'bg-slate-800' : 'bg-slate-200'">
                    <div class="w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                        :class="billing.auto_renew ? 'translate-x-4' : 'translate-x-0'" />
                </div>
            </label>
            <div class="flex justify-end">
                <PrimaryButton @click="onSave">Sauvegarder</PrimaryButton>
            </div>
        </div>
    </div>
</template>
