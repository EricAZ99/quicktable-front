<script setup>
const props = defineProps({
    data: { type: Array, required: true, default: () => [] },
    columns: {
        type: Array,
        required: true,
        // [{ label: 'Nom', key: 'name', type: 'text' | 'price' | 'boolean' }]
        default: () => []
    },
    activeKey: { type: String, default: 'active' }
})

const emit = defineEmits(['toggle-active', 'view', 'edit', 'delete'])

const setIcon = (isActive) => {
    if (!isActive) return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor"><path d="M9,10V16H15V10H19L12,3L5,10H9M12,5.8L14.2,8H13V14H11V8H9.8L12,5.8M19,18H5V20H19V18Z" /></svg>'
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor"><path d="M22.11 21.46L2.39 1.73L1.11 3L6.56 8.45L5 10H8.11L9 10.89V16H14.11L16.11 18H5V20H18.11L20.84 22.73L22.11 21.46M11 14V12.89L12.11 14H11M12 5.8L14.2 8H13V9.8L15 11.8V10H19L12 3L9.1 5.9L10.5 7.3L12 5.8Z" /></svg>'
}

const formatPrice = (value) => {
    if (value === null || value === undefined || value === '') return '—'
    const n = typeof value === 'number' ? value : Number(value)
    if (Number.isFinite(n)) {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
    }
    return String(value)
}

const formatCell = (row, col) => {
    const val = row[col.key]
    if (col.type === 'price') return formatPrice(val)
    return val ?? '—'
}
</script>

<template>
    <div class="relative w-full overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base">
        <table class="min-w-[760px] w-full text-sm text-left rtl:text-right text-body">
            <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default whitespace-nowrap">
                <tr>
                    <th v-for="col in columns" :key="col.key" scope="col" class="px-6 py-3 font-medium">
                        {{ col.label }}
                    </th>
                    <th scope="col" class="px-6 py-3 font-medium text-end">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-neutral-primary border-b" v-for="(row, index) in data" :key="row.id ?? index">
                    <td v-for="(col, i) in columns" :key="col.key"
                        class="px-6 py-4 truncate"
                        :class="i === 0 ? 'font-medium text-heading whitespace-nowrap max-w-[16rem]' : 'max-w-[22rem]'">
                        <template v-if="col.type === 'boolean'">
                            <span class="inline-flex rounded-full px-2 py-1 text-xs font-semibold"
                                :class="row[col.key] ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'">
                                {{ row[col.key] ? 'Actif' : 'Inactif' }}
                            </span>
                        </template>
                        <template v-else>{{ formatCell(row, col) }}</template>
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex flex-wrap items-center justify-end gap-4">
                            <button type="button" class="hover:bg-slate-50 whitespace-nowrap"
                                @click="emit('toggle-active', row)"
                                :class="row[activeKey] ? 'bg-slate-100 text-slate-600' : 'bg-emerald-50 text-emerald-700'"
                                v-html="setIcon(row[activeKey])">
                            </button>
                            <button type="button" class="text-slate-800 hover:bg-slate-50 whitespace-nowrap"
                                @click="emit('view', row)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
                                    <path d="M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,11A1,1 0 0,1 13,12A1,1 0 0,1 12,13A1,1 0 0,1 11,12A1,1 0 0,1 12,11M12,8C14.63,8 17,9.57 18,12C16.62,15.31 12.81,16.88 9.5,15.5C7.92,14.84 6.66,13.58 6,12C7,9.57 9.37,8 12,8M12,9.5A2.5,2.5 0 0,0 9.5,12A2.5,2.5 0 0,0 12,14.5A2.5,2.5 0 0,0 14.5,12A2.5,2.5 0 0,0 12,9.5" />
                                </svg>
                            </button>
                            <button type="button" class="rounded-xl text-slate-800 hover:bg-slate-50 whitespace-nowrap"
                                @click="emit('edit', row)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
                                    <path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                </svg>
                            </button>
                            <button type="button" class="text-red-700 whitespace-nowrap" @click="emit('delete', row)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
                                    <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
