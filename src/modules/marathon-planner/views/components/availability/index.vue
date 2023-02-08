<script lang="ts">
import { WEEK_DAYS } from "@/common";
import { IAvailability } from "@/interfaces";
import { PropType, ref, watch } from "vue";
import { Field, useForm, useFieldArray } from "vee-validate";
import { IAvailabilityForm } from "../../../interfaces";
import AvailabilityList from "./availability-list.vue";
import * as yup from "yup";
import {
  VRow,
  VSheet,
  VCol,
  VTextField,
  VSelect,
  VBtn,
  VExpansionPanels,
  VExpansionPanel,
  VExpansionPanelTitle,
} from "vuetify/components";

export default {
  name: "availability",
  components: {
    Field,
    VRow,
    VSheet,
    VCol,
    VTextField,
    VSelect,
    VBtn,
    VExpansionPanels,
    VExpansionPanel,
    VExpansionPanelTitle,
    AvailabilityList,
  },
  props: {
    saveAvailability: {
      type: Function as PropType<(availability: IAvailability) => void>,
      required: true,
    },
    availability: {
      type: Object as PropType<IAvailability | null>,
      required: true,
    },
  },
  setup(props) {
    const expandPanel = ref(true);

    const togglePanel = () => {
      expandPanel.value = !expandPanel.value;
    };

    const initialAvailability: IAvailabilityForm[] = WEEK_DAYS.map(
      (_, index) => ({
        id: index,
        label:
          WEEK_DAYS[index].at(0)!.toUpperCase() + WEEK_DAYS[index].slice(1),
        value: 60,
        type: "minutes",
      })
    );

    const { handleSubmit, errors } = useForm({
      initialValues: {
        availability: initialAvailability,
      },
      validationSchema: yup.object({
        availability: yup.array().of(
          yup.object({
            type: yup.string().required(),

            value: yup.lazy((value, extra) => {
              if (extra.parent.type === "minutes") {
                return yup
                  .number()
                  .transform((value) =>
                    Number.isNaN(value) || value === "" ? 0 : value
                  )
                  .required()
                  .min(1, "The value must be higher than 1")
                  .max(60, "The value cannot be higher than 60");
              } else {
                return yup
                  .number()
                  .transform((value) =>
                    Number.isNaN(value) || value === "" ? 0 : value
                  )
                  .required()
                  .min(1, "The value must be higher than 1")
                  .max(23, "The value cannot be higher than 23");
              }
            }),
          })
        ),
      }),
    });

    const fieldHasError = (field: string) => {
      return errors.value[field as keyof typeof errors.value];
    };

    const { fields } = useFieldArray<IAvailabilityForm>("availability");

    const saveAvailability = handleSubmit((values) => {
      const availability = Object.fromEntries(
        Object.entries(values.availability).map(([key, value]) => [
          WEEK_DAYS[value.id],
          Number(value.value) * (value.type.toLowerCase() === "hours" ? 60 : 1),
        ])
      ) as unknown as IAvailability;

      props.saveAvailability(availability);
      togglePanel();
    });

    const typeOptions = [
      { value: "minutes", title: "Minutes" },
      { value: "hours", title: "Hours" },
    ];

    const amountOptions = {
      minutes: Array.from({ length: 60 }, (_, i) => i + 1),
      hours: Array.from({ length: 23 }, (_, i) => i + 1),
    };

    return {
      fieldHasError,
      fields,
      errors,
      typeOptions,
      amountOptions,
      saveAvailability,
      expandPanel,
    };
  },
};
</script>

<template>
  <v-sheet class="pa-6 pb-8 my-4 elevation-10" rounded="lg">
    <v-expansion-panels class="availability-panel" v-model="expandPanel">
      <v-expansion-panel>
        <v-expansion-panel-title class="bg-red-lighten-5 text-grey-darken-3">
          <template v-slot:default>
            <v-row no-gutters>
              <v-col>
                <h2 class="text-h6">Availability</h2>

                <p class="text-body-1">
                  Fill in how much time you have available to watch videos each
                  day
                </p>
              </v-col>
            </v-row>
          </template>

          <template v-slot:actions="{ expanded }">
            <v-btn variant="tonal">
              {{ expanded ? "Collapse" : "Edit" }}
            </v-btn>
          </template>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <form @submit="saveAvailability" class="mt-10">
            <v-row v-for="(field, index) in fields" :key="index">
              <v-col cols="6" class="py-0">
                <v-text-field
                  :name="`${field.value.id}`"
                  :label="field.value.label"
                  v-model="field.value.value"
                  type="number"
                  :error-messages="
                    fieldHasError(`availability[${index}].value`)
                  "
                  class="mb-2"
                  clearable
                  variant="outlined"
                />
              </v-col>

              <v-col cols="6" class="py-0">
                <v-select
                  class="mb-2"
                  label="Type"
                  v-model="field.value.type"
                  :item-value="field.value.type"
                  :items="typeOptions"
                  variant="outlined"
                />
              </v-col>
            </v-row>

            <v-row class="justify-end px-3">
              <v-btn
                type="submit"
                class="bg-red-darken-1 text-h6"
                rounded="lg"
                height="46px"
                width="100px"
              >
                Save
              </v-btn>
            </v-row>
          </form>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <AvailabilityList :availability="availability" />
  </v-sheet>
</template>

<style>
.availability-panel .v-expansion-panel__shadow {
  box-shadow: none !important;
}
</style>
