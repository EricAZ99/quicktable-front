<script setup>
import ActivityTableContainer from './ActivityTableContainer.vue';

const props = defineProps({
    width: {
        type: String,
        default: 'w-full'
    },
    activities: {
        type: Array,
        default: []
    }
})
</script>
<template>
    <ActivityTableContainer :class="props.width" :title="'Activités récentes'"
        :description="'Derniers événements importants.'">
        <div v-for="(activity, index) in activities" :key="index" class="p-3 flex justify-between items-start"
            :class="index === activities.length - 1 ? 'border-none' : 'border-b'">
            <p class="flex flex-col">
                <span class="font-semibold">{{ activity.title }}</span>
                <span class="text-xs">{{ activity.description }}</span>
            </p>
            <span class="text-xs">{{ activity.time }}</span>
        </div>
    </ActivityTableContainer>
</template>