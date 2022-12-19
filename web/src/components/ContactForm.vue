<template>
  <div id="reseller-contact-wrapper">
    <form
      name="reseller-contact"
      @submit="handleSubmit"
      v-if="!submitted"
      method="POST"
      data-netlify="true"
      netlify-honeypot="i-understand"
      novalidate="true"
    >
      <input type="hidden" name="form-name" value="resellerContact" />
      <label :class="markError('name')">
        {{ $t("contactform.name") }}*
        <input type="text" name="name" v-model="name" />
        <span v-if="hasError('name')" class="error-message">{{
          this.errors["name"]
        }}</span>
      </label>
      <label>
        {{ $t("contactform.contactPerson") }}
        <input type="text" name="contactPerson" v-model="contactPerson" />
      </label>
      <label>
        {{ $t("contactform.phone") }}
        <input type="tel" name="phone" v-model="phone" />
      </label>
      <label :class="markError('email')">
        {{ $t("contactform.email") }}*
        <input type="email" name="email" v-model="email" />
        <span v-if="hasError('email')" class="error-message">{{
          this.errors["email"]
        }}</span>
      </label>
      <label>
        {{ $t("contactform.message") }}
        <textarea name="message" v-model="message"></textarea>
      </label>
      <p class="hidden">
        <label>
          {{ $t("contactform.humansOnly") }}: <input name="i-understand" />
        </label>
      </p>
      <button type="submit" class="button">
        {{ $t("contactform.submit") }}
      </button>
    </form>
    <div v-if="submitError">
      <p>
        {{ $t("contactform.errorTechnical") }}
      </p>
    </div>
    <div v-if="submitted">
      <p>{{ $t("contactform.greatSuccess") }}</p>
      <button class="button" @click="reset()">
        {{ $t("contactform.reset") }}
      </button>
    </div>
  </div>
</template>

<script>
const getInitialState = function() {
  return {
    submitted: false,
    submitError: "",
    errors: {},
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    message: "",
  };
};

const isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  data() {
    return getInitialState();
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.errors = {};

      if (!this.name) {
        this.errors["name"] = this.$t("contactform.errorRequiredField");
      }

      if (!this.email) {
        this.errors["email"] = this.$t("contactform.errorRequiredField");
      } else if (!isEmail.test(this.email)) {
        this.errors["email"] = this.$t("contactform.errorEmailInvalid");
      }

      if (Object.keys(this.errors).length) {
        return;
      }

      const formData = new FormData(e.target);
      this.sendForm(formData);
    },
    sendForm(formData) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
        .then(() => (this.submitted = true))
        .catch((error) => {
          this.technicalError = error;
          console.log(error);
        });
    },
    markError(name) {
      return { "has-error": this.hasError(name) };
    },
    hasError(name) {
      return this.errors.hasOwnProperty(name);
    },
    reset() {
      Object.assign(this.$data, getInitialState());
    },
  },
};
</script>

<style lang="scss" scoped>
label {
  display: block;
  margin-bottom: 1rem;
  width: 30rem;
  max-width: 100%;
}
input,
textarea {
  display: block;
  width: 20rem;
  max-width: 100%;
  border: 1px solid var(--color-lightgray);
  border-radius: var(--border-radius-l);
  font-family: inherit;
  font-size: var(--font-size-s);
  padding: 0.5rem 1rem;
  margin: 0.25rem 0 0;
  cursor: none;

  &:hover {
    border: 1px solid var(--cursor-color);
    cursor: none;
  }
  &:focus {
    outline: none;
    border: 1px solid var(--cursor-color);
    box-shadow: 0 0 0 1px var(--cursor-color);
    cursor: none;
  }
}
input[type="tel"] {
  width: 13rem;
}
textarea {
  width: 30rem;
  height: 7rem;
  border-radius: 1rem;
}

.hidden {
  display: none;
}
.button {
  width: 12rem;
  max-width: 100%;
  background: var(--cursor-color);
  border-color: var(--cursor-color);

  &:hover {
    background: var(--color-active);
    border-color: var(--color-active);
  }
}
.error-message {
  font-size: 0.8rem;
  color: red;
  font-style: italic;
}
.has-error {
  input {
    border-color: red;
  }
}
</style>
