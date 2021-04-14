<template>
  <div>
    <v-tabs v-model="tab" background-color="transparent" color="accent" grow>
      <v-tab> Planned to watch </v-tab>
      <v-tab> Currently watching </v-tab>
      <v-tab> Finished </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <PlannedList :key="rerender"/> 
      </v-tab-item>
      <v-tab-item>
        <WatchingList :key="rerender"/>
      </v-tab-item>
      <v-tab-item> 
        <CompletedList :key="rerender"/>
      </v-tab-item>
    </v-tabs-items>
    <v-btn @click="forceUpdate">reload</v-btn>
  </div>
</template>

<script>
import PlannedList from "../components/Lists/PlannedList";
import WatchingList from "../components/Lists/WatchingList";
import CompletedList from "../components/Lists/CompletedList";
export default {
  components: {
    PlannedList,
    WatchingList,
    CompletedList
  },
  data() {
    return {
      tab: null,
      rerender: 0,
    };
  },
  methods:{
    forceUpdate(){
      this.rerender += 1;  
    }
  }
};
</script>

<style>
</style>