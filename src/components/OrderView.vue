<script setup>
import FormBackGround from './FormBackGround.vue';

const props = defineProps({
    order: { type: Object, required: true }
});
const emits = defineEmits(['close']);

const statusClass = {
    'En attente': 'bg-yellow-50 text-yellow-700',
    'En préparation': 'bg-blue-50 text-blue-700',
    'Prêt': 'bg-emerald-50 text-emerald-700',
    'Servi': 'bg-emerald-50 text-emerald-700',
    'Annulé': 'bg-red-50 text-red-700',
};
const paymentClass = {
    'Payé': 'bg-emerald-50 text-emerald-700',
    'En attente': 'bg-yellow-50 text-yellow-700',
    'Refusé': 'bg-red-50 text-red-700',
};

const formatPrice = (val) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(val ?? 0);
</script>

<template>
    <FormBackGround>
        <div class="w-full sm:w-[420px]">
            <!-- En-tête -->
            <div class="flex items-start justify-between mb-5">
                <div>
                    <h2 class="text-lg font-bold text-slate-900">{{ order.order_id }}</h2>
                    <div class="flex items-center gap-2 mt-1.5">
                        <span class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium bg-slate-100 text-slate-600">
                            {{ order.type }}
                        </span>
                        <span v-if="order.stat" class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
                            :class="statusClass[order.stat] ?? 'bg-slate-100 text-slate-600'">
                            {{ order.stat }}
                        </span>
                        <span v-if="order.payment" class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
                            :class="paymentClass[order.payment] ?? 'bg-slate-100 text-slate-600'">
                            {{ order.payment }}
                        </span>
                    </div>
                </div>
                <button @click="emits('close')"
                    class="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg p-1 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                </button>
            </div>

            <!-- Infos clés -->
            <div class="grid grid-cols-2 gap-2 mb-4 text-sm">
                <div class="flex items-center gap-2 bg-slate-50 rounded-xl p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4 text-slate-400 shrink-0" fill="currentColor">
                        <path d="M3,3H11V11H3V3M3,13H11V21H3V13M13,3H21V11H13V3M13,13H21V21H13V13Z" />
                    </svg>
                    <div>
                        <p class="text-xs text-slate-400">Table</p>
                        <p class="font-medium text-slate-800">{{ order.table || '—' }}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2 bg-slate-50 rounded-xl p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4 text-slate-400 shrink-0" fill="currentColor">
                        <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                    </svg>
                    <div>
                        <p class="text-xs text-slate-400">Client</p>
                        <p class="font-medium text-slate-800">{{ order.client || '—' }}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2 bg-slate-50 rounded-xl p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4 text-slate-400 shrink-0" fill="currentColor">
                        <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
                    </svg>
                    <div>
                        <p class="text-xs text-slate-400">Heure</p>
                        <p class="font-medium text-slate-800">{{ order.time || '—' }}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2 bg-emerald-50 rounded-xl p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4 text-emerald-500 shrink-0" fill="currentColor">
                        <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" />
                    </svg>
                    <div>
                        <p class="text-xs text-emerald-600">Total</p>
                        <p class="font-bold text-emerald-700">{{ formatPrice(order.total) }}</p>
                    </div>
                </div>
            </div>

            <!-- Plats -->
            <div class="mb-4">
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Plats commandés</p>
                <div class="space-y-1.5">
                    <div v-for="(plate, i) in order.plates" :key="i"
                        class="flex justify-between items-center bg-white border border-slate-100 rounded-xl px-3 py-2.5 hover:bg-slate-50 transition-colors">
                        <div>
                            <p class="font-medium text-slate-800 text-sm">{{ plate.name }}</p>
                            <p v-if="plate.complement?.name" class="text-xs text-slate-400 mt-0.5">
                                <span class="text-slate-300">+</span> {{ plate.complement.name }}
                            </p>
                        </div>
                        <p class="text-sm font-semibold text-slate-700 whitespace-nowrap ml-4">
                            {{ formatPrice(plate.price + (plate.complement?.price ?? 0)) }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Commentaires -->
            <div v-if="order.comments" class="flex gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4 text-amber-400 shrink-0 mt-0.5" fill="currentColor">
                    <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H6L4,18V4H20V16Z" />
                </svg>
                <p class="text-slate-600">{{ order.comments }}</p>
            </div>
        </div>
    </FormBackGround>
</template>
