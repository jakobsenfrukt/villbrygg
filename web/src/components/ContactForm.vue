<template>
  <form name="reseller-contact" method="POST" data-netlify="true">
    <label>
      {{ $t("contactform.name") }}*
      <input type="text" name="name" />
    </label>
    <label>
      {{ $t("contactform.contactperson") }}
      <input type="text" name="contactperson" />
    </label>
    <label>
      {{ $t("contactform.phone") }}
      <input type="tel" name="phone" />
    </label>
    <label>
      {{ $t("contactform.email") }}*
      <input type="email" name="email" />
    </label>
    <label>
      {{ $t("contactform.message") }}
      <textarea name="message"></textarea>
    </label>
    <button type="submit" class="button">{{ $t("contactform.submit") }}</button>
  </form>
</template>

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
</style>
