<template>
  <div class="container">
    <b-card class="well-card">
      <template #header>
        <h1 class="well-card__header">Арктик СПГ 1</h1>
      </template>
      <div class="body">
        <div class="category_title flex-column">
          <div class="well-card__category">
            <div class="occurrnce well-card__field">
              <span class="cell-style__header">Месторождение</span>
            </div>
            <div class="well-card__field">
              <span class="cell-style__header">Куст</span>
            </div>
            <div class="well-card__field">
              <span class="cell-style__header">Скважина</span>
            </div>
            <div class="well-card__field">
              <span class="cell-style__header">Ствол</span>
            </div>
            <div class="well-card__field">
              <span class="cell-style__header">Статус</span>
            </div>
          </div>
          <div class="well-card__data" v-for="item in cards" :key="item.state">
            <div class="occurrnce well-card__field">{{ item.state }}</div>
            <div class="flex-column" style="width: 100%">
              <div
                class="well-card__data__info"
                v-for="(info_column, index) in item.state_info"
                :key="index"
              >
                <!-- {{ info_column.kust }} -->
                <div class="well-card__bush__title" style="padding: 14px 24px">
                  <!-- <span class="cell-style">U74</span> -->
                  <dp-checkbox
                    :id="info_column.kust"
                    :label="info_column.kust"
                    :value="getIdKust(info_column.skvazhina)"
                    :checked="getIdKust(info_column.skvazhina)"
                    v-model="valueCheck"
                    classStyle="cell-style"
                  ></dp-checkbox>
                  <!-- <div style="padding: 14px 24px">
                    <dp-checkbox
                      :id="info_column.kust"
                      :label="info_column.kust"
                      :value="checkbox"
                      classStyle="cell-style"
                    ></dp-checkbox>
                    <span class="cell-style">
                      
                    </span>
                  </div> -->
                </div>
                <div class="separator"></div>
                <div class="well-card__bush">
                  <div
                    class="well-card__bush__wellbore"
                    v-for="(skvazhina, index) in info_column.skvazhina"
                    :key="index"
                  >
                    <div class="well-card__field">
                      <dp-checkbox
                        :id="skvazhina.title"
                        :label="skvazhina.title"
                        :value="getId(skvazhina.stvol)"
                        v-model="valueCheck"
                        classStyle="cell-style"
                      ></dp-checkbox>
                      <!-- <span class="cell-style">{{ skvazhina.title }}</span> -->
                    </div>

                    <div class="well-card__trunk__field">
                      <div
                        v-for="(stvol, index) in skvazhina.stvol"
                        :key="index"
                      >
                        <div class="cell_padding_top">
                          <dp-checkbox
                            :id="stvol.id"
                            :label="stvol.id"
                            :value="stvol.id"
                            :checked="stvol.id"
                            v-model="valueCheck"
                            classStyle="cell-style"
                          >
                          </dp-checkbox>
                          <!-- <dp-checkbox></dp-checkbox> -->
                          <!-- <span class="cell-style">{{ stvol.title }}</span> -->
                        </div>
                        <div
                          v-if="index !== skvazhina.stvol.length"
                          class="separator"
                        ></div>
                      </div>
                    </div>
                    <div class="well-card__status">
                      <div
                        class="well-card__status__field"
                        v-for="(stvol, index) in skvazhina.stvol"
                        :key="index"
                      >
                        <well-bore-status-svg
                          :status="stvol.state"
                        ></well-bore-status-svg>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="well-card__bush__wellbore">
                    <div class="well-card__field">7004</div>
                    <div class="well-card__trunk__field">
                      <div class="cell_padding_top">3</div>
                      <div class="separator"></div>
                      <div class="cell_padding_top">4</div>
                    </div>
                    <div class="well-card__status">
                      <div class="well-card__status__field">
                        <well-bore-status-svg
                          :status="true"
                        ></well-bore-status-svg>
                      </div>
                      <div class="well-card__status__field">
                        <well-bore-status-svg
                          :status="true"
                        ></well-bore-status-svg>
                      </div>
                    </div>
                  </div> -->
                </div>

                <!-- <div class="well-card__trunk__field"></div> -->
                <!-- <div class="well-card__status__field"></div> -->
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="well-card__data">
          <div class="occurrnce well-card__field">Уренгойское НГКМ (SMB)</div>
          <div class="well-card__field">U74</div>
          <div class="well-card__field">7403</div>
          <div class="well-card__field trunk">
            <div class="well-card__trunk">1</div>
            <div class="well-card__trunk">1</div>
            asd
          </div>
          <div class="well-card__field">7403</div>
        </div> -->
      </div>
    </b-card>
    {{ valueCheck }}
    <b-button @click="submit()">Submit</b-button>
  </div>
