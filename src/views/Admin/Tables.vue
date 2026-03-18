<script setup>
import { ref } from 'vue';
import ActivityTableContainer from '../../components/ActivityTableContainer.vue';
import Table from '../../components/Table.vue';
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue';
import TableCard from '../../components/TableCard.vue';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal.vue';
import TableView from '../../components/TableView.vue';
import Toast from '../../components/Toast.vue';
import { tables as tablesData } from '../../data/menus.js';

// --- Toast ---
/** Contrôle la visibilité du toast de notification */
const show_toast = ref(false);
/** Message affiché dans le toast */
const toast_message = ref('');
/** Type du toast : 'success' | 'warning' */
const toast_type = ref('success');

// --- Suppression ---
/** Contrôle la visibilité du modal de confirmation de suppression */
const confirm_delete = ref(false);
/** Table en attente de suppression */
const table_to_delete = ref(null);

/** Stocke la table ciblée et affiche le modal de confirmation */
const requestDelete = (value) => {
    table_to_delete.value = value;
    confirm_delete.value = true;
};

/** Supprime la table confirmée, ferme le modal et affiche le toast de succès */
const confirmDelete = () => {
    const index = tables.value.findIndex(t => t.id === table_to_delete.value.id);
    if (index !== -1) tables.value.splice(index, 1);
    toast_message.value = `« ${table_to_delete.value.name} » a été supprimée.`;
    toast_type.value = 'success';
    confirm_delete.value = false;
    table_to_delete.value = null;
    show_toast.value = true;
};

/** Annule la suppression et ferme le modal */
const cancelDelete = () => {
    confirm_delete.value = false;
    table_to_delete.value = null;
};

// --- Prévisualisation ---
/** Contrôle la visibilité du panneau de prévisualisation d'une table */
const switch_view_form = ref(false);
/** Table sélectionnée pour prévisualisation */
const selected_table = ref(null);
/** Ferme le panneau de prévisualisation et réinitialise la sélection */
const close_view_form = () => {
    switch_view_form.value = false;
    selected_table.value = null;
};
/** Ouvre le panneau de prévisualisation avec la table sélectionnée */
const open_view_form = (value) => {
    selected_table.value = value;
    switch_view_form.value = true;
};

// --- Affichage ---
/** Bascule entre la vue tableau et la vue cartes */
const show_active_only = ref(false);

/** Définition des colonnes affichées dans le tableau */
const tableColumns = [
    { label: 'N° de table', key: 'name' },
    { label: 'Disponibilité', key: 'stat' },
    { label: 'Etat', key: 'active', type: 'boolean' },
]

// --- Données ---
/** Liste réactive des tables, initialisée depuis le fichier de données */
const tables = ref([...tablesData])

/** Ajoute une nouvelle table avec un numéro auto-incrémenté */
const add_table = () => {
    tables.value.push({
        id: tables.value.length + 1,
        name: `Table n°${tables.value.length + 1}`,
        stat: 'Libre',
        active: false,
    })
};
</script>

<template>
    <div>
        <AuthenticatedLayoutAdmin :title="'Tables'" :mean="'Gestion de tables'">
            <Transition name="page" mode="out-in" appear>
                <ActivityTableContainer :title="'Liste des tables'" :description="'Gestion des tables'"
                    :has-button="true" :button-title="'Ajouter une table'" @on-click="add_table">
                    <template #search&switch>
                        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                            <label class="inline-flex items-center gap-3 select-none cursor-pointer">
                                <span class="text-sm text-slate-700">Tableau</span>
                                <input type="checkbox" v-model="show_active_only" class="sr-only peer" />
                                <div class="relative h-6 w-11 rounded-full bg-slate-200 transition-colors peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-slate-400 peer-checked:bg-slate-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5"></div>
                                <span class="text-sm text-slate-700">Cartes</span>
                            </label>
                            <input type="text" placeholder="Recherche"
                                class="w-full max-w-xs p-2 px-4 border rounded-xl text-sm outline-none focus:border-slate-400" />
                        </div>
                    </template>

                    <Transition name="fade" mode="out-in">
                        <Table v-if="!show_active_only" :data="tables" :columns="tableColumns" @view="open_view_form"
                            :has_view_button="true" :has_delete_button="true" :can_download="true" @delete="requestDelete" />
                        <div v-else class="p-6">
                            <TableCard :tables="tables" @view="open_view_form" @delete="requestDelete" />
                        </div>
                    </Transition>
                </ActivityTableContainer>
            </Transition>



            <ConfirmDeleteModal v-if="confirm_delete" :item-name="table_to_delete?.name"
                message="Voulez-vous vraiment supprimer cette table ? Cette action est irréversible."
                @confirm="confirmDelete" @cancel="cancelDelete" />
            <Toast v-if="show_toast" :type="toast_type" :message="toast_message" @close="show_toast = false" />

            <!-- Prévisualiser une table -->
            <Transition name="slide-up" mode="out-in">
                <TableView v-if="switch_view_form" :table="selected_table" @close="close_view_form"></TableView>
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