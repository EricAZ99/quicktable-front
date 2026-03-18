<script setup>
import { ref } from 'vue';
import ActivityTableContainer from '../../components/ActivityTableContainer.vue';
import PlatesForm from '../../components/PlatesForm.vue';
import PlateView from '../../components/PlateView.vue';
import Table from '../../components/Table.vue';
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue';
import PlateCard from '../../components/PlateCard.vue';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal.vue';
import Toast from '../../components/Toast.vue';
import { plates as platesData } from '../../data/menus.js';

const switch_form = ref(false);
const close_form = () => {
    switch_form.value = false;
};
const open_form = () => {
    switch_form.value = true;
};

const switch_update_form = ref(false);
const selected_menu = ref(null);
const close_update_form = () => {
    switch_update_form.value = false;
    selected_menu.value = null;
};
const open_update_form = (value) => {
    switch_view.value = false;
    selected_menu.value = value;
    switch_update_form.value = true;
};

const switch_view = ref(false);
const open_view = (value) => {
    switch_update_form.value = false;
    switch_form.value = false;
    selected_menu.value = value;
    switch_view.value = true;
};
const close_view = () => {
    switch_view.value = false;
    selected_menu.value = null;
};


const show_active_only = ref(false);

const menuColumns = [
    { label: 'Nom du menu', key: 'name' },
    { label: 'Description', key: 'description' },
    { label: 'Catégorie', key: 'category' },
    { label: 'Prix', key: 'price', type: 'price' },
    { label: 'Actif', key: 'active', type: 'boolean' },
]


const plates = ref([...platesData])


const confirm_delete = ref(false);
const plate_to_delete = ref(null);
const show_toast = ref(false);
const toast_message = ref('');

const requestDelete = (value) => {
    plate_to_delete.value = value;
    confirm_delete.value = true;
};

const confirmDelete = () => {
    const index = plates.value.findIndex(plate => plate.id === plate_to_delete.value.id);
    if (index !== -1) plates.value.splice(index, 1);
    toast_message.value = `« ${plate_to_delete.value.name} » a été supprimé.`;
    confirm_delete.value = false;
    plate_to_delete.value = null;
    show_toast.value = true;
};

const cancelDelete = () => {
    confirm_delete.value = false;
    plate_to_delete.value = null;
};

const savePlate = (payload) => {
    const index = plates.value.findIndex(p => p.id === payload.id);
    if (index !== -1) {
        plates.value.splice(index, 1, payload);
        close_update_form();
        toast_message.value = `« ${payload.name} » a été modifié.`;
    } else {
        plates.value.push({ ...payload, id: Date.now() });
        close_form();
        toast_message.value = `« ${payload.name} » a été ajouté.`;
    }
    show_toast.value = true;
};
</script>

<template>
    <div>
        <AuthenticatedLayoutAdmin :title="'Plats'" :mean="'Gestion de plats'">
            <Transition name="page" mode="out-in" appear>
                <ActivityTableContainer :title="'Liste des Plats'" :description="'Gestion des plats'" :has-button="true"
                    :button-title="'Ajouter un plat'" @on-click="open_form">
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
                        <!-- Tableau des plats -->
                        <Table v-if="!show_active_only" :data="plates" :columns="menuColumns" @edit="open_update_form"
                            @view="open_view"
                            :has_update_button="true" :has_view_button="true" :has_delete_button="true"
                            @delete="requestDelete"></Table>
                        <div v-else class="p-6">
                            <PlateCard :plates="plates" @view="open_view" @edit="open_update_form" @delete="requestDelete" />
                        </div>
                    </Transition>
                </ActivityTableContainer>
            </Transition>
            <Transition name="slide-up">
                <PlateView v-if="switch_view" :plate="selected_menu" @close="close_view" />
            </Transition>
            <Transition name="slide-up">
                <PlatesForm v-if="switch_form" @create="savePlate" @on-close="close_form"></PlatesForm>
            </Transition>
            <Transition name="slide-up">
                <PlatesForm v-if="switch_update_form" :plate="selected_menu" @create="savePlate" @on-close="close_update_form"></PlatesForm>
            </Transition>


            <ConfirmDeleteModal v-if="confirm_delete" :item-name="menu_to_delete?.name"
                message="Voulez-vous vraiment supprimer ce plat ? Cette action est irréversible."
                @confirm="confirmDelete" @cancel="cancelDelete" />
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
