<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    message: { type: String, default: 'Opération effectuée avec succès.' },
})
const emit = defineEmits(['close'])

const progress = ref(100)

onMounted(() => {
    const interval = setInterval(() => {
        progress.value -= 1;
        if (progress.value <= 0) {
            clearInterval(interval);
            emit('close');
        }
    }, 30);
})
</script>

<template>
    <Teleport to="body">
        <Transition name="toast">
            <div class="fixed bottom-6 right-6 z-50 w-80 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                <div class="flex items-start gap-3 p-4">
                    <div class="flex-shrink-0 w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center">
                        <svg class="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-slate-800">Succès</p>
                        <p class="text-xs text-slate-500 mt-0.5">{{ message }}</p>
                    </div>
                    <button @click="emit('close')" class="text-slate-300 hover:text-slate-500 transition-colors mt-0.5">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <!-- Progress bar -->
                <div class="h-1 bg-slate-100">
                    <div class="h-full bg-emerald-400 transition-all duration-75 rounded-full"
                        :style="{ width: progress + '%' }" />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.toast-enter-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
}
.toast-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}
.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateY(12px) scale(0.97);
}
</style>
