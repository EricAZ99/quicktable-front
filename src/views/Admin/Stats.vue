<script setup>
import { computed, ref } from 'vue'
import { Doughnut, Bar } from 'vue-chartjs'
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend,
    CategoryScale, LinearScale, BarElement, Title
} from 'chart.js'
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue'
import { menus as menusData, tables as tablesData, orders, plates } from '../../data/menus.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const period = ref('all')
const periods = [
    { key: 'today', label: "Aujourd'hui" },
    { key: '7j', label: '7 derniers jours' },
    { key: 'all', label: 'Tout' },
]

const filteredOrders = computed(() => orders)

const totalRevenue = computed(() => filteredOrders.value.filter(o => o.payment === 'Payé').reduce((s, o) => s + o.total, 0))
const totalOrders = computed(() => filteredOrders.value.length)
const paidOrders = computed(() => filteredOrders.value.filter(o => o.payment === 'Payé').length)
const cancelledOrders = computed(() => filteredOrders.value.filter(o => o.stat === 'Annulé').length)
const avgOrder = computed(() => paidOrders.value ? Math.round(totalRevenue.value / paidOrders.value) : 0)
const conversionRate = computed(() => totalOrders.value ? Math.round(paidOrders.value / totalOrders.value * 100) : 0)

const kpis = computed(() => [
    {
        title: "Chiffre d'affaires", value: totalRevenue.value.toLocaleString('fr-FR') + ' FCFA',
        change: `${paidOrders.value} commandes payées`, color: 'text-emerald-600', bg: 'bg-emerald-50',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"><path d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/></svg>'
    },
    {
        title: 'Total commandes', value: totalOrders.value,
        change: `${cancelledOrders.value} annulée(s)`, color: 'text-violet-600', bg: 'bg-violet-50',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"><path d="M5.26 11H18.74L18.07 20H5.93L5.26 11M9 4H14.97L19 7.38L20.59 5.79L22 7.21L19.21 10H4.79L2 7.21L3.41 5.8L5 7.38L9 4Z"/></svg>'
    },
    {
        title: 'Panier moyen', value: avgOrder.value.toLocaleString('fr-FR') + ' FCFA',
        change: 'Par commande payée', color: 'text-sky-600', bg: 'bg-sky-50',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"><path d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2Z"/></svg>'
    },
    {
        title: 'Taux de conversion', value: conversionRate.value + '%',
        change: `${paidOrders.value} / ${totalOrders.value} commandes`, color: 'text-amber-600', bg: 'bg-amber-50',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"><path d="M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8Z"/></svg>'
    },
])

// --- Doughnut : statuts commandes ---
const statusMap = computed(() => {
    const map = {}
    filteredOrders.value.forEach(o => { map[o.stat] = (map[o.stat] || 0) + 1 })
    return map
})
const statusColors = { 'Prêt': '#10b981', 'Servi': '#0ea5e9', 'En préparation': '#f59e0b', 'En attente': '#94a3b8', 'Annulé': '#f87171' }
const doughnutData = computed(() => ({
    labels: Object.keys(statusMap.value),
    datasets: [{
        data: Object.values(statusMap.value),
        backgroundColor: Object.keys(statusMap.value).map(k => statusColors[k] || '#cbd5e1'),
        borderWidth: 2,
        borderColor: '#fff',
    }]
}))
const doughnutOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } },
    cutout: '65%'
}

// --- Bar : top plats ---
const topPlatesData = computed(() => {
    const map = {}
    filteredOrders.value.forEach(o => o.plates.forEach(p => { map[p.name] = (map[p.name] || 0) + 1 }))
    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 6)
    return {
        labels: sorted.map(([name]) => name),
        datasets: [{
            label: 'Commandes',
            data: sorted.map(([, count]) => count),
            backgroundColor: '#1e293b',
            borderRadius: 6,
        }]
    }
})
const barOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { grid: { color: '#f1f5f9' }, ticks: { stepSize: 1, font: { size: 11 } } }
    }
}

