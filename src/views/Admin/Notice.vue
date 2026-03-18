<script setup>
import { computed, ref } from 'vue'
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue'

const search = ref('')
const statusFilter = ref('all')
const typeFilter = ref('all')
const ratingFilter = ref('all')
const selectedFeedbackId = ref(2)

const feedbacks = ref([
    {
        id: 1,
        customer: 'Aïcha Koné',
        initials: 'AK',
        rating: 5,
        type: 'Avis commande',
        status: 'Nouveau',
        orderRef: 'CMD-1042',
        orderType: 'Sur place',
        table: 'Table 4',
        createdAt: '18 mars 2026 · 12:45',
        subject: 'Excellent service',
        message: 'Commande servie rapidement, plats chauds et équipe très agréable. Je recommande vraiment.',
        suggestion: '',
        contact: 'aicha.kone@email.com',
    },
    {
        id: 2,
        customer: 'Marc Diallo',
        initials: 'MD',
        rating: 3,
        type: 'Suggestion',
        status: 'En cours',
        orderRef: 'CMD-1038',
        orderType: 'Livraison',
        table: '-',
        createdAt: '18 mars 2026 · 10:10',
        subject: 'Mieux indiquer les délais',
        message: 'Le repas était bon mais je ne savais pas vraiment quand il allait arriver. Un suivi plus précis aiderait.',
        suggestion: 'Afficher une estimation du temps avant validation de la commande.',
        contact: 'marc.diallo@email.com',
    },
    {
        id: 3,
        customer: 'Sonia Mensah',
        initials: 'SM',
        rating: 4,
        type: 'Autre',
        status: 'Traité',
        orderRef: 'CMD-1031',
        orderType: 'Emporté',
        table: '-',
        createdAt: '17 mars 2026 · 19:22',
        subject: 'Très bonne expérience',
        message: 'Le service était fluide et le dessert excellent. Rien à signaler à part un emballage à améliorer.',
        suggestion: 'Prévoir un emballage plus rigide pour les desserts.',
        contact: 'sonia.m@email.com',
    },
    {
        id: 4,
        customer: 'Jean Bamba',
        initials: 'JB',
        rating: 2,
        type: 'Avis commande',
        status: 'Nouveau',
        orderRef: 'CMD-1026',
        orderType: 'Sur place',
        table: 'Table 7',
        createdAt: '17 mars 2026 · 13:05',
        subject: 'Erreur sur l’accompagnement',
        message: 'Le plat reçu ne correspondait pas à ma demande et la boisson n’était pas fraîche. Le personnel a été poli mais le repas était décevant.',
        suggestion: '',
        contact: 'jean.bamba@email.com',
    },
    {
        id: 5,
        customer: 'Clara Nguessan',
        initials: 'CN',
        rating: 5,
        type: 'Suggestion',
        status: 'Traité',
        orderRef: 'CMD-1017',
        orderType: 'Brunch',
        table: 'Table 1',
        createdAt: '16 mars 2026 · 11:30',
        subject: 'Ajouter plus d’options boissons',
        message: 'Très belle ambiance. Ce serait super d’avoir plus de jus naturels au brunch.',
        suggestion: 'Ajouter deux ou trois jus maison à la carte.',
        contact: 'clara.ng@email.com',
    },
    {
        id: 6,
        customer: 'Koffi Yao',
        initials: 'KY',
        rating: 4,
        type: 'Autre',
        status: 'Archivé',
        orderRef: 'CMD-1008',
        orderType: 'Sur place',
        table: 'Table 9',
        createdAt: '15 mars 2026 · 21:14',
        subject: 'Salle un peu bruyante',
        message: 'Le poisson était excellent mais la salle était assez bruyante au moment du dîner.',
        suggestion: 'Créer une zone plus calme pour les familles.',
        contact: 'koffi.yao@email.com',
    },
])

const filteredFeedbacks = computed(() => {
    const searchValue = search.value.trim().toLowerCase()

    return feedbacks.value.filter((feedback) => {
        const matchesStatus = statusFilter.value === 'all' || feedback.status === statusFilter.value
        const matchesType = typeFilter.value === 'all' || feedback.type === typeFilter.value
        const matchesRating = ratingFilter.value === 'all' || feedback.rating === Number(ratingFilter.value)
        const matchesSearch = !searchValue
            || feedback.customer.toLowerCase().includes(searchValue)
            || feedback.subject.toLowerCase().includes(searchValue)
            || feedback.message.toLowerCase().includes(searchValue)
            || feedback.orderRef.toLowerCase().includes(searchValue)

        return matchesStatus && matchesType && matchesRating && matchesSearch
    })
})

