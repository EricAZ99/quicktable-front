<script setup>
import { onMounted, ref } from 'vue';
import ActivityTableContainer from '../../components/ActivityTableContainer.vue';
import MenuForm from '../../components/MenuForm.vue';
import MenuView from '../../components/MenuView.vue';
import Table from '../../components/Table.vue';
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue';
import MenuCardItem from '../../components/MenuCardItem.vue';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal.vue';
import Toast from '../../components/Toast.vue';
import { createMenu, deleteMenu, listMenus, updateMenu } from '../../services/menus.js';

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
    switch_form.value = false;
    switch_update_form.value = false;
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
    { label: 'Actif', key: 'active', type: 'boolean' },
];

const menus = ref([]);
const is_loading = ref(false);

const confirm_delete = ref(false);
const menu_to_delete = ref(null);

const show_toast = ref(false);
const toast_message = ref('');
const toast_type = ref('success');
const is_submitting = ref(false);
const data = localStorage.getItem('user_authenticated');
const isAuthenticated = data ? JSON.parse(data) : null;
const database = isAuthenticated?.user?.database || '';

const loadMenus = async () => {
    is_loading.value = true;

    try {
        const response = await listMenus(database);
        menus.value = response.menus || [];
    } catch (error) {
        toast_type.value = 'error';
        toast_message.value = error.message || "Le chargement des menus a echoue.";
        show_toast.value = true;
    } finally {
        is_loading.value = false;
    }
};

const requestDelete = (value) => {
    menu_to_delete.value = value;
    confirm_delete.value = true;
};

const confirmDelete = async () => {
    if (!menu_to_delete.value) {
        return;
    }

    is_submitting.value = true;

    try {
        await deleteMenu(menu_to_delete.value.id, database);
        const index = menus.value.findIndex(menu => menu.id === menu_to_delete.value.id);

        if (index !== -1) {
            menus.value.splice(index, 1);
        }

        toast_type.value = 'success';
        toast_message.value = `"${menu_to_delete.value.name}" a ete supprime.`;
        confirm_delete.value = false;
        menu_to_delete.value = null;
    } catch (error) {
        toast_type.value = 'error';
        toast_message.value = error.message || "La suppression du menu a echoue.";
    } finally {
        is_submitting.value = false;
        show_toast.value = true;
    }
};

const cancelDelete = () => {
    confirm_delete.value = false;
    menu_to_delete.value = null;
};

const saveMenu = async (payload) => {
    const index = menus.value.findIndex(m => m.id === payload.id);

    if (index !== -1) {
        is_submitting.value = true;

        try {
            const response = await updateMenu(payload.id, payload);
            menus.value.splice(index, 1, response.menu);
            selected_menu.value = response.menu;
            close_update_form();
            toast_type.value = 'success';
            toast_message.value = `"${response.menu.name}" a ete modifie.`;
        } catch (error) {
            toast_type.value = 'error';
            toast_message.value = error.message || "La modification du menu a echoue.";
        } finally {
            is_submitting.value = false;
            show_toast.value = true;
        }
        return;
    }

    is_submitting.value = true;

    try {
        const response = await createMenu(payload);
        menus.value.unshift(response.menu);
        close_form();
        toast_type.value = 'success';
        toast_message.value = `"${response.menu.name}" a ete ajoute.`;
    } catch (error) {
        toast_type.value = 'error';
        toast_message.value = error.message || "La creation du menu a echoue.";
    } finally {
        is_submitting.value = false;
        show_toast.value = true;
    }
};

const activateMenus = async (menu) => {
    if (!menu?.id) {
        return;
    }

    is_submitting.value = true;

    try {
        const response = await updateMenu(menu.id, {
            ...menu,
            active: !menu.active,
            database,
        });

        const index = menus.value.findIndex(item => item.id === menu.id);

        if (index !== -1) {
            menus.value.splice(index, 1, response.menu);
        }

        if (selected_menu.value?.id === menu.id) {
            selected_menu.value = response.menu;
        }

        toast_type.value = 'success';
        toast_message.value = response.menu.active
            ? `"${response.menu.name}" est maintenant actif.`
            : `"${response.menu.name}" est maintenant inactif.`;
    } catch (error) {
        toast_type.value = 'error';
        toast_message.value = error.message || "La mise a jour du statut du menu a echoue.";
    } finally {
        is_submitting.value = false;
        show_toast.value = true;
    }
}
onMounted(() => {
    loadMenus();
});
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
                        <div v-if="is_loading" class="p-6 text-sm text-slate-500">
                            Chargement des menus...
                        </div>
                        <Table v-else-if="!show_active_only" :data="menus" :columns="menuColumns"
                            @edit="open_update_form" @view="open_view" :has_update_button="true" :has_view_button="true"
                            :has_delete_button="true" @toggle-active="activateMenus" @delete="requestDelete"></Table>
                        <div v-else class="p-6">
                            <MenuCardItem :menus="menus" @view="open_view" @edit="open_update_form"
                                @delete="requestDelete" />
                        </div>
                    </Transition>
                </ActivityTableContainer>
            </Transition>

            <Transition name="slide-up">
                <MenuView v-if="switch_view" :menu="selected_menu" @close="close_view" />
            </Transition>

            <Transition name="slide-up">
                <MenuForm v-if="switch_form" :is-submitting="is_submitting" @create="saveMenu" @on-close="close_form">
                </MenuForm>
            </Transition>

            <Transition name="slide-up">
                <MenuForm v-if="switch_update_form" :menu="selected_menu" :is-submitting="is_submitting"
                    @create="saveMenu" @on-close="close_update_form"></MenuForm>
            </Transition>

            <ConfirmDeleteModal v-if="confirm_delete" :item-name="menu_to_delete?.name"
                message="Voulez-vous vraiment supprimer ce menu ? Cette action est irreversible."
                @confirm="confirmDelete" @cancel="cancelDelete" />

            <Toast v-if="show_toast" :type="toast_type" :message="toast_message" @close="show_toast = false" />
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
