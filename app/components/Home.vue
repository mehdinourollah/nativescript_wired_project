<template>
  <Page @loaded="onLoaded">
    <GridLayout>
      <Label class="info">
        <FormattedString>
          <Span class="fas" text.decode="&#xf135; " />
          <Span :text="message" />
        </FormattedString>
      </Label>
    </GridLayout>
    <ScrollView>
      <StackLayout v-if="isLoaded">
        <CardView
          v-for="(item, index) of items"
          :key="index"
          margin="10"
          padding="10"
          elevation="2"
          radius="20"
          @tap="gotoArticle(item)"
          height="150"
        >
          <!-- <StackLayout orientation="horizontal"> -->
          <GridLayout rows="*" columns="*">
            <!-- <Image width="auto" :src="item['media:thumbnail'][0]['$'].url" stretch="aspectFill" /> -->
            <StackLayout>
              <Label
                fontSize="15"
                fontWeight="bold"
                size="10"
                :text="item.title"
                textWrap="true"
              ></Label>
              <ScrollView>
                <Label
                  fontSize="15"
                  size="10"
                  :text="item.description"
                  textWrap="true"
                  verticalAlignment="bottom"
                ></Label>
              </ScrollView>
            </StackLayout>
          </GridLayout>
          <!-- </StackLayout> -->
        </CardView>
        <!-- <button @click="getArticles">Hey</button> -->
      </StackLayout>
      <ActivityIndicator v-else :busy="!isLoaded" />
    </ScrollView>
  </Page>
</template>

<script>
import Article from "./Article";
var parseString = require("nativescript-xml2js").parseString;

export default {
  data() {
    return {
      isLoaded: false,
      items: [],
      url: "",
    };
  },
  computed: {
    message() {
      return "Blank {N}-Vue app";
    },
  },
  methods: {
    gotoArticle(item) {
      console.log("Articleeeeeeeee");
      this.$navigateTo(Article, {
        props: {
          item: item,
        },
      });
    },
    onLoaded() {
      this.getArticles();
    },
    getArticles() {
      console.log("OK");
      fetch("https://www.wired.com/feed/")
        .then((response) => response.text())
        .then((xml) => {
          parseString(xml, (err, result) => {
            // console.dir(result);

            this.url =
              result.rss.channel[0].item[0]["media:thumbnail"][0]["$"].url;
            this.items = result.rss.channel[0].item;
            this.items = this.items.slice(Math.max(this.items.length - 5, 0));
            this.isLoaded = true;
          });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@nativescript/theme/scss/variables/blue";

* {
  color: black;
}
</style>
