<template>
  <div class="mainContainer">
    <companyPage />
    <div class="registerContainer">
      <div class="registerHeading">Create an account</div>
      <div class="registerDescription">
        Already have an account?
        <span style="color: #2558e5"
          ><NextLink @click="handleSignIn">Sign In</NextLink>
        </span>
      </div>
      <div>
        <input
          class="inputContainer"
          v-model="firstName"
          placeholder="First Name"
          :style="{ color: inValidfirstNameModal ? '#d92d20' : '#606880' }"
        />
        <div v-if="inValidfirstNameModal" class="inValidContainerfirstName">
          {{ invalidfirstName }}
        </div>
      </div>
      <div>
        <input
          v-model="lastName"
          class="inputContainer"
          placeholder="Last Name"
          :style="{ color: inValidlastNameModal ? '#d92d20' : '#606880' }"
        />
        <div v-if="inValidlastNameModal" class="inValidContainerfirstName">
          {{ invalidlastName }}
        </div>
      </div>

      <div>
        <input
          v-model="email"
          class="inputContainer"
          placeholder="Email Address"
          :style="{ color: inValidemailModal ? '#d92d20' : '#606880' }"
        />
        <div v-if="inValidemailModal" class="inValidContainerfirstName">
          {{ invalidemail }}
        </div>
      </div>

      <span class="flag-icon-us"></span>
      <div style="display: flex; flex-direction: row">
        <div>
          <CountrySelector
            class="countryCodeContainer"
            @dataReturned="handleDataReturned"
          />

          <div v-if="inValidcodeModal" class="inValidContainerfirstName">
            {{ invalidcode }}
          </div>
        </div>
        <div>
          <input
            v-model="number"
            class="mobileContainer"
            placeholder="Mobile Number"
            type="number"
            :style="{ color: inValidnumberModal ? '#d92d20' : '#606880' }"
          />
          <div v-if="inValidnumberModal" class="inValidContainerfirstName">
            {{ invalidnumber }}
          </div>
        </div>
      </div>
      <img
        src="../assets/dropdown.png"
        alt="dropdown"
        class="dropdownContainer"
      />

      <div>
        <input
          v-model="password"
          class="inputContainer"
          placeholder="Password"
          :style="{ color: inValidpasswordModal ? '#d92d20' : '#606880' }"
        />
        <div v-if="inValidpasswordModal" class="inValidContainerfirstName">
          {{ invalidpassword }}
        </div>
      </div>
      <div v-if="inValidUserModal" class="inValidContainerfirstName">
        {{ invaliduser }}
      </div>

      <div class="disclaimerContainer">
        By clicking Sign Up you are indicating that you have read and
        acknowledged the
        <span style="color: #2558e5">Terms of Service </span> and
        <span style="color: #2558e5"> Privacy Notice </span>
      </div>
      <div class="signInContainer" @click="handleSignUp">Sign Up</div>
    </div>
  </div>
</template>

<script>
import CountrySelector from "@/components/CountrySelector.vue";

