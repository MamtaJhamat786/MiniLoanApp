const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    // Add the feature flags here
    define: {
      '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false),  // Set to true if you need detailed hydration errors
    },
  }
})
