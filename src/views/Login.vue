<template>
  <v-container fluid class="fill-height accent lighten-4">
    <v-col cols="12" xs="6">
      <v-row justify="center" align="center">
        <v-card elevation="3" max-width="400" color="white">
          <v-card-title>
            <div class="d-flex flex-column">
              <v-icon class="my-3" color="black" size="80">mdi-account-tie</v-icon>
              <h1 class="headline text-uppercase text-center">Iniciar sesión empleado</h1>
              <p class="subtitle-1 text-center d-inline-block">Por favor ingresa tus datos.</p>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                type="email"
                placeholder="Email"
                prepend-inner-icon="mdi-email"
                solo
                required
              />
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                type="password"
                prepend-inner-icon="mdi-lock"
                solo
                required
              />
              <v-btn color="primary" type="submit" @click="login($event)" block>Iniciar sesión</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
    valid: false,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [v => !!v || "Password is required"]
  }),
  methods: {
    async login(e) {
      e.preventDefault();
      this.$refs.form.validate();
      if (this.valid) {
        setTimeout(() => {
          alert(`email: ${this.email} pass: ${this.password}`);
          this.$router.push("/admin/dashboard");
        }, [4000]);
      }
    }
  }
};
</script>
