<script setup>
import PrimaryButton from './PrimaryButton.vue';


const props = defineProps({
    title: {
        type: String,
        required: true,
        default: "Activités récentes"
    },
    description: {
        type: String,
        required: false
    },
    hasButton: {
        type: Boolean,
        required: false,
        default: false
    },
    buttonTitle: {
        type: String,
        required: false,
        default: "Ajouter"
    }
})

const emits = defineEmits(['onClick'])
</script>
<template>
    <div class="bg-white rounded-2xl pt-4 border h-[92%] overflow-y-hidden">
        <div class="px-4 pb-3 font-bold border-b flex justify-between">
            <div>
                {{ props.title }}
                <p class="font-normal text-xs mt-2">{{ props.description }}</p>
            </div>
            <div v-if="hasButton">
                <PrimaryButton @click="emits('onClick')">{{ buttonTitle }}</PrimaryButton>
            </div>
        </div>
        <div class="px-6 pt-4">
            <slot name="search&switch" />
        </div>
        <div class="border m-4 rounded-2xl overflow-auto pb-60 h-full scrollbar-hide">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.scrollbar-hide {
    scrollbar-width: none;
    -ms-overflow-style: none;
}
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>
