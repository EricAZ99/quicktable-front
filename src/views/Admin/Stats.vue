<script setup>
import { computed } from 'vue'
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue'
import ActivityTableContainer from '../../components/ActivityTableContainer.vue'
import { menus as menusData, tables as tablesData, orders, plates } from '../../data/menus.js'

// --- KPIs ---
const totalRevenue = computed(() => orders.filter(o => o.payment === 'Payé').reduce((s, o) => s + o.total, 0))
const totalOrders = computed(() => orders.length)
const paidOrders = computed(() => orders.filter(o => o.payment === 'Payé').length)
const cancelledOrders = computed(() => orders.filter(o => o.stat === 'Annulé').length)
const avgOrder = computed(() => paidOrders.value ? Math.round(totalRevenue.value / paidOrders.value) : 0)

const kpis = computed(() => [
    {
        title: "Chiffre d'affaires", value: totalRevenue.value.toLocaleString('fr-FR') + ' FCFA',
        change: `${paidOrders.value} commandes payées`,
        color: 'text-emerald-600', bg: 'bg-emerald-50',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"><path d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/></svg>'
    },
    {
        title: 'Total commandes', value: totalOrders.value,
        change: `${cancelledOrders.value} annulée(s)`,
        color: 'text-violet-600', bg: 'bg-violet-50',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"><path d="M5.26 11H18.74L18.07 20H5.93L5.26 11M9 4H14.97L19 7.38L20.59 5.79L22 7.21L19.21 10H4.79L2 7.21L3.41 5.8L5 7.38L9 4Z"/></svg>'
    },
    {
        title: 'Panier moyen', value: avgOrder.value.toLocaleString('fr-FR') + ' FCFA',
        change: 'Par commande payée',
        color: 'text-sky-600', bg: 'bg-sky-50',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"><path d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2Z"/></svg>'
    },
    {
        title: 'Menus actifs', value: menusData.filter(m => m.active).length,
        change: `sur ${menusData.length} menus`,
        color: 'text-amber-600', bg: 'bg-amber-50',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"><path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21"/></svg>'
    },
])

// --- Répartition des statuts de commandes ---
const statusStats = computed(() => {
    const map = {}
    orders.forEach(o => { map[o.stat] = (map[o.stat] || 0) + 1 })
    const colors = { 'Prêt': 'bg-emerald-500', 'Servi': 'bg-sky-500', 'En préparation': 'bg-amber-500', 'En attente': 'bg-slate-400', 'Annulé': 'bg-red-400' }
    return Object.entries(map).map(([stat, count]) => ({
        stat, count, pct: Math.round(count / orders.length * 100),
        color: colors[stat] || 'bg-slate-300'
    }))
})

// --- Top plats commandés ---
const topPlates = computed(() => {
    const map = {}
    orders.forEach(o => o.plates.forEach(p => { map[p.name] = (map[p.name] || 0) + 1 }))
    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5)
    const max = sorted[0]?.[1] || 1
    return sorted.map(([name, count]) => ({ name, count, pct: Math.round(count / max * 100) }))
})

// --- Répartition CA par type (Sur place / Emporté) ---
const revenueByType = computed(() => {
    const map = {}
    orders.filter(o => o.payment === 'Payé').forEach(o => { map[o.type] = (map[o.type] || 0) + o.total })
    const total = Object.values(map).reduce((s, v) => s + v, 0)
    return Object.entries(map).map(([type, amount]) => ({
        type, amount, pct: Math.round(amount / total * 100)
    }))
})

// --- Tables ---
const tablesOccupied = computed(() => tablesData.filter(t => t.stat === 'Occupée').length)
</script>

