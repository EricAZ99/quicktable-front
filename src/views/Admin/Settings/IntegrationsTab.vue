<script setup>
import PrimaryButton from '../../../components/PrimaryButton.vue'

defineProps({
    integrations: { type: Array, required: true },
    onSave: { type: Function, required: true },
})
</script>

<template>
    <div class="bg-white rounded-2xl border p-6 flex flex-col gap-5">
        <div>
            <p class="font-semibold text-slate-800">Intégrations</p>
            <p class="text-xs text-slate-400 mt-0.5">Connectez des services tiers à votre établissement</p>
        </div>
        <div class="flex flex-col gap-3">
            <div v-for="integration in integrations" :key="integration.key"
                class="flex items-center justify-between p-4 rounded-xl border">
                <div>
                    <p class="text-sm font-medium text-slate-700">{{ integration.label }}</p>
                    <p class="text-xs text-slate-400">{{ integration.desc }}</p>
                </div>
                <div @click="integration.enabled = !integration.enabled"
                    class="w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 cursor-pointer"
                    :class="integration.enabled ? 'bg-slate-800' : 'bg-slate-200'">
                    <div class="w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                        :class="integration.enabled ? 'translate-x-4' : 'translate-x-0'" />
                </div>
            </div>
        </div>
        <div class="flex justify-end">
            <PrimaryButton @click="onSave">Sauvegarder</PrimaryButton>
        </div>
    </div>
</template>
