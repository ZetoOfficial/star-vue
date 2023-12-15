<template>
    <VaForm ref="universeForm" tag="form" class="formaboba">
        <VaInput v-model="form.name" class="mt-3" label="Name" name="Name" :rules="[v => !!v || 'Name is required']" />
        <VaCounter v-model="form.size" label="Size" name="Size"
            :rules="[(v) => v || 'Field is required', (v) => v > 0 || 'Размер должен быть больше нуля']" manual-input />
        <VaInput v-model="form.composition" class="mt-3" name="Composition" label="Composition"
            :rules="[v => !!v || 'Composition is required']" />
        <p v-if="error" class="error">Error: {{ error.message }}</p>
        <VaButton class="mt-3" :disabled="!isValid" @click="validate() && handleSubmit()">
            Send
        </VaButton>
    </VaForm>
</template>

<script lang="ts" setup>
import { useForm } from 'vuestic-ui'
import { unref, reactive, ref } from 'vue';
import { inputUniverseDto } from '../api/universe';
const { isValid, validate } = useForm('universeForm')

const props = defineProps<{
    initData: inputUniverseDto | null;
    submit: (form: inputUniverseDto) => Promise<void>
}>();

const initData = unref(props.initData);
const error = ref<Error | null>(null);

const form = reactive({
    name: initData?.name ?? " ",
    size: initData?.size ?? 0,
    composition: initData?.composition ?? " ",
})

async function handleSubmit() {
    console.log(`form: ${JSON.stringify(form)} - isValid: ${isValid.value};`);
    try {
        await props.submit(form);
    } catch (e) {
        error.value = e as Error
    }
}

</script>

<style>
.formaboba {
    display: flex;
    flex-direction: column;
}

.error {
    color: red;
}
</style>