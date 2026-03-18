<script setup>
import InputText from '../../../components/InputText.vue'
import PrimaryButton from '../../../components/PrimaryButton.vue'

defineProps({
    security: { type: Object, required: true },
    onSave: { type: Function, required: true },
})
</script>

<template>
    <div class="bg-white rounded-2xl border p-6 flex flex-col gap-5">
        <div>
            <p class="font-semibold text-slate-800">Sécurité</p>
            <p class="text-xs text-slate-400 mt-0.5">Protégez l'accès à votre espace admin</p>
        </div>
        <div class="flex flex-col gap-3">
            <label class="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:bg-slate-50">
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
            <label class="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:bg-slate-50">
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
            <PrimaryButton @click="onSave">Sauvegarder</PrimaryButton>
        </div>
    </div>
</template>
