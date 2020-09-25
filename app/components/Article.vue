<template>
  <Page @loaded="onLoaded">
    <ScrollView>
      <StackLayout>
        <CardView>
          <StackLayout>
            <Label
              fontSize="15"
              fontWeight="bold"
              :text="item.title"
              textWrap="true"
            />
            <Label fontSize="15" :text="item.snippet" textWrap="true" />
            <Label
              fontSize="15"
              :text="processedText.map((x) => '*' + x.maxEl).join(' ')"
              textWrap="true"
            />
          </StackLayout>
        </CardView>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
// const translate = require("@vitalets/google-translate-api");
const httpModule = require("tns-core-modules/http");

export default {
  props: ["item"],
  data() {
    return {};
  },
  computed: {
    processedText() {
      return this.text(
        this.item.snippet
          .replace(/[^a-zA-Z ]/g, "")
          .split(/\W+/)
          .filter((x) => x)
      );
    },
  },
  methods: {
    mode(array) {
      if (array.length == 0) return null;
      var modeMap = {};
      var maxEl = array[0],
        maxCount = 1;
      for (var i = 0; i < array.length; i++) {
        var el = array[i];
        if (modeMap[el] == null) modeMap[el] = 1;
        else modeMap[el]++;
        if (modeMap[el] > maxCount) {
          maxEl = el;
          maxCount = modeMap[el];
        }
      }
      return { maxEl, maxCount };
    },
    rec(arr) {
      let tempArr = arr;
      let freq = [];
      while (freq.length < 5) {
        freq.push(this.mode(tempArr));
        tempArr = tempArr.filter((x) => x != this.mode(tempArr).maxEl);
      }
      return freq;
    },
    text(arr) {
      let tempArr = [];
      tempArr = arr.filter(
        (x) =>
          x != "am" &&
          x != "is" &&
          x != "are" &&
          x != "for" &&
          x != "at" &&
          x != "the" &&
          x != "of" &&
          x != "can" &&
          x != "was" &&
          x != "in" &&
          x != "on" &&
          x != "and" &&
          x != "a" &&
          x != "to" &&
          x != "by" &&
          x != "as" &&
          x != "with" &&
          x != "my" &&
          x != "my" &&
          x != "your" &&
          x != "his" &&
          x != "her" &&
          x != "their" &&
          x != "I" &&
          x != "you" &&
          x != "he" &&
          x != "she" &&
          x != "it" &&
          x != "they"
      );
      console.log({ hhhhhhhhhhhh: this.rec(tempArr) });
      return this.rec(tempArr);
    },
    onLoaded() {
      this.text(
        this.item.snippet
          .replace(/[^a-zA-Z ]/g, "")
          .split(/\W+/)
          .filter((x) => x)
      );
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@nativescript/theme/scss/variables/blue";
</style>
