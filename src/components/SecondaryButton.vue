<script setup>
/**
 * SecondaryButton
 * Bouton secondaire de l'application (fond blanc, bordure, texte sombre).
 * Utilise un slot pour le contenu.
 */

/** Couleur du bouton (non utilisée visuellement pour l'instant) */
defineProps({
    color: { type: String, default: 'red' }
})
</script>

<template>
    <button class="hover:bg-white hover:text-slate-500 text-slate-800 border font-semibold py-2 px-3 text-sm rounded-2xl">
        <slot></slot>
    </button>
</template>