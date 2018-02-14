<template>
  <div>
    <div class="c-card--minicard__raw">{{trakker}}</div>
    <div class="c-card c-card--minicard o-flex">
      <div class="c-card--minicard__content">
        {{trakker.comment}}
        {{trakker.category}}
        {{trakker.timestamp}}
      </div>
      <div v-if="trakker.amount" class="c-car--minicard__amount">
        {{trakker.amount}}
      </div>
      <div class="c-card--minicard__cta">
        more
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'minicard',
  props: ['trakkerData'],
  data () {
    return {
      trakker: this.trakkerData
    };
  },
  computed: {

  },
  mounted () {

  },
  methods: {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
