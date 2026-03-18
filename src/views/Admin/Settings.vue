<script setup>
import { ref, reactive } from 'vue'
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue'
import InputText from '../../components/InputText.vue'
import PrimaryButton from '../../components/PrimaryButton.vue'
import SecondaryButton from '../../components/SecondaryButton.vue'
import Toast from '../../components/Toast.vue'

const activeTab = ref('general')
const tabs = [
    { key: 'general', label: 'Général' },
    { key: 'appearance', label: 'Apparence' },
    { key: 'password', label: 'Mot de passe' },
    { key: 'billing', label: 'Facturation' },
    { key: 'notifications', label: 'Notifications' },
    { key: 'team', label: 'Équipe' },
    { key: 'schedules', label: 'Horaires' },
    { key: 'integrations', label: 'Intégrations' },
    { key: 'printing', label: 'Impression' },
    { key: 'security', label: 'Sécurité' },
    { key: 'backup', label: 'Sauvegarde' },
]

// --- Toast ---
const toast = reactive({ show: false, type: 'success', message: '' })
function showToast(type, message) {
    toast.type = type
    toast.message = message
    toast.show = true
}

// --- Général ---
const general = reactive({
    restaurant_name: 'QuickTable Restaurant',
    email: 'contact@quicktable.fr',
    phone: '+33 6 00 00 00 00',
    address: '12 rue de la Paix, 75001 Paris',
    currency: 'FCFA',
    timezone: 'Europe/Paris',
})
function saveGeneral() { showToast('success', 'Informations générales sauvegardées.') }

// --- Apparence ---
const appearance = reactive({
    primary_color: '#1e293b',
    font: 'Inter',
    dark_mode: false,
    compact_mode: false,
})
const fonts = ['Inter', 'Roboto', 'Poppins', 'Lato', 'Montserrat']
function saveAppearance() { showToast('success', 'Apparence mise à jour.') }

// --- Mot de passe ---
const password = reactive({ current: '', next: '', confirm: '' })
const password_error = ref('')
function savePassword() {
    password_error.value = ''
    if (!password.current || !password.next || !password.confirm) {
        password_error.value = 'Tous les champs sont requis.'
        return
    }
    if (password.next !== password.confirm) {
        password_error.value = 'Les mots de passe ne correspondent pas.'
        return
    }
    if (password.next.length < 8) {
        password_error.value = 'Le mot de passe doit contenir au moins 8 caractères.'
        return
    }
    password.current = ''
    password.next = ''
    password.confirm = ''
    showToast('success', 'Mot de passe modifié avec succès.')
}

// --- Facturation ---
const billing = reactive({
    plan: 'Pro',
    billing_email: 'billing@quicktable.fr',
    card_last4: '4242',
    card_expiry: '12/26',
    auto_renew: true,
})
const plans = [
    { key: 'Free', label: 'Gratuit', price: '0 €/mois', features: ['1 table', '50 commandes/mois'] },
    { key: 'Pro', label: 'Pro', price: '29 €/mois', features: ['Tables illimitées', 'Commandes illimitées', 'Statistiques avancées'] },
    { key: 'Enterprise', label: 'Entreprise', price: 'Sur devis', features: ['Multi-établissements', 'Support dédié', 'API accès'] },
]
function saveBilling() { showToast('success', 'Paramètres de facturation sauvegardés.') }

// --- Notifications ---
const notifications = reactive({
    order_new: true,
    order_ready: true,
    order_cancelled: false,
    low_stock: true,
    daily_report: false,
    email_alerts: true,
    sound: true,
})
function saveNotifications() { showToast('success', 'Préférences de notifications sauvegardées.') }

