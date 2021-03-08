<template>
  <div class="regist">
    <h1>REGISTRATION HELPER</h1>
    <v-row no-gutters>
      <v-col md="6">
        <div class="form-right">
          <p>Name*</p>
          <v-text-field class="name" label="Name *" solo> </v-text-field>
          <p>Type*</p>
          <v-select class="name" label="Type *" solo> </v-select>
          <p>Address*</p>
          <v-textarea class="name" label="Address *" solo> </v-textarea>
        </div>
      </v-col>
      <v-col md="6">
        <div class="form-right">
          <p>Phone Number*</p>
          <v-text-field class="name" label="Phone Number *" solo>
          </v-text-field>
          <p>Warehouse*</p>
          <v-select class="name" label="Warehouse *" solo> </v-select>
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
      <v-btn style="margin: 10px;" class="save">Save</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            name: 'Help',
            path: '/helper',
          },
        ],
      }
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
