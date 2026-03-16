<script setup>
import { reactive, ref } from 'vue';
import FormBackGround from './FormBackGround.vue';
import InputText from './InputText.vue';
import PrimaryButton from './PrimaryButton.vue';
import SecondaryButton from './SecondaryButton.vue';
import { categories as categoriesDatas } from '../data/menus';

const props = defineProps({
    plate: { type: Object, default: null }
})

const plateForm = reactive({
    name: props.plate?.name ?? '',
    description: props.plate?.description ?? '',
    category: props.plate?.category ?? '',
    price: props.plate?.price ?? '',
    image: '',
    active: props.plate?.active ?? false
})

const onSubmit = () => {
    // console.log(plateForm)
    // if()
    emits('create', plateForm)
}
const categories = ref([...categoriesDatas])
const emits = defineEmits(['onClose', 'create'])

</script>

<template>
    <FormBackGround>
        <h2 class="text-2xl font-semibold tracking-tight text-slate-900">
            {{ plate ? 'Modifier un plat' : 'Ajouter un plat' }}
        </h2>
        <form class="mt-4 space-y-4" @submit.prevent="onSubmit">
            <div>
                <label class="text-sm font-medium text-slate-700" for="nom">Nom du menu</label>
                <InputText id="nom" v-model="plateForm.name" required type="text" autocomplete="text" placeholder="ex: Salade" />
            </div>
            <div>
                <label class="text-sm font-medium text-slate-700" for="description">Description</label>
                <InputText id="description" v-model="plateForm.description" type="text" placeholder="ex: Salade" />
            </div>
            <div>
                <label class="text-sm font-medium text-slate-700" for="category">Catégorie</label>
                <select name="category" id="category" v-model="plateForm.category" required
                    class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400">
                    <option v-for="(cat, index) in categories" :key="index" :value="cat.name"
                        :selected="cat === category">
                        {{ cat.name }}</option>
                </select>
            </div>
            <div>
                <label class="text-sm font-medium text-slate-700" for="price">Prix</label>
                <InputText id="price" v-model="plateForm.price" type="number" required placeholder="ex: 10000" />
            </div>
            <div>
                <label class="text-sm font-medium text-slate-700" for="price">Image du menu</label>
                <InputText id="image" v-model="plateForm.image" type="file" placeholder="ex: 10000" />
            </div>
            <div class="flex justify-start items-center gap-4">
                <label class="inline-flex items-center gap-3 select-none cursor-pointer">
                    <input type="checkbox" v-model="plateForm.actif" class="sr-only peer" />
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