<template>
  <div class="mainContainer">
    <companyPage />
    <div class="verifyContainer">
      <div class="verifyHeading">Verify Your Email</div>
      <input v-model="code" class="inputContainer" />
      <div v-if="inValidcodeModal" class="inValidContainercode">
        {{ invalidcode }}
      </div>

      <NextLink @click="handleSubmit">
        <div class="submitContainer">Submit</div>
      </NextLink>
      <NextLink @click="handlesend">
        <div class="sendContainer">Send Code</div>
      </NextLink>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: "",
      inValidcodeModal: false,
      invalidcode: "",
    };
  },
  computed: {
    email() {
      return this.$route.query.email;
    },
  },
  methods: {
    handlesend() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        email: this.email,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:4001/sendcode", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const data = JSON.parse(result);
          if (data.done === true) {
            console.log(data, this.$route);
          }
        })
        .catch((error) => console.log("error", error));
    },
    handleSubmit() {
      if (this.code.length < 6) {
        this.inValidcodeModal = true;
        this.invalidcode = "Invalid Code";
        setTimeout(() => {
          this.inValidcodeModal = false;
        }, 2000);
        return;
      } else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          email: this.email,
          code: parseInt(this.code),
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("http://localhost:4001/verify", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            const data = JSON.parse(result);
            if (data.done === true) {
              this.$router.push("/details");
            } else {
              this.inValidcodeModal = true;
              this.invalidcode = data.message;
              setTimeout(() => {
                this.inValidcodeModal = false;
              }, 2000);
              return;
            }
          })
          .catch((error) => console.log("error", error));
      }
    },
  },
};
</script>
<style scoped>
@media screen and (min-width: 1200px) {
  .mainContainer {
    display: flex;
    flex-direction: row;
  }
  .verifyContainer {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 30vw;
    height: 3.809vh;
    left: 55.55vw;
    top: 32.5vh;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;

    color: #121317;
  }
  .verifyHeading {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;

    color: #121317;
  }
  .inputContainer {
    box-sizing: border-box;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1.428vh 1.25vw;
    gap: 0.952vh 0.625vw;

    width: 10vw;
    height: 5.714vh;

    background: #ffffff;

    border-bottom: 1px solid #dcdee5;
    border-radius: 4px;
    margin-bottom: 1.904vh;
    font-size: 16px;
    line-height: 24px;
  }

  .submitContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1.309vh 2.5vw;
    gap: 0.952vh 0.625vw;

    width: 30vw;
    height: 5.714vh;

    background: #f1c12b;
    border-radius: 4px;
    margin-top: 2.857vh;
    position: relative;
    left: 0px;
    top: 15vh;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
  }
  .sendContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1.309vh 2.5vw;
    gap: 0.952vh 0.625vw;

    width: 30vw;
    height: 5.714vh;

    background: #f1c12b;
    border-radius: 4px;
    margin-top: 2.857vh;
    position: relative;
    left: 0px;
    top: 15vh;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
  }
  .inValidContainercode {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;

    color: #d92d20;
    margin-top: -2.1vh;
    margin-bottom: 1.2vh;
  }
}
@media screen and (max-width: 700px) {
  .mainContainer {
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }
  .verifyContainer {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 88.88vw;

    left: 5.55vw;
    top: 19.0625vh;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
    line-height: 28px;

    color: #121317;
  }
  .verifyHeading {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
    line-height: 28px;

    color: #121317;
  }
  .inputContainer {
    padding: 1.875vh 4.44vw;
    gap: 1.25vh 2.22vw;

    width: 27.77vw;
    height: 6.25vh;

    margin-bottom: 3.906vh;
    background: #ffffff;
    border-bottom: 1px solid #dcdee5;
    border-radius: 4px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #606880;
  }
  .submitContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1.25vh 8.88vw;
    gap: 1.25vh 2.22vw;

    width: 88.88vw;
    height: 6.25vh;

    background: #f1c12b;
    border-radius: 4px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;

    color: #121317;
    margin-top: 50vh;
  }
  .sendContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1.25vh 8.88vw;
    gap: 1.25vh 2.22vw;

    width: 88.88vw;
    height: 6.25vh;

    background: #f1c12b;
    border-radius: 4px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;

    color: #121317;
    margin-top: 2vh;
  }
  .inValidContainercode {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;

    color: #d92d20;
    margin-top: -3.8vh;
    margin-bottom: 1vh;
  }
}
</style>
