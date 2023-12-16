<template>
    <VaForm ref="starForm" tag="form" class="formaboba">
        <VaInput v-model="form.name" class="mt-3" label="Name" name="Name" :rules="[v => !!v || 'Name is required']" />
        <VaInput v-model="form.spectralType" class="mt-3" label="Spectral Type" name="Spectral Type"
            :rules="[v => !!v || 'Spectral Type is required']" />
        <VaInput v-model="form.luminosity" class="mt-3" label="Luminosity" name="Luminosity" type=""
            :rules="[(v) => Number(v) > 0 || 'Яркость должна быть больше нуля']" />
        <VaInput v-model="form.distanceFromEarth" class="mt-3" label="Distance from Earth" name="Distance from Earth"
            :rules="[v => !!v || 'Distance from Earth is required']" />
        <VaInput v-model="form.temperature" class="mt-3" label="Temperature" name="Temperature"
            :rules="[v => !!v || 'Temperature is required']" />
        <VaSelect v-model="form.galaxyId" text-by="name" value-by="id" :options="galaxies" label="Galaxy" name="Galaxy"
            class="mt-3" />

        <p v-if="error" class="error">Error: {{ error.message }}</p>
        <VaButton class="mt-3" :disabled="!isValid" @click="validate() && handleSubmit()">
            Send
        </VaButton>
    </VaForm>
</template>

<script lang="ts" setup>
import { useForm } from 'vuestic-ui'
import { unref, reactive, ref } from 'vue';
import { inputStarDto } from '../api/star';
import { Galaxy } from '../models/galaxy';
import { Star } from '../models/star';

const { isValid, validate } = useForm('starForm')

const props = defineProps<{
    initData: Star | null;
    galaxies: Galaxy[],
    submit: (form: inputStarDto) => Promise<void>
}>();

const initData = unref(props.initData);
const error = ref<Error | null>(null);
// const selectedGalaxyRef = ref<Galaxy>();

// const selectOptions = computed(() => {
//     const selectOptions = props.galaxies
//     selectedGalaxyRef.value = selectOptions[0]
//     return selectOptions;
// });

const form = reactive({
    name: initData?.name ?? '',
    spectralType: initData?.spectralType ?? '',
    luminosity: initData?.luminosity ?? 0,
    distanceFromEarth: initData?.distanceFromEarth ?? 0,
    temperature: initData?.temperature ?? 0,
    galaxyId: initData?.galaxy.id ?? '',
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