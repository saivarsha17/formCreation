<template>
  <div class="constantContainer">
    <img
      class="wisdomCircleLogo"
      src="../assets/Group 1244.png"
      alt="My Image"
    />
    <img class="logoMobile" src="../assets/Group 1169.png" alt="mobilelogo" />

    <div class="detailsContainer">
      <img class="escortLogo" src="../assets/POSE_02.png" />
      <img class="loadLogo" src="../assets/load.png" />

      <div>
        <div class="welcomeText">Welcome back!</div>
        <div class="welcomeDescription">
          Sign-In to find opportunities that match your interests. We have
          part-time and full-time roles, with flexible timings. We also offer
          online and local opportunities in various cities.
        </div>
        <div class="contactText">
          Please contact us at +91-9380644532 if you need any assistance.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  methods: {
    handleButtonClick() {
      console.log("Button clicked!");
      this.$router.push("/register");
      // You can add your own custom logic here for handling the click event
    },
  },
};
</script>
<style scoped>
@media screen and (min-width: 1200px) {
  .constantContainer {
    display: flex;
    flex-direction: column;
    background-color: #404555;
    min-height: 100vh;
    width: 41.09vw;
  }
  .wisdomCircleLogo {
    position: absolute;
    width: 16.95vw;
    height: 18.21vh;
    left: 12.11vw;
    top: 25.71vh;
  }
  .escortLogo {
    position: absolute;
    width: 12.89vw;
    height: 26.07vh;
    right: 87.11vw;
    bottom: 0vh;
  }
  .loadLogo {
    position: absolute;
    width: 2.06vw;
    height: 0.357vh;
    left: 12.89vw;
    top: 84.761vh;
  }
  .welcomeText {
    position: absolute;
    width: 25.31vw;
    height: 3.81vh;
    left: 12.89vw;
    top: 62.5vh;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 2.86vh;
    line-height: 3.81vh;

    color: #ffffff;
  }
  .welcomeDescription {
    position: absolute;
    width: 26.33vw;
    height: 11.43vh;
    left: 12.89vw;
    top: 67.74vh;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 1.9vh;
    line-height: 2.86vh;

    color: #ffffff;
  }
  .contactText {
    position: absolute;
    width: 26.33vw;
    height: 4.29vh;
    left: 12.89vw;
    top: 92.86vh;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 1.43vh;
    line-height: 2.14vh;

    color: #ffffff;
  }
  .logoMobile {
    display: none;
  }
}
@media screen and (max-width: 700px) {
  .constantContainer {
    display: flex;
    flex-direction: column;

    overflow: hidden;
  }
  .wisdomCircleLogo {
    display: none;
  }
  .detailsContainer {
    display: none;
  }
  .logoMobile {
    position: absolute;
    left: 29.17%;
    right: 29.17%;
    top: 6.25%;
    bottom: 87.19%;
    width: 41.66vw;
    height: 6.562vh;
  }
}
</style>
