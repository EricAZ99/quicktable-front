<script setup>

const props = defineProps({
    id: String,
    label: String,
    placeholder: String,
    modelValue: {
        type: [String, Number],
        default: '',
    },
    type: {
        type: String,
        default: 'text'
    }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <input
        :id="id"
        :placeholder="placeholder"
        :type="type"
        :value="modelValue"
        class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400"
        @input="emit('update:modelValue', $event.target.value)"
    />
</template>
