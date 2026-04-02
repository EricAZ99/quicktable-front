<script setup>
import { reactive } from 'vue';
import FormBackGround from './FormBackGround.vue';
import PrimaryButton from './PrimaryButton.vue';
import SecondaryButton from './SecondaryButton.vue';

const props = defineProps({
    menu: { type: Object, default: null },
    isSubmitting: { type: Boolean, default: false }
});

const emits = defineEmits(['onClose', 'create']);

const data = localStorage.getItem('user_authenticated');
const isAuthenticated = data ? JSON.parse(data) : "Rien";

const form = reactive({
    name: props.menu?.name ?? '',
    description: props.menu?.description ?? '',
    image: props.menu?.image ?? '',
    active: props.menu?.active ?? false,
});

const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {
        if (typeof reader.result === 'string') {
            form.image = reader.result;
        }
    };

    reader.readAsDataURL(file);
};

const onSubmit = () => {
    if (props.isSubmitting) {
        return;
    }

    if (!isAuthenticated || isAuthenticated === "Rien") {
        console.warn("Utilisateur non authentifie");
        return;
    }

    emits('create', {
        ...form,
        ...(props.menu?.id != null ? { id: props.menu.id } : {}),
        database: isAuthenticated?.user?.database
    });
};
</script>

<template>
    <FormBackGround>
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-base shrink-0">
                    {{ menu ? 'Edit' : 'New' }}
                </div>
                <div>
                    <h2 class="text-base font-semibold text-slate-900">
                        {{ menu ? 'Modifier le menu' : 'Nouveau menu' }}
                    </h2>
                    <p class="text-xs text-slate-400">
                        {{ menu ? menu.name : 'Remplissez les informations ci-dessous' }}
                    </p>
                </div>
            </div>
            <button
                type="button"
                @click="emits('onClose')"
                class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-xl leading-none"
            >
                x
            </button>
        </div>

        <form @submit.prevent="onSubmit" class="flex flex-col flex-1 overflow-hidden">
            <div class="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                <div class="bg-slate-50 rounded-xl p-4 space-y-4">
                    <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Informations</p>

                    <div>
                        <label class="text-xs font-medium text-slate-600 mb-1 block" for="nom">Nom du menu</label>
                        <input
                            id="nom"
                            v-model="form.name"
                            required
                            type="text"
                            placeholder="ex: Menu africain"
                            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        />
                    </div>

                    <div>
                        <label class="text-xs font-medium text-slate-600 mb-1 block" for="description">Description</label>
                        <textarea
                            id="description"
                            v-model="form.description"
                            rows="3"
                            placeholder="ex: Menu special avec les plats les plus populaires..."
                            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 resize-none"
                        ></textarea>
                    </div>
                </div>

                <div>
                    <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Image</p>
                    <label
                        for="image"
                        class="flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed border-slate-200 rounded-xl p-6 cursor-pointer hover:border-slate-400 hover:bg-slate-50 transition-colors"
                    >
                        <img
                            v-if="form.image"
                            :src="form.image"
                            alt="Apercu du menu"
                            class="h-32 max-w-xs rounded-xl object-contain"
                        />
                        <span v-else class="text-3xl">Img</span>
                        <span class="text-sm font-medium text-slate-600">Cliquer pour importer une image</span>
                        <span class="text-xs text-slate-400">PNG, JPG jusqu'a 5 Mo</span>
                        <input id="image" type="file" accept="image/*" class="sr-only" @change="handleImageChange" />
                    </label>
                </div>

                <div class="bg-slate-50 rounded-xl p-4 flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-slate-700">Menu actif</p>
                        <p class="text-xs text-slate-400 mt-0.5">Le menu sera visible pour les clients</p>
                    </div>
                    <label class="inline-flex items-center cursor-pointer select-none">
                        <input type="checkbox" v-model="form.active" class="sr-only peer" />
                        <div
                            class="relative h-6 w-11 rounded-full bg-slate-200 transition-colors peer-focus:ring-2 peer-focus:ring-slate-400 peer-checked:bg-slate-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5"
                        ></div>
                    </label>
                </div>
            </div>

            <div class="px-6 py-4 border-t border-slate-100 bg-white rounded-b-2xl flex items-center justify-end gap-3">
                <SecondaryButton type="button" @click="emits('onClose')" :disabled="isSubmitting">Annuler</SecondaryButton>
                <PrimaryButton type="submit" :disabled="isSubmitting">
                    {{ isSubmitting ? 'Enregistrement...' : (menu ? 'Enregistrer' : 'Creer le menu') }}
                </PrimaryButton>
            </div>
        </form>
    </FormBackGround>
</template>
