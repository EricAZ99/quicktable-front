<script setup>
import { reactive, ref, computed, watch } from 'vue';
import FormBackGround from './FormBackGround.vue';
import InputText from './InputText.vue';
import PrimaryButton from './PrimaryButton.vue';
import SecondaryButton from './SecondaryButton.vue';
import { tables, plates as availablePlates, categories as availableCategories } from '../data/menus';

const availableTables = tables.filter(t => t.stat === 'Libre');

const props = defineProps({
    order: { type: Object, default: null }
});

const emits = defineEmits(['onClose', 'create']);

const form = reactive({
    type: props.order?.type ?? '',
    table: props.order?.table ?? '',
    client: props.order?.client ?? '',
    stat: props.order?.stat ?? 'En attente',
    payment: props.order?.payment ?? 'En attente',
    comments: props.order?.comments ?? '',
    plates: [],
});

const normalizeName = (value) => String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "'")
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');

const plateById = computed(() => {
    const m = new Map();
    for (const p of availablePlates) m.set(String(p.id), p);
    return m;
});

const plateByName = computed(() => {
    const m = new Map();
    for (const p of availablePlates) m.set(normalizeName(p.name), p);
    return m;
});

const categoryOptions = computed(() => availableCategories.map(c => c.name));

const platesByCategory = (categoryName) => {
    if (!categoryName) return [];
    return availablePlates.filter(p => p.category === categoryName);
};

const emptyComplementLine = () => ({
    category: '',
    complementId: '',
    name: '',
    price: 0,
    qty: 1,
});

const emptyPlateLine = () => ({
    category: '',
    plateId: '',
    name: '',
    price: 0,
    qty: 1,
    complements: [],
});

const setFormFromOrder = (order) => {
    form.type = order?.type ?? '';
    form.table = order?.table ?? '';
    form.client = order?.client ?? '';
    form.stat = order?.stat ?? 'En attente';
    form.payment = order?.payment ?? 'En attente';
    form.comments = order?.comments ?? '';

    const plates = Array.isArray(order?.plates) && order.plates.length > 0
        ? order.plates.map(p => {
            const base = emptyPlateLine();

            const basePlate = plateByName.value.get(normalizeName(p?.name));
            if (basePlate) {
                base.category = basePlate.category;
                base.plateId = String(basePlate.id);
                base.name = basePlate.name;
                base.price = Number(basePlate.price ?? 0);
            } else {
                base.name = p?.name ?? '';
                base.price = Number(p?.price ?? 0);
            }

            base.qty = Math.max(1, Number(p?.qty ?? 1));

            const rawComplements = Array.isArray(p?.complements)
                ? p.complements
                : (p?.complement?.name ? [p.complement] : []);

            base.complements = rawComplements.map(c => {
                const complement = emptyComplementLine();

                const complementPlate = plateByName.value.get(normalizeName(c?.name));
                if (complementPlate) {
                    complement.category = complementPlate.category;
                    complement.complementId = String(complementPlate.id);
                    complement.name = complementPlate.name;
                    complement.price = Number(complementPlate.price ?? 0);
                } else {
                    complement.name = c?.name ?? '';
                    complement.price = Number(c?.price ?? 0);
                }

                complement.qty = Math.max(1, Number(c?.qty ?? base.qty));
                return complement;
            });

            return base;
        })
        : [emptyPlateLine()];

    form.plates.splice(0, form.plates.length, ...plates);
};

watch(() => props.order, (order) => {
    setFormFromOrder(order);
}, { immediate: true });

watch(() => form.type, (next) => {
    if (next === 'Emporté') form.table = 'Emporté';
    if (next !== 'Sur place' && next !== 'Emporté') form.table = '';
});

const tableOptions = computed(() => {
    if (form.type !== 'Sur place') return availableTables;

    const options = [...availableTables];
    const currentTable = (form.table ?? '').trim();

    if (currentTable && !options.some(t => t.name === currentTable)) {
        options.unshift({ id: 'current', name: currentTable });
    }

    return options;
});

const onMainPlateChange = (plateLine) => {
    const selected = plateById.value.get(String(plateLine.plateId));
    if (!selected) {
        plateLine.name = '';
        plateLine.price = 0;
        return;
    }

    plateLine.name = selected.name;
    plateLine.price = Number(selected.price ?? 0);
};