</template>

<script>
import card from "./card";
import HelloWorld from "@/components/HelloWorld.vue";
import WellBoreStatusSvg from "./WellboreStatusSvg.vue";
import DpCheckbox from "./DpCheckBox.vue";
import _ from "lodash";
export default {
  name: "Home",
  components: {
    HelloWorld,
    WellBoreStatusSvg,
    DpCheckbox,
  },
  data() {
    return {
      checkbox: { title: "first", value: "U74" },
      valueCheck: [],
      cards: null,
    };
  },
  watch: {
    valueCheck: {
      handler() {
        // console.log(this.valueCheck);
      },
    },
    checkbox: {
      handler() {
        console.log(this.checkbox);
      },
    },
  },

  methods: {
    getId(struct) {
      // console.log(struct);
      let arr = [];
      struct.forEach((item) => {
        arr.push(item.id);
      });
      return arr;
    },
    getIdKust(struct) {
      let arr = [];
      // console.log("kust", struct);
      struct.forEach((item) => {
        // console.log("item", item);
        arr.push(this.getId(item.stvol));
      });
      return arr;
    },
    getRowCount(obj) {
      let total = 0;
      console.log("obj", obj);
      obj.state_info.forEach((item) => {
        console.log("item", item);
        total += item.skvazhina.length;
      });
      return total;
    },
    submit() {
      console.log(this.checkbox);
      console.log(this.valueCheck);
    },
    checkbox_value(data) {
      if (data !== undefined) {
        console.log("data", data);
        this.valueCheck.push(data.join());
      }
    },
  },
  mounted() {
    console.log(card);
    this.cards = card;
    console.log(JSON.stringify(card));
  },
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
table > tbody > tr > td,
table > tbody > tr > td.inner > div {
  vertical-align: top;
  border: 1px solid #ddd;
}
table > tbody > tr > td.inner {
  padding: 0;
  border-right: 0;
}
table > tbody > tr > td.inner > div {
  padding: 5px;
  border-width: 0 0 1px 0;
}
table > tbody > tr > td.inner > div:last-child {
  border: 0;
}
table > tbody > tr > td.inner > table {
  margin-bottom: 0;
}
table > tbody > tr > td.inner > table td {
  border-width: 0 1px 1px 0;
}
table > tbody > tr > td.inner > table tr:last-child td {
  border-bottom: 0;
}
table > tbody > tr > td.inner > div {
  border-right: 0;
}
.card-header {
  padding: 16px 24px;
  background: #ffffff;
  border-bottom: 2px solid #f5f5f5;
}
.card-body {
  padding: 0px;
}
.well-card {
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: none;
  &__header {
    text-align: start;
    font-family: "Monteserrat-Bold";
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    color: #242424;
    margin-bottom: 0px;
  }
  & .body {
    padding-top: 0px;
  }
  &__category {
    background: #fafafa;
    display: flex;
    flex-direction: row;
  }
  &__bush {
    display: flex;
    flex-direction: column;
    width: 100%;
    &__wellbore {
      display: flex;
      flex-direction: row;
      width: 100%;
    }
    &__title {
      display: flex;
      width: 33.1%;
      border: 0.5px solid #f5f5f5;
    }
  }
  &__field {
    padding: 14px 24px;
    display: flex;
    flex-direction: column;
    position: relative;
    text-align: start;
    border: 0.5px solid #f5f5f5;
    width: 33.7%;
  }
  &__trunk__field {
    border: 0.5px solid #f5f5f5;
    position: relative;
    width: 33.3%;
    flex-direction: column;
    padding: 0px 24px;
  }
  &__status__field {
    border: 0.5px solid #f5f5f5;
    position: relative;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    padding: 0px 24px;
    display: flex;
    height: 100%;
  }
  &__status {
    display: flex;
    flex-direction: column;
    width: 33.5%;
  }

  &__data {
    display: flex;
    flex-direction: row;
    &__info {
      display: flex;
      flex-direction: row;
      width: 100%;
      position: relative;
    }
  }
}
.cell-style {
  font-family: "Monteserrat-Regular";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.5px;
  color: #242424;
  &__header {
    font-family: "Monteserrat-SemiBold";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #242424;
  }
}
.occurrnce {
  flex-shrink: 0;
  width: 380px;
}
.cell_padding_top {
  padding: 14px 0px;
  display: flex;
}
.separator {
  position: absolute;
  height: 1px;
  background: #f5f5f5;
  width: 100%;
  right: 0px;
}
.category_title {
  display: flex;
  flex-direction: row;
}

@media (max-width: 992px) {
  .occurrnce {
    width: 100%;
    flex-shrink: 1;
  }
}
</style>