const selectedFeedback = computed(() => {
    return filteredFeedbacks.value.find((feedback) => feedback.id === selectedFeedbackId.value)
        ?? filteredFeedbacks.value[0]
        ?? null
})

const stats = computed(() => {
    const total = feedbacks.value.length
    const averageRating = total
        ? (feedbacks.value.reduce((sum, feedback) => sum + feedback.rating, 0) / total).toFixed(1)
        : '0.0'

    return {
        total,
        averageRating,
        newCount: feedbacks.value.filter((feedback) => feedback.status === 'Nouveau').length,
        inProgressCount: feedbacks.value.filter((feedback) => feedback.status === 'En cours').length,
        suggestionsCount: feedbacks.value.filter((feedback) => feedback.type === 'Suggestion').length,
    }
})

const ratingBreakdown = computed(() => {
    const total = feedbacks.value.length || 1

    return [5, 4, 3, 2, 1].map((rating) => {
        const count = feedbacks.value.filter((feedback) => feedback.rating === rating).length
        return {
            rating,
            count,
            width: `${Math.round((count / total) * 100)}%`,
        }
    })
})

const setStatus = (id, nextStatus) => {
    const feedback = feedbacks.value.find((item) => item.id === id)
    if (!feedback) return
    feedback.status = nextStatus
}

const statusClasses = (status) => {
    if (status === 'Nouveau') return 'bg-sky-50 text-sky-700 border-sky-200'
    if (status === 'En cours') return 'bg-amber-50 text-amber-700 border-amber-200'
    if (status === 'Traité') return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    if (status === 'Archivé') return 'bg-slate-100 text-slate-600 border-slate-200'
    return 'bg-slate-100 text-slate-600 border-slate-200'
}

const typeClasses = (type) => {
    if (type === 'Avis commande') return 'bg-rose-50 text-rose-700 border-rose-200'
    if (type === 'Suggestion') return 'bg-violet-50 text-violet-700 border-violet-200'
    return 'bg-slate-100 text-slate-700 border-slate-200'
}

const ratingTone = (rating) => {
    if (rating >= 4) return 'text-emerald-600'
    if (rating === 3) return 'text-amber-600'
    return 'text-red-600'
}
</script>

