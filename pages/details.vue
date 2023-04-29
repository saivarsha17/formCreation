<template>
  <div class="mainContainer">
    <companyPage />

    <div class="pageDetails">Successful!!!</div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
@media screen and (min-width: 1200px) {
  .mainContainer {
    display: flex;
    flex-direction: row;
  }
  .pageDetails {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 55.55vw;
    top: 32.5vh;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 2.857vh;
    line-height: 3.809vh;

    color: #121317;
  }
}
@media screen and (max-width: 700px) {
  .mainContainer {
    display: flex;
    flex-direction: column;
  }
  .pageDetails {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 320px;
    height: 28px;
    left: 20px;
    top: 122px;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
    line-height: 28px;

    color: #121317;
  }
}
</style>
