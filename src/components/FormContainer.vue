<script setup>
import { ref } from 'vue';
import FormBackGround from './FormBackGround.vue';
import InputText from './InputText.vue';
import PrimaryButton from './PrimaryButton.vue';
import SecondaryButton from './SecondaryButton.vue';

const props = defineProps({
    menu: { type: Object, default: null }
})

const nom = ref(props.menu?.name ?? '')
const description = ref(props.menu?.description ?? '')
const category = ref(props.menu?.category ?? '')
const price = ref(props.menu?.price ?? '')
const image = ref('')
const actif = ref(props.menu?.active ?? false)

const categories = [
    "Déssert", 
    "Entrée", 
    "Plat",
    "Boisson",
    "Apéritif",
    "Sauce",
    "Gateau",
    "Poisson",
    "Viande",
    "Riz",
    "Pâtes",
]
const emits = defineEmits(['onClose'])

async function onsubmit() {
}
</script>

<template>
    <FormBackGround>
        <h2 class="text-2xl font-semibold tracking-tight text-slate-900">{{ menu ? 'Modifier un menu' : 'Ajouter un menu' }}</h2>
        <form class="mt-4 space-y-4" @submit.prevent="onSubmit">
            <div>
                <label class="text-sm font-medium text-slate-700" for="nom">Nom du menu</label>
                <InputText id="nom" v-model="nom" type="text" autocomplete="text" placeholder="ex: Salade" />
            </div>
            <div>
                <label class="text-sm font-medium text-slate-700" for="description">Description</label>
                <InputText id="description" v-model="description" type="text" placeholder="ex: Salade" />
            </div>
            <div>
                <label class="text-sm font-medium text-slate-700" for="category">Catégorie</label>
                <select name="category" id="category" v-model="category"
                    class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400">
                    <option  v-for="(cat, index) in categories" :key="index" :value="cat" :selected="cat === category" >{{cat}}</option>
                </select>
            </div>
            <div>
                <label class="text-sm font-medium text-slate-700" for="price">Prix</label>
                <InputText id="price" v-model="price" type="number" placeholder="ex: 10000" />
            </div>
            <div>
                <label class="text-sm font-medium text-slate-700" for="price">Image du menu</label>
                <InputText id="image" v-model="image" type="file" placeholder="ex: 10000" />
            </div>
            <div class="flex justify-start items-center gap-4">
                <label class="inline-flex items-center gap-3 select-none cursor-pointer">
                    <input type="checkbox" v-model="actif" class="sr-only peer" />
                    <div
                        class="relative h-6 w-11 rounded-full bg-slate-200 transition-colors peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-slate-400 peer-checked:bg-slate-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5">
                    </div>
                    <span class="text-sm text-slate-700">Actif</span>
                </label>
            </div>


            <div class="text-center text-sm text-slate-600 flex justify-end gap-4">
                <PrimaryButton type="submit" :disabled="isSubmitting">
                    {{ menu ? (isSubmitting ? 'Modifié…' : 'Modifier') : (isSubmitting ? 'Ajouté…' : 'Ajouter') }}
                </PrimaryButton>
                <SecondaryButton type="submit" :disabled="isSubmitting" @click="emits('onClose')">
                    Annuler
                </SecondaryButton>
            </div>
        </form>
    </FormBackGround>
</template>