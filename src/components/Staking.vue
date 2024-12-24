<template>
  <div class="staking">
    <h1>Staking Interface</h1>
    <input v-model="amount" type="number" placeholder="Amount to Stake" />
    <button @click="stakeTokens">Stake Tokens</button>
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
    async stakeTokens() {
      const response = await fetch('/api/stake', {
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
.staking {
  padding: 20px;
}
</style>
