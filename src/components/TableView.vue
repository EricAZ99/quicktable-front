<script setup>
/**
 * TableView
 * Panneau de prévisualisation des informations d'une table.
 * Affiche le code QR, le nom, la disponibilité et l'état de la table.
 */
import FormBackGround from './FormBackGround.vue';
import SecondaryButton from './SecondaryButton.vue';

/** Table à prévisualiser */
const props = defineProps({
    table: { type: Object, required: false, default: () => ({}) }
});
/** Événement émis pour fermer le panneau */
const emits = defineEmits(['close'])
</script>

<template>
    <FormBackGround>
        <div class="flex text-sm gap-4">
            <div>
                <img src="../assets/code_qr.png" alt="code QR" class="h-60 w-60 border">
            </div>
            <div class="flex flex-col justify-between">
                <div class="flex gap-4">
                    <div class="flex flex-col gap-2">
                        <span>Nom de la table :</span>
                        <span>{{ props.table.name }}</span>
                        <span>Disponibilité de la table :</span>
                        <span>{{ props.table.stat }}</span>
                        <span>Etat de la table :</span>
                        <span class="w-fit p-1" :class="!props.table.active ? 'text-slate-600' : 'text-emerald-700'">{{
                            props.table.active ? 'Actif' : 'Inactif' }}</span>
                    </div>
                </div>
                <div class="flex justify-end">
                    <SecondaryButton @click="emits('close')">Fermer</SecondaryButton>
                </div>

            </div>
        </div>
    </FormBackGround>
</template>