<script setup>
import FormBackGround from './FormBackGround.vue';

const props = defineProps({
    table: { type: Object, required: false, default: () => ({}) }
});
const emits = defineEmits(['close']);

const statConfig = {
    'Libre':   { cls: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-400', icon: '✅' },
    'Occupée': { cls: 'bg-red-50 text-red-700 border-red-200',             dot: 'bg-red-400',     icon: '🔴' },
    'Réservée':{ cls: 'bg-yellow-50 text-yellow-700 border-yellow-200',    dot: 'bg-yellow-400',  icon: '📌' },
};
</script>

<template>
    <FormBackGround>
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-base shrink-0">
                    🪑
                </div>
                <div>
                    <h2 class="text-base font-semibold text-slate-900">{{ table.name || 'Table' }}</h2>
                    <p class="text-xs text-slate-400">Détails de la table</p>
                </div>
            </div>
            <button @click="emits('close')"
                class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-xl leading-none">
                ×
            </button>
        </div>

        <!-- Corps -->
        <div class="flex-1 overflow-y-auto px-6 py-5 space-y-5">

            <!-- Badges -->
            <div class="flex flex-wrap gap-2">
                <span v-if="table.stat"
                    :class="(statConfig[table.stat] ?? { cls: 'bg-slate-100 text-slate-600 border-slate-200' }).cls"
                    class="inline-flex items-center gap-1.5 border rounded-full px-3 py-1 text-xs font-medium">
                    <span>{{ (statConfig[table.stat] ?? {}).icon }}</span>
                    {{ table.stat }}
                </span>
                <span :class="table.active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'"
                    class="inline-flex items-center gap-1.5 border rounded-full px-3 py-1 text-xs font-medium">
                    <span class="w-1.5 h-1.5 rounded-full inline-block"
                        :class="table.active ? 'bg-emerald-400' : 'bg-slate-400'"></span>
                    {{ table.active ? 'Active' : 'Inactive' }}
                </span>
            </div>

            <!-- QR Code -->
            <div class="flex flex-col items-center gap-3 bg-slate-50 rounded-2xl p-6">
                <img src="../assets/code_qr.png" alt="QR Code" class="w-48 h-48 rounded-xl border border-slate-200 shadow-sm" />
                <div class="text-center">
                    <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">QR Code</p>
                    <p class="text-xs text-slate-400 mt-0.5">Scanner pour accéder au menu</p>
                </div>
                <button class="text-xs font-medium text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-white transition-colors">
                    ⬇ Télécharger
                </button>
            </div>

            <!-- Infos -->
            <div class="grid grid-cols-2 gap-3">
                <div class="bg-slate-50 rounded-xl p-3 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-base shrink-0">🪑</div>
                    <div>
                        <p class="text-xs text-slate-400">Nom</p>
                        <p class="text-sm font-semibold text-slate-800">{{ table.name || '—' }}</p>
                    </div>
                </div>
                <div class="bg-slate-50 rounded-xl p-3 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-base shrink-0">📋</div>
                    <div>
                        <p class="text-xs text-slate-400">Disponibilité</p>
                        <p class="text-sm font-semibold text-slate-800">{{ table.stat || '—' }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-slate-100 bg-white rounded-b-2xl flex justify-end">
            <button @click="emits('close')"
                class="text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl px-5 py-2 hover:bg-slate-50 transition-colors">
                Fermer
            </button>
        </div>
    </FormBackGround>
</template>
