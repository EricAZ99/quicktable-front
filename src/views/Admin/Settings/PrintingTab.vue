<script setup>
import InputText from '../../../components/InputText.vue'
import PrimaryButton from '../../../components/PrimaryButton.vue'

defineProps({
    printing: { type: Object, required: true },
    onSave: { type: Function, required: true },
})

const printingLabels = {
    auto_print: 'Impression automatique',
    print_kitchen: 'Ticket cuisine',
    print_receipt: 'Ticket client',
}
</script>

<template>
    <div class="bg-white rounded-2xl border p-6 flex flex-col gap-5">
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
            <label v-for="(label, key) in printingLabels" :key="key"
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
            <PrimaryButton @click="onSave">Sauvegarder</PrimaryButton>
        </div>
    </div>
</template>
