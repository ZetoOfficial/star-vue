<template>
    <VaForm ref="constellationForm" tag="form" class="formaboba">
        <VaInput v-model="form.name" class="mt-3" label="Name" name="Name" :rules="[v => !!v || 'Name is required']" />
        <VaInput v-model="form.shape" class="mt-3" label="Shape" name="Shape" :rules="[v => !!v || 'Shape is required']" />
        <VaInput v-model="form.abbreviation" class="mt-3" label="Abbreviation" name="Abbreviation"
            :rules="[v => !!v || 'Abbreviation is required']" />
        <VaInput v-model="form.history" class="mt-3" label="History" name="History"
            :rules="[v => !!v || 'History is required']" />
        <VaSelect v-model="form.galaxyId" text-by="name" value-by="id" class="mt-3" label="Galaxy" name="Galaxy"
            :rules="[v => !!v || 'Galaxy is required']" :options="galaxies" />

        <VaButton class="mt-3" :disabled="!isValid" @click="validate() && handleSubmit()">
            Send
        </VaButton>
    </VaForm>
</template>

<script lang="ts" setup>
import { useForm } from 'vuestic-ui'
import { unref, reactive, ref } from 'vue';
import { inputConstellationDto } from '../api/constelations';
import { Constellation } from '../models/constellation';
import { Galaxy } from '../models/galaxy';
const { isValid, validate } = useForm('constellationForm')

const props = defineProps<{
    initData: Constellation | null;
    galaxies: Galaxy[],
    submit: (form: inputConstellationDto) => Promise<void>
}>();

const initData = unref(props.initData);
const error = ref<Error | null>(null);

const form = reactive({
    name: initData?.name || '',
    shape: initData?.shape || '',
    abbreviation: initData?.abbreviation || '',
    history: initData?.history || '',
    galaxyId: initData?.galaxy.id || '',
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