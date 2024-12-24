<template>
  <div class="dashboard">
    <h1>User Dashboard</h1>
    <div class="stats">
      <div class="stat">
        <h2>Total Assets</h2>
        <p>{{ totalAssets }}</p>
      </div>
      <div class="stat">
        <h2>Total Transactions</h2>
        <p>{{ totalTransactions }}</p>
      </div>
      <div class="stat">
        <h2>Staked Amount</h2>
        <p>{{ stakedAmount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalAssets: 0,
      totalTransactions: 0,
      stakedAmount: 0,
    };
  },
  mounted() {
    this.fetchDashboardData();
  },
  methods: {
    async fetchDashboardData() {
      // Fetch data from the API
      const response = await fetch('/api/dashboard');
      const data = await response.json();
      this.totalAssets = data.totalAssets;
      this.totalTransactions = data.totalTransactions;
      this.stakedAmount = data.stakedAmount;
    },
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
.stats {
  display: flex;
  justify-content: space-around;
}
.stat {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
}
</style>
