<script setup>
/**
 * Table
 * Tableau générique et réutilisable.
 * Affiche les données passées en prop selon les colonnes définies.
 * Gère les actions : toggle actif, prévisualiser, modifier, télécharger, supprimer.
 */

/** Données à afficher dans le tableau */
/** Définition des colonnes : [{ label, key, type? }] */
/** Affiche le bouton de modification */
/** Affiche le bouton de prévisualisation */
/** Affiche le bouton de suppression */
/** Affiche le bouton de téléchargement */
/** Libellé du bouton toggle quand actif */
/** Libellé du bouton toggle quand inactif */
/** Clé utilisée pour déterminer l'état actif d'une ligne */
const props = defineProps({
    data: { type: Array, required: true, default: () => [] },
    columns: { type: Array, required: true, default: () => [] },
    has_update_button: { type: Boolean, default: false },
    has_view_button: { type: Boolean, default: false },
    has_delete_button: { type: Boolean, default: false },
    can_download: { type: Boolean, default: false },
    icon_on: { type: String, default: 'Activer' },
    icon_off: { type: String, default: 'Désactiver' },
    has_toggle: { type: Boolean, default: true },
    activeKey: { type: String, default: 'active' },
})

/** Événements émis selon l'action effectuée sur une ligne */
const emit = defineEmits(['toggle-active', 'download', 'view', 'edit', 'delete'])

/** Retourne l'icône SVG selon l'état actif de la ligne */
const setIcon = (isActive) => {
    if (!isActive) return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor"><title>${props.icon_on}</title><path d="M9,10V16H15V10H19L12,3L5,10H9M12,5.8L14.2,8H13V14H11V8H9.8L12,5.8M19,18H5V20H19V18Z" /></svg>`
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor"><title>${props.icon_off}</title><path d="M22.11 21.46L2.39 1.73L1.11 3L6.56 8.45L5 10H8.11L9 10.89V16H14.11L16.11 18H5V20H18.11L20.84 22.73L22.11 21.46M11 14V12.89L12.11 14H11M12 5.8L14.2 8H13V9.8L15 11.8V10H19L12 3L9.1 5.9L10.5 7.3L12 5.8Z" /></svg>`
}

/** Formate une valeur numérique en devise EUR */
const formatPrice = (value) => {
    if (value === null || value === undefined || value === '') return '—'
    const n = typeof value === 'number' ? value : Number(value)
    if (Number.isFinite(n)) {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
    }
    return String(value)
}

/** Formate la valeur d'une cellule selon le type de colonne */
const formatCell = (row, col) => {
    const val = row[col.key]
    if (col.type === 'price') return formatPrice(val)
    if (col.type === 'plates' && Array.isArray(val)) {
        return val.map(p => {
            const qty = Math.max(1, Number(p?.qty ?? 1))
            const baseLabel = qty > 1 ? `${qty}x ${p.name}` : p.name

            const complements = Array.isArray(p?.complements) ? p.complements : []
            const legacyComplementName = (p?.complement?.name ?? '').trim()
            const hasAnyComplement = complements.length > 0 || Boolean(legacyComplementName)
            if (!hasAnyComplement) return baseLabel

            const items = complements.length > 0
                ? complements
                : [{ name: legacyComplementName, qty: p?.complement?.qty ?? 1 }]

            const complementsLabel = items
                .filter(c => Boolean((c?.name ?? '').trim()))
                .map(c => {
                    const cqty = Math.max(1, Number(c?.qty ?? 1))
                    const cname = String(c?.name ?? '').trim()
                    return cqty > 1 ? `${cqty}x ${cname}` : cname
                })
                .join(' + ')

            return complementsLabel ? `${baseLabel} + ${complementsLabel}` : baseLabel
        }).join(', ')
    }
    return val ?? '—'
}
</script>

