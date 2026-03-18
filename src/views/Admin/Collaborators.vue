<script setup>
import { ref } from 'vue';
import ActivityTableContainer from '../../components/ActivityTableContainer.vue';
import Table from '../../components/Table.vue';
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue';
import CollaboratorForm from '../../components/CollaboratorForm.vue';
import CollaboratorView from '../../components/CollaboratorView.vue';
import CollaboratorCard from '../../components/CollaboratorCard.vue';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal.vue';
import Toast from '../../components/Toast.vue';
import { collaborators as collaboratorsData } from '../../data/menus';

const collaboratorColumns = [
    { id: 1, label: 'Nom et prénoms', key: 'name' },
    { id: 2, label: 'Email', key: 'email' },
    { id: 3, label: 'Rôle', key: 'role' },
    { id: 4, label: 'Statut', key: 'active', type: 'boolean' },
    { id: 5, label: "Date d'ajout", key: 'add_date' },
];

const collaborators = ref([...collaboratorsData]);
const show_active_only = ref(false);

// --- Formulaire d'ajout ---
const switch_form = ref(false);
const open_form = () => { switch_form.value = true; };
const close_form = () => { switch_form.value = false; };

// --- Formulaire de modification ---
const switch_update_form = ref(false);
const selected_collaborator = ref(null);
const open_update_form = (value) => {
    switch_view.value = false;
    selected_collaborator.value = value;
    switch_update_form.value = true;
};
const close_update_form = () => {
    switch_update_form.value = false;
    selected_collaborator.value = null;
};

// --- Prévisualisation ---
const switch_view = ref(false);
const open_view = (value) => {
    switch_form.value = false;
    switch_update_form.value = false;
    selected_collaborator.value = value;
    switch_view.value = true;
};
const close_view = () => {
    switch_view.value = false;
    selected_collaborator.value = null;
};

// --- Suppression ---
const confirm_delete = ref(false);
const collaborator_to_delete = ref(null);
const requestDelete = (value) => {
    collaborator_to_delete.value = value;
    confirm_delete.value = true;
};
const confirmDelete = () => {
    const index = collaborators.value.findIndex(c => c.id === collaborator_to_delete.value.id);
    if (index !== -1) collaborators.value.splice(index, 1);
    toast_message.value = `« ${collaborator_to_delete.value.name} » a été supprimé.`;
    confirm_delete.value = false;
    collaborator_to_delete.value = null;
    show_toast.value = true;
};
const cancelDelete = () => {
    confirm_delete.value = false;
    collaborator_to_delete.value = null;
};

// --- Toast ---
const show_toast = ref(false);
const toast_message = ref('');

// --- Sauvegarde ---
const saveCollaborator = (payload) => {
    const index = collaborators.value.findIndex(c => c.id === payload.id);
    if (index !== -1) {
        collaborators.value.splice(index, 1, { ...payload, add_date: collaborators.value[index].add_date });
        close_update_form();
        toast_message.value = `« ${payload.name} » a été modifié.`;
    } else {
        const today = new Date().toISOString().split('T')[0];
        collaborators.value.push({ ...payload, id: Date.now(), add_date: today });
        close_form();
        toast_message.value = `« ${payload.name} » a été ajouté.`;
    }
    show_toast.value = true;
};
</script>

<template>
    <AuthenticatedLayoutAdmin :title="'Collaborateurs'" :mean="'Gestion des collaborateurs'">
        <Transition name="page" mode="out-in" appear>
            <ActivityTableContainer :title="'Liste des collaborateurs'" :description="'Gestion des collaborateurs'"
                :has-button="true" :button-title="'Ajouter un collaborateur'" @on-click="open_form">

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
                    <Table v-if="!show_active_only" :data="collaborators" :columns="collaboratorColumns"
                        @edit="open_update_form" @view="open_view" :has_update_button="true" :has_view_button="true"
                        :has_delete_button="true" @delete="requestDelete" />
                    <div v-else class="p-6">
                        <CollaboratorCard :collaborators="collaborators"
                            @view="open_view" @edit="open_update_form" @delete="requestDelete" />
                    </div>
                </Transition>
            </ActivityTableContainer>
        </Transition>

        <Transition name="slide-up">
            <CollaboratorView v-if="switch_view" :collaborator="selected_collaborator" @close="close_view" />
        </Transition>
        <Transition name="slide-up">
            <CollaboratorForm v-if="switch_form" @create="saveCollaborator" @on-close="close_form" />
        </Transition>
        <Transition name="slide-up">
            <CollaboratorForm v-if="switch_update_form" :collaborator="selected_collaborator" @create="saveCollaborator" @on-close="close_update_form" />
        </Transition>

        <ConfirmDeleteModal
            v-if="confirm_delete"
            :item-name="collaborator_to_delete?.name"
            message="Voulez-vous vraiment supprimer ce collaborateur ? Cette action est irréversible."
            @confirm="confirmDelete"
            @cancel="cancelDelete"
        />
        <Toast v-if="show_toast" type="success" :message="toast_message" @close="show_toast = false" />
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