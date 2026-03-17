<script setup>
import { reactive, ref } from 'vue';
import FormBackGround from './FormBackGround.vue';
import PrimaryButton from './PrimaryButton.vue';
import SecondaryButton from './SecondaryButton.vue';
import { categories as categoriesDatas } from '../data/menus';

const props = defineProps({
    plate: { type: Object, default: null }
});
const emits = defineEmits(['onClose', 'create']);

const categories = ref([...categoriesDatas]);

const plateForm = reactive({
    name:        props.plate?.name        ?? '',
    description: props.plate?.description ?? '',
    category:    props.plate?.category    ?? '',
    price:       props.plate?.price       ?? '',
    image:       '',
    active:      props.plate?.active      ?? false,
});

const onSubmit = () => emits('create', {
    ...plateForm,
    ...(props.plate?.id != null ? { id: props.plate.id } : {}),
});
</script>

<template>
    <FormBackGround>
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-base shrink-0">
                    {{ plate ? '✏️' : '🍽' }}
                </div>
                <div>
                    <h2 class="text-base font-semibold text-slate-900">
                        {{ plate ? 'Modifier le plat' : 'Nouveau plat' }}
                    </h2>
                    <p class="text-xs text-slate-400">
                        {{ plate ? plate.name : 'Remplissez les informations ci-dessous' }}
                    </p>
                </div>
            </div>
            <button type="button" @click="emits('onClose')"
                class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-xl leading-none">
                ×
            </button>
        </div>

        <!-- Corps scrollable -->
        <form @submit.prevent="onSubmit" class="flex flex-col flex-1 overflow-hidden">
            <div class="flex-1 overflow-y-auto px-6 py-5 space-y-5">

                <!-- Infos principales -->
                <div class="bg-slate-50 rounded-xl p-4 space-y-4">
                    <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Informations</p>

                    <div>
                        <label class="text-xs font-medium text-slate-600 mb-1 block" for="nom">Nom du plat</label>
                        <input id="nom" v-model="plateForm.name" required type="text" placeholder="ex: Poulet braisé"
                            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100" />
                    </div>

                    <div>
                        <label class="text-xs font-medium text-slate-600 mb-1 block" for="description">Description</label>
                        <textarea id="description" v-model="plateForm.description" rows="2"
                            placeholder="ex: Poulet grillé avec sauce tomate et épices…"
                            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 resize-none"></textarea>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-xs font-medium text-slate-600 mb-1 block" for="category">Catégorie</label>
                            <select id="category" v-model="plateForm.category" required
                                class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100">
                                <option value="" disabled>Choisir une catégorie</option>
                                <option v-for="(cat, i) in categories" :key="i" :value="cat.name">{{ cat.name }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-xs font-medium text-slate-600 mb-1 block" for="price">Prix (FCFA)</label>
                            <input id="price" v-model="plateForm.price" type="number" required min="0" placeholder="ex: 3500"
                                class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100" />
                        </div>
                    </div>
                </div>

                <!-- Image -->
                <div>
                    <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Image</p>
                    <label for="image"
                        class="flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed border-slate-200 rounded-xl p-6 cursor-pointer hover:border-slate-400 hover:bg-slate-50 transition-colors">
                        <span class="text-3xl">🖼</span>
                        <span class="text-sm font-medium text-slate-600">Cliquer pour importer une image</span>
                        <span class="text-xs text-slate-400">PNG, JPG jusqu'à 5 Mo</span>
                        <input id="image" type="file" accept="image/*" class="sr-only"
                            @change="e => plateForm.image = e.target.files[0]" />
                    </label>
                </div>

                <!-- Statut -->
                <div class="bg-slate-50 rounded-xl p-4 flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-slate-700">Plat actif</p>
                        <p class="text-xs text-slate-400 mt-0.5">Le plat sera visible dans le menu</p>
                    </div>
                    <label class="inline-flex items-center cursor-pointer select-none">
                        <input type="checkbox" v-model="plateForm.active" class="sr-only peer" />
                        <div class="relative h-6 w-11 rounded-full bg-slate-200 transition-colors
                            peer-focus:ring-2 peer-focus:ring-slate-400
                            peer-checked:bg-slate-800
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                            after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform
                            peer-checked:after:translate-x-5">
                        </div>
                    </label>
                </div>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 border-t border-slate-100 bg-white rounded-b-2xl flex items-center justify-between gap-4">
                <div v-if="plateForm.price" class="text-sm font-semibold text-slate-800">
                    Prix :
                    <span class="text-base">{{ Number(plateForm.price).toLocaleString('fr-FR') }}</span>
                    <span class="text-xs font-normal text-slate-500 ml-1">FCFA</span>
                </div>
                <div v-else class="text-xs text-slate-400">Aucun prix renseigné</div>
                <div class="flex gap-3">
                    <SecondaryButton type="button" @click="emits('onClose')">Annuler</SecondaryButton>
                    <PrimaryButton type="submit">{{ plate ? 'Enregistrer' : 'Créer le plat' }}</PrimaryButton>
                </div>
            </div>
        </form>
    </FormBackGround>
</template>
