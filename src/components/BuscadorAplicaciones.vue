<template>
  <div>
    <div>
      <q-form>
        <h2>Aplicaciones</h2>
        <div class="row q-col-gutter-md">
          <div class="col-md-4 col-xs-12 q-my-sm">
            <q-select filled v-model="marcaInput" use-input input-debounce="1000" label="Elige la marca del vehículo"
              :options="marcasDeAuto" @filter="filterFn" behavior="menu" :loading="loading">
              <template v-slot:prepend><q-icon name="img:statics/icons/icon-one.png"></q-icon></template>
              <template v-slot:no-option>
                <q-item><q-item-section class="text-grey">No hay resultados</q-item-section></q-item>
              </template>
            </q-select>
          </div>
          <div class="col-md-8 col-xs-12 q-my-sm">
            <q-select filled v-model="modeloInput" use-input input-debounce="1000" label="Elige el modelo"
              :options="modelosDeAuto" @filter="filterFn2" behavior="menu" :loading="loading2"
               @input="emitAdd" :disable="loading2">
              <template v-slot:prepend><q-icon name="img:statics/icons/icon-two.png"></q-icon></template>
              <template v-slot:no-option>
                <q-item><q-item-section class="text-grey">No hay resultados</q-item-section></q-item>
              </template>
            </q-select>
          </div>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import buscador from '../mixins/buscador'
import tools from '../mixins/tools'

export default {
  name: 'BuscadorAplicaciones',
  data() {
    return {
    }
  },
  mixins: [tools,buscador],
  methods: {
    emitAdd() {
      if (this.modeloInput != null) { this.$emit('addAplicacion', this.modeloInput); this.modeloInput = null }
    }
  }
}
</script>

<style lang="stylus">

</style>