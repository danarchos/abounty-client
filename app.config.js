import "dotenv/config";

const stage = process.env.STAGE || "dev";

const configs = {
  prod: {
    expo: {
      name: "supa-ln",
      slug: "supa-ln",
      version: "0.0.1",
      orientation: "portrait",
      icon: "./assets/image/icon.png",
      splash: {
        image: "./assets/image/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
      updates: {
        fallbackToCacheTimeout: 0,
      },
      assetBundlePatterns: ["**/*"],
      ios: {
        supportsTablet: true,
      },
      web: {
        favicon: "./assets/images/favicon.png",
      },
      extra: {
        test: process.env.TEST,
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseKey: process.env.SUPABASE_KEY,
        stage,
        apiBaseUrl: "http://localhost:4000",
      },
    },
  },
  dev: {
    expo: {
      name: "supa-ln",
      slug: "supa-ln",
      version: "0.0.1",
      orientation: "portrait",
      icon: "./assets/image/icon.png",
      splash: {
        image: "./assets/image/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
      updates: {
        fallbackToCacheTimeout: 0,
      },
      assetBundlePatterns: ["**/*"],
      ios: {
        supportsTablet: true,
      },
      web: {
        favicon: "./assets/images/favicon.png",
      },
      extra: {
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseKey: process.env.SUPABASE_KEY,
        stage,
        apiBaseUrl: "http://localhost:4000",
      },
    },
  },
};

export default configs[stage];
