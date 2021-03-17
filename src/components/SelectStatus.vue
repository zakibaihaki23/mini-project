<template>
  <v-autocomplete
    v-model="status"
    style="border-radius: 15px; width: 250px"
    outlined
    label="Status"
    solo
    :items="status"
    item-text="name"
    item-value="value"
    clearable
    hide-no-data
    hide-selected
    return-object
    :search-input.sync="search"
    @change="selected"
  ></v-autocomplete>
</template>

//
<script>
  export default {
    name: 'SelectWarehouse',
    data() {
      return {
        search: null,
        warehouse: null,
      }
    },
    props: ['clear'],
    created() {
      this.renderData()
    },
    mounted() {
      this.renderData('')
    },
    watch: {
      warehouse: {
        handler: function(val) {
          if (val && val.length == 0) {
            this.renderData(val)
          }
        },
      },
      clear: {
        handler: function(val) {
          this.warehouse = null
        },
        deep: true,
      },
    },
    methods: {
      renderData(warehouse) {
        this.$http
          .get('/v1/warehouse', {
            params: {
              conditions: warehouse,
            },
          })
          .then((response) => {
            this.warehouse = response.data.data

            this.warehouse = []
            let array = response.data.data
            for (let i = 0; i < array.length; i++) {
              this.warehouse.push({
                name: array[i].warehouse_name,
                value: array[i].id,
              })
            }
          })
      },
      selected(event) {
        this.$emit('selected', event)
      },
    },
  }
</script>
