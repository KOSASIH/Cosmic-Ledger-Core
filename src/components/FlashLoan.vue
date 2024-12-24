<template>
  <div class="flash-loan">
    <h1>Flash Loan Interface</h1>
    <input v-model="amount" type="number" placeholder="Loan Amount" />
    <button @click="takeLoan">Take Flash Loan</button>
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
    async takeLoan() {
      const response = await fetch('/api/flashloan', {
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
.flash-loan {
  padding: 20px;
}
</style>
