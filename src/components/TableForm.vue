<script setup>
import { reactive } from 'vue';
import FormBackGround from './FormBackGround.vue';
import PrimaryButton from './PrimaryButton.vue';
import SecondaryButton from './SecondaryButton.vue';

const props = defineProps({
    table: { type: Object, default: null },
    isSubmitting: { type: Boolean, default: false }
});

const emits = defineEmits(['onClose', 'create']);

const data = localStorage.getItem('user_authenticated');
const isAuthenticated = data ? JSON.parse(data) : null;
const database = isAuthenticated?.user?.database || '';

const tableForm = reactive({
    name: props.table?.name ?? '',
    stat: props.table?.stat ?? 'Libre',
    active: props.table?.active ?? true,
    qrCode: props.table?.qrCode ?? '',
});

const onSubmit = () => {
    if (props.isSubmitting) {
        return;
    }

    emits('create', {
        ...tableForm,
        ...(props.table?.id != null ? { id: props.table.id } : {}),
        database,
    });
};
</script>

<template>
    <FormBackGround>
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-base shrink-0">
                    {{ table ? 'Edit' : 'Desk' }}
                </div>
                <div>
                    <h2 class="text-base font-semibold text-slate-900">
                        {{ table ? 'Modifier la table' : 'Nouvelle table' }}
                    </h2>
                    <p class="text-xs text-slate-400">
                        {{ table ? table.name : 'Renseignez les informations de la table' }}
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
                        <label class="text-xs font-medium text-slate-600 mb-1 block" for="name">Nom de la table</label>
                        <input
                            id="name"
                            v-model="tableForm.name"
                            required
                            type="text"
                            placeholder="ex: Table n°4"
                            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        />
                    </div>

                    <div>
                        <label class="text-xs font-medium text-slate-600 mb-1 block" for="stat">Disponibilite</label>
                        <select
                            id="stat"
                            v-model="tableForm.stat"
                            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        >
                            <option value="Libre">Libre</option>
                            <option value="Occupée">Occupée</option>
                            <option value="Réservée">Réservée</option>
                        </select>
                    </div>

                    <div>
                        <label class="text-xs font-medium text-slate-600 mb-1 block" for="qrCode">Lien QR code</label>
                        <input
                            id="qrCode"
                            v-model="tableForm.qrCode"
                            type="text"
                            placeholder="ex: https://mon-qr-code"
                            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        />
                    </div>
                </div>

                <div class="bg-slate-50 rounded-xl p-4 flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-slate-700">Table active</p>
                        <p class="text-xs text-slate-400 mt-0.5">La table peut etre utilisee dans le restaurant</p>
                    </div>
                    <label class="inline-flex items-center cursor-pointer select-none">
                        <input type="checkbox" v-model="tableForm.active" class="sr-only peer" />
                        <div
                            class="relative h-6 w-11 rounded-full bg-slate-200 transition-colors peer-focus:ring-2 peer-focus:ring-slate-400 peer-checked:bg-slate-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5"
                        ></div>
                    </label>
                </div>
            </div>

            <div class="px-6 py-4 border-t border-slate-100 bg-white rounded-b-2xl flex items-center justify-end gap-3">
                <SecondaryButton type="button" @click="emits('onClose')" :disabled="isSubmitting">Annuler</SecondaryButton>
                <PrimaryButton type="submit" :disabled="isSubmitting">
                    {{ isSubmitting ? 'Enregistrement...' : (table ? 'Enregistrer' : 'Creer la table') }}
                </PrimaryButton>
            </div>
        </form>
    </FormBackGround>
</template>
