<template lang="html">
  <div class="sidebar">
    <v-list>
        <v-list-tile @click="" v-for="item,i in items" :key="i">
            <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
            <v-list-tile-title>
                <router-link :to="{ name:item.route }">
                    {{ item.text }}
                </router-link>
            </v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</div>
</template>

<script>
import List from '@/components/List';
export default {
  name: 'sidebar',
  props: ['items'],
  components: {
    List
  }
}
</script>

<style lang="stylus">
.sidebar 
    .v-list__tile__title a 
        color: #4a4a4a;

@media print {
    .nodisplay {
        display: none;
    }

}

</style>
