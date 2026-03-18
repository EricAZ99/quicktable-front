<script setup>
import InputText from '../../../components/InputText.vue'
import PrimaryButton from '../../../components/PrimaryButton.vue'

defineProps({
    password: { type: Object, required: true },
    passwordError: { type: String, default: '' },
    onSave: { type: Function, required: true },
})
</script>

<template>
    <div class="bg-white rounded-2xl border p-6 flex flex-col gap-5">
        <div>
            <p class="font-semibold text-slate-800">Changer le mot de passe</p>
            <p class="text-xs text-slate-400 mt-0.5">Assurez-vous d'utiliser un mot de passe fort</p>
        </div>
        <div class="flex flex-col gap-4 max-w-md">
            <div>
                <label class="text-xs font-medium text-slate-600">Mot de passe actuel</label>
                <InputText v-model="password.current" placeholder="••••••••" type="password" />
            </div>
            <div>
                <label class="text-xs font-medium text-slate-600">Nouveau mot de passe</label>
                <InputText v-model="password.next" placeholder="••••••••" type="password" />
            </div>
            <div>
                <label class="text-xs font-medium text-slate-600">Confirmer le mot de passe</label>
                <InputText v-model="password.confirm" placeholder="••••••••" type="password" />
            </div>
            <p v-if="passwordError" class="text-xs text-red-500">{{ passwordError }}</p>
        </div>
        <div class="flex justify-end">
            <PrimaryButton @click="onSave">Mettre à jour</PrimaryButton>
        </div>
    </div>
</template>
