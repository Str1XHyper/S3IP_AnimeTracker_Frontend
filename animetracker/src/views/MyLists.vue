<template>
  <div>
    <v-tabs v-model="tab" background-color="transparent" color="accent" grow>
      <v-tab> Planned to watch </v-tab>
      <v-tab> Currently watching </v-tab>
      <v-tab> Finished </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <PlannedList /> 
      </v-tab-item>
      <v-tab-item>
        <WatchingList />
      </v-tab-item>
      <v-tab-item> </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import PlannedList from "../components/Lists/PlannedList";
import WatchingList from "../components/Lists/WatchingList";
export default {
  components: {
    PlannedList,
    WatchingList,
  },
  data() {
    return {
      tab: null,
    };
  },
};
</script>

<style>
</style>