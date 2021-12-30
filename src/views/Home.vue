<template>
  <div class="home" :style="headerBgHeight">
    <div class="container-xl" style="height: 150px">
      <h1 class="ms-3 pt-3 text-white">北部美食餐廳</h1>
      <p class="selectTtile">分醫中心尾牙餐廳</p>
    </div>
    <div class="container-lg" style="margin-top: 8%">
      <div class="row">
        <div
          class="col-lg-4 col-md-6 col-12"
          :key="index"
          v-for="(item, index) in json"
        >
          <div class="card mt-2">
            <img
              :src="item.img[0]"
              data-bs-toggle="modal"
              data-bs-target="#cardModal"
              class="card-img-top cardSiteImg"
              @click="
                restaurantDetail(item);
                displayModal = true;
              "
            />
            <div class="card-body row">
              <h5 class="card-title col-12 titleStyle">{{ item.name }}</h5>
              <p class="card-text col-md-6 col-12 mt-2 titleP">
                時間: {{ item.time }}
              </p>
              <p class="card-text col-md-6 col-12 mt-2 titleP">
                價位: ${{ item.price }}元
              </p>
              <p class="card-text col-12 mt-2 titleP">地點: {{ item.site }}</p>
              <p class="card-text col-12 mt-2 titleP">備註: {{ item.ps }}</p>
              <p
                class="card-text col-12 mt-2 titleP d-flex justify-content-end"
              >
                <a
                  :href="item.webSite"
                  class="btn btn-sm btn-outline-success"
                  target="_blank"
                  >前往網站</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div
      class="modal fade"
      id="cardModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      role="dialog"
      ref="displayModal"
    >
      <div class="modal-dialog">
        <div class="modal-content text-black" style="padding: 16px">
          <div style="height: 60vh">
            <img
              style="
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center center;
              "
              :src="displayModalDataPicture"
            />
          </div>
          <div class="d-flex justify-content-between mt-1">
            <a
              :href="displayModalData.webSite"
              class="ms-1 btn btn-outline-success btn-sm"
              target="_blank"
              >網站</a
            >
            <div class="btn-group me-2" role="group" aria-label="First group">
              <button
                v-for="(num, key) in displayModalData.picture.length"
                :key="key"
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="restaurantModelPictureFn(num - 1)"
                :class="{ active: key === modalImgCurrent }"
              >
                {{ num }}
              </button>
            </div>
          </div>
          <p class="text-start titleStyle mt-2">
            {{ displayModalData.Name }}
          </p>

          <div class="row text-start titleP">
            <p class="col-md-6 col-12 titleP mt-2">
              時間: {{ displayModalData.time }}
            </p>
            <p class="col-md-6 col-12 mt-2">
              <span class="">價錢: ${{ displayModalData.price }}元</span>
            </p>
            <p class="col-md-6 col-12 mt-2">
              <span class="">地點: {{ displayModalData.site }}</span>
            </p>
            <p class="col-md-6 col-12 mt-2">
              <span class="">備註: {{ displayModalData.ps }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <footer>
      <div>
        <div class="mt-3 footerStyle row align-items-center">
          尾牙餐廳測試網站 © Code:KFC
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import restaurantJSON from "./restaurant.json";
import Modal from "bootstrap/js/src/modal.js";
export default {
  name: "Home",
  components: {
    restaurantJSON,
  },
  data() {
    return {
      json: restaurantJSON,
      headerBgHeight: {
        width: "100%",
        maxHeight: "600px",
        backgroundImage: `url(${require("@/assets/taipei.png")})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
      },
      displayModal: "",
      displayModalData: {
        Name: "",
        time: "",
        price: "",
        site: "",
        ps: "",
        webSite: "",
        picture: [],
      },
      displayModalDataPicture: "",
      modalImgCurrent: "",
    };
  },
  methods: {
    restaurantDetail(info) {
      console.log("222");
      this.displayModal = true;
      if (this.displayModalData.picture.length > 0) {
        this.displayModalData.picture = [];
      }
      this.displayModalData.Name = info.name;
      this.displayModalData.time = info.time;
      this.displayModalData.price = info.price;
      this.displayModalData.site = info.site;
      this.displayModalData.ps = info.ps;
      this.displayModalData.webSite = info.webSite;
      for (let i = 0; info.img.length > i; i++) {
        this.displayModalData.picture.push(info.img[i]);
      }
      console.log(this.displayModalData);
      this.restaurantModelPictureFn();
    },
    restaurantModelPictureFn(num = 0) {
      this.modalImgCurrent = num;
      this.displayModalDataPicture = this.displayModalData.picture[num];
    },
  },
  mounted() {
    // console.log(this.json)
    this.displayModal = new Modal(this.$refs.displayModal);
  },
};
</script>
<style lang="scss">
.titleStyle {
  font-size: 20px;
  font-weight: 600;
}
.selectTtile {
  margin-left: 8%;
  padding-top: 80px;
  font-size: 40px;
  font-weight: 700;
}
.titleP {
  color: #a5a5a5;
  font-size: 16px;
}
@media (min-width: 1400px) {
  .titleP {
    font-size: 20px;
  }
}

.footerStyle {
  width: 100%;
  background-color: #e5e5e5;
  height: 65px;
  font-size: 12px;
  color: #acacac;
  display: flex;
  justify-content: center;
}
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
//   .cardSiteImgBox {
//   height: 137px;
//   width: 182px;
//   background-color: #fff;
//   width: 100%;
//   overflow: hidden;
// }

.cardSiteImg {
  width: 100%;
  height: 220px;
  object-fit: cover;
  object-position: center center;
}
</style>
