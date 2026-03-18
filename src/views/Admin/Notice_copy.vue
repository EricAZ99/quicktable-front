<script setup>
import { computed, ref } from 'vue'
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue'

const period = ref('30j')
const statusFilter = ref('all')
const ratingFilter = ref('all')
const search = ref('')
const selectedReviewId = ref(2)

const periods = [
    { key: '7j', label: '7 jours' },
    { key: '30j', label: '30 jours' },
    { key: 'all', label: 'Tout' },
]

const reviews = ref([
    {
        id: 1,
        customer: 'Aïcha Koné',
        initials: 'AK',
        channel: 'Google',
        rating: 5,
        date: '14 mars 2026',
        status: 'Publié',
        table: 'Table 4',
        orderRef: 'CMD-1042',
        visitedAt: 'Déjeuner',
        comment: "Service très rapide, personnel souriant et plats bien chauds. Le poulet braisé était vraiment excellent.",
        tags: ['Service', 'Qualité'],
        reply: 'Merci beaucoup Aïcha, toute l’équipe apprécie votre retour.',
    },
    {
        id: 2,
        customer: 'Marc Diallo',
        initials: 'MD',
        channel: 'QR Code',
        rating: 3,
        date: '13 mars 2026',
        status: 'À traiter',
        table: 'Table 2',
        orderRef: 'CMD-1038',
        visitedAt: 'Dîner',
        comment: "Le burger était bon mais l’attente a été un peu longue. L’équipe a été polie malgré tout.",
        tags: ['Attente', 'Cuisine'],
        reply: '',
    },
    {
        id: 3,
        customer: 'Sonia Mensah',
        initials: 'SM',
        channel: 'TripAdvisor',
        rating: 4,
        date: '11 mars 2026',
        status: 'Publié',
        table: 'Emporté',
        orderRef: 'CMD-1031',
        visitedAt: 'Soirée',
        comment: "Très bon rapport qualité-prix. J’aurais aimé un emballage un peu plus soigné pour l’emporté.",
        tags: ['Packaging', 'Valeur'],
        reply: 'Merci Sonia, nous travaillons justement sur un meilleur packaging.',
    },
    {
        id: 4,
        customer: 'Jean Bamba',
        initials: 'JB',
        channel: 'Facebook',
        rating: 2,
        date: '10 mars 2026',
        status: 'Signalé',
        table: 'Table 7',
        orderRef: 'CMD-1026',
        visitedAt: 'Déjeuner',
        comment: "Erreur sur l’accompagnement et boisson servie tiède. Le serveur a proposé une solution, mais l’expérience reste moyenne.",
        tags: ['Erreur commande', 'Boisson'],
        reply: '',
    },
    {
        id: 5,
        customer: 'Clara Nguessan',
        initials: 'CN',
        channel: 'Google',
        rating: 5,
        date: '08 mars 2026',
        status: 'Publié',
        table: 'Table 1',
        orderRef: 'CMD-1017',
        visitedAt: 'Brunch',
        comment: "Ambiance agréable, serveuse très attentionnée et dessert maison excellent. Je reviendrai avec plaisir.",
        tags: ['Ambiance', 'Dessert'],
        reply: 'Avec plaisir Clara, merci pour votre fidélité.',
    },
    {
        id: 6,
        customer: 'Koffi Yao',
        initials: 'KY',
        channel: 'QR Code',
        rating: 4,
        date: '06 mars 2026',
        status: 'À traiter',
        table: 'Table 9',
        orderRef: 'CMD-1008',
        visitedAt: 'Dîner',
        comment: "Très bonne cuisson du poisson. La salle était un peu bruyante mais le repas valait le détour.",
        tags: ['Cuisine', 'Ambiance'],
        reply: '',
    },
])

const filteredReviews = computed(() => {
    return reviews.value.filter((review) => {
        const statusMatches = statusFilter.value === 'all' || review.status === statusFilter.value
        const ratingMatches = ratingFilter.value === 'all' || review.rating === Number(ratingFilter.value)
        const searchValue = search.value.trim().toLowerCase()
        const searchMatches = !searchValue
            || review.customer.toLowerCase().includes(searchValue)
            || review.comment.toLowerCase().includes(searchValue)
            || review.channel.toLowerCase().includes(searchValue)
            || review.orderRef.toLowerCase().includes(searchValue)

        return statusMatches && ratingMatches && searchMatches
    })
})

