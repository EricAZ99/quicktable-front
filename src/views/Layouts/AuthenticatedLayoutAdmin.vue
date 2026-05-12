<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import PrimaryButton from '../../components/PrimaryButton.vue';
import { listNotifications, markAllNotificationsAsRead } from '../../services/notifications';

const route = useRoute()
const isSidepanelOpen = ref(false)
const notifications = ref([])
const isLoadingNotifications = ref(false)
const data = localStorage.getItem('user_authenticated');
const isAuthenticated = data ? JSON.parse(data) : null;
const database = isAuthenticated?.user?.database || '';

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

const unreadCount = computed(() => notifications.value.filter(notification => notification.unread).length)
const todayCount = computed(() => notifications.value.filter(notification => {
    if (!notification.createdAt) {
        return false
    }

    const createdAt = new Date(notification.createdAt)
    const now = new Date()

    return createdAt.getFullYear() === now.getFullYear()
        && createdAt.getMonth() === now.getMonth()
        && createdAt.getDate() === now.getDate()
}).length)
const priorityCount = computed(() => notifications.value.filter(notification =>
    ['warning', 'error'].includes(notification.type) && notification.unread
).length)

function notificationBadgeClasses(type) {
    return {
        warning: 'bg-amber-50 text-amber-700 ring-amber-200',
        success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
        info: 'bg-sky-50 text-sky-700 ring-sky-200',
        default: 'bg-slate-100 text-slate-700 ring-slate-200',
    }[type] || 'bg-slate-100 text-slate-700 ring-slate-200'
}

function notificationDotClasses(type) {
    return {
        warning: 'bg-amber-500',
        success: 'bg-emerald-500',
        info: 'bg-sky-500',
        default: 'bg-slate-400',
    }[type] || 'bg-slate-400'
}

async function loadNotifications() {
    if (!database) {
        notifications.value = []
        return
    }

    isLoadingNotifications.value = true

    try {
        const response = await listNotifications(database)
        notifications.value = response.notifications || []
    } catch (_error) {
        notifications.value = []
    } finally {
        isLoadingNotifications.value = false
    }
}

async function markAllAsRead() {
    if (!database) {
        return
    }

    try {
        const response = await markAllNotificationsAsRead(database)
        notifications.value = response.notifications || []
    } catch (_error) {
        // On garde l'etat actuel si la mise a jour echoue.
    }
}

