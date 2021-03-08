<template>
  <div>
    <!-- {{ tableData }} -->
    <v-card>
      <v-data-table
        :mobile-breakpoint="0"
        :headers="table"
        :items="tableData"
        :items-per-page="10"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              <div>
                List Packing Item
              </div>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="md-gutter"
                  v-bind="attrs"
                  v-on="on"
                  style="margin: 10px"
                >
                  Input Packing </v-btn
                ><v-btn
                  color="primary"
                  dark
                  class="md-gutter"
                  v-bind="attrs"
                  v-on="on"
                  style="margin: 10px"
                >
                  Create Packing
                </v-btn>
                <v-btn
                  color="primary"
                  dark
                  class="md-gutter"
                  v-bind="attrs"
                  v-on="on"
                  style="margin: 10px"
                >
                  Packing Item
                </v-btn>
              </template>

              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row @keyup.enter="save">
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.phone_no"
                          label="Phone No"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.address"
                          label="Address"
                        ></v-text-field>
                      </v-col>
                      <!-- <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.type"
                          label="Type"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.warehouse_name"
                          label="Warehouse"
                        ></v-text-field>
                      </v-col> -->
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.status"
                          label="Status"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-col class="d-flex" cols="3" sm="10">
            <v-select style="margin: 10px" label="Area"></v-select>

            <v-select style="margin: 10px" label="Warehouse"></v-select>
            <v-select
              style="margin: 10px"
              :items="tableData"
              item-value="delivery_date"
              item-text="delivery_date"
              label="Delivery Date"
              v-model="search"
            >
            </v-select>

            <v-text-field
              style="margin: 10px"
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </template>
        <template v-slot:item="props">
          <tr>
            <td>{{ props.item.document_code }}</td>
            <td>{{ props.item.delivery_date }}</td>

            <!-- <td>{{ props.item.address }}</td> -->
            <!-- <td>{{ props.item.warehouse.warehouse_name }}</td> -->
            <td>
              <div v-if="props.item.status == 1">{{ 'Done' }}</div>
              <div v-else>{{ 'New' }}</div>
            </td>

            <td>
              <v-menu offset-y>
                <template v-slot:activator="{ on: menu }">
                  <v-btn small class="mr-2" icon v-on="{ ...menu }"
                    ><v-icon dark>mdi-dots-vertical</v-icon></v-btn
                  >
                </template>
                <v-list>
                  <v-list-item style="width: 150px">
                    <v-dialog max-width="500px">
                      <template
                        slot:item.actions="{ item }"
                        v-slot:activator="{ on, attrs }"
                      >
                        <v-list-item-title
                          v-bind="attrs"
                          v-on="on"
                          @click="editItem(props.item)"
                          >Edit</v-list-item-title
                        >
                      </template>
                    </v-dialog>
                  </v-list-item>
                  <v-divider
                    style="margin-left: 10px;margin-right: 10px"
                  ></v-divider>
                  <v-list-item>
                    <v-list-item-title>
                      Active
                    </v-list-item-title>
                  </v-list-item>
                  <router-view></router-view>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        search: '',
        edit: '',
        interval: null,
        table: [
          {
            text: 'Packing Code',
            value: 'document_code',
          },
          {
            text: 'Delivery Date',
            value: 'delivery_date',
          },
          {
            text: 'Status',
            value: 'status',
          },
          //   {
          //     text: 'Address',
          //     value: 'address',
          //   },

          // {
          //   text: 'Warehouse',
          //   value: 'warehouse.warehouse_name',
          // },

          {
            text: 'Actions',
            value: 'actions',
            sortable: false,
          },
        ],
        editData: [
          {
            text: 'Edit',
            value: 'edit',
          },
          {
            text: 'Inactive',
          },
        ],
        tableData: [],
        editedIndex: -1,
        editedItem: {
          name: '',
          phone_no: '',
          address: '',
          type: '',
          warehouse: '',
          status: '',
        },
        defaultItem: {
          name: '',
          phone_no: '',
          address: '',
          type: '',
          warehouse: '',
          status: '',
        },
        listPrimitive: null,
      }
    },

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    watch: {
      dialog(val) {
        val || this.close()
      },
      dialogDelete(val) {
        val || this.closeDelete()
      },
    },

    methods: {
      initialize() {
        this.tableData = [this.tableData]
      },
      renderData() {
        const token = localStorage.getItem('token')
        axios
          .get('v1/packing', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // let that = this;

            this.tableData = response.data.data
            if (this.tableData === null) {
              this.tableData = []
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      editItem(item) {
        this.editedIndex = this.tableData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        this.editedIndex = this.tableData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm() {
        this.tableData.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete() {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save() {
        const token = localStorage.getItem('token')
        axios
          .post('v1/helper', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            name: this.editedItem.name,
            phone_no: this.editedItem.phone_number,
            address: this.editItem.address,
            status: this.editItem.status,
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
        this.close()
      },
    },

    created() {
      this.renderData()
      this.initialize()
      // this.interval = setInterval(this.refreshData, 5000);
    },
    beforeDestroy() {
      clearInterval(this.interval)
    },
  }
</script>
