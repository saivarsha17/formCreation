<template>
  <div class="mainContainer">
    <companyPage />

    <div class="signInContainer">
      <div class="signInText">Sign In to WisdomCircle</div>
      <div class="signInDescription">
        Don’t have an account?<span style="color: #2558e5">
          <NextLink @click="handleSignUp">Sign Up </NextLink>
        </span>
      </div>

      <input
        v-model="userNameOrEmail"
        :style="{ color: inValidEmailId ? '#d92d20' : '#606880' }"
        class="inputEmail"
        placeholder="Email or Mobile Number"
      />
      <div v-if="inValidEmailId" class="inValidContainerEmail">
        {{ invalidEmailText }}
      </div>

      <input
        :style="{ color: inValidPassword ? '#d92d20' : '#606880' }"
        v-model="password"
        v-if="showPassword"
        class="inputPassword"
        placeholder="Password"
      />

      <input
        v-else
        :style="{ color: inValidPassword ? '#d92d20' : '#606880' }"
        v-model="hidePassword"
        v-on:keypress="onKeyPress"
        class="inputPassword"
        placeholder="Password"
        @input="maskInput"
      />

      <NextLink @click="handleIconChange">
        <img
          v-if="showPassword"
          src="../assets/show.png"
          alt="Show Password"
          class="passwordHideAndShow"
        />

        <img
          v-else
          src="../assets/hide.png"
          alt="Hide Password"
          class="passwordHideAndShow"
        />
      </NextLink>

      <div v-if="inValidPassword" class="inValidContainerPassword">
        {{ inValidPasswordText }}
      </div>
      <NextLink @click="handleButtonClick">
        <div class="buttonSignIn">Sign In</div>
      </NextLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      userNameOrEmail: "",
      password: "",
      inValidEmailId: false,
      invalidEmailText: "Please enter a valid email address",
      inValidPasswordText: "Please enter a valid password",
      inValidPassword: false,
      showPassword: true,
      hidePassword: "",
      check: "",
    };
  },
  methods: {
    onKeyPress(event) {
      console.log(event.key);
    },
    maskInput() {
      this.password += this.hidePassword[this.hidePassword.length - 1];
      this.hidePassword = "*".repeat(this.hidePassword.length);
    },
    handleSignUp() {
      this.$router.push("/register");
    },
    handleIconChange() {
      this.showPassword = !this.showPassword;
      this.hidePassword = "*".repeat(this.password.length);
    },
    handleButtonClick() {
      console.log("enter");
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const phoneRegex = /^\d{10,}$/;
      const isEmail = emailRegex.test(this.userNameOrEmail);
      const isPhone = phoneRegex.test(this.userNameOrEmail);
      console.log("enter ext", isPhone, isEmail);

      if (this.userNameOrEmail.length === 0) {
        this.inValidEmailId = true;
        setTimeout(() => {
          this.inValidEmailId = false;
        }, 2000);
        return;
      } else if (!isEmail && !isPhone) {
        console.log("enter ext", isPhone, isEmail);
        this.inValidEmailId = true;
        setTimeout(() => {
          this.inValidEmailId = false;
        }, 2000);
        if (!isEmail && !isPhone) {
          const numChars = this.userNameOrEmail.replace(/[^a-z]/gi, "").length;
          const numNumbers = this.userNameOrEmail.replace(/[^0-9]/g, "").length;

          if (numChars >= numNumbers) {
            this.invalidEmailText = "Please enter a valid email address";
          } else {
            this.invalidEmailText = "Please enter a valid phone number";
          }
        } else if (!isEmail) {
          this.invalidEmailText = "Please enter a valid email address";
        } else {
          this.invalidEmailText = "Please enter a valid phone number";
        }
        return;
      } else if (isPhone && this.userNameOrEmail.length != 10) {
        this.inValidEmailId = true;
        setTimeout(() => {
          this.inValidEmailId = false;
        }, 2000);
        this.invalidEmailText = "Please enter a valid phone number";
        return;
      } else if (this.password.length === 0) {
        this.inValidPassword = true;
        setTimeout(() => {
          this.inValidPassword = false;
        }, 2000);
        return;
      } else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          userId: this.userNameOrEmail,
          password: this.password,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("http://localhost:4001/signin", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            const data = JSON.parse(result);
            console.log("type", typeof data.isVerified, data);
            if (data.done === true) {
              if (data.isVerified == "1") {
                this.$router.push("/details");
              } else {
                console.log(data, "data");
                this.$router.push({
                  path: "/verify",
                  params: { email: "saivarshatedla@gmail.com" },

                  query: { email: data.email },
                });
              }
            } else {
              if (data.isUser) {
                this.inValidEmailId = true;
                this.invalidEmailText = data.message;
                setTimeout(() => {
                  this.inValidEmailId = false;
                }, 2000);
              }
              if (data.isPassword) {
                this.inValidPassword = true;
                this.inValidPasswordText = data.message;

                setTimeout(() => {
                  this.inValidPassword = false;
                }, 2000);
              }
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
  .signInContainer {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 55.55vw;
    top: 32.5vh;
  }
  .signInText {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 2.857vh;
    line-height: 3.809vh;

    color: #121317;
  }
  .signInDescription {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;

    color: #404555;

    font-size: 1.905vh;
    line-height: 2.857vh;

    margin-bottom: 2.857vh;
  }
  .inputContainer {
    background: #ffffff;
    border: 1px solid #dcdee5;
    border-radius: 4px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #606880;
  }
  .inputEmail {
    padding: 1.428vh 1.25vw;
    gap: 0.952vh 0.625vw;
    width: 30vw;
    max-width: 30vw;
    height: 5.714vh;

    border: 1px solid #dcdee5;
    border-radius: 4px;
    margin-bottom: 1.904vh;
  }
  .inputPassword {
    padding: 1.428vh 1.25vw;
    gap: 0.952vh 0.625vw;
    width: 30vw;
    max-width: 30vw;
    height: 5.714vh;
    border: 1px solid #dcdee5;
    border-radius: 4px;
  }
  .buttonSignIn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1.309vh 2.5vw;
    gap: 0.952vh 0.625vw;

    width: 30vw;
    height: 5.714vh;
    position: fixed;

    left: 55.46vw;
    top: 61.78vh;

    background: #f1c12b;
    border-radius: 4px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;

    color: #121317;
  }
  .passwordHideAndShow {
    position: relative;
    left: 27.5vw;
    top: -3.8vh;

    /* Neutral / Charcoal */
  }
  .inValidContainerEmail {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;

    color: #d92d20;
    margin-bottom: 1.904vh;
    margin-top: -1.79vh;
  }
  .inValidContainerPassword {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;

    color: #d92d20;
    margin-top: -1.79vh;
  }
}
@media screen and (max-width: 700px) {
  .mainContainer {
    display: flex;
    flex-direction: column;
  }
  .signInContainer {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 88.88vw;
    height: 4.375vh;
    left: 5.55vw;
    top: 19.0625vh;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
    line-height: 28px;

    color: #121317;
  }
  .signInText {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
    line-height: 28px;

    color: #121317;
  }
  .signInDescription {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #606880;

    margin-bottom: 5.15625vh;
  }
  .inputContainer {
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
  .inputEmail {
    padding: 1.875vh 4.44vw;
    gap: 1.25vh 2.22vw;

    width: 88.88vw;
    height: 6.25vh;

    margin-bottom: 3.9vh;
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
  .inputPassword {
    padding: 1.875vh 4.44vw;
    gap: 1.25vh 2.22vw;

    width: 88.88vw;
    height: 6.25vh;
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
  .buttonSignIn {
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
    top: 70vh;

    background: #f1c12b;
    border-radius: 4px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;

    color: #121317;
  }
  .passwordHideAndShow {
    position: relative;
    left: 80vw;
    top: -4vh;

    /* Neutral / Charcoal */
  }
  .inValidContainerEmail {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;

    color: #d92d20;
    margin-bottom: 2.5vh;
    margin-top: -3.91vh;
  }
  .inValidContainerPassword {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    margin-top: -2.7vh;

    color: #d92d20;
  }
}
</style>
