<script setup>
import PrimaryButton from '../../../components/PrimaryButton.vue'

defineProps({
    days: { type: Array, required: true },
    schedules: { type: Object, required: true },
    onSave: { type: Function, required: true },
})
</script>

<template>
    <div class="bg-white rounded-2xl border p-6 flex flex-col gap-5">
        <div>
            <p class="font-semibold text-slate-800">Horaires d'ouverture</p>
            <p class="text-xs text-slate-400 mt-0.5">Définissez les heures d'ouverture de votre établissement</p>
        </div>
        <div class="flex flex-col gap-2">
            <div v-for="day in days" :key="day" class="flex items-center gap-4 p-3 rounded-xl border">
                <div @click="schedules[day].open = !schedules[day].open"
                    class="w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 cursor-pointer shrink-0"
                    :class="schedules[day].open ? 'bg-slate-800' : 'bg-slate-200'">
                    <div class="w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                        :class="schedules[day].open ? 'translate-x-4' : 'translate-x-0'" />
                </div>
                <span class="text-sm font-medium text-slate-700 w-24">{{ day }}</span>
                <template v-if="schedules[day].open">
                    <input type="time" v-model="schedules[day].from"
                        class="rounded-xl border px-3 py-1.5 text-sm outline-none focus:border-slate-400" />
                    <span class="text-slate-400 text-sm">-</span>
                    <input type="time" v-model="schedules[day].to"
                        class="rounded-xl border px-3 py-1.5 text-sm outline-none focus:border-slate-400" />
                </template>
                <span v-else class="text-sm text-slate-400">Fermé</span>
            </div>
        </div>
        <div class="flex justify-end">
            <PrimaryButton @click="onSave">Sauvegarder</PrimaryButton>
        </div>
    </div>
</template>
