<script setup>
/**
 * InputText
 * Champ de saisie générique compatible v-model.
 */

/** Identifiant HTML du champ */
/** Libellé associé au champ */
/** Texte indicatif affiché dans le champ vide */
/** Valeur liée via v-model */
/** Type HTML du champ (text, number, file, etc.) */
const props = defineProps({
    id: String,
    label: String,
    placeholder: String,
    modelValue: { type: [String, Number], default: '' },
    type: { type: String, default: 'text' }
})

/** Émet la nouvelle valeur à chaque saisie pour la compatibilité v-model */
const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <input
        :id="id"
        :placeholder="placeholder"
        :type="type"
        :value="modelValue"
        class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400"
        @input="emit('update:modelValue', $event.target.value)"
    />
</template>
