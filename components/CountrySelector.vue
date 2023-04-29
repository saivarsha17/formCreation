<template>
  <div class="country-selector">
    <button
      class="button"
      @click="
        showDropdown = true;
        returnData();
      "
    >
      <img
        :src="require(`../assets/flags/${selectedCountry}.png`)"
        alt="Flag"
      />
    </button>

    <div class="dropdown" v-if="showDropdown">
      <button
        v-for="country in countries"
        :key="country.code"
        @click="
          selectedCountry = country.code;
          showDropdown = false;
        "
      >
        <img :src="require(`../assets/flags/${country.code}.png`)" alt="Flag" />
        {{ country.code }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false,
      selectedCountry: "IN",

      phone: "",
      countries: [
        { code: "IN", flag: "/assets/IN.png" },
        { code: "US", flag: "/flags/US.svg" },
        { code: "CA", flag: "/flags/CA.svg" },
        { code: "GB", flag: "/flags/GB.svg" },
        { code: "FR", flag: "/flags/FR.svg" },
      ],
    };
  },
  methods: {
    returnData() {
      this.$emit("dataReturned", this.selectedCountry);
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 1200px) {
  .country-selector {
    position: relative;
  }

  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    background-color: white;
    border: 1px solid gray;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 0.595vh 0.39vw;
    max-height: 23.81vh;
    overflow-y: auto;
  }

  button {
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.595vh 0.39vw;
    background-color: white;
    border: none;

    cursor: pointer;
  }

  button:hover {
    background-color: #f2f2f2;
  }

  img {
    height: 2.381vh;
    width: 1.56vw;
    margin-right: 0.39vw;
  }
}
@media screen and (max-width: 700px) {
  .country-selector {
    position: relative;
  }

  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    background-color: white;
    border: 1px solid gray;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 0.78vh 1.39vw;
    max-height: 31.25vh;
    overflow-y: auto;
  }

  button {
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.78vh 1.39vw;
    background-color: white;
    border: none;

    cursor: pointer;
  }

  button:hover {
    background-color: #f2f2f2;
  }

  img {
    height: 3.125vh;
    width: 5.56vw;
    margin-right: 1.39vw;
  }
}
</style>
