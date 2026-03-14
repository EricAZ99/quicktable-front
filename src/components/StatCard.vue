<script setup>
const props = defineProps({
    stat: {
        type: Object,
        required: true,
        default: () => ({})
    }
})
</script>

<template>
    <div class="w-full min-w-0 rounded-2xl border border-gray-200 bg-white p-4 flex items-center gap-3">
        <div class="shrink-0 text-slate-800" v-html="stat.icon"></div>
        <div class="min-w-0">
            <p class="text-slate-500 text-sm truncate">{{ stat.title }}</p>
            <p class="font-bold text-xl leading-tight">{{ stat.value }}</p>
            <p class="text-slate-500 text-sm truncate">{{ stat.change }}</p>
        </div>
    </div>
</template>