// --- Bar horizontale : CA par type ---
const revenueByTypeData = computed(() => {
    const map = {}
    filteredOrders.value.filter(o => o.payment === 'Payé').forEach(o => { map[o.type] = (map[o.type] || 0) + o.total })
    return {
        labels: Object.keys(map),
        datasets: [{
            label: 'CA (FCFA)',
            data: Object.values(map),
            backgroundColor: ['#8b5cf6', '#0ea5e9'],
            borderRadius: 6,
        }]
    }
})

// --- Bar horizontale : CA par catégorie ---
const revenueByCatData = computed(() => {
    const map = {}
    filteredOrders.value.filter(o => o.payment === 'Payé').forEach(o => {
        o.plates.forEach(p => {
            const plate = plates.find(pl => pl.name === p.name)
            const cat = plate?.category || 'Autre'
            map[cat] = (map[cat] || 0) + p.price
        })
    })
    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1])
    const palette = ['#f59e0b', '#10b981', '#8b5cf6', '#0ea5e9', '#f87171', '#94a3b8']
    return {
        labels: sorted.map(([cat]) => cat),
        datasets: [{
            label: 'CA (FCFA)',
            data: sorted.map(([, v]) => v),
            backgroundColor: sorted.map((_, i) => palette[i % palette.length]),
            borderRadius: 6,
        }]
    }
})

const hBarOptions = {
    indexAxis: 'y',
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        x: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 11 } } },
        y: { grid: { display: false }, ticks: { font: { size: 11 } } }
    }
}

const tablesOccupied = computed(() => tablesData.filter(t => t.stat === 'Occupée').length)
</script>

<template>
    <AuthenticatedLayoutAdmin :title="'Statistiques'" :mean="'Vue d\'ensemble de vos performances'">
        <Transition name="page" mode="out-in" appear>
            <div class="flex flex-col gap-4 pb-6">

                <!-- Filtre période -->
                <div class="flex items-center gap-2">
                    <button v-for="p in periods" :key="p.key" @click="period = p.key"
                        class="px-3 py-1.5 rounded-xl text-xs font-medium border transition-all"
                        :class="period === p.key
                            ? 'bg-slate-800 text-white border-slate-800'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'">
                        {{ p.label }}
                    </button>
                </div>

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

                <!-- Doughnut statuts + Bar top plats -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">

                    <div class="bg-white rounded-2xl border p-4 flex flex-col">
                        <p class="font-semibold text-slate-800 text-sm">Statuts des commandes</p>
                        <p class="text-xs text-slate-400 mb-4">Répartition par état</p>
                        <div class="relative h-56">
                            <Doughnut :data="doughnutData" :options="doughnutOptions" />
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl border p-4 flex flex-col">
                        <p class="font-semibold text-slate-800 text-sm">Top plats commandés</p>
                        <p class="text-xs text-slate-400 mb-4">Les plus populaires</p>
                        <div class="relative h-56">
                            <Bar :data="topPlatesData" :options="barOptions" />
                        </div>
                    </div>
                </div>

                <!-- CA par type + CA par catégorie -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">

                    <div class="bg-white rounded-2xl border p-4 flex flex-col">
                        <p class="font-semibold text-slate-800 text-sm">CA par type de commande</p>
                        <p class="text-xs text-slate-400 mb-4">Sur place vs Emporté</p>
                        <div class="relative h-40">
                            <Bar :data="revenueByTypeData" :options="hBarOptions" />
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl border p-4 flex flex-col">
                        <p class="font-semibold text-slate-800 text-sm">CA par catégorie de plat</p>
                        <p class="text-xs text-slate-400 mb-4">Revenus par type de plat</p>
                        <div class="relative h-40">
                            <Bar :data="revenueByCatData" :options="hBarOptions" />
                        </div>
                    </div>
                </div>

                <!-- État des tables -->
                <div class="bg-white rounded-2xl border p-4">
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <p class="font-semibold text-slate-800 text-sm">État des tables</p>
                            <p class="text-xs text-slate-400">{{ tablesOccupied }} occupée(s) sur {{ tablesData.length }}</p>
                        </div>
                        <div class="flex items-center gap-3 text-xs text-slate-500">
                            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Libre</span>
                            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-red-400 inline-block" /> Occupée</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 xl:grid-cols-8 gap-2">
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
        </Transition>
    </AuthenticatedLayoutAdmin>
</template>
