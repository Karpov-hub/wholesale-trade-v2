module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,

  parserOptions: {
    ecmaVersion: "2022", // Allows for the parsing of modern ECMAScript features
  },

  env: {
    node: true,
    browser: true,
    "vue/setup-compiler-macros": true,
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "plugin:vue/vue3-recommended", // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)
    "prettier",
  ],

  plugins: [
    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-files
    // required to lint *.vue files
    "vue",
  ],

  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["src", "./src"],
          ["app", "."],
          ["components", "./src/components"],
          ["layouts", "./layouts"],
          ["pages", "./src/pages"],
          ["assets", "./src/assets"],
          ["boot", "./src/boot"],
          ["stores", "./src/stores"],
        ],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
      },
    },
  },

  globals: {
    ga: "readonly", // Google Analytics
    cordova: "readonly",
    __statics: "readonly",
    __QUASAR_SSR__: "readonly",
    __QUASAR_SSR_SERVER__: "readonly",
    __QUASAR_SSR_CLIENT__: "readonly",
    __QUASAR_SSR_PWA__: "readonly",
    process: "readonly",
    Capacitor: "readonly",
    chrome: "readonly",
  },

  // add your custom rules here
  rules: {
    "arrow-body-style": ["error", "always"],

    "import/prefer-default-export": "off",

    "global-require": "off",

    "no-plusplus": "off",

    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],

    "prefer-promise-reject-errors": "off",

    // allow debugger during development only
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
};
