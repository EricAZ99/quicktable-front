<script setup>
import Table from '../../components/Table.vue';
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue';
import { orders as ordersDaras } from '../../data/menus';
import { ref } from 'vue';
import ActivityTableContainer from '../../components/ActivityTableContainer.vue';
const orderColumns = [
    { label: 'Commande', key: 'order_id' },
    { label: 'N° de table', key: 'table' },
    { label: 'Nom du client', key: 'client' },
    { label: 'Plats', key: 'plates', type: 'plates' },
    { label: 'Statut', key: 'stat', type: 'status' },
    { label: 'Etat du paiement', key: 'payment', type: 'payment' },
    { label: 'Total', key: 'total', type: 'price' },
]

const orders = ref([...ordersDaras]);



</script>

<template>
    <AuthenticatedLayoutAdmin :title="'Commandes'" :mean="'Gestion de vos commandes'">
        <ActivityTableContainer :title="'Liste des commandes'" :description="'Gestion des commandes'" :has-button="true"
            :button-title="'Ajouter une commande'" @on-click="open_form">
            <template #search&switch>
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <input type="text" placeholder="Recherche"
                        class="w-full max-w-xs p-2 px-4 border rounded-xl text-sm outline-none focus:border-slate-400" />
                </div>
            </template>
            <Transition name="page" mode="out-in" appear>
                <Transition name="fade" mode="out-in">
                    <!-- Tableau des plats -->
                    <Table :data="orders" :columns="orderColumns" @edit="open_update_form" :has_update_button="true"
                        :has_view_button="true" :has_toggle="false" @delete="requestDelete">
                    </Table>
                </Transition>
            </Transition>
        </ActivityTableContainer>
    </AuthenticatedLayoutAdmin>
</template>