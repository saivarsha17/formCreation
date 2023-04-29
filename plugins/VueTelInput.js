import Vue from "vue";
import VueTelInput from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";

const app = createApp(App);
app.use(VueTelInput);
app.mount("#app");
