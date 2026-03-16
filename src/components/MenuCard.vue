<script setup>
import { computed } from 'vue'

const props = defineProps({
    menus: {
        type: [Array, Object],
        default: () => ([])
    }
})

const emit = defineEmits(['view', 'edit', 'delete', 'toggle-active'])

const menuList = computed(() => {
    if (Array.isArray(props.menus)) return props.menus
    if (!props.menus) return []
    return Object.values(props.menus)
})

const setIcon = (icon) => {
    if (icon == false) return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor"><path d="M9,10V16H15V10H19L12,3L5,10H9M12,5.8L14.2,8H13V14H11V8H9.8L12,5.8M19,18H5V20H19V18Z" /></svg>'
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor"><path d="M22.11 21.46L2.39 1.73L1.11 3L6.56 8.45L5 10H8.11L9 10.89V16H14.11L16.11 18H5V20H18.11L20.84 22.73L22.11 21.46M11 14V12.89L12.11 14H11M12 5.8L14.2 8H13V9.8L15 11.8V10H19L12 3L9.1 5.9L10.5 7.3L12 5.8Z" /></svg>'
}

const formatPrice = (value) => {
    if (value === null || value === undefined || value === '') return ''
    const numberValue = typeof value === 'number' ? value : Number(value)
    if (Number.isFinite(numberValue)) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
        }).format(numberValue)
    }
    return String(value)
}
</script>
<template>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div v-if="menuList.length === 0" class="rounded-2xl border bg-white p-6 text-sm text-slate-600">
            Aucun menu à afficher.
        </div>

        <article v-for="(menu, index) in menuList" :key="menu?.id ?? index"
            class="rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <header class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                    <div class="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-800 shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor">
                            <path
                                d="M5.44 7.96L5.96 7.43C6.54 6.85 7.5 6.85 8.1 7.47L8.12 7.5C8.61 8 9.26 8.24 9.97 8.31C10.94 8.4 11.88 8.92 12.5 9.86C13.18 10.94 13.17 12.38 12.46 13.45C11.26 15.3 8.75 15.5 7.28 14C6.72 13.45 6.4 12.74 6.32 12C6.24 11.27 5.95 10.58 5.44 10.07C4.86 9.5 4.86 8.54 5.44 7.96M9.64 16C8.47 16 7.38 15.55 6.57 14.72C5.87 14 5.43 13.1 5.32 12.12C5.29 11.82 5.2 11.43 4.96 11.07C4.36 11.9 4 12.9 4 14C4 15.64 4.8 17.09 6.03 18H19V17C19 13.4 16.61 10.35 13.34 9.35C14.23 10.75 14.21 12.62 13.3 14C12.5 15.25 11.12 16 9.64 16M14.78 7.56H16.05C16.92 7.56 17.68 8.17 17.68 9.26V10H18.93V9C18.93 7.5 17.6 6.36 16.05 6.36H14.78C13.95 6.36 13.24 5.54 13.24 4.7S13.95 3.24 14.78 3.24V2C13.24 2 12 3.24 12 4.78S13.24 7.56 14.78 7.56M4.5 7.55C4.56 7.45 4.64 7.35 4.73 7.25L5.25 6.73C5.34 6.64 5.44 6.57 5.54 6.5L4.13 5.07C4.27 4.8 4.22 4.45 4 4.22C3.7 3.93 3.22 3.93 2.93 4.22C2.79 4.36 2.72 4.53 2.71 4.71C2.53 4.72 2.36 4.79 2.22 4.93C1.93 5.22 1.93 5.7 2.22 6C2.45 6.22 2.79 6.27 3.07 6.13L4.5 7.55M18.39 4.39C18.9 3.88 19.22 3.19 19.22 2.42H17.97C17.97 3.25 17.27 3.95 16.44 3.95V5.19C18.3 5.19 19.76 6.71 19.76 8.57V11H21V8.57C21 6.72 19.94 5.13 18.39 4.39M5 21H19C20.11 21 21 20.11 21 19H3C3 20.11 3.9 21 5 21Z" />
                        </svg>
                    </div>

                    <div class="min-w-0">
                        <h3 class="font-semibold text-slate-900 truncate">{{ menu?.name ?? 'Sans nom' }}</h3>
                        <p class="text-sm text-slate-600 break-words truncate">
                            {{ menu?.description ?? '—' }}
                        </p>
                    </div>
                </div>

                <span class="shrink-0 rounded-full px-2 py-1 text-xs font-semibold"
                    :class="menu?.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'">
                    {{ menu?.active ? 'Actif' : 'Inactif' }}
                </span>
            </header>

            <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div class="flex flex-wrap items-center gap-2 text-sm min-w-0">
                    <span class="rounded-full bg-slate-100 px-2 py-1 text-slate-700">
                        {{ menu?.category ?? 'Sans catégorie' }}
                    </span>
                    <span class="font-semibold text-slate-900">
                        {{ formatPrice(menu?.price) || '—' }}
                    </span>
                </div>

                <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto sm:justify-end">
                    <button type="button" class="hover:bg-slate-50 whitespace-nowrap"
                        @click="emit('toggle-active', menu)"
                        :class="menu.active ? 'bg-slate-100 text-slate-600' : 'bg-emerald-50 text-emerald-700'"
                        v-html="setIcon(menu.active)">
                    </button>
                    <button type="button" class="text-slate-800 hover:bg-slate-50 whitespace-nowrap"
                        @click="emit('view', menu)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
                            <path
                                d="M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,11A1,1 0 0,1 13,12A1,1 0 0,1 12,13A1,1 0 0,1 11,12A1,1 0 0,1 12,11M12,8C14.63,8 17,9.57 18,12C16.62,15.31 12.81,16.88 9.5,15.5C7.92,14.84 6.66,13.58 6,12C7,9.57 9.37,8 12,8M12,9.5A2.5,2.5 0 0,0 9.5,12A2.5,2.5 0 0,0 12,14.5A2.5,2.5 0 0,0 14.5,12A2.5,2.5 0 0,0 12,9.5" />
                        </svg>
                    </button>
                    <button type="button" class="rounded-xl text-slate-800 hover:bg-slate-50 whitespace-nowrap"
                        @click="emit('edit', menu)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
                            <path
                                d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                        </svg>
                    </button>
                    <button type="button" class=" text-red-700 whitespace-nowrap" @click="emit('delete', menu)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
                            <path
                                d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </article>
    </div>
</template>