<template>
    <AuthenticatedLayoutAdmin :title="'Avis clients'" :mean="'Retours reçus depuis l’interface externe des clients'">
        <Transition name="page" mode="out-in" appear>
            <div class="flex flex-col gap-4 pb-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
                    <div class="bg-white rounded-2xl border p-4">
                        <p class="text-xs text-slate-500">Retours reçus</p>
                        <p class="text-3xl font-bold text-slate-900 mt-2">{{ stats.total }}</p>
                        <p class="text-xs text-slate-400 mt-2">Tous les avis, suggestions et autres messages</p>
                    </div>

                    <div class="bg-white rounded-2xl border p-4">
                        <p class="text-xs text-slate-500">Note moyenne</p>
                        <div class="mt-2 flex items-end gap-2">
                            <p class="text-3xl font-bold text-slate-900">{{ stats.averageRating }}</p>
                            <p class="text-sm text-amber-500 pb-1">/ 5</p>
                        </div>
                        <p class="text-xs text-slate-400 mt-2">Évaluations laissées après commande</p>
                    </div>

                    <div class="bg-white rounded-2xl border p-4">
                        <p class="text-xs text-slate-500">Nouveaux</p>
                        <p class="text-3xl font-bold text-slate-900 mt-2">{{ stats.newCount }}</p>
                        <p class="text-xs text-slate-400 mt-2">À lire ou qualifier</p>
                    </div>

                    <div class="bg-white rounded-2xl border p-4">
                        <p class="text-xs text-slate-500">En cours</p>
                        <p class="text-3xl font-bold text-slate-900 mt-2">{{ stats.inProgressCount }}</p>
                        <p class="text-xs text-slate-400 mt-2">Demandent un suivi interne</p>
                    </div>

                    <div class="bg-slate-900 rounded-2xl p-4 text-white">
                        <p class="text-xs text-slate-300">Suggestions collectées</p>
                        <p class="text-3xl font-bold mt-2">{{ stats.suggestionsCount }}</p>
                        <p class="text-sm text-slate-300 mt-2">Utiles pour améliorer l’expérience commande.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)] gap-4">
                    <div class="flex flex-col gap-4">
                        <div class="bg-white rounded-2xl border p-4 flex flex-col gap-4">
                            <div>
                                <p class="font-semibold text-slate-800">Répartition des notes</p>
                                <p class="text-xs text-slate-400 mt-0.5">Vue rapide de la satisfaction</p>
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
                                <p class="text-xs text-slate-400 mt-0.5">Retrouvez vite un retour précis</p>
                            </div>

                            <input v-model="search" type="text" placeholder="Client, commande, sujet..."
                                class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400" />

                            <select v-model="statusFilter"
                                class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400">
                                <option value="all">Tous les statuts</option>
                                <option value="Nouveau">Nouveau</option>
                                <option value="En cours">En cours</option>
                                <option value="Traité">Traité</option>
                                <option value="Archivé">Archivé</option>
                            </select>

                            <select v-model="typeFilter"
                                class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400">
                                <option value="all">Tous les types</option>
                                <option value="Avis commande">Avis commande</option>
                                <option value="Suggestion">Suggestion</option>
                                <option value="Autre">Autre</option>
                            </select>

                            <select v-model="ratingFilter"
                                class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400">
                                <option value="all">Toutes les notes</option>
                                <option value="5">5 étoiles</option>
                                <option value="4">4 étoiles</option>
                                <option value="3">3 étoiles</option>
                                <option value="2">2 étoiles</option>
                                <option value="1">1 étoile</option>
                            </select>

                            <div class="rounded-xl bg-slate-50 border border-slate-100 p-3">
                                <p class="text-sm font-medium text-slate-700">Logique métier</p>
                                <p class="text-xs text-slate-500 mt-1">Cette page sert à lire et traiter les retours envoyés depuis l’interface client externe, pas à publier des avis publics.</p>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 2xl:grid-cols-[minmax(0,1.15fr)_380px] gap-4">
                        <div class="bg-white rounded-2xl border p-4 flex flex-col gap-4">
                            <div>
                                <p class="font-semibold text-slate-800">Boîte de réception</p>
                                <p class="text-xs text-slate-400 mt-0.5">{{ filteredFeedbacks.length }} retour(s) trouvé(s)</p>
                            </div>

                            <div class="flex flex-col gap-3">
                                <button v-for="feedback in filteredFeedbacks" :key="feedback.id" @click="selectedFeedbackId = feedback.id"
                                    class="text-left rounded-2xl border p-4 transition-all hover:border-slate-300"
                                    :class="selectedFeedback?.id === feedback.id ? 'border-slate-800 bg-slate-50' : 'border-slate-200 bg-white'">
                                    <div class="flex items-start justify-between gap-3">
                                        <div class="flex items-start gap-3 min-w-0">
                                            <div class="w-10 h-10 rounded-2xl bg-slate-800 text-white flex items-center justify-center text-sm font-semibold shrink-0">
                                                {{ feedback.initials }}
                                            </div>
                                            <div class="min-w-0">
                                                <div class="flex flex-wrap items-center gap-2">
                                                    <p class="text-sm font-semibold text-slate-800">{{ feedback.customer }}</p>
                                                    <span class="inline-flex items-center rounded-full border px-2 py-0.5 text-[11px]"
                                                        :class="typeClasses(feedback.type)">
                                                        {{ feedback.type }}
                                                    </span>
                                                    <span class="inline-flex items-center rounded-full border px-2 py-0.5 text-[11px]"
                                                        :class="statusClasses(feedback.status)">
                                                        {{ feedback.status }}
                                                    </span>
                                                </div>
                                                <p class="text-xs text-slate-400 mt-1">{{ feedback.createdAt }} · {{ feedback.orderRef }}</p>
                                                <p class="text-sm font-medium text-slate-700 mt-2">{{ feedback.subject }}</p>
                                                <p class="text-sm text-slate-500 mt-1 line-clamp-2">{{ feedback.message }}</p>
                                            </div>
                                        </div>
                                        <div class="shrink-0 text-right">
                                            <p class="text-sm font-semibold" :class="ratingTone(feedback.rating)">
                                                {{ feedback.rating }}/5
                                            </p>
                                            <p class="text-amber-500 text-xs mt-1">
                                                {{ '★'.repeat(feedback.rating) }}<span class="text-slate-300">{{ '★'.repeat(5 - feedback.rating) }}</span>
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            </div>

                            <div v-if="!filteredFeedbacks.length" class="rounded-2xl border border-dashed p-8 text-center">
                                <p class="text-sm font-medium text-slate-700">Aucun retour trouvé</p>
                                <p class="text-xs text-slate-400 mt-1">Modifiez les filtres pour afficher davantage d’avis clients.</p>
                            </div>
                        </div>

                        <div class="bg-white rounded-2xl border p-4 flex flex-col gap-4 h-fit">
                            <template v-if="selectedFeedback">
                                <div class="flex items-start justify-between gap-3">
                                    <div class="flex items-center gap-3">
                                        <div class="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center font-semibold">
                                            {{ selectedFeedback.initials }}
                                        </div>
                                        <div>
                                            <p class="font-semibold text-slate-800">{{ selectedFeedback.customer }}</p>
                                            <p class="text-xs text-slate-400">{{ selectedFeedback.createdAt }}</p>
                                        </div>
                                    </div>
                                    <span class="inline-flex items-center rounded-full border px-2 py-1 text-[11px]"
                                        :class="statusClasses(selectedFeedback.status)">
                                        {{ selectedFeedback.status }}
                                    </span>
                                </div>

                                <div class="flex flex-wrap gap-2">
                                    <span class="inline-flex items-center rounded-full border px-2 py-1 text-[11px]"
                                        :class="typeClasses(selectedFeedback.type)">
                                        {{ selectedFeedback.type }}
                                    </span>
                                    <span class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-600">
                                        {{ selectedFeedback.orderType }}
                                    </span>
                                    <span class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-600">
                                        {{ selectedFeedback.table }}
                                    </span>
                                </div>

                                <div class="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                                    <p class="text-xs text-slate-400">Note laissée</p>
                                    <p class="text-amber-500 text-base mt-2">
                                        {{ '★'.repeat(selectedFeedback.rating) }}<span class="text-slate-300">{{ '★'.repeat(5 - selectedFeedback.rating) }}</span>
                                    </p>
                                    <p class="text-lg font-semibold text-slate-800 mt-3">{{ selectedFeedback.subject }}</p>
                                    <p class="text-sm text-slate-600 mt-2">{{ selectedFeedback.message }}</p>
                                </div>

                                <div class="grid grid-cols-1 gap-3 text-sm">
                                    <div class="rounded-xl border p-3">
                                        <p class="text-xs text-slate-400">Commande liée</p>
                                        <p class="font-medium text-slate-700 mt-1">{{ selectedFeedback.orderRef }}</p>
                                    </div>
                                    <div class="rounded-xl border p-3">
                                        <p class="text-xs text-slate-400">Suggestion complémentaire</p>
                                        <p class="font-medium text-slate-700 mt-1">
                                            {{ selectedFeedback.suggestion || 'Aucune suggestion supplémentaire.' }}
                                        </p>
                                    </div>
                                    <div class="rounded-xl border p-3">
                                        <p class="text-xs text-slate-400">Contact client</p>
                                        <p class="font-medium text-slate-700 mt-1">{{ selectedFeedback.contact }}</p>
                                    </div>
                                </div>

                                <div class="flex flex-wrap gap-2">
                                    <button @click="setStatus(selectedFeedback.id, 'Nouveau')"
                                        class="px-3 py-2 rounded-xl text-sm font-medium border border-sky-200 text-sky-700 bg-sky-50 hover:bg-sky-100 transition-colors">
                                        Marquer nouveau
                                    </button>
                                    <button @click="setStatus(selectedFeedback.id, 'En cours')"
                                        class="px-3 py-2 rounded-xl text-sm font-medium border border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors">
                                        Mettre en cours
                                    </button>
                                    <button @click="setStatus(selectedFeedback.id, 'Traité')"
                                        class="px-3 py-2 rounded-xl text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                                        Marquer traité
                                    </button>
                                    <button @click="setStatus(selectedFeedback.id, 'Archivé')"
                                        class="px-3 py-2 rounded-xl text-sm font-medium border border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors">
                                        Archiver
                                    </button>
                                </div>
                            </template>

                            <template v-else>
                                <div class="rounded-2xl border border-dashed p-8 text-center">
                                    <p class="text-sm font-medium text-slate-700">Sélectionnez un retour</p>
                                    <p class="text-xs text-slate-400 mt-1">Le détail du message client apparaîtra ici.</p>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </AuthenticatedLayoutAdmin>
</template>
