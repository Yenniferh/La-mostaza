<template>
  <v-container fluid class="fill-height accent lighten-4">
    <v-col cols="12" xs="6">
      <v-row justify="center" align="center">
        <v-card elevation="3" max-width="400" color="white">
          <v-card-title class="headline primary text-uppercase white--text">
            Iniciar sesión empleado
          </v-card-title>
          <v-card-text>
            <v-row justify="center">
              <v-icon class="my-3" color="black" size="80"
                >mdi-account-tie</v-icon
              >
            </v-row>
            <v-divider />
            <v-form ref="form" v-model="valid" class="my-3">
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
                type="password"
                prepend-inner-icon="mdi-lock"
                solo
                required
              />
              <v-btn color="primary" type="submit" block>
                Iniciar sesión
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: 'Register',
  data: () => ({
    valid: false,
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
  }),
  watch: {
    email: () => this.$refs.form.validate(),
  },
};
</script>
