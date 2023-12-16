<template>
    <VaForm ref="galaxyForm" tag="form" class="formaboba">
        <VaInput v-model="form.name" name="name" label="Name" :rules="[v => !!v || 'Name is required']" class="mb-3" />
        <VaInput v-model="form.size" name="size" label="Size" type="number"
            :rules="[(v) => Number(v) > 0 || 'Размер должен быть больше нуля']" class=" mb-3" />
        <VaInput v-model="form.shape" name="shape" label="Shape" :rules="[v => !!v || 'Shape is required']" class="mb-3" />
        <VaInput v-model="form.composition" name="composition" label="Composition"
            :rules="[v => !!v || 'Composition is required']" class="mb-3" />
        <VaInput v-model="form.distanceFromEarth" name="distanceFromEarth" label="Distance from Earth" type="number"
            :rules="[(v) => Number(v) > 0 || 'Дистанция должна быть больше нуля']" class="mb-3" />
        <VaSelect v-model="form.universeId" text-by="name" value-by="id" name="universeId" label="Universe"
            :options="universes" :rules="[v => !!v || 'Universe is required']" class="mb-3" />

        <VaButton class="mt-3" :disabled="!isValid" @click="validate() && handleSubmit()">
            Send
        </VaButton>
    </VaForm>
</template>

<script lang="ts" setup>
import { useForm } from 'vuestic-ui'
import { unref, reactive, ref } from 'vue';
import { inputGalaxyDto } from '../api/galaxy';
import { Galaxy } from '../models/galaxy';
import { Universe } from '../models/universe';

const { isValid, validate } = useForm('galaxyForm')

const props = defineProps<{
    initData: Galaxy | null;
    universes: Universe[];
    submit: (form: inputGalaxyDto) => Promise<void>
}>();

const initData = unref(props.initData);
const error = ref<Error | null>(null);

const form = reactive({
    name: initData?.name ?? '',
    size: initData?.size ?? 0,
    shape: initData?.shape ?? '',
    composition: initData?.composition ?? '',
    distanceFromEarth: initData?.distanceFromEarth ?? 0,
    universeId: initData?.universe.id ?? '',
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