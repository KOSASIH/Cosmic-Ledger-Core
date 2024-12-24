<template>
  <div class="defi-aggregator">
    <h1>DeFi Aggregator</h1>
    <input v-model="amount" type="number" placeholder="Amount to Optimize" />
    <button @click="optimizeYield">Optimize Yield</button>
    <div v-if="message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: 0,
      message: '',
    };
  },
  methods: {
    async optimizeYield() {
      const response = await fetch('/api/defi/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: this.amount }),
      });
      const data = await response.json();
      this.message = data.message;
    },
  },
};
</script>

<style scoped>
.defi-aggregator {
  padding: 20px;
}
</style>
