  <template>
  <v-item-group multiple id="menu" class="grey lighten-5">
    <v-container>
      <v-row>
        <h2
          class="display-2 primary--text text-capitalize text-justify my-4"
        >Nuestra oferta gastronómica</h2>
      </v-row>
      <v-row>
        <v-col v-for="n in 9" :key="n" cols="12" xs="6" sm="4" md="3">
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              :color="active ? 'primary' : ''"
              class="d-flex align-center justify-center"
              dark
              elevation="3"
              height="280"
              width="240"
              @click="toggle"
            >
              <v-img
                src="https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?cs=srgb&dl=azucar-bombon-ceramico-chocolate-1028714.jpg&fm=jpg"
                height="100%"
                width="100%"
                gradient="to top left, rgba(0,0,0,.33), rgba(0,0,0,.4)"
              >
                <v-container fluid>
                  <v-row>
                    <v-col cols="12" xs="12">
                      <v-icon color="white">mdi-silverware-fork-knife</v-icon>
                      <span class="body-1 white--text ml-2">Postre</span>
                    </v-col>
                  </v-row>
                  <v-spacer />
                  <v-row>
                    <v-col cols="12" xs="12" class="mt-10">
                      <h3 class="title white--text">Mousse</h3>
                      <p
                        class="white--text font-weight-thin"
                      >Delicioso postre de chocolate amargo y frutos rojos</p>
                    </v-col>
                  </v-row>
                  <v-row justify="end">
                    <v-chip color="primary mr-2 font-weight-bold" small>$7.500</v-chip>
                  </v-row>
                </v-container>
              </v-img>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>