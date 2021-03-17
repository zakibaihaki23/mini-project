<template>
  <div class="regist">
    <h1>CREATE PACKING</h1>
    <v-row no-gutters>
      <v-col md="6">
        <div class="form-right">
          <p>Delivery Date <span style="color: red">*</span></p>
          <v-text-field
            prepend-inner-icon="mdi-calendar"
            label="Delivery Date *"
            solo
            readonly
          >
          </v-text-field>

          <p>Warehouse <span style="color: red">*</span></p>
          <v-select
            :items="warehouse"
            item-text="name"
            item-value="value"
            label="Warehouse *"
            solo
            v-model="warehouseList"
          >
          </v-select>
        </div>
      </v-col>
      <v-col md="6">
        <div class="form-right">
          <p>Area <span style="color: red">*</span></p>
          <v-select
            label="Area *"
            :items="area"
            v-model="areaList"
            item-value="value"
            solo
            item-text="name"
          >
          </v-select>
          <p>Note <span style="color: red">*</span></p>
          <v-textarea label="Note *" solo> </v-textarea>
        </div>
      </v-col>
    </v-row>

    <br />
    <br /><br />
    <br /><br />
    <br /><br />
    <br /><br />
    <br />
    <v-divider></v-divider>
    <div class="btn">
      <v-btn
        :to="{ path: '/packing' }"
        color="#E6E9ED"
        style="margin: 10px; color: #768F9C"
        class="cancel"
        link
        >Cancel</v-btn
      >
      <v-btn style="margin: 10px;" class="save" @click="save">Save</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        warehouse: '',
        warehouseList: '',
        area: '',
        areaList: '',
      }
    },
    created() {
      this.renderData()
    },
    methods: {
      renderData() {
        this.$http.get('/v1/city').then((response) => {
          this.area = []
          let array = response.data.data
          for (let i = 0; i < array.length; i++) {
            this.area.push({
              name: array[i].city_name,
              value: array[i].id,
            })
          }
        })
        this.$http.get('/v1/warehouse').then((response) => {
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
      save() {
        this.$http.post('/v1/packing', {
          warehouse_id: this.warehouseList,
        })
      },
    },
  }
</script>

<style scoped>
  .regist {
    padding-left: 80px;
    padding-right: 50px;
  }
  .form-right {
    margin-top: 50px;
    padding-right: 90px;
  }
  .name {
    border-radius: 15px;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    margin-top: 50px;
    background: #4662d4;
    color: white;
    box-sizing: content-box;
    border-radius: 25px;
    width: 111px;
    height: 45px;
  }
  .btn {
    margin-top: 30px;
    padding-left: 1100px;
  }
</style>