// --- Équipe ---
const team = ref([
    { id: 1, name: 'Alice Martin', email: 'alice@quicktable.fr', role: 'Admin' },
    { id: 2, name: 'Bob Dupont', email: 'bob@quicktable.fr', role: 'Serveur' },
    { id: 3, name: 'Clara Petit', email: 'clara@quicktable.fr', role: 'Cuisinier' },
])
const newMember = reactive({ name: '', email: '', role: 'Serveur' })
const teamRoles = ['Admin', 'Serveur', 'Cuisinier', 'Caissier']
function addMember() {
    if (!newMember.name || !newMember.email) return
    team.value.push({ id: Date.now(), ...newMember })
    newMember.name = ''
    newMember.email = ''
    newMember.role = 'Serveur'
    showToast('success', 'Membre ajouté.')
}
function removeMember(id) {
    team.value = team.value.filter(m => m.id !== id)
    showToast('success', 'Membre supprimé.')
}

// --- Horaires ---
const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
const schedules = reactive(Object.fromEntries(days.map(d => [d, { open: d !== 'Dimanche', from: '09:00', to: '22:00' }])))
function saveSchedules() { showToast('success', 'Horaires sauvegardés.') }

// --- Intégrations ---
const integrations = reactive([
    { key: 'stripe', label: 'Stripe', desc: 'Paiements en ligne', enabled: true },
    { key: 'uber_eats', label: 'Uber Eats', desc: 'Commandes en livraison', enabled: false },
    { key: 'google', label: 'Google My Business', desc: 'Avis et visibilité', enabled: true },
    { key: 'mailchimp', label: 'Mailchimp', desc: 'Campagnes email', enabled: false },
])
function saveIntegrations() { showToast('success', 'Intégrations mises à jour.') }

// --- Impression ---
const printing = reactive({
    printer_name: 'Epson TM-T20III',
    auto_print: true,
    print_kitchen: true,
    print_receipt: true,
    copies: 1,
    paper_size: '80mm',
})
function savePrinting() { showToast('success', 'Paramètres d\'impression sauvegardés.') }

// --- Sécurité ---
const security = reactive({
    two_factor: false,
    session_timeout: '30',
    login_alerts: true,
    ip_whitelist: '',
})
function saveSecurity() { showToast('success', 'Paramètres de sécurité sauvegardés.') }

// --- Sauvegarde ---
const backup = reactive({
    auto_backup: true,
    frequency: 'daily',
    last_backup: '2025-01-15 03:00',
    retention: '30',
})
function triggerBackup() { showToast('success', 'Sauvegarde manuelle lancée.') }
function saveBackup() { showToast('success', 'Paramètres de sauvegarde sauvegardés.') }
</script>