const stats = computed(() => {
    const total = reviews.value.length
    const average = total
        ? (reviews.value.reduce((sum, review) => sum + review.rating, 0) / total).toFixed(1)
        : '0.0'
    const published = reviews.value.filter((review) => review.status === 'Publié').length
    const toHandle = reviews.value.filter((review) => review.status === 'À traiter').length
    const alertCount = reviews.value.filter((review) => review.rating <= 2 || review.status === 'Signalé').length

    return { total, average, published, toHandle, alertCount }
})

const ratingBreakdown = computed(() => {
    const total = reviews.value.length || 1

    return [5, 4, 3, 2, 1].map((rating) => {
        const count = reviews.value.filter((review) => review.rating === rating).length
        return {
            rating,
            count,
            width: `${Math.round((count / total) * 100)}%`,
        }
    })
})

const selectedReview = computed(() => {
    return filteredReviews.value.find((review) => review.id === selectedReviewId.value)
        ?? filteredReviews.value[0]
        ?? null
})

const setStatus = (reviewId, nextStatus) => {
    const review = reviews.value.find((item) => item.id === reviewId)
    if (!review) return
    review.status = nextStatus
}

const statusClasses = (status) => {
    if (status === 'Publié') return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    if (status === 'À traiter') return 'bg-amber-50 text-amber-700 border-amber-200'
    if (status === 'Signalé') return 'bg-red-50 text-red-700 border-red-200'
    return 'bg-slate-100 text-slate-600 border-slate-200'
}

const channelClasses = (channel) => {
    if (channel === 'Google') return 'bg-sky-50 text-sky-700 border-sky-200'
    if (channel === 'TripAdvisor') return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    if (channel === 'Facebook') return 'bg-indigo-50 text-indigo-700 border-indigo-200'
    return 'bg-slate-100 text-slate-700 border-slate-200'
}
</script>