<template>
    <AuthenticatedLayoutAdmin :title="'Statistiques'" :mean="'Vue d\'ensemble de vos performances'">
        <Transition name="page" mode="out-in" appear>
            <div class="flex flex-col gap-4 pb-6">

                <!-- KPIs -->
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                    <div v-for="(kpi, i) in kpis" :key="i"
                        class="bg-white rounded-2xl border p-3 flex items-center gap-3">
                        <div :class="[kpi.bg, kpi.color, 'w-9 h-9 rounded-xl flex items-center justify-center shrink-0']"
                            v-html="kpi.icon" />
                        <div class="min-w-0">
                            <p class="text-xs text-slate-500 truncate">{{ kpi.title }}</p>
                            <p class="text-lg font-bold text-slate-800 leading-tight">{{ kpi.value }}</p>
                            <p class="text-xs text-slate-400 truncate">{{ kpi.change }}</p>
                        </div>
                    </div>
                </div>

                <!-- Statuts commandes + Top plats -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">

                    <!-- Répartition des statuts -->
                    <div class="bg-white rounded-2xl border p-4">
                        <p class="font-semibold text-slate-800 text-sm">Statuts des commandes</p>
                        <p class="text-xs text-slate-400 mb-4">Répartition par état</p>
                        <div class="flex flex-col gap-3">
                            <div v-for="(s, i) in statusStats" :key="i">
                                <div class="flex justify-between text-xs text-slate-600 mb-1">
                                    <span>{{ s.stat }}</span>
                                    <span class="font-semibold text-slate-800">{{ s.count }} ({{ s.pct }}%)</span>
                                </div>
                                <div class="h-2 bg-slate-100 rounded-full">
                                    <div :class="[s.color, 'h-full rounded-full transition-all duration-500']"
                                        :style="{ width: s.pct + '%' }" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Top plats -->
                    <div class="bg-white rounded-2xl border p-4">
                        <p class="font-semibold text-slate-800 text-sm">Top plats commandés</p>
                        <p class="text-xs text-slate-400 mb-4">Les plus populaires</p>
                        <div class="flex flex-col gap-3">
                            <div v-for="(p, i) in topPlates" :key="i">
                                <div class="flex justify-between text-xs text-slate-600 mb-1">
                                    <span class="truncate">{{ p.name }}</span>
                                    <span class="font-semibold text-slate-800 ml-2">{{ p.count }}x</span>
                                </div>
                                <div class="h-1.5 bg-slate-100 rounded-full">
                                    <div class="h-full bg-slate-800 rounded-full transition-all duration-500"
                                        :style="{ width: p.pct + '%' }" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CA par type + Tables -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">

                    <!-- CA par type de commande -->
                    <div class="bg-white rounded-2xl border p-4">
                        <p class="font-semibold text-slate-800 text-sm">CA par type de commande</p>
                        <p class="text-xs text-slate-400 mb-4">Sur place vs Emporté</p>
                        <div class="flex flex-col gap-4">
                            <div v-for="(r, i) in revenueByType" :key="i">
                                <div class="flex justify-between text-xs text-slate-600 mb-1">
                                    <span>{{ r.type }}</span>
                                    <span class="font-semibold text-slate-800">{{ r.amount.toLocaleString('fr-FR') }} FCFA ({{ r.pct }}%)</span>
                                </div>
                                <div class="h-2 bg-slate-100 rounded-full">
                                    <div class="h-full bg-violet-500 rounded-full transition-all duration-500"
                                        :style="{ width: r.pct + '%' }" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- État des tables -->
                    <div class="bg-white rounded-2xl border p-4">
                        <p class="font-semibold text-slate-800 text-sm">État des tables</p>
                        <p class="text-xs text-slate-400 mb-4">
                            {{ tablesOccupied }} occupée(s) sur {{ tablesData.length }}
                        </p>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            <div v-for="table in tablesData" :key="table.id"
                                class="rounded-xl border p-2 flex flex-col gap-0.5"
                                :class="table.stat === 'Occupée' ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'">
                                <span class="text-xs font-semibold"
                                    :class="table.stat === 'Occupée' ? 'text-red-700' : 'text-emerald-700'">
                                    {{ table.name }}
                                </span>
                                <span class="text-xs"
                                    :class="table.stat === 'Occupée' ? 'text-red-400' : 'text-emerald-400'">
                                    {{ table.stat }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Transition>
    </AuthenticatedLayoutAdmin>
</template>
