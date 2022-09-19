<template>
  <div>
    <div class="treeView-body__cell" v-on:click="openNode">
      <span class="treeView-body__cell__title">{{ name }}</span>
      <div class="treeView-body__cell__buttons">
        <b-button
          class="treeView-body__cell__buttons__falafel"
          @click="falafelActive = true"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.143 11.7857C13.143 11.1545 12.6313 10.6429 12.0002 10.6429C11.369 10.6429 10.8573 11.1545 10.8573 11.7857C10.8573 12.4169 11.369 12.9286 12.0002 12.9286C12.6313 12.9286 13.143 12.4169 13.143 11.7857ZM12.0002 9.5C13.2625 9.5 14.2859 10.5233 14.2859 11.7857C14.2859 13.0481 13.2625 14.0714 12.0002 14.0714C10.7378 14.0714 9.71444 13.0481 9.71444 11.7857C9.71444 10.5233 10.7378 9.5 12.0002 9.5Z"
              fill="#616293"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.8572 11.7857C18.8572 11.1545 18.3455 10.6429 17.7143 10.6429C17.0832 10.6429 16.5715 11.1545 16.5715 11.7857C16.5715 12.4169 17.0832 12.9286 17.7143 12.9286C18.3455 12.9286 18.8572 12.4169 18.8572 11.7857ZM17.7143 9.5C18.9767 9.5 20.0001 10.5233 20.0001 11.7857C20.0001 13.0481 18.9767 14.0714 17.7143 14.0714C16.452 14.0714 15.4286 13.0481 15.4286 11.7857C15.4286 10.5233 16.452 9.5 17.7143 9.5Z"
              fill="#616293"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.42857 11.7857C7.42857 11.1545 6.9169 10.6429 6.28571 10.6429C5.65453 10.6429 5.14286 11.1545 5.14286 11.7857C5.14286 12.4169 5.65453 12.9286 6.28571 12.9286C6.9169 12.9286 7.42857 12.4169 7.42857 11.7857ZM6.28571 9.5C7.54808 9.5 8.57143 10.5233 8.57143 11.7857C8.57143 13.0481 7.54808 14.0714 6.28571 14.0714C5.02335 14.0714 4 13.0481 4 11.7857C4 10.5233 5.02335 9.5 6.28571 9.5Z"
              fill="#616293"
            />
          </svg>
        </b-button>
        <b-button
          v-if="hasChild"
          class="treeView-body__cell__buttons__dropdown"
        >
          <svg
            :class="{ rotate: rotate === true }"
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.99394 0.499973C7.81205 0.499973 7.61804 0.572729 7.48465 0.718238L0.20917 7.99372C-0.0697234 8.27261 -0.0697234 8.73339 0.20917 9.02441C0.488064 9.3033 0.948844 9.3033 1.23986 9.02441L7.99394 2.25821L14.7601 9.02441C15.039 9.3033 15.4998 9.3033 15.7908 9.02441C16.0697 8.74552 16.0697 8.28474 15.7908 7.99372L8.51535 0.718238C8.36984 0.572729 8.17583 0.499973 7.99394 0.499973Z"
              fill="#616293"
            />
          </svg>
        </b-button>
      </div>
      <div class="modalFalafel" v-if="falafelActive === true">
        <b-button @click="falafelActive = false">Exit</b-button>
        <ul>
          <li>
            <b-button @click="$bvModal.show(String(targetId))">Add</b-button>
          </li>
          <li>
            <b-button @click="$bvModal.show(String(targetId) + 'rename')"
              >Rename</b-button
            >
          </li>
          <li>
            <b-button @click="$bvModal.show(String(targetId) + 'delete')"
              >Delete</b-button
            >
          </li>
        </ul>
      </div>
    </div>
    <add-modal :modalId="targetId" @getDataFromAddModal="getDataFromAddModal" />
    <modal-rename
      :modalId="targetId"
      :data="name"
      @getDataFromRenameModal="getDataFromRenameModal"
    />
    <modal-delete
      :modalId="targetId"
      @getDataFromDeleteModal="getDataFromDeleteModal"
    />
  </div>
</template>

<script>
import AddModal from "./modalAdd.vue";
import ModalRename from "./modalRename.vue";
import ModalDelete from "./modalDelete.vue";
export default {
  name: "treeCell",
  components: {
    AddModal,
    ModalDelete,
    ModalRename,
  },
  data() {
    return {
      falafelActive: false,
    };
  },
  methods: {
    openNode(event) {
      if (event.target.className === "treeView-body__cell") {
        this.$emit("open");
      }
    },
    getDataFromAddModal(data) {
      data.parent_id = this.parent_id;
      this.falafelActive = false;
      this.$emit("addNewGroup", data);
    },
    getDataFromRenameModal(data) {
      data.targetId = this.targetId;
      this.falafelActive = false;
      this.$emit("renameGroup", data);
    },
    getDataFromDeleteModal(data) {
      data.id = this.targetId;
      this.falafelActive = false;
      this.$emit("deleteGroup", data);
    },
    // addChild() {
    //   this.$emit("addChild", data);
    // },
    // renameChild() {
    //   this.$emit("renameChild", data);
    // },
    // deleteChild() {
    //   this.$emit("deleteChild", data);
    // },
  },
  watch: {
    falafelActive: {
      handler() {
        console.log(this.falafelActive);
      },
    },
  },
  props: {
    targetId: {
      type: Number,
    },
    name: {
      type: String,
    },
    parent_id: {
      type: Number,
    },
    rotate: {
      type: Boolean,
    },
    hasChild: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
.modalFalafel {
  position: absolute;
  padding: 14px;
  background: white;
  border: 1px solid black;
  border-radius: 6px;
  z-index: 10;
  right: -27%;
  & ul {
    padding: 5px;
    margin-bottom: 0px;
  }
  & li {
    list-style: none;
    text-align: left;

    border-radius: 4px;
    padding: 4px;
    margin-bottom: 2px;
  }
}
.treeView {
  .rotate {
    transform: rotate(180deg);
  }
  &-body {
    padding: 0px;
    &__cell {
      padding: 10px 16px;

      display: flex;
      justify-content: space-between;
      &__title {
        font-family: "Monteserrat-Regular";
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.5px;
        color: #242424;
      }
      &__buttons {
        position: relative;
        &__falafel {
          margin-right: 12px;
          border-color: white;
          background-color: unset;
          padding: 0px;
          border: none;
          &:hover {
            border-color: white !important;
            background-color: unset !important;
          }
          &:active {
            color: #9e9e9e;
            border-color: white !important;
            background-color: unset !important;
          }
          &:focus {
            box-shadow: none !important;
            border-color: white !important;
            background-color: unset !important;
          }
        }
        &__dropdown {
          border-color: white;
          background-color: unset;
          padding: 0px;
          border: none;
          &:hover {
            border-color: white !important;
            background-color: unset !important;
          }
          &:active {
            color: #9e9e9e;
            border-color: white !important;
            background-color: unset !important;
          }
          &:focus {
            box-shadow: none !important;
            border-color: white !important;
            background-color: unset !important;
          }
        }
      }
    }
  }
}
</style>
