<script setup>
import FormBackGround from './FormBackGround.vue';

const props = defineProps({
    order: { type: Object, required: true }
});
const emits = defineEmits(['close']);

const statusConfig = {
    'En attente':    { cls: 'bg-yellow-50 text-yellow-700 border-yellow-200',  dot: 'bg-yellow-400',  icon: '⏳' },
    'En préparation':{ cls: 'bg-blue-50 text-blue-700 border-blue-200',        dot: 'bg-blue-400',    icon: '👨‍🍳' },
    'Prêt':          { cls: 'bg-emerald-50 text-emerald-700 border-emerald-200',dot: 'bg-emerald-400', icon: '✅' },
    'Servi':         { cls: 'bg-emerald-50 text-emerald-700 border-emerald-200',dot: 'bg-emerald-400', icon: '🍽' },
    'Annulé':        { cls: 'bg-red-50 text-red-700 border-red-200',           dot: 'bg-red-400',     icon: '✕' },
};
const paymentConfig = {
    'Payé':       { cls: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: '💳' },
    'En attente': { cls: 'bg-yellow-50 text-yellow-700 border-yellow-200',    icon: '⏳' },
    'Refusé':     { cls: 'bg-red-50 text-red-700 border-red-200',             icon: '❌' },
};

const formatPrice = (val) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(val ?? 0);

const plateTotal = (plate) => {
    const base = (plate.qty ?? 1) * (plate.price ?? 0);
    const complements = Array.isArray(plate.complements)
        ? plate.complements.reduce((acc, c) => acc + (c.qty ?? 1) * (c.price ?? 0), 0)
        : (plate.complement?.price ?? 0);
    return base + complements;
};

const getComplements = (plate) => {
    if (Array.isArray(plate.complements) && plate.complements.length) return plate.complements;
    if (plate.complement?.name) return [plate.complement];
    return [];
};
</script>

<template>
    <FormBackGround>
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    🧾
                </div>
                <div>
                    <h2 class="text-base font-semibold text-slate-900">{{ order.order_id }}</h2>
                    <p class="text-xs text-slate-400">{{ order.type }} · {{ order.time || '—' }}</p>
                </div>
            </div>
            <button @click="emits('close')"
                class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-xl leading-none">
                ×
            </button>
        </div>

        <!-- Corps scrollable -->
        <div class="flex-1 overflow-y-auto px-6 py-5 space-y-5">

            <!-- Badges statut & paiement -->
            <div class="flex flex-wrap gap-2">
                <span v-if="order.stat"
                    :class="(statusConfig[order.stat] ?? { cls: 'bg-slate-100 text-slate-600 border-slate-200' }).cls"
                    class="inline-flex items-center gap-1.5 border rounded-full px-3 py-1 text-xs font-medium">
                    <span>{{ (statusConfig[order.stat] ?? {}).icon }}</span>
                    {{ order.stat }}
                </span>
                <span v-if="order.payment"
                    :class="(paymentConfig[order.payment] ?? { cls: 'bg-slate-100 text-slate-600 border-slate-200' }).cls"
                    class="inline-flex items-center gap-1.5 border rounded-full px-3 py-1 text-xs font-medium">
                    <span>{{ (paymentConfig[order.payment] ?? {}).icon }}</span>
                    {{ order.payment }}
                </span>
            </div>

            <!-- Infos clés -->
            <div class="grid grid-cols-2 gap-3">
                <div class="bg-slate-50 rounded-xl p-3 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-base shrink-0">🪑</div>
                    <div>
                        <p class="text-xs text-slate-400">Table</p>
                        <p class="text-sm font-semibold text-slate-800">{{ order.table || '—' }}</p>
                    </div>
                </div>
                <div class="bg-slate-50 rounded-xl p-3 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-base shrink-0">👤</div>
                    <div>
                        <p class="text-xs text-slate-400">Client</p>
                        <p class="text-sm font-semibold text-slate-800">{{ order.client || '—' }}</p>
                    </div>
                </div>
            </div>

            <!-- Plats commandés -->
            <div>
                <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Plats commandés</p>
                <div class="space-y-2">
                    <div v-for="(plate, i) in order.plates" :key="i"
                        class="border border-slate-100 rounded-xl overflow-hidden">
                        <!-- Ligne principale du plat -->
                        <div class="flex items-center justify-between px-4 py-3 bg-white">
                            <div class="flex items-center gap-3">
                                <span class="w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-semibold flex items-center justify-center shrink-0">
                                    {{ i + 1 }}
                                </span>
                                <div>
                                    <p class="text-sm font-medium text-slate-800">{{ plate.name }}</p>
                                    <p class="text-xs text-slate-400">
                                        {{ plate.qty ?? 1 }} × {{ formatPrice(plate.price) }}
                                    </p>
                                </div>
                            </div>
                            <p class="text-sm font-semibold text-slate-700 whitespace-nowrap ml-4">
                                {{ formatPrice(plateTotal(plate)) }}
                            </p>
                        </div>
                        <!-- Compléments -->
                        <div v-if="getComplements(plate).length"
                            class="border-t border-slate-100 bg-slate-50 px-4 py-2 space-y-1">
                            <div v-for="(c, ci) in getComplements(plate)" :key="ci"
                                class="flex items-center justify-between text-xs text-slate-500">
                                <span class="flex items-center gap-1.5">
                                    <span class="text-slate-300">└</span>
                                    {{ c.name }}
                                    <span class="text-slate-400">× {{ c.qty ?? 1 }}</span>
                                </span>
                                <span class="font-medium">{{ formatPrice((c.qty ?? 1) * (c.price ?? 0)) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Commentaires -->
            <div v-if="order.comments"
                class="flex gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4">
                <span class="text-amber-400 text-base shrink-0">💬</span>
                <p class="text-sm text-slate-600 italic">{{ order.comments }}</p>
            </div>
        </div>

        <!-- Footer total -->
        <div class="px-6 py-4 border-t border-slate-100 bg-white rounded-b-2xl flex items-center justify-between">
            <p class="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total de la commande</p>
            <p class="text-xl font-bold text-slate-900">{{ formatPrice(order.total) }}</p>
        </div>
    </FormBackGround>
</template>
