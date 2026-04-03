<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import PrimaryButton from '../../components/PrimaryButton.vue';

const route = useRoute()
const isSidepanelOpen = ref(false)
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



const switchNav = () => {
    isSidepanelOpen.value = !isSidepanelOpen.value
}

</script>

<template>
    <div
        class="flex w-full xl:max-h-screen xl:h-dvh gap-4 px-4 sm:px-6 xl:px-10 2xl:px-40 text-slate-800 font-medium overflow-x-hidden py-4">
        <div class="hidden xl:h-full w-1/5 p-s6 text-sm xl:flex flex-col justify-start gap-4 shrink-0">
            <div class="border rounded-2xl bg-white p-6">
                <h2 class="font-bold text-lg mb-2">QuickTable Admin</h2>
                <nav class="flex flex-col justify-center font-medium">
                    <RouterLink class="p-2 rounded-lg" active-class="border bg-slate-800 text-slate-100 drop-shadow-md"
                        to="/admin-home">Tableau de bord</RouterLink>
                    <RouterLink class="p-2 rounded-lg" active-class="border bg-slate-800 text-slate-100 drop-shadow-md"
                        to="/admin-menu">Menu</RouterLink>
                    <RouterLink class="p-2 rounded-lg" active-class="border bg-slate-800 text-slate-100 drop-shadow-md"
                        to="/admin-plates">Plats</RouterLink>
                    <RouterLink class="p-2 rounded-lg" active-class="border bg-slate-800 text-slate-100 drop-shadow-md"
                        to="/admin-table">Tables</RouterLink>
                    <RouterLink class="p-2 rounded-lg" active-class="border bg-slate-800 text-slate-100 drop-shadow-md"
                        to="/admin-order">Commandes</RouterLink>
                    <RouterLink class="p-2 rounded-lg" active-class="border bg-slate-800 text-slate-100 drop-shadow-md"
                        to="/admin-stat">Statistiques</RouterLink>
                    <RouterLink class="p-2 rounded-lg" active-class="border bg-slate-800 text-slate-100 drop-shadow-md"
                        to="/admin-collaborators">Collaborateurs</RouterLink>
                    <RouterLink class="p-2 rounded-lg" active-class="border bg-slate-800 text-slate-100 drop-shadow-md"
                        to="/admin-notice">Avis clients</RouterLink>
                    <RouterLink class="p-2 rounded-lg" active-class="border bg-slate-800 text-slate-100 drop-shadow-md"
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
                <div
                    class="duration-200 transition-all border-red-400 text-slate-800 flex justify-center items-center gap-3">
                    <span class="relative hover:text-slate-400 cursor-pointer" @click="switchNav()">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-8 w-8 drop-shadow-xl"
                                fill="currentColor">
                                <path
                                    d="M224 0c-17.7 0-32 14.3-32 32l0 3.2C119 50 64 114.6 64 192l0 21.7c0 48.1-16.4 94.8-46.4 132.4L7.8 358.3C2.7 364.6 0 372.4 0 380.5 0 400.1 15.9 416 35.5 416l376.9 0c19.6 0 35.5-15.9 35.5-35.5 0-8.1-2.7-15.9-7.8-22.2l-9.8-12.2C400.4 308.5 384 261.8 384 213.7l0-21.7c0-77.4-55-142-128-156.8l0-3.2c0-17.7-14.3-32-32-32zM162 464c7.1 27.6 32.2 48 62 48s54.9-20.4 62-48l-124 0z" />
                            </svg>
                        </span>
                        <span
                            class="bg-red-500 h-5 w-5 absolute -top-2 right-0 rounded-full flex justify-center items-center text-white text-[.6rem] shadow-xl drop-shadow-xl">99+</span>
                    </span>
                    <!-- <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-6 w-6"
                            fill="currentColor">
                            <path
                                d="M65.9 228.5c13.3-93 93.4-164.5 190.1-164.5 53 0 101 21.5 135.8 56.2 .2 .2 .4 .4 .6 .6l7.6 7.2-47.9 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 53.4-11.3-10.7C390.5 28.6 326.5 0 256 0 127 0 20.3 95.4 2.6 219.5 .1 237 12.2 253.2 29.7 255.7s33.7-9.7 36.2-27.1zm443.5 64c2.5-17.5-9.7-33.7-27.1-36.2s-33.7 9.7-36.2 27.1c-13.3 93-93.4 164.5-190.1 164.5-53 0-101-21.5-135.8-56.2-.2-.2-.4-.4-.6-.6l-7.6-7.2 47.9 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 320c-8.5 0-16.7 3.4-22.7 9.5S-.1 343.7 0 352.3l1 127c.1 17.7 14.6 31.9 32.3 31.7S65.2 496.4 65 478.7l-.4-51.5 10.7 10.1c46.3 46.1 110.2 74.7 180.7 74.7 129 0 235.7-95.4 253.4-219.5z" />
                        </svg>
                    </span> -->
                    <PrimaryButton>
                        Actualiser
                    </PrimaryButton>
                </div>
            </div>
            <Transition name="page" mode="out-in" appear>
                <div id="mySidepanel"
                    :class="isSidepanelOpen ? 'w-[250px] right-1' : 'w-0 -right-1'"
                    class="fixed z-[99] border border-black h-[80%] bottom-0 bg-white overflow-x-hidden transition-all duration-200 pt-20">
                    <div>d</div>
                </div>
            </Transition>
            <div
                class="rounded-2xl max-h-[calc(100dvh-10rem)] overflow-y-auto xl:max-h-none xl:overflow-y-auto xl:flex-1 xl:min-h-0">
                <slot />
            </div>
        </div>
    </div>
</template>


<style scoped>
.page-enter-active,
.page-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    transform: translateY(12px);
}

.sidepanel {
    width: 0;
    position: fixed;
    z-index: 1;
    height: 100%;
    top: 0;
    right: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
}


/* .fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(6px);
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
    opacity: 0;
    transform: translateY(16px);
} */
</style>
