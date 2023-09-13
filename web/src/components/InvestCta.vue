<template>
  <a class="investCta" href="https://invest.villbrygg.com/" target="_blank">
    <p>Bli medeier i Villbrygg!</p>
  </a>
</template>

<style lang="scss" scoped>
.investCta {
  width: 100%;
  background: var(--color-darkgreen);
  border-radius: var(--border-radius);
  text-decoration: none;
  padding: 1.5rem;
  color: var(--color-white);
  position: relative;
  display: flex;
  transition: all 0.2s ease-in-out;

  p {
    margin: 0;
    font-size: 1.2rem;
    position: relative;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;

    &:before {
      content: " ";
      display: inline-block;
      background: rgb(0, 255, 65);
      width: 1.2rem;
      height: 1.2rem;
      margin-right: 1rem;
      border-radius: 1.2rem;
      vertical-align: middle;
      animation: pulse 2s ease-in-out infinite;
    }
  }

  &:after {
    content: "→";
    font-size: 1.2rem;
    display: inline-block;
    margin: 0 0 0 auto;
  }

  &:hover {
    background: #3f9249;
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 255, 65, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 255, 65, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 255, 65, 0);
  }
}
</style>
