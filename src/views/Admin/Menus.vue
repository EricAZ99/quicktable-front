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
    { label: 'Nom du menu', key: 'name' },
    { label: 'Description', key: 'description' },
    { label: 'Catégorie', key: 'category' },
    { label: 'Prix', key: 'price', type: 'price' },
    { label: 'Actif', key: 'active', type: 'boolean' },
]


const menus = [
    { id: 1, name: 'Burger Classic', description: 'Burger au bœuf, cheddar, salade, tomate et sauce maison', category: 'Burger', price: 10, active: true },
    { id: 2, name: 'Pizza Margherita', description: 'Pizza sauce tomate, mozzarella et basilic frais', category: 'Pizza', price: 12, active: true },
    { id: 3, name: 'Pizza Pepperoni', description: 'Pizza avec pepperoni, mozzarella et sauce tomate', category: 'Pizza', price: 14, active: true },
    { id: 4, name: 'Poulet Grillé', description: 'Filet de poulet grillé accompagné de légumes sautés', category: 'Plat', price: 13, active: true },
    { id: 5, name: 'Salade César', description: 'Salade romaine, poulet grillé, parmesan et sauce César', category: 'Salade', price: 9, active: true },
    { id: 6, name: 'Pâtes Carbonara', description: 'Pâtes crémeuses avec lardons et parmesan', category: 'Pâtes', price: 11, active: false },
    { id: 7, name: 'Pâtes Bolognaise', description: 'Pâtes avec sauce tomate et viande hachée', category: 'Pâtes', price: 11, active: true },
    { id: 8, name: 'Tacos Poulet', description: 'Tacos garni de poulet, frites et sauce fromagère', category: 'Tacos', price: 8, active: true },
    { id: 9, name: 'Tacos Viande', description: 'Tacos avec viande hachée, frites et sauce fromagère', category: 'Tacos', price: 9, active: true },
    { id: 10, name: 'Sandwich Thon', description: 'Sandwich au thon, salade et mayonnaise', category: 'Sandwich', price: 7, active: true },

    { id: 11, name: 'Sandwich Poulet', description: 'Sandwich poulet grillé, tomate et laitue', category: 'Sandwich', price: 7, active: true },
    { id: 12, name: 'Riz Cantonais', description: 'Riz sauté aux œufs, légumes et poulet', category: 'Riz', price: 10, active: true },
    { id: 13, name: 'Riz Poulet Curry', description: 'Riz blanc accompagné de poulet au curry', category: 'Riz', price: 12, active: true },
    { id: 14, name: 'Poisson Braisé', description: 'Poisson grillé servi avec attiéké et légumes', category: 'Poisson', price: 15, active: true },
    { id: 15, name: 'Brochettes de Bœuf', description: 'Brochettes de bœuf grillées avec frites', category: 'Grillade', price: 13, active: true },
    { id: 16, name: 'Brochettes de Poulet', description: 'Brochettes de poulet marinées et grillées', category: 'Grillade', price: 12, active: true },
    { id: 17, name: 'Omelette Fromage', description: 'Omelette aux œufs avec fromage fondu', category: 'Petit-déjeuner', price: 6, active: true },
    { id: 18, name: 'Omelette Jambon', description: 'Omelette garnie de jambon et fromage', category: 'Petit-déjeuner', price: 7, active: true },
    { id: 19, name: 'Crêpes Chocolat', description: 'Crêpes chaudes servies avec chocolat', category: 'Dessert', price: 5, active: true },
    { id: 20, name: 'Crêpes Banane', description: 'Crêpes garnies de banane et miel', category: 'Dessert', price: 5, active: true },

    { id: 21, name: 'Glace Vanille', description: 'Boule de glace saveur vanille', category: 'Dessert', price: 4, active: true },
    { id: 22, name: 'Glace Chocolat', description: 'Boule de glace saveur chocolat', category: 'Dessert', price: 4, active: true },
    { id: 23, name: 'Milkshake Fraise', description: 'Milkshake frais à la fraise', category: 'Boisson', price: 6, active: true },
    { id: 24, name: 'Milkshake Chocolat', description: 'Milkshake crémeux au chocolat', category: 'Boisson', price: 6, active: true },
    { id: 25, name: 'Jus d’Orange', description: 'Jus d’orange pressé', category: 'Boisson', price: 4, active: true },
    { id: 26, name: 'Jus d’Ananas', description: 'Jus d’ananas frais', category: 'Boisson', price: 4, active: true },
    { id: 27, name: 'Coca-Cola', description: 'Boisson gazeuse Coca-Cola', category: 'Boisson', price: 3, active: true },
    { id: 28, name: 'Fanta', description: 'Boisson gazeuse Fanta', category: 'Boisson', price: 3, active: true },
    { id: 29, name: 'Eau Minérale', description: 'Bouteille d’eau minérale', category: 'Boisson', price: 2, active: true },
    { id: 30, name: 'Café Espresso', description: 'Café espresso serré', category: 'Boisson chaude', price: 2, active: true }
]
</script>

<template>
    <div>
        <AuthenticatedLayoutAdmin :title="'Menu'" :mean="'Gestion de menus'">
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
                <Table v-if="!show_active_only" :data="menus" :columns="menuColumns" @edit="open_update_form"></Table>
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
