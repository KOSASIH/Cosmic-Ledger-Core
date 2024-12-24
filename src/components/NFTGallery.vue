<template>
  <div class="nft-gallery">
    <h1>Your NFTs</h1>
    <div class="nft-list">
      <div class="nft-item" v-for="nft in nfts" :key="nft.tokenId">
        <img :src="nft.imageUrl" alt="NFT Image" />
        <h2>{{ nft.name }}</h2>
        <p>{{ nft.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nfts: [],
    };
  },
  mounted() {
    this.fetchNFTs();
  },
  methods: {
    async fetchNFTs() {
      const response = await fetch('/api/nfts');
      this.nfts = await response.json();
    },
  },
};
</script>

<style scoped>
.nft-gallery {
  padding: 20px;
}
.nft-list {
  display: flex;
  flex-wrap: wrap;
}
.nft-item {
  margin: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}
</style>
