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
      <div class="row mt-3">
        <div class="d-grid gap-2">
          <button
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#restaurantModal"
            type="button"
          >
            投票去
          </button>
          <!-- <button class="btn btn-primary" type="button">Button</button> -->
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
      style="position: 'relative'"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content text-black" style="padding: 16px">
          <button
            type="button"
            class="btn btn-danger py-0 px-2 dialogBtnPosition"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            X
          </button>
          <div style="height: 60vh">
            <img class="displayImg" :src="displayModalDataPicture" />
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

    <div
      class="modal fade"
      id="restaurantModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      role="dialog"
      ref="displaySelectModal"
      style="position: 'relative'"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content text-black" style="padding: 16px">
          <div class="myChartFather">
            <canvas
              id="myChart"
              style="width: 100%; max-width: 1200px"
            ></canvas>
          </div>
          <p class="text-success">投票人數: {{ personLen }}</p>
          <div class="container mt-2" v-if="finish !== 'finished'">
            <div class="col-12">
              <label for="name" class="col-2 col-form-label" require
                >名字</label
              >
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="yourName"
              />
              <p class="my-1 text-danger text-sm font-sm" v-if="noneName">
                請輸入名字
              </p>
            </div>
            <p class="text-secondary my-2 d-flex justify-content-end">
              <span class="">最多選5個餐廳</span>
            </p>
            <div class="row px-1">
              <div
                class="form-check col-6 mt-2"
                v-for="(name, index) in selectRestaurantName"
                :key="index"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="name"
                  id="flexCheckDefault"
                  v-model="selectRestaurantValue"
                />
                <label class="form-check-label mt-1" for="flexCheckDefault">
                  {{ name }}
                </label>
              </div>
              <p class="my-1 text-danger font-sm" v-if="noneRestaurant">
                {{ noneRestaurantTitle }}
              </p>
              <div class="mt-2 col-6">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  取消
                </button>
              </div>
              <div class="mt-2 col-6 d-flex justify-content-end">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="finishSelectionFn"
                >
                  送出
                </button>
              </div>
            </div>
          </div>
          <div class="container mt-2" v-else>
            <button
              type="button"
              class="btn btn-success btn-sm col-12"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              已投票
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--  -->

    <!--  -->
    <footer>
      <div>
        <div class="mt-3 footerStyle align-items-center">
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
import { db } from "../db";
import Chart from "chart.js";

export default {
  name: "Home",
  data() {
    return {
      json: restaurantJSON,
      selectRestaurantName: [],
      selectRestaurantValue: [],
      yourName: "",
      headerBgHeight: {
        width: "100%",
        maxHeight: "600px",
        backgroundImage: `url(${require("@/assets/taipei.png")})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
      },
      displayModal: "",
      displaySelectModal: "",
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
      mybase: [],
      finish: "",
      noneName: false,
      noneRestaurant: false,
      noneRestaurantTitle: "",
      personLen: "",
      titleX: [],
      dataNum: [],
    };
  },
  firestore() {
    return {
      mybase: db.collection("restaurantVue").orderBy("name"),
    };
  },
  components: {
    restaurantJSON,
  },
  methods: {
    //
    async finishSelectionFn() {
      const vm = this;
      if (this.yourName === "") {
        this.noneName = true;
        return;
      }
      if (this.selectRestaurantValue.length === 0) {
        this.noneRestaurant = true;
        this.noneRestaurantTitle = "最少選擇1個餐廳";
        return;
      }
      if (this.selectRestaurantValue.length > 5) {
        this.noneRestaurantTitle = "最多選擇5個餐廳";
        return;
      }
      this.displaySelectModal = false;
      this.finish = "finished";
      await db
        .collection("restaurantVue")
        .add({
          name: vm.yourName,
          restaurant: vm.selectRestaurantValue,
        })
        .then((querySnapshot) => {
          return new Promise((resolve) => {
            resolve();
            const data = querySnapshot.docs.map((doc) => doc.data());
            vm.mybase = data;
          });
        });
      localStorage.setItem("selectRestaurant", JSON.stringify(this.finish));
      this.$router.go(0);
    },
    async getFirebaseDataFn() {
      const vm = this;
      await db
        .collection("restaurantVue")
        .get()
        .then((querySnapshot) => {
          return new Promise((resolve) => {
            resolve();
            console.log(querySnapshot);
            const data = querySnapshot.docs.map((doc) => doc.data());
            vm.mybase = data;
          });
        });
      const chartTitleX = {};
      for (let i = 0; vm.mybase.length > i; i++) {
        if (vm.mybase[i].restaurant) {
          for (let j = 0; vm.mybase[i].restaurant.length > j; j++) {
            if (!chartTitleX[vm.mybase[i].restaurant[j]]) {
              chartTitleX[vm.mybase[i].restaurant[j]] = 1;
            } else {
              chartTitleX[vm.mybase[i].restaurant[j]]++;
            }
          }
        }
      }
      vm.personLen = vm.mybase.length;
      this.plotFn(chartTitleX);
    },
    plotFn(data) {
      const myChart = document.getElementById("myChart");
      const restaurantInfo = Object.entries(data);
      this.titleX = [];
      this.dataNum = [];
      for (let i = 0; restaurantInfo.length > i; i++) {
        this.titleX.push(restaurantInfo[i][0]);
        this.dataNum.push(restaurantInfo[i][1]);
      }
      const vm = this;
      const bg = [
        "rgba(255, 99, 132, 0.5)",
        "rgba(255, 159, 64, 0.5)",
        "rgba(255, 205, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(201, 203, 207, 0.5)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255, 205, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(153, 102, 255,1)",
        "rgba(201, 203, 207,1)",
      ];
      const opt = {
        responsive: true,
        indexAxis: "y",
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "選擇餐廳",
          },
        },
      };
      //
      new Chart(myChart, {
        type: "bar",
        data: {
          labels: vm.titleX,
          datasets: [
            {
              data: vm.dataNum,
              backgroundColor: bg,
            },
          ],
        },
        options: opt,
      });
    },
    restaurantDetail(info) {
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
      this.restaurantModelPictureFn();
    },
    restaurantModelPictureFn(num = 0) {
      this.modalImgCurrent = num;
      this.displayModalDataPicture = this.displayModalData.picture[num];
    },
  },
  watch: {
    selectRestaurantValue(val) {
      console.log(val);
    },
  },
  mounted() {
    this.displayModal = new Modal(this.$refs.displayModal);
    this.getFirebaseDataFn();
    for (let i = 0; this.json.length > i; i++) {
      this.selectRestaurantName.push(this.json[i].name);
    }
    this.finish = JSON.parse(localStorage.getItem("selectRestaurant"));
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

.cardSiteImg {
  width: 100%;
  height: 220px;
  object-fit: cover;
  object-position: center center;
  cursor: pointer;
}
.dialogBtnPosition {
  position: absolute;
  top: 16px;
  right: 16px;
}
.font-sm {
  font-size: 10px;
}
</style>
