<script setup>
import { onMounted, ref } from 'vue';
import Table from '../../components/Table.vue';
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue';
import ActivityTableContainer from '../../components/ActivityTableContainer.vue';
import OrderForm from '../../components/OrderForm.vue';
import OrderView from '../../components/OrderView.vue';
import OrderCard from '../../components/OrderCard.vue';
import Toast from '../../components/Toast.vue';
import { createOrder, deleteOrder, listOrders, updateOrder } from '../../services/orders';

const orderColumns = [
    { label: 'Commande', key: 'order_id' },
    { label: 'N° de table', key: 'table' },
    { label: 'Type de commande', key: 'type' },
    { label: 'Plats', key: 'plates', type: 'plates' },
    { label: 'Total', key: 'total', type: 'price' },
    { label: 'Etat du paiement', key: 'payment', type: 'payment' },
];

const orders = ref([]);
const is_loading = ref(false);
const is_submitting = ref(false);

const switch_form = ref(false);
const switch_update_form = ref(false);
const switch_view = ref(false);
const selected_order = ref(null);
const show_toast = ref(false);
const toast_message = ref('');
const toast_type = ref('success');

const show_active_only = ref(false);
const data = localStorage.getItem('user_authenticated');
const isAuthenticated = data ? JSON.parse(data) : null;
const database = isAuthenticated?.user?.database || '';

const loadOrders = async () => {
    is_loading.value = true;

    try {
        const response = await listOrders(database);
        orders.value = response.orders || [];
    } catch (error) {
        toast_type.value = 'error';
        toast_message.value = error.message || "Le chargement des commandes a echoue.";
        show_toast.value = true;
    } finally {
        is_loading.value = false;
    }
};

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
    if (value.payment === 'Payé') {
        toast_message.value = `"${value.order_id}" est deja payee et ne peut plus etre modifiee.`;
        toast_type.value = 'error';
        show_toast.value = true;
        return;
    }
    switch_form.value = false;
    selected_order.value = value;
    switch_update_form.value = true;
};
const close_update_form = () => {
    switch_update_form.value = false;
    selected_order.value = null;
};

const saveOrder = async (orderPayload) => {
    const index = orders.value.findIndex(o => o.id === orderPayload.id);
    const isUpdate = index !== -1;
    is_submitting.value = true;

    try {
        if (isUpdate) {
            const response = await updateOrder(orderPayload.id, orderPayload);
            orders.value.splice(index, 1, response.order);
            close_update_form();
            toast_message.value = `"${response.order.order_id}" a ete modifiee.`;
        } else {
            const response = await createOrder(orderPayload);
            orders.value.unshift(response.order);
            close_form();
            toast_message.value = `"${response.order.order_id}" a ete ajoutee.`;
        }
        toast_type.value = 'success';
    } catch (error) {
        toast_type.value = 'error';
        toast_message.value = error.message || "L'enregistrement de la commande a echoue.";
    } finally {
        is_submitting.value = false;
        show_toast.value = true;
    }
};

const requestDelete = async (value) => {
    is_submitting.value = true;

    try {
        await deleteOrder(value.id, database);
        const index = orders.value.findIndex(o => o.id === value.id);
        if (index !== -1) {
            orders.value.splice(index, 1);
        }
        toast_type.value = 'success';
        toast_message.value = `"${value.order_id}" a ete supprimee.`;
    } catch (error) {
        toast_type.value = 'error';
        toast_message.value = error.message || "La suppression de la commande a echoue.";
    } finally {
        is_submitting.value = false;
        show_toast.value = true;
    }
};

onMounted(() => {
    loadOrders();
});
</script>

<template>
    <AuthenticatedLayoutAdmin :title="'Commandes'" :mean="'Gestion de vos commandes'">
        <Transition name="page" mode="out-in" appear>
            <ActivityTableContainer
                :title="'Liste des commandes'"
                :description="'Gestion des commandes'"
                :has-button="true"
                :button-title="'Ajouter une commande'"
                @on-click="open_form"
            >
                <template #search&switch>
                    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                        <label class="inline-flex items-center gap-3 select-none cursor-pointer">
                            <span class="text-sm text-slate-700">Tableau</span>
                            <input type="checkbox" v-model="show_active_only" class="sr-only peer" />
                            <div class="relative h-6 w-11 rounded-full bg-slate-200 transition-colors peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-slate-400 peer-checked:bg-slate-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5"></div>
                            <span class="text-sm text-slate-700">Cartes</span>
                        </label>
                        <input type="text" placeholder="Recherche" class="w-full max-w-xs p-2 px-4 border rounded-xl text-sm outline-none focus:border-slate-400" />
                    </div>
                </template>

                <Transition name="fade" mode="out-in">
                    <div v-if="is_loading" class="p-6 text-sm text-slate-500">
                        Chargement des commandes...
                    </div>
                    <Table
                        v-else-if="!show_active_only"
                        :data="orders"
                        :columns="orderColumns"
                        @edit="open_update_form"
                        @view="open_view"
                        :has_update_button="true"
                        :has_view_button="true"
                        :has_toggle="false"
                        :has_delete_button="true"
                        @delete="requestDelete"
                    />
                    <div v-else class="p-6">
                        <OrderCard :orders="orders" @view="open_view" @edit="open_update_form" @delete="requestDelete" />
                    </div>
                </Transition>
            </ActivityTableContainer>
        </Transition>

        <Transition name="slide-up">
            <OrderView v-if="switch_view" :order="selected_order" @close="close_view" />
        </Transition>
        <Transition name="slide-up">
            <OrderForm v-if="switch_form" :is-submitting="is_submitting" @create="saveOrder" @on-close="close_form" />
        </Transition>
        <Transition name="slide-up">
            <OrderForm
                v-if="switch_update_form"
                :order="selected_order"
                :is-submitting="is_submitting"
                @create="saveOrder"
                @on-close="close_update_form"
            />
        </Transition>

        <Toast v-if="show_toast" :type="toast_type" :message="toast_message" @close="show_toast = false" />
    </AuthenticatedLayoutAdmin>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(6px);
}

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
