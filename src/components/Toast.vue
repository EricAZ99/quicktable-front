<script setup>
/**
 * Toast
 * Notification temporaire affichée en bas à droite.
 * Se ferme automatiquement après ~3s via une barre de progression.
 * Supporte les types 'success' (vert) et 'warning' (ambre).
 */
import { onMounted, ref, computed } from 'vue';

/** Type du toast : 'success' | 'warning' */
/** Message affiché dans le corps du toast */
const props = defineProps({
    type: { type: String, default: 'success' },
    message: { type: String, default: '' },
})
/** Événement émis quand le toast se ferme (manuellement ou automatiquement) */
const emit = defineEmits(['close'])

/** Progression de la barre (100 → 0), décrémentée toutes les 30ms */
const progress = ref(100)

/** Configuration visuelle selon le type du toast */
const config = computed(() => ({
    success: {
        label: 'Succès',
        icon: 'bg-emerald-50',
        iconColor: 'text-emerald-500',
        bar: 'bg-emerald-400',
        svg: 'M5 13l4 4L19 7',
    },
    warning: {
        label: 'Attention',
        icon: 'bg-amber-50',
        iconColor: 'text-amber-500',
        bar: 'bg-amber-400',
        svg: 'M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z',
    },
}[props.type]))

/** Lance le compte à rebours dès le montage du composant */
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
                    <div :class="['flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center', config.icon]">
                        <svg :class="['w-5 h-5', config.iconColor]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
                            <path stroke-linecap="round" stroke-linejoin="round" :d="config.svg" />
                        </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-slate-800">{{ config.label }}</p>
                        <p class="text-xs text-slate-500 mt-0.5">{{ message }}</p>
                    </div>
                    <button @click="emit('close')" class="text-slate-300 hover:text-slate-500 transition-colors mt-0.5">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="h-1 bg-slate-100">
                    <div :class="['h-full transition-all duration-75 rounded-full', config.bar]"
                        :style="{ width: progress + '%' }" />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.toast-enter-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.toast-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.toast-enter-from,
.toast-leave-to { opacity: 0; transform: translateY(12px) scale(0.97); }
</style>
