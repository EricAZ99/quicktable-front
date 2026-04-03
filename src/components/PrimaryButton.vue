<script setup>
/**
 * PrimaryButton
 * Bouton principal de l'application (fond sombre, texte blanc).
 * Utilise un slot pour le contenu.
 */
</script>

<template>
    <button class="drop-shadow-xl duration-200 transition-all bg-slate-800 text-white hover:bg-white hover:text-slate-500 border font-semibold py-2 px-3 text-sm rounded-2xl">
        <slot></slot>
    </button>
</template>