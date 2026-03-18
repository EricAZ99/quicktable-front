<script setup>
import InputText from '../../../components/InputText.vue'
import PrimaryButton from '../../../components/PrimaryButton.vue'

defineProps({
    general: { type: Object, required: true },
    onSave: { type: Function, required: true },
})
</script>

<template>
    <div class="bg-white rounded-2xl border p-6 flex flex-col gap-5">
        <div>
            <p class="font-semibold text-slate-800">Informations générales</p>
            <p class="text-xs text-slate-400 mt-0.5">Informations de base de votre établissement</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="text-xs font-medium text-slate-600">Nom du restaurant</label>
                <InputText v-model="general.restaurant_name" placeholder="Nom du restaurant" />
            </div>
            <div>
                <label class="text-xs font-medium text-slate-600">Email de contact</label>
                <InputText v-model="general.email" placeholder="email@exemple.fr" type="email" />
            </div>
            <div>
                <label class="text-xs font-medium text-slate-600">Téléphone</label>
                <InputText v-model="general.phone" placeholder="+33 6 00 00 00 00" />
            </div>
            <div>
                <label class="text-xs font-medium text-slate-600">Adresse</label>
                <InputText v-model="general.address" placeholder="Adresse complète" />
            </div>
            <div>
                <label class="text-xs font-medium text-slate-600">Devise</label>
                <select v-model="general.currency"
                    class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400">
                    <option>FCFA</option>
                    <option>EUR</option>
                    <option>USD</option>
                    <option>GBP</option>
                </select>
            </div>
            <div>
                <label class="text-xs font-medium text-slate-600">Fuseau horaire</label>
                <select v-model="general.timezone"
                    class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400">
                    <option>Europe/Paris</option>
                    <option>Africa/Abidjan</option>
                    <option>Africa/Dakar</option>
                    <option>America/New_York</option>
                </select>
            </div>
        </div>
        <div class="flex justify-end">
            <PrimaryButton @click="onSave">Sauvegarder</PrimaryButton>
        </div>
    </div>
</template>