<template>
    <AuthenticatedLayoutAdmin :title="'Avis clients'" :mean="'Suivez la satisfaction et traitez les retours importants'">
        <Transition name="page" mode="out-in" appear>
            <div class="flex flex-col gap-4 pb-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
                    <div class="bg-white rounded-2xl border p-4">
                        <p class="text-xs text-slate-500">Note moyenne</p>
                        <div class="mt-2 flex items-end gap-2">
                            <p class="text-3xl font-bold text-slate-900">{{ stats.average }}</p>
                            <p class="text-sm text-amber-500 pb-1">/ 5</p>
                        </div>
                        <p class="text-xs text-slate-400 mt-2">Basé sur {{ stats.total }} avis collectés</p>
                    </div>

                    <div class="bg-white rounded-2xl border p-4">
                        <p class="text-xs text-slate-500">Avis publiés</p>
                        <p class="text-3xl font-bold text-slate-900 mt-2">{{ stats.published }}</p>
                        <p class="text-xs text-slate-400 mt-2">Visibles sur vos canaux publics</p>
                    </div>

                    <div class="bg-white rounded-2xl border p-4">
                        <p class="text-xs text-slate-500">À traiter</p>
                        <p class="text-3xl font-bold text-slate-900 mt-2">{{ stats.toHandle }}</p>
                        <p class="text-xs text-slate-400 mt-2">Demandent une réponse ou un suivi</p>
                    </div>

                    <div class="bg-white rounded-2xl border p-4">
                        <p class="text-xs text-slate-500">Alertes</p>
                        <p class="text-3xl font-bold text-slate-900 mt-2">{{ stats.alertCount }}</p>
                        <p class="text-xs text-slate-400 mt-2">Avis faibles ou signalés</p>
                    </div>

                    <div class="bg-slate-900 rounded-2xl p-4 text-white">
                        <p class="text-xs text-slate-300">Canal le plus actif</p>
                        <p class="text-xl font-semibold mt-2">Google</p>
                        <p class="text-sm text-slate-300 mt-2">Les retours publics restent votre meilleure vitrine.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)] gap-4">
                    <div class="flex flex-col gap-4">
                        <div class="bg-white rounded-2xl border p-4 flex flex-col gap-4">
                            <div>
                                <p class="font-semibold text-slate-800">Vue d’ensemble</p>
                                <p class="text-xs text-slate-400 mt-0.5">Répartition des notes reçues</p>
                            </div>

                            <div class="flex flex-col gap-3">
                                <div v-for="item in ratingBreakdown" :key="item.rating" class="flex items-center gap-3">
                                    <div class="w-10 text-sm font-medium text-slate-700">{{ item.rating }}★</div>
                                    <div class="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
                                        <div class="h-full rounded-full bg-amber-400" :style="{ width: item.width }" />
                                    </div>
                                    <div class="w-8 text-right text-xs text-slate-500">{{ item.count }}</div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-2xl border p-4 flex flex-col gap-3">
                            <div>
                                <p class="font-semibold text-slate-800">Filtres</p>
                                <p class="text-xs text-slate-400 mt-0.5">Affinez la liste d’avis</p>
                            </div>

                            <div class="flex flex-wrap gap-2">
                                <button v-for="item in periods" :key="item.key" @click="period = item.key"
                                    class="px-3 py-1.5 rounded-xl text-xs font-medium border transition-all"
                                    :class="period === item.key
                                        ? 'bg-slate-800 text-white border-slate-800'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'">
                                    {{ item.label }}
                                </button>
                            </div>

                            <input v-model="search" type="text" placeholder="Client, commentaire, canal..."
                                class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400" />

                            <div class="grid grid-cols-2 gap-3">
                                <select v-model="statusFilter"
                                    class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400">
                                    <option value="all">Tous statuts</option>
                                    <option value="Publié">Publié</option>
                                    <option value="À traiter">À traiter</option>
                                    <option value="Signalé">Signalé</option>
                                </select>

                                <select v-model="ratingFilter"
                                    class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400">
                                    <option value="all">Toutes notes</option>
                                    <option value="5">5 étoiles</option>
                                    <option value="4">4 étoiles</option>
                                    <option value="3">3 étoiles</option>
                                    <option value="2">2 étoiles</option>
                                    <option value="1">1 étoile</option>
                                </select>
                            </div>

                            <div class="rounded-xl bg-slate-50 border border-slate-100 p-3">
                                <p class="text-sm font-medium text-slate-700">Conseil</p>
                                <p class="text-xs text-slate-500 mt-1">Traitez d’abord les avis à 1-2 étoiles pour limiter l’impact sur votre réputation.</p>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 2xl:grid-cols-[minmax(0,1.2fr)_380px] gap-4">
                        <div class="bg-white rounded-2xl border p-4 flex flex-col gap-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="font-semibold text-slate-800">Flux des avis</p>
                                    <p class="text-xs text-slate-400 mt-0.5">{{ filteredReviews.length }} avis correspondent aux filtres</p>
                                </div>
                            </div>

                            <div class="flex flex-col gap-3">
                                <button v-for="review in filteredReviews" :key="review.id" @click="selectedReviewId = review.id"
                                    class="text-left rounded-2xl border p-4 transition-all hover:border-slate-300"
                                    :class="selectedReview?.id === review.id ? 'border-slate-800 bg-slate-50' : 'border-slate-200 bg-white'">
                                    <div class="flex items-start justify-between gap-3">
                                        <div class="flex items-start gap-3 min-w-0">
                                            <div class="w-10 h-10 rounded-2xl bg-slate-800 text-white flex items-center justify-center text-sm font-semibold shrink-0">
                                                {{ review.initials }}
                                            </div>
                                            <div class="min-w-0">
                                                <div class="flex flex-wrap items-center gap-2">
                                                    <p class="text-sm font-semibold text-slate-800">{{ review.customer }}</p>
                                                    <span class="inline-flex items-center rounded-full border px-2 py-0.5 text-[11px]"
                                                        :class="channelClasses(review.channel)">
                                                        {{ review.channel }}
                                                    </span>
                                                    <span class="inline-flex items-center rounded-full border px-2 py-0.5 text-[11px]"
                                                        :class="statusClasses(review.status)">
                                                        {{ review.status }}
                                                    </span>
                                                </div>
                                                <p class="text-xs text-slate-400 mt-1">{{ review.date }} · {{ review.orderRef }} · {{ review.table }}</p>
                                                <p class="text-sm text-slate-600 mt-2 line-clamp-2">{{ review.comment }}</p>
                                            </div>
                                        </div>
                                        <div class="text-right shrink-0">
                                            <p class="text-amber-500 text-sm">{{ '★'.repeat(review.rating) }}<span class="text-slate-300">{{ '★'.repeat(5 - review.rating) }}</span></p>
                                            <p class="text-xs text-slate-400 mt-1">{{ review.visitedAt }}</p>
                                        </div>
                                    </div>
                                </button>
                            </div>

                            <div v-if="!filteredReviews.length" class="rounded-2xl border border-dashed p-8 text-center">
                                <p class="text-sm font-medium text-slate-700">Aucun avis trouvé</p>
                                <p class="text-xs text-slate-400 mt-1">Essayez d’élargir les filtres pour voir plus de retours.</p>
                            </div>
                        </div>

                        <div class="bg-white rounded-2xl border p-4 flex flex-col gap-4 h-fit">
                            <template v-if="selectedReview">
                                <div class="flex items-start justify-between gap-3">
                                    <div class="flex items-center gap-3">
                                        <div class="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center font-semibold">
                                            {{ selectedReview.initials }}
                                        </div>
                                        <div>
                                            <p class="font-semibold text-slate-800">{{ selectedReview.customer }}</p>
                                            <p class="text-xs text-slate-400">{{ selectedReview.date }} · {{ selectedReview.channel }}</p>
                                        </div>
                                    </div>
                                    <span class="inline-flex items-center rounded-full border px-2 py-1 text-[11px]"
                                        :class="statusClasses(selectedReview.status)">
                                        {{ selectedReview.status }}
                                    </span>
                                </div>

                                <div class="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                                    <p class="text-amber-500 text-base">{{ '★'.repeat(selectedReview.rating) }}<span class="text-slate-300">{{ '★'.repeat(5 - selectedReview.rating) }}</span></p>
                                    <p class="text-sm text-slate-700 mt-3">{{ selectedReview.comment }}</p>
                                </div>

                                <div class="grid grid-cols-2 gap-3 text-sm">
                                    <div class="rounded-xl border p-3">
                                        <p class="text-xs text-slate-400">Commande</p>
                                        <p class="font-medium text-slate-700 mt-1">{{ selectedReview.orderRef }}</p>
                                    </div>
                                    <div class="rounded-xl border p-3">
                                        <p class="text-xs text-slate-400">Visite</p>
                                        <p class="font-medium text-slate-700 mt-1">{{ selectedReview.visitedAt }}</p>
                                    </div>
                                </div>

                                <div>
                                    <p class="text-xs text-slate-400 mb-2">Tags détectés</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span v-for="tag in selectedReview.tags" :key="tag"
                                            class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
                                            {{ tag }}
                                        </span>
                                    </div>
                                </div>

                                <div class="flex flex-wrap gap-2">
                                    <button @click="setStatus(selectedReview.id, 'Publié')"
                                        class="px-3 py-2 rounded-xl text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                                        Publier
                                    </button>
                                    <button @click="setStatus(selectedReview.id, 'À traiter')"
                                        class="px-3 py-2 rounded-xl text-sm font-medium border border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors">
                                        Marquer à traiter
                                    </button>
                                    <button @click="setStatus(selectedReview.id, 'Signalé')"
                                        class="px-3 py-2 rounded-xl text-sm font-medium border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 transition-colors">
                                        Signaler
                                    </button>
                                </div>

                                <div class="rounded-2xl border p-4">
                                    <p class="text-sm font-semibold text-slate-800">Réponse proposée</p>
                                    <p class="text-sm text-slate-500 mt-2">
                                        {{ selectedReview.reply || "Merci pour votre retour. Nous prenons note de votre remarque et allons améliorer ce point dès que possible." }}
                                    </p>
                                </div>
                            </template>

                            <template v-else>
                                <div class="rounded-2xl border border-dashed p-8 text-center">
                                    <p class="text-sm font-medium text-slate-700">Sélectionnez un avis</p>
                                    <p class="text-xs text-slate-400 mt-1">Le détail apparaîtra ici.</p>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </AuthenticatedLayoutAdmin>
</template>
