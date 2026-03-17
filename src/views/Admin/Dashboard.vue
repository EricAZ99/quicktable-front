<script setup>
/**
 * Dashboard
 * Vue principale du tableau de bord administrateur.
 * Affiche les statistiques clés, le graphique des commandes,
 * le top menus, l'état des tables et les activités récentes.
 */
import { computed } from 'vue'
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue';
import RecentsActivityTable from '../../components/RecentsActivityTable.vue';
import { menus as menusData, tables as tablesData } from '../../data/menus.js';

// --- Statistiques ---
/** Cartes de statistiques principales affichées en haut du dashboard */
const stats = computed(() => [
    {
        title: 'Commandes (7j)', value: '248', change: '+12% vs semaine passée',
        color: 'text-violet-600', bg: 'bg-violet-50',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"><path d="M5.26 11H18.74L18.07 20H5.93L5.26 11M9 4H14.97L19 7.38L20.59 5.79L22 7.21L19.21 10H4.79L2 7.21L3.41 5.8L5 7.38L9 4Z" /></svg>'
    },
    {
        title: "Chiffre d'affaires", value: '3 420 €', change: '+5% vs semaine passée',
        color: 'text-emerald-600', bg: 'bg-emerald-50',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"><path d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" /></svg>'
    },
    {
        title: 'Tables occupées',
        value: `${tablesData.filter(t => t.stat === 'Occupée').length} / ${tablesData.length}`,
        change: 'En ce moment',
        color: 'text-sky-600', bg: 'bg-sky-50',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"><path d="M12 22H6A2 2 0 0 1 8 20V8H2V5H16V8H10V20A2 2 0 0 1 12 22M22 2V22H20V15H15V22H13V14A2 2 0 0 1 15 12H20V2Z" /></svg>'
    },
    {
        title: 'Menus actifs',
        value: `${menusData.filter(m => m.active).length}`,
        change: `sur ${menusData.length} menus`,
        color: 'text-amber-600', bg: 'bg-amber-50',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"><path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21" /></svg>'
    },
])

// --- Graphique ---
/** Labels des jours pour l'axe X du graphique */
const chart_days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
/** Nombre de commandes par jour sur les 7 derniers jours */
const chart_values = [28, 42, 35, 55, 48, 72, 61]
/** Valeur maximale utilisée pour calculer la hauteur relative des barres */
const chart_max = Math.max(...chart_values)

// --- Top menus ---
/** Top 5 des menus les plus commandés cette semaine */
const top_menus = computed(() => [
    { name: 'Burger Classic', orders: 87, pct: 87 },
    { name: 'Pizza Margherita', orders: 74, pct: 74 },
    { name: 'Tacos Poulet', orders: 61, pct: 61 },
    { name: 'Pâtes Carbonara', orders: 48, pct: 48 },
    { name: 'Salade César', orders: 35, pct: 35 },
])

// --- Tables ---
/** État en temps réel des tables, issu des données statiques */
const tables_status = computed(() => tablesData)

// --- Activités ---
/** Liste des dernières activités affichées dans le fil d'événements */
const recents_activities = [
    { title: 'Nouvelle commande #248', description: 'Table n°2 — 3 articles', time: 'Il y a 3 min' },
    { title: 'Table n°1 libérée', description: 'La table est de nouveau disponible', time: 'Il y a 12 min' },
    { title: 'Menu Burger Classic épuisé', description: 'Stock insuffisant signalé', time: 'Il y a 30 min' },
    { title: 'Nouvelle commande #247', description: 'Table n°4 — 2 articles', time: 'Il y a 45 min' },
    { title: 'Paiement reçu #246', description: '18 € — Table n°3', time: 'Il y a 1h' },
    { title: 'Paiement reçu #246', description: '18 € — Table n°3', time: 'Il y a 1h' },
    { title: 'Paiement reçu #246', description: '18 € — Table n°3', time: 'Il y a 1h' },
    { title: 'Paiement reçu #246', description: '18 € — Table n°3', time: 'Il y a 1h' },
    { title: 'Paiement reçu #246', description: '18 € — Table n°3', time: 'Il y a 1h' },
    { title: 'Paiement reçu #246', description: '18 € — Table n°3', time: 'Il y a 1h' },
    { title: 'Paiement reçu #246', description: '18 € — Table n°3', time: 'Il y a 1h' },
    { title: 'Paiement reçu #246', description: '18 € — Table n°3', time: 'Il y a 1h' },
    { title: 'Paiement reçu #246', description: '18 € — Table n°3', time: 'Il y a 1h' },
    { title: 'Paiement reçu #246', description: '18 € — Table n°3', time: 'Il y a 1h' },
    { title: 'Paiement reçu #246', description: '18 € — Table n°3', time: 'Il y a 1h' },
    { title: 'Paiement reçu #246', description: '18 € — Table n°3', time: 'Il y a 1h' },
    { title: 'Paiement reçu #246', description: '18 € — Table n°3', time: 'Il y a 1h' },
    { title: 'Paiement reçu #246', description: '18 € — Table n°3', time: 'Il y a 1h' },
    { title: 'Paiement reçu #246', description: '18 € — Table n°3', time: 'Il y a 1h' },
    { title: 'Paiement reçu #246', description: '18 € — Table n°3', time: 'Il y a 1h' },
    { title: 'Paiement reçu #246', description: '18 € — Table n°3', time: 'Il y a 1h' },
]
</script>

