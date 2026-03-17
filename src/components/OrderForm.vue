<script setup>
import { reactive, ref, computed, watch } from 'vue';
import FormBackGround from './FormBackGround.vue';
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
    .trim().toLowerCase().replace(/['']/g, "'")
    .normalize('NFD').replace(/\p{Diacritic}/gu, '');

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
const platesByCategory = (cat) => !cat ? [] : availablePlates.filter(p => p.category === cat);

const emptyComplementLine = () => ({ category: '', complementId: '', name: '', price: 0, qty: 1 });
const emptyPlateLine = () => ({ category: '', plateId: '', name: '', price: 0, qty: 1, complements: [] });

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
                ? p.complements : (p?.complement?.name ? [p.complement] : []);
            base.complements = rawComplements.map(c => {
                const complement = emptyComplementLine();
                const cp = plateByName.value.get(normalizeName(c?.name));
                if (cp) {
                    complement.category = cp.category;
                    complement.complementId = String(cp.id);
                    complement.name = cp.name;
                    complement.price = Number(cp.price ?? 0);
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

watch(() => props.order, (order) => { setFormFromOrder(order); }, { immediate: true });
watch(() => form.type, (next) => {
    if (next === 'Emporté') form.table = 'Emporté';
    if (next !== 'Sur place' && next !== 'Emporté') form.table = '';
});

const tableOptions = computed(() => {
    if (form.type !== 'Sur place') return availableTables;
    const options = [...availableTables];
    const currentTable = (form.table ?? '').trim();
    if (currentTable && !options.some(t => t.name === currentTable))
        options.unshift({ id: 'current', name: currentTable });
    return options;
});

const onMainPlateChange = (plateLine) => {
    const selected = plateById.value.get(String(plateLine.plateId));
    if (!selected) { plateLine.name = ''; plateLine.price = 0; return; }
    plateLine.name = selected.name;
    plateLine.price = Number(selected.price ?? 0);
};

const onComplementPlateChange = (plateLine, complementLine) => {
    const hadComplement = Boolean((complementLine?.name ?? '').trim());
    const selected = plateById.value.get(String(complementLine.complementId));
    if (!selected) { complementLine.name = ''; complementLine.price = 0; return; }
    complementLine.name = selected.name;
    complementLine.price = Number(selected.price ?? 0);
    if (!hadComplement) complementLine.qty = Math.max(1, Number(plateLine.qty ?? 1));
};

const addPlate = () => form.plates.push(emptyPlateLine());
const removePlate = (index) => { if (form.plates.length > 1) form.plates.splice(index, 1); };
const addComplement = (plateLine) => {
    const c = emptyComplementLine();
    c.qty = Math.max(1, Number(plateLine?.qty ?? 1));
    plateLine.complements.push(c);
};
const removeComplement = (plateLine, index) => plateLine.complements.splice(index, 1);

const total = computed(() =>
    form.plates.reduce((sum, p) => {
        const qty = Math.max(1, Number(p.qty ?? 1));
        const complementsTotal = Array.isArray(p.complements)
            ? p.complements.reduce((acc, c) => acc + (Math.max(1, Number(c?.qty ?? 1)) * Number(c?.price ?? 0)), 0) : 0;
        return sum + qty * Number(p.price) + complementsTotal;
    }, 0)
);

const randomNumber = () => {
    const digits = Math.floor(Math.random() * 6) + 5;
    const min = 10 ** (digits - 1);
    return Math.floor(Math.random() * (10 ** digits - min)) + min;
};

const onSubmit = () => {
    emits('create', {
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
                ? p.complements.filter(c => Boolean((c?.name ?? '').trim()))
                    .map(c => ({ name: c.name, price: Number(c.price ?? 0), qty: Math.max(1, Number(c.qty ?? 1)) }))
                : [],
        }))
    });
};
</script>

