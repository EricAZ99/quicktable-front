<script setup>
import PrimaryButton from '../../../components/PrimaryButton.vue'
import SecondaryButton from '../../../components/SecondaryButton.vue'

defineProps({
    backup: { type: Object, required: true },
    onSave: { type: Function, required: true },
    onTriggerBackup: { type: Function, required: true },
})
</script>

<template>
    <div class="bg-white rounded-2xl border p-6 flex flex-col gap-5">
        <div>
            <p class="font-semibold text-slate-800">Sauvegarde</p>
            <p class="text-xs text-slate-400 mt-0.5">Gérez les sauvegardes de vos données</p>
        </div>
        <div class="p-4 rounded-xl bg-slate-50 border flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-slate-700">Dernière sauvegarde</p>
                <p class="text-xs text-slate-400 mt-0.5">{{ backup.last_backup }}</p>
            </div>
            <SecondaryButton @click="onTriggerBackup">Sauvegarder maintenant</SecondaryButton>
        </div>
        <div class="flex flex-col gap-3">
            <label class="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:bg-slate-50">
                <div>
                    <p class="text-sm font-medium text-slate-700">Sauvegarde automatique</p>
                    <p class="text-xs text-slate-400">Sauvegarder automatiquement selon la fréquence choisie</p>
                </div>
                <div @click="backup.auto_backup = !backup.auto_backup"
                    class="w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 cursor-pointer"
                    :class="backup.auto_backup ? 'bg-slate-800' : 'bg-slate-200'">
                    <div class="w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                        :class="backup.auto_backup ? 'translate-x-4' : 'translate-x-0'" />
                </div>
            </label>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="text-xs font-medium text-slate-600">Fréquence</label>
                <select v-model="backup.frequency"
                    class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400">
                    <option value="hourly">Toutes les heures</option>
                    <option value="daily">Quotidienne</option>
                    <option value="weekly">Hebdomadaire</option>
                    <option value="monthly">Mensuelle</option>
                </select>
            </div>
            <div>
                <label class="text-xs font-medium text-slate-600">Rétention (jours)</label>
                <input type="number" v-model="backup.retention" min="7" max="365"
                    class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400" />
            </div>
        </div>
        <div class="flex justify-end">
            <PrimaryButton @click="onSave">Sauvegarder</PrimaryButton>
        </div>
    </div>
</template>
