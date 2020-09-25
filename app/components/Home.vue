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
          padding="20"
          elevation="2"
          radius="20"
          @tap="gotoArticle(item)"
          height="150"
          ripple="true"
        >
          <!-- <StackLayout orientation="horizontal"> -->
          <GridLayout rows="*" columns="*">
            <!-- <Image width="auto" :src="item['media:thumbnail'][0]['$'].url" stretch="aspectFill" /> -->
            <StackLayout>
              <Label
                fontSize="15"
                fontWeight="bold"
                paddingLeft="5"
                :text="item.title"
                textWrap="true"
              ></Label>
              <ScrollView>
                <Label
                  fontSize="15"
                  paddingLeft="5"
                  :text="item.snippet"
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

      url: "",
    };
  },
  computed: {
    items() {
      return this.$store.state.articles;
    },
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
      fetch(
        "https://api-beta.civicfeed.com/news/search?q=science&page=1&results=5",
        { headers: { "X-API-KEY": "UKzdNJIqjF6Vov4YRj5qB8eLEWj4odyH8Q5EoArS" } }
      )
        .then((response) => response.json())
        .then((res) => {
          // console.log({ articles: JSON.parse(res).articles });
          this.$store.state.articles = res.articles;
          console.log(this.$store.state.articles);
          this.isLoaded = true;
          return;
          this.url =
            result.rss.channel[0].item[0]["media:thumbnail"][0]["$"].url;
          this.items = result.rss.channel[0].item;
          this.items = this.items.slice(Math.max(this.items.length - 5, 0));

          // });
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
