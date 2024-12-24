<template>
  <div class="privacy-settings">
    <h1>Privacy Settings</h1>
    <label>
      <input type="checkbox" v-model="isPrivate" />
      Keep my data private
    </label>
    <button @click="updatePrivacySettings">Save Settings</button>
    <div v-if="message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPrivate: false,
      message: '',
    };
  },
  methods: {
    async updatePrivacySettings() {
      const response = await fetch('/api/privacy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPrivate: this.isPrivate }),
      });
      const data = await response.json();
      this.message = data.message;
    },
  },
};
</script>

<style scoped>
.privacy-settings {
  padding: 20px;
}
</style>
