<script setup>
defineProps({
    color: {
        type: String,
        default: 'gray'
    },

})
</script>

<template>
    <button :class="`bg-${color}-900 hover:bg-${color}-800`" class="text-slate-800 border font-semibold py-2 px-3 text-sm rounded-2xl">
        <slot></slot>
    </button>
</template>