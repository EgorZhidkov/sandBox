<template>
  <div>
    <input
      type="checkbox"
      class="Figmacheckbox"
      :id="id"
      name="happy"
      :value="value"
      v-model="model"
    />
    <label :class="classStyle" :for="id">{{ label }}</label>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "DpCheckbox",
  model: {
    prop: "checked",
    event: "change",
  },
  props: ["name", "value", "checked", "id", "label", "classStyle"],
  computed: {
    checkedStatus() {
      console.log("model: ", this.value);
      console.log("checked: ", this.checked);
      // if (this.value instanceof Array) {
      //   // console.log(this.label, ": ", _.flattenDeep(this.value));
      //   return _.flattenDeep(this.value);
      // } else {
      //   // console.log(this.label, ": ", this.value);
      //   return this.checked;
      // }
      // return _.spread(this.checked);
    },
    model: {
      get() {
        // return this.checkedStatus;

        return this.getData();
      },
      set(val) {
        console.log("val", val);
        // this.$emit("change", val);
        this.update(val);
        // this.esUpdate(val);
      },
    },
  },
  methods: {
    esUpdate(val) {
      console.log("change");
      this.$emit("change", _.flattenDeep(val));
    },
    getData() {
      let status = true;
      if (this.value instanceof Array) {
        this.value.forEach((item) => {
          if (_.flattenDeep(this.checked).includes(item) === false) {
            status = false;
          }
        });
      }
      return status;
    },
    update(val) {
      console.log("model: ", this.model);
      console.log(val);
      // if (val instanceof Array) {
      //   val = _.flattenDeep(val);
      // }

      this.$emit("change", _.flattenDeep(val));
    },
  },

  // props: {
  //   id: {
  //     type: String,
  //   },
  //   value: {},
  //   model: {},
  // },
  // model: {
  //   prop: "modelValue",
  //   event: "change",
  // },
  // props: {
  //   value: {
  //     type: String,
  //   },
  //   modelValue: {
  //     default: false,
  //   },
  //   label: {
  //     type: String,
  //     required: true,
  //   },
  //   id: {
  //     type: String,
  //   },
  //   // Мы установили `true-value` и `false-value` в true и false по-умолчанию, таким образом
  //   // мы всегда можем использовать их вместо проверки на то, установлены они или нет.
  //   // Также здесь мы можем использовать camelCase, дефис разделяющий имя атрибута
  //   // все равно будет работать
  //   trueValue: {
  //     default: true,
  //   },
  //   falseValue: {
  //     default: false,
  //   },
  // },
  // computed: {
  //   shouldBeChecked() {
  //     if (this.modelValue instanceof Array) {
  //       return this.modelValue.includes(this.value);
  //     }
  //     // Обратите внимание, что `true-value` и` false-value` являются camelCase в JS
  //     return this.modelValue === this.trueValue;
  //   },
  //   model: {
  //     get() {
  //       return this.modelValue;
  //     },
  //     set(val) {
  //       this.$emit("change", val);
  //     },
  //   },
  // },
  // methods: {
  //   updateInput(event) {
  //     let isChecked = event.target.checked;
  //     if (this.modelValue instanceof Array) {
  //       let newValue = [...this.modelValue];

  //       if (isChecked) {
  //         newValue.push(this.value);
  //       } else {
  //         newValue.splice(newValue.indexOf(this.value), 1);
  //       }

  //       this.$emit("change", newValue);
  //       this.$emit("getValue", newValue);
  //     } else {
  //       this.$emit("change", isChecked ? this.trueValue : this.falseValue);
  //     }
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.Figmacheckbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.Figmacheckbox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.Figmacheckbox + label::before {
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #2d5bd0;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}
.cell-style {
  font-family: "Monteserrat-Regular";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.5px;
  color: #242424;
}
.Figmacheckbox:checked + label::before {
  border-color: #0b76ef;
  background: url("../assets/img/checkboxRect.svg");
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
