<template>
  <div class="tokenized-assets">
    <h1>Tokenized Assets</h1>
    <div class="asset-list">
      <div class="asset-item" v-for="asset in assets" :key="asset.tokenId">
        <h2>{{ asset.name }}</h2>
        <p>Value: {{ asset.value }}</p>
        <button @click="viewAsset(asset.tokenId)">View Details</button>
      </div>
    </div>
    <input v-model="newAssetName" type="text" placeholder="Asset Name" />
    <input v-model="newAssetValue" type="number" placeholder="Asset Value" />
    <button @click="createAsset">Create Tokenized Asset</button>
    <div v-if="message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      assets: [],
      newAssetName: '',
      newAssetValue: 0,
      message: '',
    };
  },
  mounted() {
    this.fetchAssets();
  },
  methods: {
    async fetchAssets() {
      const response = await fetch('/api/tokenized-assets');
      this.assets = await response.json();
    },
    async createAsset() {
      const response = await fetch('/api/tokenized-assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: this.newAssetName, value: this.newAssetValue }),
      });
      const data = await response.json();
      this.message = data.message;
      this.fetchAssets(); // Refresh the asset list after creating a new asset
    },
    viewAsset(tokenId) {
      // Logic to view asset details (could navigate to a new route or open a modal)
      this.$router.push({ name: 'AssetDetails', params: { tokenId } });
    },
  },
};
</script>

<style scoped>
.tokenized-assets {
  padding: 20px;
}
.asset-list {
  display: flex;
  flex-direction: column;
}
.asset-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
}
</style>
