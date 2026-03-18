<script setup>
import { reactive } from 'vue';
import FormBackGround from './FormBackGround.vue';
import PrimaryButton from './PrimaryButton.vue';
import SecondaryButton from './SecondaryButton.vue';

const props = defineProps({
    collaborator: { type: Object, default: null }
});
const emits = defineEmits(['onClose', 'create']);

const roles = ['Administrateur', 'Manager', 'Serveur', 'Chef', 'Cuisinier', 'Réceptionniste'];

const form = reactive({
    name:   props.collaborator?.name   ?? '',
    email:  props.collaborator?.email  ?? '',
    role:   props.collaborator?.role   ?? roles[0],
    active: props.collaborator?.active ?? true,
});

const onSubmit = () => emits('create', {
    ...form,
    ...(props.collaborator?.id != null ? { id: props.collaborator.id } : {}),
});
</script>

<template>
    <FormBackGround>
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-base shrink-0">
                    {{ collaborator ? '✏️' : '👤' }}
                </div>
                <div>
                    <h2 class="text-base font-semibold text-slate-900">
                        {{ collaborator ? 'Modifier le collaborateur' : 'Nouveau collaborateur' }}
                    </h2>
                    <p class="text-xs text-slate-400">
                        {{ collaborator ? collaborator.name : 'Remplissez les informations ci-dessous' }}
                    </p>
                </div>
            </div>
            <button type="button" @click="emits('onClose')"
                class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-xl leading-none">
                ×
            </button>
        </div>

        <form @submit.prevent="onSubmit" class="flex flex-col flex-1 overflow-hidden">
            <div class="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                <div class="bg-slate-50 rounded-xl p-4 space-y-4">
                    <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Informations</p>

                    <div>
                        <label class="text-xs font-medium text-slate-600 mb-1 block" for="collab-name">Nom et prénoms</label>
                        <input id="collab-name" v-model="form.name" required type="text" placeholder="ex: Jean Dupont"
                            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100" />
                    </div>

                    <div>
                        <label class="text-xs font-medium text-slate-600 mb-1 block" for="collab-email">Email</label>
                        <input id="collab-email" v-model="form.email" required type="email" placeholder="ex: jean.dupont@example.com"
                            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100" />
                    </div>

                    <div>
                        <label class="text-xs font-medium text-slate-600 mb-1 block" for="collab-role">Rôle</label>
                        <select id="collab-role" v-model="form.role"
                            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100">
                            <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
                        </select>
                    </div>
                </div>

                <div class="bg-slate-50 rounded-xl p-4 flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-slate-700">Compte actif</p>
                        <p class="text-xs text-slate-400 mt-0.5">Le collaborateur pourra se connecter</p>
                    </div>
                    <label class="inline-flex items-center cursor-pointer select-none">
                        <input type="checkbox" v-model="form.active" class="sr-only peer" />
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

            <div class="px-6 py-4 border-t border-slate-100 bg-white rounded-b-2xl flex items-center justify-end gap-3">
                <SecondaryButton type="button" @click="emits('onClose')">Annuler</SecondaryButton>
                <PrimaryButton type="submit">{{ collaborator ? 'Enregistrer' : 'Créer le collaborateur' }}</PrimaryButton>
            </div>
        </form>
    </FormBackGround>
</template>
