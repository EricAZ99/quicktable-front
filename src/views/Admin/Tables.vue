<script setup>
import { onMounted, ref } from 'vue';
import ActivityTableContainer from '../../components/ActivityTableContainer.vue';
import Table from '../../components/Table.vue';
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue';
import TableCard from '../../components/TableCard.vue';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal.vue';
import TableView from '../../components/TableView.vue';
import Toast from '../../components/Toast.vue';
import TableForm from '../../components/TableForm.vue';
import { createTable, deleteTable, listTables, updateTable } from '../../services/tables.js';

const show_toast = ref(false);
const toast_message = ref('');
const toast_type = ref('success');
const is_submitting = ref(false);
const is_loading = ref(false);

const confirm_delete = ref(false);
const table_to_delete = ref(null);

const switch_view_form = ref(false);
const selected_table = ref(null);
const close_view_form = () => {
    switch_view_form.value = false;
    selected_table.value = null;
};
const open_view_form = (value) => {
    selected_table.value = value;
    switch_view_form.value = true;
};

const switch_form = ref(false);
const open_form = () => {
    switch_form.value = true;
    switch_update_form.value = false;
    switch_view_form.value = false;
};
const close_form = () => {
    switch_form.value = false;
};

const switch_update_form = ref(false);
const open_update_form = (value) => {
    selected_table.value = value;
    switch_view_form.value = false;
    switch_form.value = false;
    switch_update_form.value = true;
};
const close_update_form = () => {
    switch_update_form.value = false;
    selected_table.value = null;
};

const show_active_only = ref(false);

const tableColumns = [
    { label: 'N° de table', key: 'name' },
    { label: 'Disponibilite', key: 'stat' },
    { label: 'Etat', key: 'active', type: 'boolean' },
];

const tables = ref([]);
const data = localStorage.getItem('user_authenticated');
const isAuthenticated = data ? JSON.parse(data) : null;
const database = isAuthenticated?.user?.database || '';

const loadTables = async () => {
    is_loading.value = true;

    try {
        const response = await listTables(database);
        tables.value = response.tables || [];
    } catch (error) {
        toast_type.value = 'error';
        toast_message.value = error.message || "Le chargement des tables a echoue.";
        show_toast.value = true;
    } finally {
        is_loading.value = false;
    }
};

const requestDelete = (value) => {
    table_to_delete.value = value;
    confirm_delete.value = true;
};

const confirmDelete = async () => {
    if (!table_to_delete.value) {
        return;
    }

    is_submitting.value = true;

    try {
        await deleteTable(table_to_delete.value.id, database);
        const index = tables.value.findIndex(t => t.id === table_to_delete.value.id);
        if (index !== -1) {
            tables.value.splice(index, 1);
        }
        toast_message.value = `"${table_to_delete.value.name}" a ete supprimee.`;
        toast_type.value = 'success';
        confirm_delete.value = false;
        table_to_delete.value = null;
    } catch (error) {
        toast_type.value = 'error';
        toast_message.value = error.message || "La suppression de la table a echoue.";
    } finally {
        is_submitting.value = false;
        show_toast.value = true;
    }
};

const cancelDelete = () => {
    confirm_delete.value = false;
    table_to_delete.value = null;
};

const saveTable = async (payload) => {
    const index = tables.value.findIndex(t => t.id === payload.id);

    if (index !== -1) {
        is_submitting.value = true;

        try {
            const response = await updateTable(payload.id, payload);
            tables.value.splice(index, 1, response.table);
            selected_table.value = response.table;
            close_update_form();
            toast_type.value = 'success';
            toast_message.value = `"${response.table.name}" a ete modifiee.`;
        } catch (error) {
            toast_type.value = 'error';
            toast_message.value = error.message || "La modification de la table a echoue.";
        } finally {
            is_submitting.value = false;
            show_toast.value = true;
        }
        return;
    }

    is_submitting.value = true;

    try {
        const response = await createTable(payload);
        tables.value.unshift(response.table);
        close_form();
        toast_type.value = 'success';
        toast_message.value = `"${response.table.name}" a ete ajoutee.`;
    } catch (error) {
        toast_type.value = 'error';
        toast_message.value = error.message || "La creation de la table a echoue.";
    } finally {
        is_submitting.value = false;
        show_toast.value = true;
    }
};

const activateTables = async (table) => {
    if (!table?.id) {
        return;
    }

    is_submitting.value = true;

    try {
        const response = await updateTable(table.id, {
            ...table,
            active: !table.active,
            database,
        });
        const index = tables.value.findIndex(item => item.id === table.id);
        if (index !== -1) {
            tables.value.splice(index, 1, response.table);
        }
        if (selected_table.value?.id === table.id) {
            selected_table.value = response.table;
        }
        toast_type.value = 'success';
        toast_message.value = response.table.active
            ? `"${response.table.name}" est maintenant active.`
            : `"${response.table.name}" est maintenant inactive.`;
    } catch (error) {
        toast_type.value = 'error';
        toast_message.value = error.message || "La mise a jour du statut de la table a echoue.";
    } finally {
        is_submitting.value = false;
        show_toast.value = true;
    }
};

onMounted(() => {
    loadTables();
});
</script>

<template>
    <div>
        <AuthenticatedLayoutAdmin :title="'Tables'" :mean="'Gestion de tables'">
            <Transition name="page" mode="out-in" appear>
                <ActivityTableContainer
                    :title="'Liste des tables'"
                    :description="'Gestion des tables'"
                    :has-button="true"
                    :button-title="'Ajouter une table'"
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
                        <div v-if="is_loading" class="p-6 text-sm text-slate-500">Chargement des tables...</div>
                        <Table
                            v-else-if="!show_active_only"
                            :data="tables"
                            :columns="tableColumns"
                            @view="open_view_form"
                            @edit="open_update_form"
                            @toggle-active="activateTables"
                            :has_view_button="true"
                            :has_update_button="true"
                            :has_delete_button="true"
                            :can_download="true"
                            @delete="requestDelete"
                        />
                        <div v-else class="p-6">
                            <TableCard :tables="tables" @view="open_view_form" @edit="open_update_form" @delete="requestDelete" />
                        </div>
                    </Transition>
                </ActivityTableContainer>
            </Transition>

            <ConfirmDeleteModal
                v-if="confirm_delete"
                :item-name="table_to_delete?.name"
                message="Voulez-vous vraiment supprimer cette table ? Cette action est irreversible."
                @confirm="confirmDelete"
                @cancel="cancelDelete"
            />
            <Toast v-if="show_toast" :type="toast_type" :message="toast_message" @close="show_toast = false" />

            <Transition name="slide-up" mode="out-in">
                <TableView v-if="switch_view_form" :table="selected_table" @close="close_view_form"></TableView>
            </Transition>
            <Transition name="slide-up" mode="out-in">
                <TableForm v-if="switch_form" :is-submitting="is_submitting" @create="saveTable" @on-close="close_form" />
            </Transition>
            <Transition name="slide-up" mode="out-in">
                <TableForm
                    v-if="switch_update_form"
                    :table="selected_table"
                    :is-submitting="is_submitting"
                    @create="saveTable"
                    @on-close="close_update_form"
                />
            </Transition>
        </AuthenticatedLayoutAdmin>
    </div>
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
