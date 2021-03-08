<template>
  <div class="regist">
    <h1>UPDATE HELPER</h1>
    <v-row no-gutters>
      <v-col md="6">
        <div class="form-right">
          <p>Helper ID*</p>
          <v-text-field disabled class="name" v-model="editedItem.code" solo>
          </v-text-field>
          <p>Phone Number*</p>
          <v-text-field
            class="name"
            label="Phone Number"
            v-model="editedItem.phone_no"
            solo
          >
          </v-text-field>
          <p>Warehouse*</p>
          <v-select
            class="name"
            label="Warehouse"
            v-model="editedItem.warehouse"
            solo
          >
          </v-select>
        </div>
      </v-col>
      <v-col md="6">
        <div class="form-right">
          <p>Name*</p>
          <v-text-field
            disabled
            class="name"
            label="Name"
            v-model="editedItem.name"
            solo
          >
          </v-text-field>
          <p>Type*</p>
          <v-select class="name" label="Type" v-model="editedItem.type" solo>
          </v-select>
          <p>Address*</p>
          <v-textarea
            class="name"
            label="Address"
            v-model="editedItem.address"
            solo
          >
          </v-textarea>
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
    <div class="btn" v-for="(item, i) in items" :key="i">
      <v-btn
        :to="item.path"
        color="#E6E9ED"
        style="margin: 10px; color: #768F9C"
        class="cancel"
        >Cancel</v-btn
      >
      <v-btn style="margin: 10px;" class="save" @click="save">Save</v-btn>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        edit: '',
        items: [
          {
            name: 'Help',
            path: '/helper',
          },
        ],
        editedIndex: -1,
        editedItem: {
          code: '',
          phone_no: '',
          warehouse_name: '',
          name: '',
          type: '',
          address: '',
        },
        defaultItem: {
          code: '',
          phone_no: '',
          warehouse_name: '',
          name: '',
          type: '',
          address: '',
        },
      }
    },
    created() {
      this.renderData()
    },
    methods: {
      renderData() {
        axios.get('/v1/helper/' + this.$route.params.id).then((response) => {
          this.editedItem.code = response.data.code
          this.editedItem.phone_no = response.data.phone_no
          this.editedItem.warehouse_name = response.data.warehouse_name
          this.editedItem.name = response.data.name
          this.editedItem.type = response.data.data.type
          this.editedItem.address = response.data.data.address
          this.update = true
          console.log(response.data.code)
        })
      },

      save() {
        const token = localStorage.getItem('token')

        axios
          .put('v1/helper', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            code: this.editedItem.code,
            phone_no: this.editedItem.phone_no,
            warehouse_name: this.editedItem.warehouse_name,
            name: this.editedItem.name,
            type: this.editedItem.type,
            address: this.editItem.address,
          })

          .then(function(response) {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error)
          })

        // if (this.editedIndex > -1) {
        //   Object.assign(this.tableData[this.editedIndex], this.editedItem);
        // } else {
        //   this.tableData.push(this.editedItem);
        // }
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
