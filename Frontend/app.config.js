export default {
  expo: {
    name: 'Job Align',
    slug: 'job-align',
    version: '1.0.0',
    orientation: 'portrait',
    userInterfaceStyle: 'light',

    icon: './assets/icon.png',

    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },

    assetBundlePatterns: ['**/*'],

    ios: {
      supportsTablet: true,
    },

    android: {
      package: 'com.jobalign.app',
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      permissions: [
        'android.permission.INTERNET',
        'android.permission.ACCESS_NETWORK_STATE',
      ],
    },

    web: {
      favicon: './assets/favicon.png',
    },

    extra: {
      API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
      eas: {
        projectId: 'e74c191f-fc89-4068-9c82-1a2f51fe9153',
      },
    },
  },
};
