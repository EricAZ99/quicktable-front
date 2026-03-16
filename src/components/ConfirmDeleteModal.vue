<script setup>
/**
 * ConfirmDeleteModal
 * Modal de confirmation avant suppression d'un élément.
 * Émet 'confirm' si l'utilisateur valide, 'cancel' s'il annule ou clique sur le backdrop.
 */

/** Titre affiché en haut du modal */
/** Message d'avertissement affiché sous le titre */
/** Nom de l'élément à supprimer, affiché en surbrillance */
defineProps({
    title: { type: String, default: 'Confirmer la suppression' },
    message: { type: String, default: 'Cette action est irréversible.' },
    itemName: { type: String, default: '' },
})
/** Événements émis : confirm (suppression validée), cancel (suppression annulée) */
const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="emit('cancel')" />

                <!-- Card -->
                <div class="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-5">
                    <!-- Icon -->
                    <div class="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 mx-auto">
                        <svg class="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16" />
                        </svg>
                    </div>

                    <!-- Text -->
                    <div class="text-center">
                        <h3 class="text-base font-semibold text-slate-800">{{ title }}</h3>
                        <p class="mt-1 text-sm text-slate-500">{{ message }}</p>
                        <p v-if="itemName" class="mt-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg px-3 py-1.5 inline-block">
                            « {{ itemName }} »
                        </p>
                    </div>

                    <!-- Actions -->
                    <div class="flex gap-3">
                        <button @click="emit('cancel')"
                            class="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                            Annuler
                        </button>
                        <button @click="emit('confirm')"
                            class="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 active:scale-95 transition-all">
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-enter-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}
.modal-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}
.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>
