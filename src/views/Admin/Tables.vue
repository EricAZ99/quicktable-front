<script setup>
import { ref } from 'vue';
import ActivityTableContainer from '../../components/ActivityTableContainer.vue';
import FormContainer from '../../components/FormContainer.vue';
import Table from '../../components/Table.vue';
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue';
import MenuCard from '../../components/MenuCard.vue';

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
    selected_menu.value = value;
    switch_update_form.value = true;
};


const show_active_only = ref(false);

const menuColumns = [
    { label: 'N° de table', key: 'name' },
    { label: 'Disponibilité', key: 'active', type: 'boolean' },
]

const tables = [
    { id: 1, name: 'Table n°1', active: false },
    { id: 2, name: 'Table n°2', active: true },
    { id: 3, name: 'Table n°3', active: false },
    { id: 4, name: 'Table n°4', active: true },
    { id: 5, name: 'Table n°5', active: false },
    { id: 6, name: 'Table n°6', active: false },
    { id: 7, name: 'Table n°7', active: true },
    { id: 8, name: 'Table n°8', active: true },
    { id: 9, name: 'Table n°9', active: true },
    { id: 10, name: 'Table n°10', active: true },
    { id: 11, name: 'Table n°11', active: true },
    { id: 12, name: 'Table n°12', active: false },
    { id: 13, name: 'Table n°13', active: true },
    { id: 14, name: 'Table n°14', active: true },
    { id: 15, name: 'Table n°15', active: true },
]
</script>

<template>
    <div>
        <AuthenticatedLayoutAdmin :title="'Tables'" :mean="'Gestion de tables'">
            <ActivityTableContainer :title="'Liste des tables'" :description="'Gestion des tables'" :has-button="true"
                :button-title="'Ajouter une table'" @on-click="open_form">
                <template #search&switch>
                    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                        <input type="text" placeholder="Recherche"
                            class="w-full max-w-xs p-2 px-4 border rounded-xl text-sm outline-none focus:border-slate-400" />
                    </div>
                </template>
                <Table v-if="!show_active_only" :data="tables" :columns="menuColumns" @edit="open_update_form"></Table>
                <div v-else class="p-6">
                    <MenuCard :menus="menus" @edit="open_update_form"></MenuCard>
                </div>
            </ActivityTableContainer>
            <FormContainer v-if="switch_form" @on-close="close_form"></FormContainer>
            <FormContainer v-if="switch_update_form" :menu="selected_menu" @on-close="close_update_form">
            </FormContainer>
        </AuthenticatedLayoutAdmin>
    </div>
</template>
