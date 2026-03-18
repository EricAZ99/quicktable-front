<script setup>
import InputText from '../../../components/InputText.vue'
import PrimaryButton from '../../../components/PrimaryButton.vue'

defineProps({
    team: { type: Array, required: true },
    newMember: { type: Object, required: true },
    teamRoles: { type: Array, required: true },
    onAddMember: { type: Function, required: true },
    onRemoveMember: { type: Function, required: true },
})
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="bg-white rounded-2xl border p-6 flex flex-col gap-4">
            <div>
                <p class="font-semibold text-slate-800">Membres de l'équipe</p>
                <p class="text-xs text-slate-400 mt-0.5">Gérez les accès de votre personnel</p>
            </div>
            <div class="flex flex-col gap-2">
                <div v-for="member in team" :key="member.id" class="flex items-center justify-between p-3 rounded-xl border">
                    <div>
                        <p class="text-sm font-medium text-slate-700">{{ member.name }}</p>
                        <p class="text-xs text-slate-400">{{ member.email }} · {{ member.role }}</p>
                    </div>
                    <button @click="onRemoveMember(member.id)"
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
                        <option v-for="role in teamRoles" :key="role">{{ role }}</option>
                    </select>
                </div>
            </div>
            <div class="flex justify-end">
                <PrimaryButton @click="onAddMember">Ajouter</PrimaryButton>
            </div>
        </div>
    </div>
</template>