<template>
    <div class="xl:h-full xl:overflow-hidden">
        <AuthenticatedLayoutAdmin :title="'Tableau de bord'" :mean="'Vue d\'ensemble de votre activité'">
            <Transition name="page" mode="out-in" appear>

            <!-- Conteneur principal : colonne scrollable sur mobile, fixe sur desktop -->
            <div class="flex flex-col gap-4 xl:h-full xl:overflow-hidden pb-6 xl:pb-0">

                <!-- Cartes de statistiques : 1 col mobile, 2 col tablet, 4 col desktop -->
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 shrink-0">
                    <div v-for="(stat, i) in stats" :key="i"
                        class="bg-white rounded-2xl border p-3 flex items-center gap-3">
                        <div :class="[stat.bg, stat.color, 'w-9 h-9 rounded-xl flex items-center justify-center shrink-0']"
                            v-html="stat.icon" />
                        <div class="min-w-0">
                            <p class="text-xs text-slate-500 truncate">{{ stat.title }}</p>
                            <p class="text-lg font-bold text-slate-800 leading-tight">{{ stat.value }}</p>
                            <p class="text-xs text-slate-400 truncate">{{ stat.change }}</p>
                        </div>
                    </div>
                </div>

                <!-- Graphique + Top menus : empilés sur mobile/tablet, côte à côte sur desktop -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 xl:min-h-0 xl:flex-1">

                    <!-- Graphique des commandes : pleine largeur mobile, 2/3 desktop -->
                    <div class="md:col-span-2 bg-white rounded-2xl border p-4 flex flex-col" style="min-height:200px">
                        <p class="font-semibold text-slate-800 text-sm">Commandes — 7 derniers jours</p>
                        <p class="text-xs text-slate-400 mb-3">Nombre de commandes par jour</p>
                        <div class="flex items-end gap-2 h-32 xl:flex-1 xl:min-h-0">
                            <!-- Barre pour chaque jour, hauteur proportionnelle à chart_max -->
                            <div v-for="(val, i) in chart_values" :key="i"
                                class="flex-1 flex flex-col items-center gap-1 h-full">
                                <span class="text-xs text-slate-500">{{ val }}</span>
                                <div class="w-full rounded-t-lg bg-slate-800 transition-all duration-500"
                                    :style="{ height: (val / chart_max * 100) + '%' }" />
                                <span class="text-xs text-slate-400">{{ chart_days[i] }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Top 5 menus : pleine largeur mobile, 1/3 desktop -->
                    <div class="bg-white rounded-2xl border p-4 flex flex-col">
                        <p class="font-semibold text-slate-800 text-sm">Top menus</p>
                        <p class="text-xs text-slate-400 mb-3">Les plus commandés cette semaine</p>
                        <div class="flex flex-col gap-3 flex-1 justify-center">
                            <div v-for="(menu, i) in top_menus" :key="i">
                                <div class="flex justify-between text-xs text-slate-600 mb-1">
                                    <span class="truncate">{{ menu.name }}</span>
                                    <span class="font-semibold text-slate-800 ml-2">{{ menu.orders }}</span>
                                </div>
                                <!-- Barre de progression proportionnelle au menu le plus commandé (100%) -->
                                <div class="h-1.5 bg-slate-100 rounded-full">
                                    <div class="h-full bg-slate-800 rounded-full transition-all duration-500"
                                        :style="{ width: menu.pct + '%' }" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Activités + État des tables : empilés sur mobile, côte à côte sur desktop -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 xl:min-h-0 xl:flex-1">

                    <!-- Fil des dernières activités : pleine largeur mobile, 2/3 desktop -->
                    <div class="md:col-span-2 bg-white rounded-2xl border p-4 flex flex-col">
                        <p class="font-semibold text-slate-800 text-sm mb-1">Activités récentes</p>
                        <p class="text-xs text-slate-400 mb-3">Derniers événements importants.</p>
                        <div class="flex flex-col overflow-y-auto max-h-48 xl:max-h-none xl:overflow-hidden">
                            <div v-for="(activity, i) in recents_activities" :key="i"
                                class="flex justify-between items-start py-2"
                                :class="i < recents_activities.length - 1 ? 'border-b' : ''">
                                <div class="flex flex-col">
                                    <span class="text-sm font-semibold text-slate-800">{{ activity.title }}</span>
                                    <span class="text-xs text-slate-500">{{ activity.description }}</span>
                                </div>
                                <span class="text-xs text-slate-400 shrink-0 ml-4">{{ activity.time }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Grille des tables : pleine largeur mobile, 1/3 desktop -->
                    <div class="bg-white rounded-2xl border p-4 flex flex-col">
                        <p class="font-semibold text-slate-800 text-sm mb-1">État des tables</p>
                        <p class="text-xs text-slate-400 mb-3">Disponibilité en temps réel</p>
                        <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 gap-2">
                            <!-- Badge vert = libre, rouge = occupée -->
                            <div v-for="table in tables_status" :key="table.id"
                                class="rounded-xl border p-1 flex flex-col gap-0.5"
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
    </div>
</template>

<style scoped>
.scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
</style>