<template>
    <FormBackGround>
        <!-- Header fixe -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-white text-base">
                    {{ order ? '✏️' : '🧾' }}
                </div>
                <div>
                    <h2 class="text-base font-semibold text-slate-900">
                        {{ order ? 'Modifier la commande' : 'Nouvelle commande' }}
                    </h2>
                    <p class="text-xs text-slate-400">{{ order ? order.order_id : 'Remplissez les informations ci-dessous' }}</p>
                </div>
            </div>
            <button type="button" @click="emits('onClose')"
                class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-xl leading-none">
                ×
            </button>
        </div>

        <!-- Corps scrollable -->
        <form @submit.prevent="onSubmit" class="flex flex-col flex-1 overflow-hidden">
            <div class="flex-1 overflow-y-auto px-6 py-5 space-y-6">

                <!-- Type de commande -->
                <div>
                    <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Type de commande</label>
                    <div class="mt-2 grid grid-cols-2 gap-3">
                        <button type="button" @click="form.type = 'Sur place'; form.table = ''"
                            :class="form.type === 'Sur place'
                                ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'"
                            class="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all">
                            <span class="text-base">🍽</span> Sur place
                        </button>
                        <button type="button" @click="form.type = 'Emporté'; form.table = 'Emporté'"
                            :class="form.type === 'Emporté'
                                ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'"
                            class="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all">
                            <span class="text-base">🥡</span> Emporté
                        </button>
                    </div>
                </div>

                <!-- Infos générales -->
                <div class="bg-slate-50 rounded-xl p-4 space-y-4">
                    <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Informations</p>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-xs font-medium text-slate-600 mb-1 block">N° de table</label>
                            <select v-if="form.type === 'Sur place'" v-model="form.table" required
                                class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100">
                                <option value="" disabled>Choisir une table</option>
                                <option v-for="t in tableOptions" :key="t.id" :value="t.name">{{ t.name }}</option>
                            </select>
                            <input v-else-if="form.type === 'Emporté'" value="Emporté" disabled
                                class="w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-400 cursor-not-allowed" />
                            <div v-else
                                class="w-full rounded-lg border border-dashed border-slate-200 px-3 py-2 text-sm text-slate-400 bg-white">
                                Choisir un type d'abord
                            </div>
                        </div>
                        <div>
                            <label class="text-xs font-medium text-slate-600 mb-1 block">Nom du client</label>
                            <input v-model="form.client" required placeholder="ex: Dupont"
                                class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100" />
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-xs font-medium text-slate-600 mb-1 block">Statut</label>
                            <select v-model="form.stat" required
                                class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100">
                                <option>En attente</option>
                                <option>En préparation</option>
                                <option>Prêt</option>
                                <option>Servi</option>
                                <option>Annulé</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-xs font-medium text-slate-600 mb-1 block">Paiement</label>
                            <select v-model="form.payment" required
                                class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100">
                                <option>En attente</option>
                                <option>Payé</option>
                                <option>Refusé</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Plats -->
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Plats commandés</p>
                        <button type="button" @click="addPlate"
                            class="flex items-center gap-1 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors">
                            <span class="text-base leading-none">+</span> Ajouter un plat
                        </button>
                    </div>

                    <div class="space-y-3">
                        <div v-for="(plate, i) in form.plates" :key="i"
                            class="border border-slate-200 rounded-xl overflow-hidden">
                            <!-- En-tête du plat -->
                            <div class="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-100">
                                <span class="text-xs font-semibold text-slate-600">Plat {{ i + 1 }}
                                    <span v-if="plate.name" class="text-slate-400 font-normal">— {{ plate.name }}</span>
                                </span>
                                <div class="flex items-center gap-3">
                                    <span v-if="plate.price" class="text-xs font-semibold text-slate-700">
                                        {{ (Math.max(1, Number(plate.qty ?? 1)) * Number(plate.price)).toLocaleString('fr-FR') }} FCFA
                                    </span>
                                    <button type="button" @click="removePlate(i)"
                                        class="w-6 h-6 flex items-center justify-center rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors text-lg leading-none">×</button>
                                </div>
                            </div>

                            <div class="p-4 space-y-3">
                                <div class="grid grid-cols-2 gap-3">
                                    <div>
                                        <label class="text-xs font-medium text-slate-600 mb-1 block">Catégorie</label>
                                        <select v-model="plate.category" required
                                            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                                            @change="plate.plateId = ''; onMainPlateChange(plate)">
                                            <option value="" disabled>Catégorie</option>
                                            <option v-for="c in categoryOptions" :key="c" :value="c">{{ c }}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="text-xs font-medium text-slate-600 mb-1 block">Plat</label>
                                        <select v-model="plate.plateId" required
                                            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 disabled:bg-slate-50 disabled:text-slate-400"
                                            :disabled="!plate.category" @change="onMainPlateChange(plate)">
                                            <option value="" disabled>Choisir un plat</option>
                                            <option v-for="p in platesByCategory(plate.category)" :key="p.id" :value="String(p.id)">
                                                {{ p.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="flex items-center gap-3">
                                    <div class="flex-1 flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
                                        <span class="text-xs text-slate-500">Qté</span>
                                        <input v-model.number="plate.qty" type="number" min="1" step="1" required
                                            class="w-16 bg-transparent text-sm font-medium text-slate-700 outline-none" />
                                    </div>
                                    <div v-if="plate.price" class="flex-1 bg-slate-50 rounded-lg px-3 py-2">
                                        <span class="text-xs text-slate-500">Prix unit. </span>
                                        <span class="text-sm font-medium text-slate-700">{{ Number(plate.price).toLocaleString('fr-FR') }} FCFA</span>
                                    </div>
                                </div>

                                <!-- Compléments -->
                                <div class="pt-2 border-t border-slate-100">
                                    <div class="flex items-center justify-between mb-2">
                                        <p class="text-xs text-slate-500 font-medium">Compléments</p>
                                        <button type="button" @click="addComplement(plate)"
                                            class="text-xs text-slate-500 hover:text-slate-700 border border-dashed border-slate-300 rounded-lg px-2 py-1 hover:border-slate-400 transition-colors">
                                            + Complément
                                        </button>
                                    </div>

                                    <div v-if="plate.complements.length" class="space-y-2">
                                        <div v-for="(c, ci) in plate.complements" :key="ci"
                                            class="bg-slate-50 rounded-lg p-3 space-y-2">
                                            <div class="flex items-center justify-between">
                                                <span class="text-xs font-medium text-slate-500">Complément {{ ci + 1 }}
                                                    <span v-if="c.name" class="text-slate-400 font-normal">— {{ c.name }}</span>
                                                </span>
                                                <div class="flex items-center gap-2">
                                                    <span v-if="c.price" class="text-xs font-semibold text-slate-600">
                                                        {{ (Math.max(1, Number(c.qty ?? 1)) * Number(c.price ?? 0)).toLocaleString('fr-FR') }} FCFA
                                                    </span>
                                                    <button type="button" @click="removeComplement(plate, ci)"
                                                        class="w-5 h-5 flex items-center justify-center rounded text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors text-base leading-none">×</button>
                                                </div>
                                            </div>
                                            <div class="grid grid-cols-2 gap-2">
                                                <select v-model="c.category"
                                                    class="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs outline-none focus:border-slate-400"
                                                    @change="c.complementId = ''; onComplementPlateChange(plate, c)">
                                                    <option value="" disabled>Catégorie</option>
                                                    <option v-for="cat in categoryOptions" :key="cat" :value="cat">{{ cat }}</option>
                                                </select>
                                                <select v-model="c.complementId"
                                                    class="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs outline-none focus:border-slate-400 disabled:bg-slate-100 disabled:text-slate-400"
                                                    :disabled="!c.category" @change="onComplementPlateChange(plate, c)">
                                                    <option value="" disabled>Complément</option>
                                                    <option v-for="p in platesByCategory(c.category)" :key="p.id" :value="String(p.id)">
                                                        {{ p.name }}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <span class="text-xs text-slate-500">Qté</span>
                                                <input v-model.number="c.qty" type="number" min="1" step="1"
                                                    class="w-16 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs outline-none focus:border-slate-400" />
                                            </div>
                                        </div>
                                    </div>
                                    <p v-else class="text-xs text-slate-400 italic">Aucun complément</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Commentaires -->
                <div>
                    <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Commentaires</label>
                    <textarea v-model="form.comments" placeholder="ex: Sans oignon, bien cuit…" rows="2"
                        class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 resize-none"></textarea>
                </div>
            </div>

            <!-- Footer fixe -->
            <div class="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between gap-4 rounded-b-2xl">
                <div class="text-sm font-semibold text-slate-800">
                    Total : <span class="text-base">{{ total.toLocaleString('fr-FR') }}</span>
                    <span class="text-xs font-normal text-slate-500 ml-1">FCFA</span>
                </div>
                <div class="flex gap-3">
                    <SecondaryButton type="button" @click="emits('onClose')">Annuler</SecondaryButton>
                    <PrimaryButton type="submit">{{ order ? 'Enregistrer' : 'Créer la commande' }}</PrimaryButton>
                </div>
            </div>
        </form>
    </FormBackGround>
</template>