const onComplementPlateChange = (plateLine, complementLine) => {
    const hadComplement = Boolean((complementLine?.name ?? '').trim());
    const selected = plateById.value.get(String(complementLine.complementId));
    if (!selected) {
        complementLine.name = '';
        complementLine.price = 0;
        return;
    }

    complementLine.name = selected.name;
    complementLine.price = Number(selected.price ?? 0);

    if (!hadComplement) {
        complementLine.qty = Math.max(1, Number(plateLine.qty ?? 1));
    }
};

const addPlate = () => {
    form.plates.push(emptyPlateLine());
};

const removePlate = (index) => {
    if (form.plates.length > 1) form.plates.splice(index, 1);
};

const addComplement = (plateLine) => {
    const complement = emptyComplementLine();
    complement.qty = Math.max(1, Number(plateLine?.qty ?? 1));
    plateLine.complements.push(complement);
};

const removeComplement = (plateLine, index) => {
    plateLine.complements.splice(index, 1);
};

const total = computed(() =>
    form.plates.reduce((sum, p) => {
        const qty = Math.max(1, Number(p.qty ?? 1));
        const baseTotal = qty * Number(p.price);
        const complementsTotal = Array.isArray(p.complements)
            ? p.complements.reduce((acc, c) => acc + (Math.max(1, Number(c?.qty ?? 1)) * Number(c?.price ?? 0)), 0)
            : 0;

        return sum + baseTotal + complementsTotal;
    }, 0)
);

const randomNumber = () => {
    const minDigits = 5
    const maxDigits = 10

    const digits = Math.floor(Math.random() * (maxDigits - minDigits + 1)) + minDigits

    const min = 10 ** (digits - 1)
    const max = (10 ** digits) - 1

    return Math.floor(Math.random() * (max - min + 1)) + min
}


const onSubmit = () => {
    const newOrder = {
        type: form.type,
        table: form.table,
        client: form.client,
        stat: form.stat,
        payment: form.payment,
        comments: form.comments,
        order_id: props.order?.order_id ?? `Commande #${randomNumber()}`,
        time: props.order?.time ?? new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        total: total.value,
        plates: form.plates.map(p => ({
            name: p.name,
            price: Number(p.price),
            qty: Math.max(1, Number(p.qty ?? 1)),
            complements: Array.isArray(p.complements)
                ? p.complements
                    .filter(c => Boolean((c?.name ?? '').trim()))
                    .map(c => ({
                        name: c.name,
                        price: Number(c.price ?? 0),
                        qty: Math.max(1, Number(c.qty ?? 1)),
                    }))
                : [],
        }))
    };
    emits('create', newOrder);
};
</script>

