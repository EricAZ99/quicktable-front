<script setup>
import Table from '../../components/Table.vue';
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue';
import { orders as ordersDaras } from '../../data/menus';
import { ref } from 'vue';
import ActivityTableContainer from '../../components/ActivityTableContainer.vue';
import OrderForm from '../../components/OrderForm.vue';
import OrderView from '../../components/OrderView.vue';
import Toast from '../../components/Toast.vue';

const orderColumns = [
    { label: 'Commande', key: 'order_id' },
    { label: 'N° de table', key: 'table' },
    { label: 'Type de commande', key: 'type' },
    // { label: 'Nom du client', key: 'client' },
    { label: 'Plats', key: 'plates', type: 'plates' },
    // { label: 'Statut', key: 'stat', type: 'status' },
    // { label: 'Etat du paiement', key: 'payment', type: 'payment' },
    { label: 'Total', key: 'total', type: 'price' },
];

const orders = ref([...ordersDaras]);

const switch_form = ref(false);
const switch_update_form = ref(false);
const switch_view = ref(false);
const selected_order = ref(null);
const show_toast = ref(false);
const toast_message = ref('');

const open_view = (value) => {
    switch_form.value = false;
    switch_update_form.value = false;
    selected_order.value = value;
    switch_view.value = true;
};
const close_view = () => {
    switch_view.value = false;
    selected_order.value = null;
};

const open_form = () => {
    switch_update_form.value = false;
    selected_order.value = null;
    switch_form.value = true;
};
const close_form = () => { switch_form.value = false; };

const open_update_form = (value) => {
    switch_form.value = false;
    selected_order.value = value;
    switch_update_form.value = true;
};
const close_update_form = () => {
    switch_update_form.value = false;
    selected_order.value = null;
};

const saveOrder = (orderPayload) => {
    const index = orders.value.findIndex(o => o.order_id === orderPayload.order_id);
    const isUpdate = index !== -1;

    if (isUpdate) {
        orders.value.splice(index, 1, orderPayload);
        close_update_form();
        toast_message.value = `« ${orderPayload.order_id} » a été modifiée.`;
    } else {
        orders.value.push(orderPayload);
        close_form();
        toast_message.value = `« ${orderPayload.order_id} » a été ajoutée.`;
    }

    show_toast.value = true;
};

const requestDelete = (value) => {
    const index = orders.value.findIndex(o => o.order_id === value.order_id);
    if (index !== -1) orders.value.splice(index, 1);
    toast_message.value = `« ${value.order_id} » a été supprimée.`;
    show_toast.value = true;
};
</script>

<template>
    <AuthenticatedLayoutAdmin :title="'Commandes'" :mean="'Gestion de vos commandes'">
        <Transition name="page" mode="out-in" appear>
            <ActivityTableContainer :title="'Liste des commandes'" :description="'Gestion des commandes'"
                :has-button="true" :button-title="'Ajouter une commande'" @on-click="open_form">
                <template #search&switch>
                    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                        <input type="text" placeholder="Recherche"
                            class="w-full max-w-xs p-2 px-4 border rounded-xl text-sm outline-none focus:border-slate-400" />
                    </div>
                </template>

                <Table :data="orders" :columns="orderColumns" @edit="open_update_form" @view="open_view" :has_update_button="true"
                    :has_view_button="true" :has_toggle="false" @delete="requestDelete">
                </Table>
            </ActivityTableContainer>
        </Transition>

        <Transition name="slide-up">
            <OrderView v-if="switch_view" :order="selected_order" @close="close_view" />
        </Transition>
        <Transition name="slide-up">
            <OrderForm v-if="switch_form" @create="saveOrder" @on-close="close_form" />
        </Transition>
        <Transition name="slide-up">
            <OrderForm v-if="switch_update_form" :order="selected_order" @create="saveOrder"
                @on-close="close_update_form" />
        </Transition>

        <Toast v-if="show_toast" type="success" :message="toast_message" @close="show_toast = false" />
    </AuthenticatedLayoutAdmin>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
    opacity: 0;
    transform: translateY(16px);
}
</style>
