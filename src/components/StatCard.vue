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
    <div class="border border-gray-200 p-2 bg-white rounded-2xl flex justify-start items-center w-1/4">
        <div>
            <p v-html="stat.icon" class="text-slate-800"></p>
            <!-- {{ stat }} -->
        </div>
        <div>
            <p class="text-slate-500 ml-2">{{ stat.title }}</p>
            <p class="font-bold text-xl ml-2">{{ stat.value }}</p>
            <p class="text-slate-500 ml-2">{{ stat.change }}</p>
        </div>

    </div>
</template>