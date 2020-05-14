<template>
  <div class="home">
    <Hero></Hero>
    <Who></Who>
    <Menu></Menu>
    <Contact></Contact>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Hero from "@/components/Home/Hero.vue";
import Who from "@/components/Home/Who.vue";
import Menu from "@/components/Home/Menu.vue";
import Contact from "@/components/Home/Contact.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld,
    Hero,
    Who,
    Menu,
    Contact
  }
};
</script>