export default {
  components: {
    CountrySelector,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      code: "IN",
      number: "",
      password: "",
      inValidfirstNameModal: false,
      invalidfirstName: "",
      inValidlastNameModal: false,
      invalidlastName: "",
      inValidemailModal: false,
      invalidemail: "",
      inValidcodeModal: false,
      invalidcode: "",
      inValidnumberModal: false,
      invalidnumber: "",
      inValidpasswordModal: false,
      invalidpassword: "",
      invaliduser: "",
      inValidUserModal: false,
      phoneNumber: "",
    };
  },
  methods: {
    handleDataReturned(data) {
      this.code = data;
    },
    handleSignIn() {
      this.$router.push("/");
    },

    handleSignUp() {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      const isEmail = emailRegex.test(this.email);

      if (
        this.firstName.length == 0 ||
        this.lastName.length == 0 ||
        this.email.length == 0 ||
        this.code.length != 2 ||
        this.number.length != 0 ||
        this.password.length == 0 ||
        !isEmail
      ) {
        if (this.firstName.length == 0) {
          this.inValidfirstNameModal = true;
          this.invalidfirstName = "Please enter a valid first name";
          setTimeout(() => {
            this.inValidfirstNameModal = false;
          }, 2000);
        }
        if (this.lastName.length == 0) {
          this.inValidlastNameModal = true;
          this.invalidlastName = "Please enter a valid last name";
          setTimeout(() => {
            this.inValidlastNameModal = false;
          }, 2000);
        }
        if (this.email.length == 0 || !isEmail) {
          this.inValidemailModal = true;
          this.invalidemail = "Please enter a valid email address";
          setTimeout(() => {
            this.inValidemailModal = false;
          }, 2000);
        }
        if (this.password.length == 0) {
          this.inValidpasswordModal = true;
          this.invalidpassword = "Please enter a valid password";
          setTimeout(() => {
            this.inValidpasswordModal = false;
          }, 2000);
        }
        if (this.number.length == 0) {
          this.inValidnumberModal = true;
          this.invalidnumber = "Please enter a valid mobile number";
          setTimeout(() => {
            this.inValidnumberModal = false;
          }, 2000);
        }
        if (this.code.length != 2) {
          this.inValidcodeModal = true;
          this.invalidcode = "Please enter a valid code";
          setTimeout(() => {
            this.inValidcodeModal = false;
          }, 2000);
        }

        return;
      } else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          code: this.code,
          mobileNumber: this.number,
          password: this.password,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("http://localhost:4001/register", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            const data = JSON.parse(result);
            if (data.done == false) {
              this.inValidUserModal = true;
              this.invaliduser = data.message;
              setTimeout(() => {
                this.inValidUserModal = false;
              }, 2000);
            } else {
              this.$router.push({
                path: "/verify",
                params: { email: "saivarshatedla@gmail.com" },

                query: { email: this.email },
              });
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
  .registerContainer {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 30vw;
    height: 3.809vh;
    left: 55.55vw;

    top: 17.97vh;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;

    color: #121317;
  }
  .registerHeading {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;

    color: #121317;
  }
  .registerDescription {
    margin-top: 0.476vh;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    color: #404555;
    margin-bottom: 2.857vh;
  }
  .inputContainer {
    flex-direction: column;
    box-sizing: border-box;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1.428vh 1.25vw;
    gap: 0.952vh 0.625vw;

    width: 30vw;
    height: 5.714vh;

    background: #ffffff;

    border: 1px solid #dcdee5;
    border-radius: 4px;
    margin-bottom: 1.904vh;
    font-size: 16px;
    line-height: 24px;
  }
  .disclaimerContainer {
    width: 30vw;
    height: 5.714vh;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #404555;
    margin-top: 1vh;
  }
  .signInContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1.309vh 2.5vw;
    gap: 0.952vh 0.625vw;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;

    width: 30vw;
    height: 5.714vh;

    background: #f1c12b;
    border-radius: 4px;
    margin-top: 2.2vh;
  }
  .countryCodeContainer {
    width: 6.875vw;
    height: 5.714vh;
    background: #ffffff;

    border: 1px solid #dcdee5;
    border-radius: 4px;
    margin-bottom: 1.904vh;
    padding: 1.428vh 1.25vw;
    gap: 0.952vh 0.625vw;
    margin-right: 1.25vw;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
  .mobileContainer {
    width: 22.5vw;
    height: 5.714vh;
    background: #ffffff;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    border: 1px solid #dcdee5;
    border-radius: 4px;
    margin-bottom: 1.904vh;
    padding: 1.428vh 1.25vw;
    gap: 0.952vh 0.625vw;
    font-size: 16px;
    line-height: 24px;
  }
  .inValidContainerfirstName {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;

    color: #d92d20;
    margin-top: -2.1vh;
    margin-bottom: 1.2vh;
  }
  .dropdownContainer {
    position: absolute;
    left: 8vh;

    top: 36vh;

    width: 0.8vw;
    height: 1vh;
  }
}
@media screen and (max-width: 700px) {
  .mainContainer {
    display: flex;
    flex-direction: column;
  }
  .registerContainer {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 88.88vw;

    left: 5.55vw;
    top: 19.06vh;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
    line-height: 28px;

    color: #121317;
  }
  .registerHeading {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
    line-height: 28px;

    color: #121317;
  }
  .registerDescription {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #606880;

    margin-bottom: 5.156vh;
  }
  .inputContainer {
    padding: 12px 16px;
    gap: 1.25vh 2.22vw;

    width: 88.88vw;
    height: 6.25vh;

    margin-bottom: 3.906vh;
    background: #ffffff;
    border: 1px solid #dcdee5;
    border-radius: 4px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #606880;
  }
  .signInContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1.25vh 8.88vw;
    gap: 1.25vh 2.22vw;

    width: 88.88vw;

    height: 6.25vh;
    position: absolute;
    left: 0vw;
    top: 72vh;

    background: #f1c12b;
    border-radius: 4px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;

    color: #121317;
  }
  .countryCodeContainer {
    width: 20vw;

    background: #ffffff;

    border: 1px solid #dcdee5;
    border-radius: 4px;
    margin-bottom: 3.906vh;
    padding: 1.428vh 1.25vw;
    gap: 0.952vh 0.625vw;
    margin-right: 1.25vw;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
  .disclaimerContainer {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #404555;
    position: absolute;
    left: 0vw;
    top: 66vh;
  }
  .mobileContainer {
    width: 67.5vw;
    background: #ffffff;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    border: 1px solid #dcdee5;
    border-radius: 4px;
    margin-bottom: 3.906vh;
    padding: 1.428vh 1.25vw;
    gap: 0.952vh 0.625vw;
    font-size: 16px;
    line-height: 24px;
  }
  .inValidContainerfirstName {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;

    color: #d92d20;
    margin-top: -3.8vh;
    margin-bottom: 1vh;
  }
  .dropdownContainer {
    position: fixed;
    left: 12vh;

    top: 65.5vh;

    width: 2vw;
    height: 2vh;
  }
}
</style>