<template>
    <div class="overflow-x-auto">
        <table class="min-w-[740px] w-full text-sm text-left rtl:text-right text-body">
            <thead
                class="border-b bg-gray-50 font-medium">
                <tr>
                    <th v-for="col in columns" :key="col.key" scope="col" class="px-2 py-3 font-medium">
                        {{ col.label }}
                    </th>
                    <th scope="col" class="px-6 py-3 font-medium text-end">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-neutral-primary border-b" v-for="(row, index) in data" :key="row.id ?? index">
                    <td v-for="(col, i) in columns" :key="col.key" class="px-2 py-4 truncate"
                        :class="i === 0 ? 'font-medium text-heading whitespace-nowrap max-w-[16rem]' : 'max-w-[18rem]'">
                        <template v-if="col.type === 'boolean'">
                            <span class="inline-flex rounded-full px-2 py-1 text-xs font-semibold"
                                :class="row[col.key] ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'">
                                {{ row[col.key] ? 'Actif' : 'Inactif' }}
                            </span>
                        </template>
                        <template v-else-if="col.type === 'status'">
                            <span class="inline-flex rounded-full px-2 py-1 text-xs font-semibold" :class="{
                                'bg-yellow-50 text-yellow-700': row[col.key] === 'En attente',
                                'bg-blue-50 text-blue-700': row[col.key] === 'En préparation',
                                'bg-emerald-50 text-emerald-700': row[col.key] === 'Servi' || row[col.key] === 'Prêt',
                                'bg-red-50 text-red-700': row[col.key] === 'Annulé',
                            }">{{ row[col.key] }}</span>
                        </template>
                        <template v-else-if="col.type === 'payment'">
                            <span class="inline-flex rounded-full px-2 py-1 text-xs font-semibold" :class="{
                                'bg-emerald-50 text-emerald-700': row[col.key] === 'Payé',
                                'bg-yellow-50 text-yellow-700': row[col.key] === 'En attente',
                                'bg-red-50 text-red-700': row[col.key] === 'Refusé',
                            }">{{ row[col.key] }}</span>
                        </template>
                        <template v-else>{{ formatCell(row, col) }}</template>
                    </td>
                    <td class="px-4 py-4">
                        <div class="flex flex-wsrap items-center justify-end gap-2">

                            <button v-if="has_toggle" type="button" class="hover:bg-slate-50 whitespace-nowrap"
                                @click="emit('toggle-active', row)"
                                :class="row[activeKey] ? 'bg-slate-100 text-slate-600' : 'bg-emerald-50 text-emerald-700'"
                                v-html="setIcon(row[activeKey])">
                            </button>

                            <button v-if="has_view_button" type="button"
                                class="text-slate-800 hover:bg-slate-50 whitespace-nowrap" @click="emit('view', row)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5"
                                    fill="currentColor">
                                    <title>Prévualiser</title>
                                    <path
                                        d="M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,11A1,1 0 0,1 13,12A1,1 0 0,1 12,13A1,1 0 0,1 11,12A1,1 0 0,1 12,11M12,8C14.63,8 17,9.57 18,12C16.62,15.31 12.81,16.88 9.5,15.5C7.92,14.84 6.66,13.58 6,12C7,9.57 9.37,8 12,8M12,9.5A2.5,2.5 0 0,0 9.5,12A2.5,2.5 0 0,0 12,14.5A2.5,2.5 0 0,0 14.5,12A2.5,2.5 0 0,0 12,9.5" />
                                </svg>
                            </button>
                            <button v-if="has_update_button" type="button"
                                class="rounded-xl text-slate-800 hover:bg-slate-50 whitespace-nowrap"
                                @click="emit('edit', row)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5"
                                    fill="currentColor">
                                    <title>Modifier</title>
                                    <path
                                        d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                </svg>
                            </button>
                            <button v-if="can_download" type="button"
                                class="text-slate-800 hover:bg-slate-50 whitespace-nowrap"
                                @click="emit('download', row)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5"
                                    fill="currentColor">
                                    <title>Télécharger le code QR</title>
                                    <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                                </svg>
                            </button>
                            <button v-if="has_delete_button" type="button" class="text-red-700 whitespace-nowrap"
                                @click="emit('delete', row)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5"
                                    fill="currentColor">
                                    <title>Supprimer</title>
                                    <path
                                        d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-if="data.length === 0" class="flex flex-col justify-center items-center gap-3 mt-7 text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" class="h-7 w-7" fill="currentColor">
                <path
                    d="M64 432c22.1 0 40 17.9 40 40s-17.9 40-40 40-40-17.9-40-40c0-22.1 17.9-40 40-40zM64 0c26.5 0 48 21.5 48 48 0 .6 0 1.1 0 1.7l-16 304c-.9 17-15 30.3-32 30.3S33 370.7 32 353.7L16 49.7c0-.6 0-1.1 0-1.7 0-26.5 21.5-48 48-48z" />
            </svg>
            Aucune donnée disponible
        </p>
    </div>
</template>
