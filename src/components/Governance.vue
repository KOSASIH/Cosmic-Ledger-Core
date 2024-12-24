<template>
  <div class="governance">
    <h1>Governance Voting</h1>
    <div v-for="proposal in proposals" :key="proposal.id">
      <h2>{{ proposal.description }}</h2>
      <button @click="vote(proposal.id)">Vote</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      proposals: [],
    };
  },
  mounted() {
    this.fetchProposals();
  },
  methods: {
    async fetchProposals() {
      const response = await fetch('/api/governance/proposals');
      this.proposals = await response.json();
    },
    async vote(proposalId) {
      const response = await fetch(`/api/governance/vote/${proposalId}`, {
        method: 'POST',
      });
      const data = await response.json();
      alert(data.message);
      this.fetchProposals(); // Refresh proposals after voting
    },
  },
};
</script>

<style scoped>
.governance {
  padding: 20px;
}
</style>
