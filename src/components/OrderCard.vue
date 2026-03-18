<script setup>
defineProps({ orders: { type: Array, default: () => [] } });
const emit = defineEmits(['view', 'edit', 'delete']);

const statusConfig = {
    'En attente':     { cls: 'bg-yellow-50 text-yellow-700',  dot: 'bg-yellow-400' },
    'En préparation': { cls: 'bg-blue-50 text-blue-700',      dot: 'bg-blue-400' },
    'Prêt':           { cls: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-400' },
    'Servi':          { cls: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-400' },
    'Annulé':         { cls: 'bg-red-50 text-red-700',        dot: 'bg-red-400' },
};
const paymentConfig = {
    'Payé':       'bg-emerald-50 text-emerald-700',
    'En attente': 'bg-yellow-50 text-yellow-700',
    'Refusé':     'bg-red-50 text-red-700',
};

const formatPrice = (val) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(val ?? 0);
</script>

<template>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div v-if="orders.length === 0" class="rounded-2xl border bg-white p-6 text-sm text-slate-600">
            Aucune commande à afficher.
        </div>

        <article v-for="order in orders" :key="order.order_id"
            class="rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <header class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                    <div class="grid h-10 w-10 place-items-center rounded-xl bg-slate-800 text-xl shrink-0">🧾</div>
                    <div class="min-w-0">
                        <h3 class="font-semibold text-slate-900 truncate">{{ order.order_id }}</h3>
                        <p class="text-xs text-slate-500">{{ order.type }} · {{ order.time || '—' }}</p>
                    </div>
                </div>
                <span class="shrink-0 rounded-full px-2 py-1 text-xs font-semibold"
                    :class="paymentConfig[order.payment] ?? 'bg-slate-100 text-slate-600'">
                    {{ order.payment }}
                </span>
            </header>

            <div class="mt-3 flex flex-wrap gap-2">
                <span v-if="order.table" class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                    🪑 {{ order.table }}
                </span>
                <span v-if="order.stat"
                    class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                    :class="(statusConfig[order.stat] ?? { cls: 'bg-slate-100 text-slate-600' }).cls">
                    <span class="w-1.5 h-1.5 rounded-full inline-block"
                        :class="(statusConfig[order.stat] ?? { dot: 'bg-slate-400' }).dot"></span>
                    {{ order.stat }}
                </span>
            </div>

            <div class="mt-3 flex items-center justify-between">
                <span class="text-sm font-bold text-slate-900">{{ formatPrice(order.total) }}</span>
                <div class="flex items-center gap-1">
                    <button type="button" @click="emit('view', order)"
                        class="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor">
                            <path d="M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,11A1,1 0 0,1 13,12A1,1 0 0,1 12,13A1,1 0 0,1 11,12A1,1 0 0,1 12,11M12,8C14.63,8 17,9.57 18,12C16.62,15.31 12.81,16.88 9.5,15.5C7.92,14.84 6.66,13.58 6,12C7,9.57 9.37,8 12,8M12,9.5A2.5,2.5 0 0,0 9.5,12A2.5,2.5 0 0,0 12,14.5A2.5,2.5 0 0,0 14.5,12A2.5,2.5 0 0,0 12,9.5" />
                        </svg>
                    </button>
                    <button type="button" @click="emit('edit', order)"
                        class="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor">
                            <path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                        </svg>
                    </button>
                    <button type="button" @click="emit('delete', order)"
                        class="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor">
                            <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </article>
    </div>
</template>
