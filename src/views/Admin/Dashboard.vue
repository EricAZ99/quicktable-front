<script setup>
import { computed } from 'vue'
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue';
import StatCard from '../../components/StatCard.vue';


const stats = computed(() => [
  { title: 'Commandes (7j)', value: '12,345', change: '+12%', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-12 w-12" fill="currentColor"><path d="M5.26 11H18.74L18.07 20H5.93L5.26 11M9 4H14.97L19 7.38L20.59 5.79L22 7.21L19.21 10H4.79L2 7.21L3.41 5.8L5 7.38L9 4Z" /></svg>' },
  { title: 'CA (7j)', value: '56,789', change: '+5%', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-12 w-12" fill="currentColor"><path d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" /></svg>' },
  { title: 'Tables actives', value: '14', change: 'En service', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-12 w-12" fill="currentColor"><path d="M12 22H6A2 2 0 0 1 8 20V8H2V5H16V8H10V20A2 2 0 0 1 12 22M22 2V22H20V15H15V22H13V14A2 2 0 0 1 15 12H20V2Z" /></svg>' },
  { title: 'Alertes', value: '3', change: 'A traiter', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-12 w-12" fill="currentColor"><path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21" /></svg>' },
])
</script>

<template>
  <div class="h-full">
    <AuthenticatedLayoutAdmin :title="'Tableau de bord'">
      <div class="rounded-2xl flex justify-between gap-6">
        <StatCard v-for="(stat, index) in stats" :key="index" :stat="stat"></StatCard>
      </div>
    </AuthenticatedLayoutAdmin>
  </div>
</template>