<template>
    <AuthenticatedLayoutAdmin :title="'Paramètres'" :mean="'Gérez votre compte et vos préférences'">
        <Transition name="page" mode="out-in" appear>
            <div class="flex flex-col gap-4 pb-6">

                <!-- Onglets -->
                <div class="bg-white rounded-2xl border p-1 flex gap-1 w-fit">
                    <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
                        class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200" :class="activeTab === tab.key
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-500 hover:text-slate-800'">
                        {{ tab.label }}
                    </button>
                </div>

                <!-- Général -->
                <div v-if="activeTab === 'general'" class="bg-white rounded-2xl border p-6 flex flex-col gap-5">
                    <div>
                        <p class="font-semibold text-slate-800">Informations générales</p>
                        <p class="text-xs text-slate-400 mt-0.5">Informations de base de votre établissement</p>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="text-xs font-medium text-slate-600">Nom du restaurant</label>
                            <InputText v-model="general.restaurant_name" placeholder="Nom du restaurant" />
                        </div>
                        <div>
                            <label class="text-xs font-medium text-slate-600">Email de contact</label>
                            <InputText v-model="general.email" placeholder="email@exemple.fr" type="email" />
                        </div>
                        <div>
                            <label class="text-xs font-medium text-slate-600">Téléphone</label>
                            <InputText v-model="general.phone" placeholder="+33 6 00 00 00 00" />
                        </div>
                        <div>
                            <label class="text-xs font-medium text-slate-600">Adresse</label>
                            <InputText v-model="general.address" placeholder="Adresse complète" />
                        </div>
                        <div>
                            <label class="text-xs font-medium text-slate-600">Devise</label>
                            <select v-model="general.currency"
                                class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400">
                                <option>FCFA</option>
                                <option>EUR</option>
                                <option>USD</option>
                                <option>GBP</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-xs font-medium text-slate-600">Fuseau horaire</label>
                            <select v-model="general.timezone"
                                class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400">
                                <option>Europe/Paris</option>
                                <option>Africa/Abidjan</option>
                                <option>Africa/Dakar</option>
                                <option>America/New_York</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <PrimaryButton @click="saveGeneral">Sauvegarder</PrimaryButton>
                    </div>
                </div>

                <!-- Apparence -->
                <div v-if="activeTab === 'appearance'" class="bg-white rounded-2xl border p-6 flex flex-col gap-5">
                    <div>
                        <p class="font-semibold text-slate-800">Apparence</p>
                        <p class="text-xs text-slate-400 mt-0.5">Personnalisez l'interface de votre espace admin</p>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="text-xs font-medium text-slate-600">Couleur principale</label>
                            <div class="mt-1 flex items-center gap-3">
                                <input type="color" v-model="appearance.primary_color"
                                    class="h-9 w-16 rounded-xl border cursor-pointer" />
                                <span class="text-sm text-slate-500">{{ appearance.primary_color }}</span>
                            </div>
                        </div>
                        <div>
                            <label class="text-xs font-medium text-slate-600">Police</label>
                            <select v-model="appearance.font"
                                class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400">
                                <option v-for="f in fonts" :key="f">{{ f }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex flex-col gap-3">
                        <label
                            class="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:bg-slate-50">
                            <div>
                                <p class="text-sm font-medium text-slate-700">Mode sombre</p>
                                <p class="text-xs text-slate-400">Activer le thème sombre sur l'interface</p>
                            </div>
                            <div @click="appearance.dark_mode = !appearance.dark_mode"
                                class="w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 cursor-pointer"
                                :class="appearance.dark_mode ? 'bg-slate-800' : 'bg-slate-200'">
                                <div class="w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                                    :class="appearance.dark_mode ? 'translate-x-4' : 'translate-x-0'" />
                            </div>
                        </label>
                        <label
                            class="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:bg-slate-50">
                            <div>
                                <p class="text-sm font-medium text-slate-700">Mode compact</p>
                                <p class="text-xs text-slate-400">Réduire les espacements pour afficher plus de contenu
                                </p>
                            </div>
                            <div @click="appearance.compact_mode = !appearance.compact_mode"
                                class="w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 cursor-pointer"
                                :class="appearance.compact_mode ? 'bg-slate-800' : 'bg-slate-200'">
                                <div class="w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                                    :class="appearance.compact_mode ? 'translate-x-4' : 'translate-x-0'" />
                            </div>
                        </label>
                    </div>
                    <div class="flex justify-end">
                        <PrimaryButton @click="saveAppearance">Sauvegarder</PrimaryButton>
                    </div>
                </div>

                <!-- Mot de passe -->
                <div v-if="activeTab === 'password'" class="bg-white rounded-2xl border p-6 flex flex-col gap-5">
                    <div>
                        <p class="font-semibold text-slate-800">Changer le mot de passe</p>
                        <p class="text-xs text-slate-400 mt-0.5">Assurez-vous d'utiliser un mot de passe fort</p>
                    </div>
                    <div class="flex flex-col gap-4 max-w-md">
                        <div>
                            <label class="text-xs font-medium text-slate-600">Mot de passe actuel</label>
                            <InputText v-model="password.current" placeholder="••••••••" type="password" />
                        </div>
                        <div>
                            <label class="text-xs font-medium text-slate-600">Nouveau mot de passe</label>
                            <InputText v-model="password.next" placeholder="••••••••" type="password" />
                        </div>
                        <div>
                            <label class="text-xs font-medium text-slate-600">Confirmer le mot de passe</label>
                            <InputText v-model="password.confirm" placeholder="••••••••" type="password" />
                        </div>
                        <p v-if="password_error" class="text-xs text-red-500">{{ password_error }}</p>
                    </div>
                    <div class="flex justify-end">
                        <PrimaryButton @click="savePassword">Mettre à jour</PrimaryButton>
                    </div>
                </div>

                <!-- Facturation -->
                <div v-if="activeTab === 'billing'" class="flex flex-col gap-4">

                    <!-- Plans -->
                    <div class="bg-white rounded-2xl border p-6 flex flex-col gap-4">
                        <div>
                            <p class="font-semibold text-slate-800">Plan actuel</p>
                            <p class="text-xs text-slate-400 mt-0.5">Choisissez le plan adapté à votre activité</p>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div v-for="plan in plans" :key="plan.key" @click="billing.plan = plan.key"
                                class="rounded-xl border p-4 cursor-pointer transition-all duration-200" :class="billing.plan === plan.key
                                    ? 'border-slate-800 bg-slate-50'
                                    : 'hover:border-slate-300'">
                                <div class="flex items-center justify-between mb-2">
                                    <p class="font-semibold text-slate-800 text-sm">{{ plan.label }}</p>
                                    <div v-if="billing.plan === plan.key"
                                        class="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center">
                                        <div class="w-2 h-2 rounded-full bg-white" />
                                    </div>
                                </div>
                                <p class="text-lg font-bold text-slate-800 mb-2">{{ plan.price }}</p>
                                <ul class="flex flex-col gap-1">
                                    <li v-for="f in plan.features" :key="f"
                                        class="text-xs text-slate-500 flex items-center gap-1">
                                        <svg class="w-3 h-3 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor" stroke-width="3">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {{ f }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Infos paiement -->
                    <div class="bg-white rounded-2xl border p-6 flex flex-col gap-4">
                        <p class="font-semibold text-slate-800">Informations de paiement</p>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="text-xs font-medium text-slate-600">Email de facturation</label>
                                <InputText v-model="billing.billing_email" placeholder="billing@exemple.fr"
                                    type="email" />
                            </div>
                            <div>
                                <label class="text-xs font-medium text-slate-600">Carte enregistrée</label>
                                <div class="mt-1 flex items-center gap-2 rounded-xl border px-3 py-2 bg-slate-50">
                                    <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" stroke-width="1.5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                    <span class="text-sm text-slate-600">•••• •••• •••• {{ billing.card_last4 }}</span>
                                    <span class="text-xs text-slate-400 ml-auto">{{ billing.card_expiry }}</span>
                                </div>
                            </div>
                        </div>
                        <label
                            class="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:bg-slate-50">
                            <div>
                                <p class="text-sm font-medium text-slate-700">Renouvellement automatique</p>
                                <p class="text-xs text-slate-400">Renouveler automatiquement l'abonnement à échéance</p>
                            </div>
                            <div @click="billing.auto_renew = !billing.auto_renew"
                                class="w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 cursor-pointer"
                                :class="billing.auto_renew ? 'bg-slate-800' : 'bg-slate-200'">
                                <div class="w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                                    :class="billing.auto_renew ? 'translate-x-4' : 'translate-x-0'" />
                            </div>
                        </label>
                        <div class="flex justify-end">
                            <PrimaryButton @click="saveBilling">Sauvegarder</PrimaryButton>
                        </div>
                    </div>
                </div>

                <!-- Notifications -->
                <div v-if="activeTab === 'notifications'" class="bg-white rounded-2xl border p-6 flex flex-col gap-5">
                    <div>
                        <p class="font-semibold text-slate-800">Notifications</p>
                        <p class="text-xs text-slate-400 mt-0.5">Choisissez les événements pour lesquels vous souhaitez
                            être alerté</p>
                    </div>
                    <div class="flex flex-col gap-3">
                        <div v-for="(label, key) in {
                            order_new: 'Nouvelle commande',
                            order_ready: 'Commande prête',
                            order_cancelled: 'Commande annulée',
                            low_stock: 'Stock faible',
                            daily_report: 'Rapport quotidien',
                            email_alerts: 'Alertes par email',
                            sound: 'Sons de notification',
                        }" :key="key">
                            <label
                                class="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:bg-slate-50">
                                <p class="text-sm font-medium text-slate-700">{{ label }}</p>
                                <div @click="notifications[key] = !notifications[key]"
                                    class="w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 cursor-pointer"
                                    :class="notifications[key] ? 'bg-slate-800' : 'bg-slate-200'">
                                    <div class="w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                                        :class="notifications[key] ? 'translate-x-4' : 'translate-x-0'" />
                                </div>
                            </label>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <PrimaryButton @click="saveNotifications">Sauvegarder</PrimaryButton>
                    </div>
                </div>

                <!-- Équipe -->
                <div v-if="activeTab === 'team'" class="flex flex-col gap-4">
                    <div class="bg-white rounded-2xl border p-6 flex flex-col gap-4">
                        <div>
                            <p class="font-semibold text-slate-800">Membres de l'équipe</p>
                            <p class="text-xs text-slate-400 mt-0.5">Gérez les accès de votre personnel</p>
                        </div>
                        <div class="flex flex-col gap-2">
                            <div v-for="member in team" :key="member.id"
                                class="flex items-center justify-between p-3 rounded-xl border">
                                <div>
                                    <p class="text-sm font-medium text-slate-700">{{ member.name }}</p>
                                    <p class="text-xs text-slate-400">{{ member.email }} · {{ member.role }}</p>
                                </div>
                                <button @click="removeMember(member.id)"
                                    class="text-xs text-red-400 hover:text-red-600 transition-colors">Supprimer</button>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-2xl border p-6 flex flex-col gap-4">
                        <p class="font-semibold text-slate-800">Ajouter un membre</p>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                                <label class="text-xs font-medium text-slate-600">Nom</label>
                                <InputText v-model="newMember.name" placeholder="Nom complet" />
                            </div>
                            <div>
                                <label class="text-xs font-medium text-slate-600">Email</label>
                                <InputText v-model="newMember.email" placeholder="email@exemple.fr" type="email" />
                            </div>
                            <div>
                                <label class="text-xs font-medium text-slate-600">Rôle</label>
                                <select v-model="newMember.role"
                                    class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400">
                                    <option v-for="r in teamRoles" :key="r">{{ r }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <PrimaryButton @click="addMember">Ajouter</PrimaryButton>
                        </div>
                    </div>
                </div>

                <!-- Horaires -->
                <div v-if="activeTab === 'schedules'" class="bg-white rounded-2xl border p-6 flex flex-col gap-5">
                    <div>
                        <p class="font-semibold text-slate-800">Horaires d'ouverture</p>
                        <p class="text-xs text-slate-400 mt-0.5">Définissez les heures d'ouverture de votre
                            établissement</p>
                    </div>
                    <div class="flex flex-col gap-2">
                        <div v-for="day in days" :key="day" class="flex items-center gap-4 p-3 rounded-xl border">
                            <div @click="schedules[day].open = !schedules[day].open"
                                class="w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 cursor-pointer shrink-0"
                                :class="schedules[day].open ? 'bg-slate-800' : 'bg-slate-200'">
                                <div class="w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                                    :class="schedules[day].open ? 'translate-x-4' : 'translate-x-0'" />
                            </div>
                            <span class="text-sm font-medium text-slate-700 w-24">{{ day }}</span>
                            <template v-if="schedules[day].open">
                                <input type="time" v-model="schedules[day].from"
                                    class="rounded-xl border px-3 py-1.5 text-sm outline-none focus:border-slate-400" />
                                <span class="text-slate-400 text-sm">–</span>
                                <input type="time" v-model="schedules[day].to"
                                    class="rounded-xl border px-3 py-1.5 text-sm outline-none focus:border-slate-400" />
                            </template>
                            <span v-else class="text-sm text-slate-400">Fermé</span>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <PrimaryButton @click="saveSchedules">Sauvegarder</PrimaryButton>
                    </div>
                </div>

                <!-- Intégrations -->
                <div v-if="activeTab === 'integrations'" class="bg-white rounded-2xl border p-6 flex flex-col gap-5">
                    <div>
                        <p class="font-semibold text-slate-800">Intégrations</p>
                        <p class="text-xs text-slate-400 mt-0.5">Connectez des services tiers à votre établissement</p>
                    </div>
                    <div class="flex flex-col gap-3">
                        <div v-for="intg in integrations" :key="intg.key"
                            class="flex items-center justify-between p-4 rounded-xl border">
                            <div>
                                <p class="text-sm font-medium text-slate-700">{{ intg.label }}</p>
                                <p class="text-xs text-slate-400">{{ intg.desc }}</p>
                            </div>
                            <div @click="intg.enabled = !intg.enabled"
                                class="w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 cursor-pointer"
                                :class="intg.enabled ? 'bg-slate-800' : 'bg-slate-200'">
                                <div class="w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                                    :class="intg.enabled ? 'translate-x-4' : 'translate-x-0'" />
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <PrimaryButton @click="saveIntegrations">Sauvegarder</PrimaryButton>
                    </div>
                </div>

                <!-- Impression -->
                <div v-if="activeTab === 'printing'" class="bg-white rounded-2xl border p-6 flex flex-col gap-5">
                    <div>
                        <p class="font-semibold text-slate-800">Impression</p>
                        <p class="text-xs text-slate-400 mt-0.5">Configurez vos imprimantes et tickets</p>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="text-xs font-medium text-slate-600">Nom de l'imprimante</label>
                            <InputText v-model="printing.printer_name" placeholder="Nom de l'imprimante" />
                        </div>
                        <div>
                            <label class="text-xs font-medium text-slate-600">Format papier</label>
                            <select v-model="printing.paper_size"
                                class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400">
                                <option>58mm</option>
                                <option>80mm</option>
                                <option>A4</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-xs font-medium text-slate-600">Nombre de copies</label>
                            <input type="number" v-model="printing.copies" min="1" max="5"
                                class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400" />
                        </div>
                    </div>
                    <div class="flex flex-col gap-3">
                        <label
                            v-for="(label, key) in { auto_print: 'Impression automatique', print_kitchen: 'Ticket cuisine', print_receipt: 'Ticket client' }"
                            :key="key"
                            class="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:bg-slate-50">
                            <p class="text-sm font-medium text-slate-700">{{ label }}</p>
                            <div @click="printing[key] = !printing[key]"
                                class="w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 cursor-pointer"
                                :class="printing[key] ? 'bg-slate-800' : 'bg-slate-200'">
                                <div class="w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                                    :class="printing[key] ? 'translate-x-4' : 'translate-x-0'" />
                            </div>
                        </label>
                    </div>
                    <div class="flex justify-end">
                        <PrimaryButton @click="savePrinting">Sauvegarder</PrimaryButton>
                    </div>
                </div>

                <!-- Sécurité -->
                <div v-if="activeTab === 'security'" class="bg-white rounded-2xl border p-6 flex flex-col gap-5">
                    <div>
                        <p class="font-semibold text-slate-800">Sécurité</p>
                        <p class="text-xs text-slate-400 mt-0.5">Protégez l'accès à votre espace admin</p>
                    </div>
                    <div class="flex flex-col gap-3">
                        <label
                            class="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:bg-slate-50">
                            <div>
                                <p class="text-sm font-medium text-slate-700">Double authentification (2FA)</p>
                                <p class="text-xs text-slate-400">Ajouter une couche de sécurité supplémentaire</p>
                            </div>
                            <div @click="security.two_factor = !security.two_factor"
                                class="w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 cursor-pointer"
                                :class="security.two_factor ? 'bg-slate-800' : 'bg-slate-200'">
                                <div class="w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                                    :class="security.two_factor ? 'translate-x-4' : 'translate-x-0'" />
                            </div>
                        </label>
                        <label
                            class="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:bg-slate-50">
                            <div>
                                <p class="text-sm font-medium text-slate-700">Alertes de connexion</p>
                                <p class="text-xs text-slate-400">Recevoir un email à chaque nouvelle connexion</p>
                            </div>
                            <div @click="security.login_alerts = !security.login_alerts"
                                class="w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 cursor-pointer"
                                :class="security.login_alerts ? 'bg-slate-800' : 'bg-slate-200'">
                                <div class="w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                                    :class="security.login_alerts ? 'translate-x-4' : 'translate-x-0'" />
                            </div>
                        </label>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="text-xs font-medium text-slate-600">Expiration de session (minutes)</label>
                            <select v-model="security.session_timeout"
                                class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400">
                                <option value="15">15 min</option>
                                <option value="30">30 min</option>
                                <option value="60">1 heure</option>
                                <option value="0">Jamais</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-xs font-medium text-slate-600">IP autorisées (optionnel)</label>
                            <InputText v-model="security.ip_whitelist" placeholder="192.168.1.1, 10.0.0.1" />
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <PrimaryButton @click="saveSecurity">Sauvegarder</PrimaryButton>
                    </div>
                </div>

                <!-- Sauvegarde -->
                <div v-if="activeTab === 'backup'" class="bg-white rounded-2xl border p-6 flex flex-col gap-5">
                    <div>
                        <p class="font-semibold text-slate-800">Sauvegarde</p>
                        <p class="text-xs text-slate-400 mt-0.5">Gérez les sauvegardes de vos données</p>
                    </div>
                    <div class="p-4 rounded-xl bg-slate-50 border flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-slate-700">Dernière sauvegarde</p>
                            <p class="text-xs text-slate-400 mt-0.5">{{ backup.last_backup }}</p>
                        </div>
                        <SecondaryButton @click="triggerBackup">Sauvegarder maintenant</SecondaryButton>
                    </div>
                    <div class="flex flex-col gap-3">
                        <label
                            class="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:bg-slate-50">
                            <div>
                                <p class="text-sm font-medium text-slate-700">Sauvegarde automatique</p>
                                <p class="text-xs text-slate-400">Sauvegarder automatiquement selon la fréquence choisie
                                </p>
                            </div>
                            <div @click="backup.auto_backup = !backup.auto_backup"
                                class="w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 cursor-pointer"
                                :class="backup.auto_backup ? 'bg-slate-800' : 'bg-slate-200'">
                                <div class="w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                                    :class="backup.auto_backup ? 'translate-x-4' : 'translate-x-0'" />
                            </div>
                        </label>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="text-xs font-medium text-slate-600">Fréquence</label>
                            <select v-model="backup.frequency"
                                class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400">
                                <option value="hourly">Toutes les heures</option>
                                <option value="daily">Quotidienne</option>
                                <option value="weekly">Hebdomadaire</option>
                                <option value="monthly">Mensuelle</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-xs font-medium text-slate-600">Rétention (jours)</label>
                            <input type="number" v-model="backup.retention" min="7" max="365"
                                class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400" />
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <PrimaryButton @click="saveBackup">Sauvegarder</PrimaryButton>
                    </div>
                </div>

            </div>
        </Transition>

        <Toast v-if="toast.show" :type="toast.type" :message="toast.message" @close="toast.show = false" />
    </AuthenticatedLayoutAdmin>
</template>
