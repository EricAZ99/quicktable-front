<script setup>
import { ref } from 'vue';
import ActivityTableContainer from '../../components/ActivityTableContainer.vue';
import MenuForm from '../../components/MenuForm.vue';
import MenuView from '../../components/MenuView.vue';
import Table from '../../components/Table.vue';
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue';
import MenuCard from '../../components/MenuCard.vue';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal.vue';
import Toast from '../../components/Toast.vue';
import { menus as menusData } from '../../data/menus.js';

// --- Formulaire d'ajout ---
/** Contrôle la visibilité du formulaire d'ajout */
const switch_form = ref(false);
/** Ferme le formulaire d'ajout */
const close_form = () => {
    switch_form.value = false;
};
/** Ouvre le formulaire d'ajout */
const open_form = () => {
    switch_form.value = true;
};

// --- Formulaire de modification ---
/** Contrôle la visibilité du formulaire de modification */
const switch_update_form = ref(false);
/** Menu sélectionné pour modification */
const selected_menu = ref(null);
/** Ferme le formulaire de modification et réinitialise la sélection */
const close_update_form = () => {
    switch_update_form.value = false;
    selected_menu.value = null;
};
/** Ouvre le formulaire de modification avec le menu sélectionné */
const open_update_form = (value) => {
    switch_view.value = false;
    selected_menu.value = value;
    switch_update_form.value = true;
};

// --- Prévisualisation ---
const switch_view = ref(false);
const open_view = (value) => {
    switch_form.value = false;
    switch_update_form.value = false;
    selected_menu.value = value;
    switch_view.value = true;
};
const close_view = () => {
    switch_view.value = false;
    selected_menu.value = null;
};

// --- Affichage ---
/** Bascule entre la vue tableau et la vue cartes */
const show_active_only = ref(false);

/** Définition des colonnes affichées dans le tableau */
const menuColumns = [
    { label: 'Nom du menu', key: 'name' },
    { label: 'Description', key: 'description' },
    // { label: 'Catégorie', key: 'category' },
    // { label: 'Prix', key: 'price', type: 'price' },
    { label: 'Actif', key: 'active', type: 'boolean' },
]

// --- Données ---
/** Liste réactive des menus, initialisée depuis le fichier de données */
const menus = ref([...menusData])

// --- Suppression ---
/** Contrôle la visibilité du modal de confirmation de suppression */
const confirm_delete = ref(false);
/** Menu en attente de suppression */
const menu_to_delete = ref(null);

// --- Toast ---
/** Contrôle la visibilité du toast de notification */
const show_toast = ref(false);
/** Message affiché dans le toast */
const toast_message = ref('');

/** Stocke le menu ciblé et affiche le modal de confirmation */
const requestDelete = (value) => {
    menu_to_delete.value = value;
    confirm_delete.value = true;
};

/** Supprime le menu confirmé, ferme le modal et affiche le toast de succès */
const confirmDelete = () => {
    const index = menus.value.findIndex(menu => menu.id === menu_to_delete.value.id);
    if (index !== -1) menus.value.splice(index, 1);
    toast_message.value = `« ${menu_to_delete.value.name} » a été supprimé.`;
    confirm_delete.value = false;
    menu_to_delete.value = null;
    show_toast.value = true;
};

/** Annule la suppression et ferme le modal */
const cancelDelete = () => {
    confirm_delete.value = false;
    menu_to_delete.value = null;
};

/** Crée ou met à jour un menu selon la présence de l'id */
const saveMenu = (payload) => {
    const index = menus.value.findIndex(m => m.id === payload.id);
    if (index !== -1) {
        menus.value.splice(index, 1, payload);
        close_update_form();
        toast_message.value = `« ${payload.name} » a été modifié.`;
    } else {
        menus.value.push({ ...payload, id: Date.now() });
        close_form();
        toast_message.value = `« ${payload.name} » a été ajouté.`;
    }
    show_toast.value = true;
};
</script>

<template>
    <div>
        <AuthenticatedLayoutAdmin :title="'Menu'" :mean="'Gestion de menus'">
            <Transition name="page" mode="out-in" appear>
                <ActivityTableContainer :title="'Liste des Menus'" :description="'Gestion des menus'" :has-button="true"
                    :button-title="'Ajouter un menu'" @on-click="open_form">
                    <template #search&switch>
                        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                            <label class="inline-flex items-center gap-3 select-none cursor-pointer">
                                <span class="text-sm text-slate-700">Tableau</span>
                                <input type="checkbox" v-model="show_active_only" class="sr-only peer" />
                                <div
                                    class="relative h-6 w-11 rounded-full bg-slate-200 transition-colors peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-slate-400 peer-checked:bg-slate-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5">
                                </div>
                                <span class="text-sm text-slate-700">Cartes</span>
                            </label>

                            <input type="text" placeholder="Recherche"
                                class="w-full max-w-xs p-2 px-4 border rounded-xl text-sm outline-none focus:border-slate-400" />
                        </div>
                    </template>
                    <Transition name="fade" mode="out-in">
                        <!-- Tableau des menus -->
                        <Table v-if="!show_active_only" :data="menus" :columns="menuColumns" @edit="open_update_form"
                            @view="open_view"
                            :has_update_button="true" :has_view_button="true" :has_delete_button="true"
                            @delete="requestDelete"></Table>
                        <div v-else class="p-6">
                            <!-- Cartes des menus -->
                            <MenuCard :menus="menus" @edit="open_update_form"></MenuCard>
                        </div>
                    </Transition>
                </ActivityTableContainer>
            </Transition>
            <Transition name="slide-up">
                <MenuView v-if="switch_view" :menu="selected_menu" @close="close_view" />
            </Transition>
            <Transition name="slide-up">
                <!-- Formulaire d'ajout -->
                <MenuForm v-if="switch_form" @create="saveMenu" @on-close="close_form"></MenuForm>
            </Transition>
            <Transition name="slide-up">
                <!-- Formulaire de modification -->
                <MenuForm v-if="switch_update_form" :menu="selected_menu" @create="saveMenu" @on-close="close_update_form"></MenuForm>
            </Transition>


        <ConfirmDeleteModal
                v-if="confirm_delete"
                :item-name="menu_to_delete?.name"
                message="Voulez-vous vraiment supprimer ce menu ? Cette action est irréversible."
                @confirm="confirmDelete"
                @cancel="cancelDelete"
            />
        <Toast v-if="show_toast" type="success" :message="toast_message" @close="show_toast = false" />
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
