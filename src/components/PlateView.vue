<script setup>
import FormBackGround from './FormBackGround.vue';

const props = defineProps({
    plate: { type: Object, required: true }
});
const emits = defineEmits(['close']);

const formatPrice = (val) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(val ?? 0);
</script>

<template>
    <FormBackGround>
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-base shrink-0">
                    🍽
                </div>
                <div>
                    <h2 class="text-base font-semibold text-slate-900">{{ plate.name }}</h2>
                    <p class="text-xs text-slate-400">{{ plate.category }}</p>
                </div>
            </div>
            <button @click="emits('close')"
                class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-xl leading-none">
                ×
            </button>
        </div>

        <!-- Corps -->
        <div class="flex-1 overflow-y-auto px-6 py-5 space-y-5">

            <!-- Badge actif -->
            <div class="flex flex-wrap gap-2">
                <span :class="plate.active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'"
                    class="inline-flex items-center gap-1.5 border rounded-full px-3 py-1 text-xs font-medium">
                    <span class="w-1.5 h-1.5 rounded-full inline-block"
                        :class="plate.active ? 'bg-emerald-400' : 'bg-slate-400'"></span>
                    {{ plate.active ? 'Actif' : 'Inactif' }}
                </span>
                <span class="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 text-slate-600 rounded-full px-3 py-1 text-xs font-medium">
                    🏷 {{ plate.category }}
                </span>
            </div>

            <!-- Infos clés -->
            <div class="grid grid-cols-2 gap-3">
                <div class="bg-slate-50 rounded-xl p-3 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-base shrink-0">📝</div>
                    <div class="min-w-0">
                        <p class="text-xs text-slate-400">Nom</p>
                        <p class="text-sm font-semibold text-slate-800 truncate">{{ plate.name || '—' }}</p>
                    </div>
                </div>
                <div class="bg-emerald-50 rounded-xl p-3 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-white border border-emerald-100 flex items-center justify-center text-base shrink-0">💰</div>
                    <div>
                        <p class="text-xs text-emerald-600">Prix</p>
                        <p class="text-sm font-bold text-emerald-700">{{ formatPrice(plate.price) }}</p>
                    </div>
                </div>
            </div>

            <!-- Description -->
            <div v-if="plate.description" class="bg-slate-50 rounded-xl p-4">
                <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Description</p>
                <p class="text-sm text-slate-600">{{ plate.description }}</p>
            </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-slate-100 bg-white rounded-b-2xl flex items-center justify-between">
            <p class="text-xs text-slate-400 uppercase tracking-wider font-semibold">Prix unitaire</p>
            <p class="text-xl font-bold text-slate-900">{{ formatPrice(plate.price) }}</p>
        </div>
    </FormBackGround>
</template>