<template>
    <FormBackGround>
        <h2 class="text-2xl font-semibold tracking-tight text-slate-900">
            {{ order ? 'Modifier la commande' : 'Ajouter une commande' }}
        </h2>
        <form class="mt-4 space-y-4 max-h-[75vh] overflow-y-auto pr-1 m-2" @submit.prevent="onSubmit">

            <!-- Type de commande -->
            <div>
                <label class="text-sm font-medium text-slate-700">Type de commande</label>
                <div class="mt-2 flex gap-3">
                    <button type="button" @click="form.type = 'Sur place'; form.table = ''"
                        :class="form.type === 'Sur place' ? 'bg-slate-800 text-white' : 'bg-white text-slate-700 border'"
                        class="flex-1 rounded-xl px-4 py-2 text-sm font-medium transition-colors">
                        🍽 Sur place
                    </button>
                    <button type="button" @click="form.type = 'Emporté'; form.table = 'Emporté'"
                        :class="form.type === 'Emporté' ? 'bg-slate-800 text-white' : 'bg-white text-slate-700 border'"
                        class="flex-1 rounded-xl px-4 py-2 text-sm font-medium transition-colors">
                        🥡 Emporté
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="text-sm font-medium text-slate-700">N° de table</label>
                    <select v-if="form.type === 'Sur place'" v-model="form.table" required
                        class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400">
                        <option value="" disabled>Choisir une table</option>
                        <option v-for="t in tableOptions" :key="t.id" :value="t.name">{{ t.name }}</option>
                    </select>
                    <InputText v-else-if="form.type === 'Emporté'" :model-value="'Emporté'" disabled
                        class="opacity-50 cursor-not-allowed" />
                    <div v-else class="mt-1 w-full rounded-xl border px-3 py-2 text-sm text-slate-400 bg-slate-50">
                        Choisir un type d'abord
                    </div>
                </div>
                <div>
                    <label class="text-sm font-medium text-slate-700">Nom du client</label>
                    <InputText v-model="form.client" required placeholder="ex: Dupont" />
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="text-sm font-medium text-slate-700">Statut</label>
                    <select v-model="form.stat" required
                        class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400">
                        <option>En attente</option>
                        <option>En préparation</option>
                        <option>Prêt</option>
                        <option>Servi</option>
                        <option>Annulé</option>
                    </select>
                </div>
                <div>
                    <label class="text-sm font-medium text-slate-700">Paiement</label>
                    <select v-model="form.payment" required
                        class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400">
                        <option>En attente</option>
                        <option>Payé</option>
                        <option>Refusé</option>
                    </select>
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between mb-2">
                    <label class="text-sm font-medium text-slate-700">Plats</label>
                    <button type="button" @click="addPlate"
                        class="text-xs text-slate-600 border rounded-lg px-2 py-1 hover:bg-slate-100">+ Ajouter un
                        plat</button>
                </div>
                <div v-for="(plate, i) in form.plates" :key="i" class="border rounded-xl p-3 mb-2 space-y-3">
                    <div class="flex items-center justify-between gap-2">
                        <p class="text-xs font-medium text-slate-600">Plat {{ i + 1 }}</p>
                        <button type="button" @click="removePlate(i)"
                            class="text-slate-400 hover:text-red-500 px-1 text-lg leading-none">×</button>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="text-sm font-medium text-slate-700">Catégorie</label>
                            <select v-model="plate.category" required
                                class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400"
                                @change="plate.plateId = ''; onMainPlateChange(plate)">
                                <option value="" disabled>Choisir une catégorie</option>
                                <option v-for="c in categoryOptions" :key="c" :value="c">{{ c }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-slate-700">Plat</label>
                            <select v-model="plate.plateId" required
                                class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400"
                                :disabled="!plate.category" @change="onMainPlateChange(plate)">
                                <option value="" disabled>Choisir un plat</option>
                                <option v-for="p in platesByCategory(plate.category)" :key="p.id" :value="String(p.id)">
                                    {{ p.name }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="text-sm font-medium text-slate-700">Nom</label>
                            <InputText :model-value="plate.name" disabled class="opacity-60 cursor-not-allowed" />
                        </div>
                        <div>
                            <label class="text-sm font-medium text-slate-700">Prix</label>
                            <InputText :model-value="plate.price" type="number" disabled
                                class="opacity-60 cursor-not-allowed" />
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="text-sm font-medium text-slate-700">Quantité</label>
                            <input v-model.number="plate.qty" type="number" min="1" step="1" required
                                class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400" />
                        </div>
                        <div class="flex flex-col items-end justify-end text-sm text-slate-600 font-medium">
                            <span>
                                Sous-total plat : {{
                                    (Math.max(1, Number(plate.qty ?? 1)) * Number(plate.price)).toLocaleString('fr-FR')
                                }} FCFA
                            </span>
                            <!-- <span v-if="Array.isArray(plate.complements) && plate.complements.length" class="text-xs text-slate-500">
                                Sous-total ligne : {{
                                    (
                                        (Math.max(1, Number(plate.qty ?? 1)) * Number(plate.price))
                                        + (plate.complements.reduce((acc, c) => acc + (Math.max(1, Number(c?.qty ?? 1)) * Number(c?.price ?? 0)), 0))
                                    ).toLocaleString('fr-FR')
                                }} FCFA
                            </span> -->
                        </div>
                    </div>

                    <div class="pt-2 border-t">
                        <div class="flex items-center justify-between mb-2">
                            <p class="text-xs font-medium text-slate-600">Compléments (optionnel)</p>
                            <button type="button" @click="addComplement(plate)"
                                class="text-xs text-slate-600 border rounded-lg px-2 py-1 hover:bg-slate-100">
                                + Ajouter un complément
                            </button>
                        </div>

                        <div v-if="Array.isArray(plate.complements) && plate.complements.length" class="space-y-3">
                            <div v-for="(c, ci) in plate.complements" :key="ci"
                                class="border rounded-xl p-3 space-y-3 bg-slate-50/40">
                                <div class="flex items-center justify-between gap-2">
                                    <p class="text-xs font-medium text-slate-600">Complément {{ ci + 1 }}</p>
                                    <button type="button" @click="removeComplement(plate, ci)"
                                        class="text-slate-400 hover:text-red-500 px-1 text-lg leading-none">×</button>
                                </div>

                                <div class="grid grid-cols-2 gap-3">
                                    <div>
                                        <label class="text-sm font-medium text-slate-700">Catégorie</label>
                                        <select v-model="c.category" required
                                            class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400"
                                            @change="c.complementId = ''; onComplementPlateChange(plate, c)">
                                            <option value="" disabled>Choisir une catégorie</option>
                                            <option v-for="cat in categoryOptions" :key="cat" :value="cat">{{ cat }}
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="text-sm font-medium text-slate-700">Complément</label>
                                        <select v-model="c.complementId" required
                                            class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400"
                                            :disabled="!c.category" @change="onComplementPlateChange(plate, c)">
                                            <option value="" disabled>Choisir un complément</option>
                                            <option v-for="p in platesByCategory(c.category)" :key="p.id"
                                                :value="String(p.id)">
                                                {{ p.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="grid grid-cols-2 gap-3">
                                    <div>
                                        <label class="text-sm font-medium text-slate-700">Nom</label>
                                        <InputText :model-value="c.name" disabled
                                            class="opacity-60 cursor-not-allowed" />
                                    </div>
                                    <div>
                                        <label class="text-sm font-medium text-slate-700">Prix</label>
                                        <InputText :model-value="c.price" type="number" disabled
                                            class="opacity-60 cursor-not-allowed" />
                                    </div>
                                </div>

                                <div class="grid grid-cols-2 gap-3">
                                    <div>
                                        <label class="text-sm font-medium text-slate-700">Quantité complément</label>
                                        <input v-model.number="c.qty" type="number" min="1" step="1" required
                                            class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400" />
                                    </div>
                                    <div class="flex items-end justify-end text-sm text-slate-600 font-medium">
                                        Sous-total complément : {{
                                            (Math.max(1, Number(c.qty ?? 1)) * Number(c.price ?? 0)).toLocaleString('fr-FR')
                                        }} FCFA
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-end justify-end text-sm text-slate-600 font-medium">
                                Sous-total compléments : {{
                                    plate.complements.reduce((acc, c) => acc + (Math.max(1, Number(c?.qty ?? 1)) *
                                        Number(c?.price ?? 0)), 0).toLocaleString('fr-FR')
                                }} FCFA
                            </div>
                            <div v-if="Array.isArray(plate.complements) && plate.complements.length"
                                class="flex items-end justify-end text-sm text-slate-600 font-medium">
                                Sous-total ligne : {{
                                    (
                                        (Math.max(1, Number(plate.qty ?? 1)) * Number(plate.price))
                                        + (plate.complements.reduce((acc, c) => acc + (Math.max(1, Number(c?.qty ?? 1)) *
                                            Number(c?.price ?? 0)), 0))
                                    ).toLocaleString('fr-FR')
                                }} FCFA
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <label class="text-sm font-medium text-slate-700">Commentaires</label>
                <InputText v-model="form.comments" placeholder="ex: Sans oignon" />
            </div>

            <div class="text-sm text-slate-600 font-medium text-right">
                Total estimé : {{ total.toLocaleString('fr-FR') }} FCFA
            </div>

            <div class="flex justify-end gap-4">
                <PrimaryButton type="submit">
                    {{ order ? 'Modifier' : 'Ajouter' }}
                </PrimaryButton>
                <SecondaryButton type="button" @click="emits('onClose')">
                    Annuler
                </SecondaryButton>
            </div>
        </form>
    </FormBackGround>
</template>
