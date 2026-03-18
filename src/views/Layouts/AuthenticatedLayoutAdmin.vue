<script setup>
import { useRoute } from 'vue-router'
import PrimaryButton from '../../components/PrimaryButton.vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Tableau de bord',
    },
    mean: {
        type: String,
        default: 'Bienvenue sur votre espace administrateur',
    }
})

const route = useRoute()

</script>

<template>
    <div
        class="flex w-full xl:max-h-screen xl:h-dvh gap-4 px-4 sm:px-6 xl:px-10 2xl:px-40 text-slate-800 font-medium overflow-x-hidden py-4">
        <div class="hidden xl:h-full w-1/5 p-s6 text-sm xl:flex flex-col justify-start gap-4 shrink-0">
            <div class="border rounded-2xl bg-white p-6">
                <h2 class="font-bold text-lg mb-2">QuickTable Admin</h2>
                <nav class="flex flex-col justify-center font-medium">
                    <RouterLink class="p-2 rounded-lg" active-class="border bg-slate-800 text-slate-100"
                        to="/admin-home">Tableau de bord</RouterLink>
                    <RouterLink class="p-2 rounded-lg" active-class="border bg-slate-800 text-slate-100"
                        to="/admin-menu">Menu</RouterLink>
                    <RouterLink class="p-2 rounded-lg" active-class="border bg-slate-800 text-slate-100"
                        to="/admin-plates">Plates</RouterLink>
                    <RouterLink class="p-2 rounded-lg" active-class="border bg-slate-800 text-slate-100"
                        to="/admin-table">Tables</RouterLink>
                    <RouterLink class="p-2 rounded-lg" active-class="border bg-slate-800 text-slate-100"
                        to="/admin-order">Commandes</RouterLink>
                    <RouterLink class="p-2 rounded-lg" active-class="border bg-slate-800 text-slate-100"
                        to="/admin-stat">Statistiques</RouterLink>
                    <RouterLink class="p-2 rounded-lg" active-class="border bg-slate-800 text-slate-100"
                        to="/admin-collaborators">Collaborateurs</RouterLink>
                    <RouterLink class="p-2 rounded-lg" active-class="border bg-slate-800 text-slate-100"
                        to="/admin-notice">Avis clients</RouterLink>
                    <RouterLink class="p-2 rounded-lg" active-class="border bg-slate-800 text-slate-100"
                        to="/admin-settings">Paramètres</RouterLink>
                </nav>
            </div>
            <div class="border rounded-2xl bg-white p-6">
                <nav class="flex flex-col justify-center font-medium">
                    <RouterLink class="p-2 rounded-lg text-slate-800 flex items-center" to="/admin-home">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6"
                                fill="currentColor">
                                <path
                                    d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
                            </svg>
                        </span>
                        <span>User</span>
                    </RouterLink>
                    <RouterLink class="p-2 rounded-lg" to="/">Déconnexion</RouterLink>
                </nav>
            </div>
        </div>
        <div class="flex-1 min-w-0 flex flex-col gap-4 overflow-x-hidden xl:overflow-hidden xl:h-full">
            <div class="bg-white p-4 rounded-2xl border flex justify-between w-full shrink-0">
                <div class="flex flex-col">
                    <p class="font-normal text-sm">Admin / {{ route.name }}</p>
                    <h1 class="font-bold text-xl">{{ props.title }}</h1>
                    <p class="font-normal text-sm">{{ props.mean }}</p>
                </div>
                <div>
                    <PrimaryButton>
                        Actualiser
                    </PrimaryButton>
                </div>
            </div>
            <div class="rounded-2xl max-h-[calc(100dvh-10rem)] overflow-y-auto xl:max-h-none xl:overflow-y-auto xl:flex-1 xl:min-h-0">
                <slot />
            </div>
        </div>
    </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    transform: translateY(12px);
}
</style>
