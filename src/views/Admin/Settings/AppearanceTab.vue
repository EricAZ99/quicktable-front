<script setup>
import PrimaryButton from '../../../components/PrimaryButton.vue'

defineProps({
    appearance: { type: Object, required: true },
    fonts: { type: Array, required: true },
    onSave: { type: Function, required: true },
})
</script>

<template>
    <div class="bg-white rounded-2xl border p-6 flex flex-col gap-5">
        <div>
            <p class="font-semibold text-slate-800">Apparence</p>
            <p class="text-xs text-slate-400 mt-0.5">Personnalisez l'interface de votre espace admin</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="text-xs font-medium text-slate-600">Couleur principale</label>
                <div class="mt-1 flex items-center gap-3">
                    <input type="color" v-model="appearance.primary_color"
                        class="h-9 w-16 rounded-xl border cursor-pointer" />
                    <span class="text-sm text-slate-500">{{ appearance.primary_color }}</span>
                </div>
            </div>
            <div>
                <label class="text-xs font-medium text-slate-600">Police</label>
                <select v-model="appearance.font"
                    class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400">
                    <option v-for="font in fonts" :key="font">{{ font }}</option>
                </select>
            </div>
        </div>
        <div class="flex flex-col gap-3">
            <label class="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:bg-slate-50">
                <div>
                    <p class="text-sm font-medium text-slate-700">Mode sombre</p>
                    <p class="text-xs text-slate-400">Activer le thème sombre sur l'interface</p>
                </div>
                <div @click="appearance.dark_mode = !appearance.dark_mode"
                    class="w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 cursor-pointer"
                    :class="appearance.dark_mode ? 'bg-slate-800' : 'bg-slate-200'">
                    <div class="w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                        :class="appearance.dark_mode ? 'translate-x-4' : 'translate-x-0'" />
                </div>
            </label>
            <label class="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:bg-slate-50">
                <div>
                    <p class="text-sm font-medium text-slate-700">Mode compact</p>
                    <p class="text-xs text-slate-400">Réduire les espacements pour afficher plus de contenu</p>
                </div>
                <div @click="appearance.compact_mode = !appearance.compact_mode"
                    class="w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 cursor-pointer"
                    :class="appearance.compact_mode ? 'bg-slate-800' : 'bg-slate-200'">
                    <div class="w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                        :class="appearance.compact_mode ? 'translate-x-4' : 'translate-x-0'" />
                </div>
            </label>
        </div>
        <div class="flex justify-end">
            <PrimaryButton @click="onSave">Sauvegarder</PrimaryButton>
        </div>
    </div>
</template>
