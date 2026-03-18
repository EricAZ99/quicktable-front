<script setup>
import PrimaryButton from '../../../components/PrimaryButton.vue'

defineProps({
    notifications: { type: Object, required: true },
    onSave: { type: Function, required: true },
})

const notificationLabels = {
    order_new: 'Nouvelle commande',
    order_ready: 'Commande prête',
    order_cancelled: 'Commande annulée',
    low_stock: 'Stock faible',
    daily_report: 'Rapport quotidien',
    email_alerts: 'Alertes par email',
    sound: 'Sons de notification',
}
</script>

<template>
    <div class="bg-white rounded-2xl border p-6 flex flex-col gap-5">
        <div>
            <p class="font-semibold text-slate-800">Notifications</p>
            <p class="text-xs text-slate-400 mt-0.5">Choisissez les événements pour lesquels vous souhaitez être alerté</p>
        </div>
        <div class="flex flex-col gap-3">
            <div v-for="(label, key) in notificationLabels" :key="key">
                <label class="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:bg-slate-50">
                    <p class="text-sm font-medium text-slate-700">{{ label }}</p>
                    <div @click="notifications[key] = !notifications[key]"
                        class="w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 cursor-pointer"
                        :class="notifications[key] ? 'bg-slate-800' : 'bg-slate-200'">
                        <div class="w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                            :class="notifications[key] ? 'translate-x-4' : 'translate-x-0'" />
                    </div>
                </label>
            </div>
        </div>
        <div class="flex justify-end">
            <PrimaryButton @click="onSave">Sauvegarder</PrimaryButton>
        </div>
    </div>
</template>
