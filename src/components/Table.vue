<script setup>
const props = defineProps({
    menus: {
        type: Array,
        required: true,
        default: () => []
    }
})

const emit = defineEmits(['view', 'edit', 'delete'])
</script>

<template>

    <div class="relative w-full overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base">
        <table class="min-w-[760px] w-full text-sm text-left rtl:text-right text-body">
            <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default whitespace-nowrap">
                <tr>
                    <th scope="col" class="px-6 py-3 font-medium">
                        Nom du menu
                    </th>
                    <th scope="col" class="px-6 py-3 font-medium">
                        Description
                    </th>
                    <th scope="col" class="px-6 py-3 font-medium">
                        Catégorie
                    </th>
                    <th scope="col" class="px-6 py-3 font-medium">
                        Prix
                    </th>
                    <th scope="col" class="px-6 py-3 font-medium">
                        Actif
                    </th>
                    <th scope="col" class="px-6 py-3 font-medium">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-neutral-primary border-b" v-for="(menu, index) in menus" :key="index">
                    <th class="px-6 py-4 font-medium text-heading whitespace-nowrap max-w-[16rem] truncate">
                        {{menu.name}}
                    </th>
                    <td class="px-6 py-4 max-w-[22rem] truncate">
                        {{menu.description}}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap max-w-[14rem] truncate">
                        {{menu.category}}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{menu.price}}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex rounded-full px-2 py-1 text-xs font-semibold"
                            :class="menu.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'">
                            {{ menu.active ? 'Actif' : 'Inactif' }}
                        </span>
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex flex-wrap items-center gap-2">
                            <button type="button"
                                class="rounded-xl border px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 whitespace-nowrap"
                                @click="emit('view', menu)">
                                Visualiser
                            </button>
                            <button type="button"
                                class="rounded-xl border px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 whitespace-nowrap"
                                @click="emit('edit', menu)">
                                Éditer
                            </button>
                            <button type="button"
                                class="rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 whitespace-nowrap"
                                @click="emit('delete', menu)">
                                Supprimer
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

