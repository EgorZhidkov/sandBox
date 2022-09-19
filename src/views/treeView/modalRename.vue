<template>
  <div>
    <b-modal
      :id="String(modalId) + 'rename'"
      :ref="modalId"
      title="Submit Your Name"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Переименование"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "AddModal",
  data() {
    return {
      name: "",
      nameState: null,
      submittedNames: [],
    };
  },
  props: {
    modalId: {},
    data: {},
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      this.handleSubmit();
      this.$emit("getDataFromRenameModal", { name: this.name });
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      // this.submittedNames.push(this.name);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide(String(this.modalId) + "rename");
      });
    },
  },
  mounted() {
    this.name = this.data;
  },
};
</script>
