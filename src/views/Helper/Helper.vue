<template>
  <div class="helper">
    <h2>HELPER LIST</h2>
    <v-container>
      <v-row no-gutters>
        <v-col md="6">
          <div v-for="(item, itm) in items" :key="itm">
            <v-btn :to="item.path">Registration Helper</v-btn>
          </div>
        </v-col>
        <v-col md="6" offset="6">
          <div class="search">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              rounded
              label="Search...."
              solo
              hide-details
              append-outer-icon="mdi-format-align-justify"
            >
            </v-text-field>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <p style="font-size: 20px">Filter</p>
    <v-col md="12">
      <v-divider style="margin-right: 40px"></v-divider>
    </v-col>
    <v-row>
      <v-col cols="2">
        <v-select
          style="border-radius: 15px"
          outlined
          label="Status"
          solo
          item-text="status"
          v-model="search"
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-select
          style="border-radius: 15px"
          outlined
          label="Warehouse"
          solo
          item-text="warehouse"
          v-model="search"
        ></v-select>
      </v-col>
    </v-row>
    <br />
    <div>
      <v-card>
        <v-data-table
          :mobile-breakpoint="0"
          :headers="table"
          :items="dataTable"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          class="elevation-1"
          :search="search"
          hide-default-footer
          @page-count="pageCount = $event"
        >
          <template v-slot:item="props">
            <tr>
              <td>{{ props.item.code }}</td>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.phone_no }}</td>
              <td>{{ props.item.address }}</td>
              <td>
                <div v-if="props.item.type == 1">{{ 'Help Picker' }}</div>
                <div v-else>{{ 'Helper' }}</div>
              </td>
              <td>{{ props.item.warehouse.warehouse_name }}</td>
              <td>
                <div v-if="props.item.status == 1">{{ 'Active' }}</div>
                <div v-else>{{ 'Inactive' }}</div>
              </td>
              <td>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon>
                      <v-icon dark>
                        mdi-dots-horizontal
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <template>
                      <v-list-item
                        :to="{
                          path: `/helper/update-helper/${props.item.id}`,
                        }"
                        link
                        style="width: 150px"
                      >
                        <div>
                          <v-list-item-title
                            :to="{ path: '/helper/update-helper' }"
                            link
                            >Update</v-list-item-title
                          >
                        </div>
                      </v-list-item>
                    </template>
                    <v-divider
                      style="margin-left: 10px;margin-right: 10px"
                    ></v-divider>
                    <v-list-item link>
                      <v-list-item-title>
                        Active
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <div>
      <v-pagination
        style="margin-right: 1300px'; margin-top: 20px"
        v-model="page"
        :length="pageCount"
        prev-icon="mdi-chevron-left"
        next-icon="mdi-chevron-right"
        color="#4662d4"
      ></v-pagination>
      <br />
      <br />
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        page: 1,
        pageCount: 0,
        itemsPerPage: 5,
        search: '',
        items: [
          {
            name: 'Registration Helper',
            path: '/helper/registration-helper',
            component: () => import('../Helper/RegistrationHelper'),
          },
        ],
        table: [
          {
            text: 'Helper ID',
            value: 'code',
            align: 'left',
            class: ' black--text title',
          },
          {
            text: 'Name',
            value: 'name',
            align: 'left',
            class: '  black--text title',
          },
          {
            text: 'Phone No',
            value: 'phone_no',
            class: 'black--text title',
          },
          {
            text: 'Address',
            value: 'address',
            class: 'black--text title',
          },

          {
            text: 'Type',
            value: 'type',
            class: 'black--text title',
          },
          {
            text: 'Warehouse',
            value: 'warehouse.warehouse_name',
            class: 'black--text title',
          },
          {
            text: 'Status',
            value: 'status',
            class: 'black--text title',
          },
          {
            value: 'actions',
            sortable: false,
          },
        ],
        dataTable: [],
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
      this.initialize()
    },
    methods: {
      initialize() {
        this.dataTable = [this.dataTable]
      },
      renderData() {
        const token = localStorage.getItem('token')
        axios
          .get('v1/helper', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // let that = this;

            this.dataTable = response.data.data
            if (this.dataTable === null) {
              this.dataTable = []
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
    },
  }
</script>

<style scoped>
  .helper {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding-left: 80px;
    padding-right: 50px;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    position: absolute;
    width: 178px;
    height: 50px;
    background: #4662d4;
    color: white;
    border-radius: 25px;
    box-sizing: content-box;
    margin-top: 50px;
    text-transform: capitalize;
    cursor: pointer;
  }
  .search {
    padding-left: 100px;
    padding-right: 50px;

    margin-top: 50px;
  }
  thead {
    border-radius: 60px;
  }
  /* .mytable .v-table tbody tr:not(:last-child) {
    border-bottom: none;
    background: brown;
  } */
  .v-data-table-header thead {
    background: red;
  }
</style>
