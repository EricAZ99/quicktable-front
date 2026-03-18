<script setup>
import { computed, reactive, ref } from 'vue'
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue'
import Toast from '../../components/Toast.vue'
import AppearanceTab from './Settings/AppearanceTab.vue'
import BackupTab from './Settings/BackupTab.vue'
import BillingTab from './Settings/BillingTab.vue'
import GeneralTab from './Settings/GeneralTab.vue'
import IntegrationsTab from './Settings/IntegrationsTab.vue'
import NotificationsTab from './Settings/NotificationsTab.vue'
import PasswordTab from './Settings/PasswordTab.vue'
import PrintingTab from './Settings/PrintingTab.vue'
import SchedulesTab from './Settings/SchedulesTab.vue'
import SecurityTab from './Settings/SecurityTab.vue'
import TeamTab from './Settings/TeamTab.vue'

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

const toast = reactive({ show: false, type: 'success', message: '' })
function showToast(type, message) {
    toast.type = type
    toast.message = message
    toast.show = true
}

const general = reactive({
    restaurant_name: 'QuickTable Restaurant',
    email: 'contact@quicktable.fr',
    phone: '+33 6 00 00 00 00',
    address: '12 rue de la Paix, 75001 Paris',
    currency: 'FCFA',
    timezone: 'Europe/Paris',
})
function saveGeneral() { showToast('success', 'Informations générales sauvegardées.') }

const appearance = reactive({
    primary_color: '#1e293b',
    font: 'Inter',
    dark_mode: false,
    compact_mode: false,
})
const fonts = ['Inter', 'Roboto', 'Poppins', 'Lato', 'Montserrat']
function saveAppearance() { showToast('success', 'Apparence mise à jour.') }

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
    team.value = team.value.filter((member) => member.id !== id)
    showToast('success', 'Membre supprimé.')
}

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
const schedules = reactive(Object.fromEntries(days.map((day) => [day, { open: day !== 'Dimanche', from: '09:00', to: '22:00' }])))
function saveSchedules() { showToast('success', 'Horaires sauvegardés.') }

const integrations = reactive([
    { key: 'stripe', label: 'Stripe', desc: 'Paiements en ligne', enabled: true },
    { key: 'uber_eats', label: 'Uber Eats', desc: 'Commandes en livraison', enabled: false },
    { key: 'google', label: 'Google My Business', desc: 'Avis et visibilité', enabled: true },
    { key: 'mailchimp', label: 'Mailchimp', desc: 'Campagnes email', enabled: false },
])
function saveIntegrations() { showToast('success', 'Intégrations mises à jour.') }

const printing = reactive({
    printer_name: 'Epson TM-T20III',
    auto_print: true,
    print_kitchen: true,
    print_receipt: true,
    copies: 1,
    paper_size: '80mm',
})
function savePrinting() { showToast('success', "Paramètres d'impression sauvegardés.") }

const security = reactive({
    two_factor: false,
    session_timeout: '30',
    login_alerts: true,
    ip_whitelist: '',
})
function saveSecurity() { showToast('success', 'Paramètres de sécurité sauvegardés.') }

const backup = reactive({
    auto_backup: true,
    frequency: 'daily',
    last_backup: '2025-01-15 03:00',
    retention: '30',
})
function triggerBackup() { showToast('success', 'Sauvegarde manuelle lancée.') }
function saveBackup() { showToast('success', 'Paramètres de sauvegarde sauvegardés.') }

const tabComponents = {
    general: GeneralTab,
    appearance: AppearanceTab,
    password: PasswordTab,
    billing: BillingTab,
    notifications: NotificationsTab,
    team: TeamTab,
    schedules: SchedulesTab,
    integrations: IntegrationsTab,
    printing: PrintingTab,
    security: SecurityTab,
    backup: BackupTab,
}

const activeComponent = computed(() => tabComponents[activeTab.value] ?? GeneralTab)

const activeTabProps = computed(() => ({
    general: { general, onSave: saveGeneral },
    appearance: { appearance, fonts, onSave: saveAppearance },
    password: { password, passwordError: password_error.value, onSave: savePassword },
    billing: { billing, plans, onSave: saveBilling },
    notifications: { notifications, onSave: saveNotifications },
    team: { team: team.value, newMember, teamRoles, onAddMember: addMember, onRemoveMember: removeMember },
    schedules: { days, schedules, onSave: saveSchedules },
    integrations: { integrations, onSave: saveIntegrations },
    printing: { printing, onSave: savePrinting },
    security: { security, onSave: saveSecurity },
    backup: { backup, onSave: saveBackup, onTriggerBackup: triggerBackup },
}[activeTab.value] ?? {}))
</script>

<template>
    <AuthenticatedLayoutAdmin :title="'Paramètres'" :mean="'Gérez votre compte et vos préférences'">
        <Transition name="page" mode="out-in" appear>
            <div class="flex flex-col gap-4 pb-6">
                <div class="bg-white rounded-2xl border p-1 grid grid-cols-2 sm:grid-cols-3 lg:flex gap-1 w-full lg:w-fit">
                    <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
                        class="px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-center whitespace-nowrap"
                        :class="activeTab === tab.key ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-800'">
                        {{ tab.label }}
                    </button>
                </div>

                <component :is="activeComponent" v-bind="activeTabProps" />
            </div>
        </Transition>

        <Toast v-if="toast.show" :type="toast.type" :message="toast.message" @close="toast.show = false" />
    </AuthenticatedLayoutAdmin>
</template>
