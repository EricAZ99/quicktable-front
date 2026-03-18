<script setup>
import FormBackGround from './FormBackGround.vue';

defineProps({ collaborator: { type: Object, required: true } });
const emits = defineEmits(['close']);
</script>

<template>
    <FormBackGround>
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-base shrink-0">👤</div>
                <div>
                    <h2 class="text-base font-semibold text-slate-900">{{ collaborator.name }}</h2>
                    <p class="text-xs text-slate-400">Détails du collaborateur</p>
                </div>
            </div>
            <button @click="emits('close')"
                class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-xl leading-none">
                ×
            </button>
        </div>

        <div class="flex-1 overflow-y-auto px-6 py-5 space-y-4">
            <div class="flex flex-wrap gap-2">
                <span :class="collaborator.active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'"
                    class="inline-flex items-center gap-1.5 border rounded-full px-3 py-1 text-xs font-medium">
                    <span class="w-1.5 h-1.5 rounded-full inline-block"
                        :class="collaborator.active ? 'bg-emerald-400' : 'bg-slate-400'"></span>
                    {{ collaborator.active ? 'Actif' : 'Inactif' }}
                </span>
                <span class="bg-slate-100 text-slate-600 border border-slate-200 rounded-full px-3 py-1 text-xs font-medium">
                    {{ collaborator.role }}
                </span>
            </div>

            <div class="bg-slate-50 rounded-xl p-4 space-y-3">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-base shrink-0">📝</div>
                    <div class="min-w-0">
                        <p class="text-xs text-slate-400">Nom et prénoms</p>
                        <p class="text-sm font-semibold text-slate-800 truncate">{{ collaborator.name }}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-base shrink-0">✉️</div>
                    <div class="min-w-0">
                        <p class="text-xs text-slate-400">Email</p>
                        <p class="text-sm font-semibold text-slate-800 truncate">{{ collaborator.email }}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-base shrink-0">📅</div>
                    <div class="min-w-0">
                        <p class="text-xs text-slate-400">Date d'ajout</p>
                        <p class="text-sm font-semibold text-slate-800">{{ collaborator.add_date }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-6 py-4 border-t border-slate-100 bg-white rounded-b-2xl flex justify-end">
            <button @click="emits('close')"
                class="text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl px-5 py-2 hover:bg-slate-50 transition-colors">
                Fermer
            </button>
        </div>
    </FormBackGround>
</template>
