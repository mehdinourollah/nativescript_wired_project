<template>
  <Page @loaded="onLoaded">
    <!-- <Label v-if="!isBusy" :text="content" textWrap="true" /> -->
    <!-- <WebView :src="item.link[0]" /> -->

    <!-- <Label v-if="!isBusy" :text="html" textWrap="true" /> -->

    <WebView v-if="!isBusy" :src="html" />
    <!-- <ActivityIndicator v-else width="100" height="100" :busy="isBusy" /> -->

    <!-- <WebView :src="item.link[0]" /> -->
  </Page>
</template>

<script>
var parseString = require("nativescript-xml2js").parseString;
var himalaya = require("himalaya");

export default {
  props: ["item"],
  data() {
    return {
      json: "",
      isBusy: true,
      html: "",
    };
  },
  computed: {
    content() {
      return JSON.stringify(this.json);
    },
  },

  methods: {
    onLoaded() {
      console.log("LOADEDDDDDDDDDDD");
      console.log(this.item.link[0]);
      this.getArticleContent();
    },
    getArticleContent() {
      // console.log(this.item.link[0]);

      fetch(this.item.link[0])
        // fetch('https://www.google.com/')
        .then((response) => response.text())
        .then((html) => {
          var json = himalaya.parse(html);
          // this.json = json.body.children[1];
          console.log({ mamad: json });
         
          this.html = himalaya.stringify(this.json);

          this.isBusy = false;

          // console.log({ body: json[1].children[1].children[1] });

          // console.log(json, { colors: true, depth: null });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@nativescript/theme/scss/variables/blue";
</style>
