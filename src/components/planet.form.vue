<template>
    <VaForm ref="planetForm" tag="form" class="formaboba">
        <VaInput v-model="form.name" class="mt-3" label="Name" name="Name" :rules="[v => !!v || 'Name is required']" />
        <VaInput v-model="form.mass" class="mt-3" label="Mass" name="Mass" type="number"
            :rules="[(v) => Number(v) > 0 || 'Масса должна быть больше нуля']" />
        <VaInput v-model="form.diameter" class="mt-3" label="Diameter" name="Diameter" type="number"
            :rules="[(v) => Number(v) > 0 || 'Диаметр должен быть больше нуля']" />
        <VaInput v-model="form.distanceFromStar" class="mt-3" label="Distance from star" name="Distance from star"
            type="number" :rules="[v => !!v || 'Distance from star is required']" />
        <VaInput v-model="form.surfaceTemperature" class="mt-3" label="Surface temperature" name="Surface temperature"
            type="number" :rules="[v => !!v || 'Surface temperature is required']" />
        <VaSelect v-model="form.starId" text-by="name" value-by="id" class="mt-3" label="Star" name="Star"
            :rules="[v => !!v || 'Star is required']" :options="stars" />

        <div v-if="error" class="error">{{ error.message }}</div>
        <VaButton class="mt-3" :disabled="!isValid" @click="validate() && handleSubmit()">
            Send
        </VaButton>
    </VaForm>
</template>

<script lang="ts" setup>
import { useForm } from 'vuestic-ui'
import { unref, reactive, ref } from 'vue';
import { inputPlanetDto } from '../api/planets';
import { Planet } from '../models/planet';
import { Star } from '../models/star';
const { isValid, validate } = useForm('planetForm')

const props = defineProps<{
    initData: Planet | null;
    stars: Star[];
    submit: (form: inputPlanetDto) => Promise<void>
}>();

const initData = unref(props.initData);
const error = ref<Error | null>(null);

const form = reactive({
    name: initData?.name ?? '',
    mass: initData?.mass ?? 0,
    diameter: initData?.diameter ?? 0,
    distanceFromStar: initData?.distanceFromStar ?? 0,
    surfaceTemperature: initData?.surfaceTemperature ?? 0,
    starId: initData?.star.id ?? '',
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