onMounted(() => {
    loadNotifications()
})

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
                            class="bg-red-500 min-w-5 h-5 px-1 absolute -top-2 right-0 rounded-full flex justify-center items-center text-white text-[.6rem] shadow-xl drop-shadow-xl">
                            {{ unreadCount > 99 ? '99+' : unreadCount }}
                        </span>
                    </span>
                    <!-- <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-6 w-6"
                            fill="currentColor">
                            <path
                                d="M65.9 228.5c13.3-93 93.4-164.5 190.1-164.5 53 0 101 21.5 135.8 56.2 .2 .2 .4 .4 .6 .6l7.6 7.2-47.9 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 53.4-11.3-10.7C390.5 28.6 326.5 0 256 0 127 0 20.3 95.4 2.6 219.5 .1 237 12.2 253.2 29.7 255.7s33.7-9.7 36.2-27.1zm443.5 64c2.5-17.5-9.7-33.7-27.1-36.2s-33.7 9.7-36.2 27.1c-13.3 93-93.4 164.5-190.1 164.5-53 0-101-21.5-135.8-56.2-.2-.2-.4-.4-.6-.6l-7.6-7.2 47.9 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 320c-8.5 0-16.7 3.4-22.7 9.5S-.1 343.7 0 352.3l1 127c.1 17.7 14.6 31.9 32.3 31.7S65.2 496.4 65 478.7l-.4-51.5 10.7 10.1c46.3 46.1 110.2 74.7 180.7 74.7 129 0 235.7-95.4 253.4-219.5z" />
                        </svg>
                    </span> -->
                    <PrimaryButton @click="loadNotifications">
                        Actualiser
                    </PrimaryButton>
                </div>
            </div>
            <Transition name="page" mode="out-in" appear>
                <div v-if="isSidepanelOpen" class="fixed inset-0 z-[99]">
                    <button class="absolute inset-0 bg-slate-900/20 backdrop-blur-[1px]" @click="switchNav()" />
                    <div
                        class="absolute right-4 top-4 bottom-4 w-[calc(100%-2rem)] max-w-md rounded-[28px] border border-slate-200 bg-white/95 shadow-2xl ring-1 ring-black/5 backdrop-blur overflow-hidden">
                        <div class="flex h-full flex-col">
                            <div class="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white px-5 py-4">
                                <div class="flex items-start justify-between gap-3">
                                    <div>
                                        <p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                                            Centre de notifications
                                        </p>
                                        <h2 class="mt-1 text-lg font-bold text-slate-800">
                                            Suivi en temps réel
                                        </h2>
                                        <p class="mt-1 text-sm text-slate-500">
                                            {{ unreadCount }} nouvelle<span v-if="unreadCount > 1">s</span> activité<span
                                                v-if="unreadCount > 1">s</span> à consulter.
                                        </p>
                                    </div>
                                    <button
                                        class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
                                        @click="switchNav()">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="h-4 w-4"
                                            fill="currentColor">
                                            <path
                                                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                        </svg>
                                    </button>
                                </div>
                                <div class="mt-4 grid grid-cols-3 gap-2">
                                    <div class="rounded-2xl border border-slate-200 bg-white p-3">
                                        <p class="text-xs text-slate-400">Non lues</p>
                                        <p class="mt-1 text-xl font-bold text-slate-800">{{ unreadCount }}</p>
                                    </div>
                                    <div class="rounded-2xl border border-slate-200 bg-white p-3">
                                        <p class="text-xs text-slate-400">Aujourd’hui</p>
                                        <p class="mt-1 text-xl font-bold text-slate-800">{{ todayCount }}</p>
                                    </div>
                                    <div class="rounded-2xl border border-slate-200 bg-white p-3">
                                        <p class="text-xs text-slate-400">Priorité</p>
                                        <p class="mt-1 text-xl font-bold text-amber-600">{{ priorityCount }}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="flex-1 overflow-y-auto px-4 py-4">
                                <div v-if="isLoadingNotifications" class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                                    Chargement des notifications...
                                </div>
                                <div v-else-if="notifications.length === 0"
                                    class="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
                                    <p class="text-sm font-semibold text-slate-700">Aucune notification pour le moment</p>
                                    <p class="mt-1 text-sm text-slate-500">
                                        Les nouvelles actions du restaurant apparaîtront ici.
                                    </p>
                                </div>
                                <div v-else class="space-y-3">
                                    <article v-for="notification in notifications" :key="notification.id"
                                        class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
                                        <div class="flex items-start gap-3">
                                            <div class="mt-1 h-2.5 w-2.5 rounded-full shrink-0"
                                                :class="notificationDotClasses(notification.type)" />
                                            <div class="min-w-0 flex-1">
                                                <div class="flex items-center justify-between gap-3">
                                                    <h3 class="truncate text-sm font-semibold text-slate-800">
                                                        {{ notification.title }}
                                                    </h3>
                                                    <span
                                                        class="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1"
                                                        :class="notificationBadgeClasses(notification.type)">
                                                        {{ notification.unread ? 'Nouveau' : 'Lu' }}
                                                    </span>
                                                </div>
                                                <p class="mt-1 text-sm leading-5 text-slate-500">
                                                    {{ notification.description }}
                                                </p>
                                                <div class="mt-3 flex items-center justify-between text-xs text-slate-400">
                                                    <span>{{ notification.time }}</span>
                                                    <button
                                                        class="font-semibold text-slate-600 transition hover:text-slate-900">
                                                        Voir le détail
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>

                            <div class="border-t border-slate-100 bg-slate-50/80 px-5 py-4">
                                <div class="flex items-center justify-between gap-3">
                                    <p class="text-sm text-slate-500">
                                        Les dernières activités importantes apparaissent ici.
                                    </p>
                                    <button
                                        @click="markAllAsRead"
                                        class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100">
                                        Tout marquer lu
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
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

</style>
