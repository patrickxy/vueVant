<template>
  <div class="home">
    <h4>按钮</h4>
    <van-button type="primary" @click="showLoading">主要按钮</van-button>
    <h4>cell group</h4>
    <van-cell-group title="分组1" @click="showPopup">
      <van-cell title="单元格" value="内容" />
    </van-cell-group>
    <van-cell-group title="分组2">
      <van-cell title="单元格" value="内容" />
    </van-cell-group>
    <van-popup v-model="show" position="bottom">内容</van-popup>
    <h4>images</h4>
    <van-image width="4rem" height="4rem" src="https://img.yzcdn.cn/vant/cat.jpeg" round />
    <div class="van-ellipsis">
      这是一段最多显示一行的文字，多余的内容会被省略
    </div>

    <div class="van-multi-ellipsis--l2" style="font-size:14px;">
      这是一段最多显示两行的文字，多余的内容会被省略asfasdfasdf多余的内容会被省略asfasdfasdf
    </div>
    <h4>swiper</h4>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" :src="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      show: false,
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ]
    };
  },
  components: {},
  mounted() {
    this.$axios.get("mock");
    this.$axios.get("asdf");
  },
  methods: {
    showLoading() {
      this.$toast({
        message: "自定义图标",
        icon: "like-o"
      });
      this.$router.push("/about");
    },
    showPopup() {
      this.show = true;
    }
  }
};
</script>
