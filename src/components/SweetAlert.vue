<script setup>
import { onMounted, ref } from 'vue';
import FormBackGround from './FormBackGround.vue';

const props = defineProps({
    success: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
})
const emits = defineEmits(['delete', 'close']);

const width = ref(100)
const isLoading = ref(true)
const loading = () => {
    let percent = 100
    const interval = setInterval(() => {
        if (percent > 0) {
            percent -= 1;
            width.value = percent;
        } else {
            isLoading.value = false;
            width.value = 100
            clearInterval(interval);
            emits('close')
        }
    }, 30);
}

onMounted(() => {
    loading()
})

</script>

<template>
    <FormBackGround>
        <!-- Alerte de succès -->
        <div v-if="props.success" class="flex flex-col justify-center items-center p-5 text-sm">
            <div class="rounded-full bg-green-200 p-3 flex justify-center items-center text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-8 w-8" fill="currentColor">
                    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                </svg>
            </div>
            <h2 class="text-lg">Succès</h2>
            <p class="text-sm font-normal
            text-gray-500 dark:text-gray-400">Opération effectuée avec succès
            </p>
            <div class="w-[20rem] bg-gray-300 rounded-full mt-4">
                <div class="py-1 rounded-full bg-green-600 transition-all duration-75" :style="{ width: width + '%' }">
                </div>
            </div>
        </div>
        <!-- Alerte de confirmation -->
        <div v-if="props.edit" class="flex flex-col justify-center items-center p-5 text-sm">
            <div class="rounded-full bg-yellow-200 p-3 flex justify-center items-center text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-8 w-8" fill="currentColor">
                    <path
                        d="M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M11,15H13V17H11V15M11,7H13V13H11V7" />
                </svg>
            </div>
            <h2 class="text-lg">Confirmer la modification</h2>
            <p class="text-sm font-normal
            text-gray-500 dark:text-gray-400">Voulez-vous enregistrer les modifications ?
            </p>
            <div class="flex gap-2 mt-4 w-full">

                <button class="w-full bg-gray-100 hover:bg-gray-200 text-slate-800 font-semibold py-2 rounded-lg"
                    @click="emits('close')">
                    Annuler
                </button>
                <button class="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 rounded-lg">
                    Oui, modifier
                </button>
            </div>
        </div>
        <!-- Alerte de suppression -->
        <div v-if="props.delete" class="flex flex-col justify-center items-center p-2 text-sm">
            <div class="rounded-full bg-red-200 p-3 flex justify-center items-center text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor">
                    <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
                </svg>
            </div>
            <h2 class="text-md">Voulez-vous vraiment supprimer cet élément
                ?</h2>
            <p class="text-sm font-normal
            text-gray-500 dark:text-gray-400">Cette action est irréversible
            </p>
            <div class="flex gap-2 mt-4 w-full">

                <button class="w-full bg-gray-100 hover:bg-gray-200 text-slate-800 font-semibold py-2 rounded-lg"
                    @click="emits('close')">
                    Annuler
                </button>
                <button class="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded-lg"
                    @click="emits('delete')">
                    Oui, supprimer
                </button>
            </div>
        </div>
    </FormBackGround>
</template>