<template>
  <div class="p-tab p-settings-general py-2">
    <v-form
      ref="form"
      validate-on="invalid-input"
      class="p-form-settings"
      accept-charset="UTF-8"
      @submit.prevent="onChange"
    >
      <v-card flat tile class="mt-0 px-1 bg-background">
        <v-card-title class="pb-2 text-subtitle-2">
          {{ $gettext(`User Interface`) }}
        </v-card-title>

        <v-card-actions>
          <v-row align="start" dense>
            <v-col cols="12" sm="6">
              <v-select
                v-model="settings.ui.theme"
                :disabled="busy"
                :items="themes"
                item-title="text"
                item-value="value"
                :label="$gettext('Theme')"
                :menu-props="{ maxHeight: 346 }"
                class="input-theme"
                @update:model-value="onChangeTheme"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                v-model="settings.ui.startPage"
                :disabled="busy"
                :items="options.StartPages(settings.features)"
                item-title="text"
                item-value="value"
                :label="$gettext('Start Page')"
                :menu-props="{ maxHeight: 346 }"
                hide-details
                class="input-startpage"
                @update:model-value="onChange"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                v-model="settings.ui.language"
                :disabled="busy"
                :items="languages"
                item-title="text"
                item-value="value"
                :label="$gettext('Language')"
                :menu-props="{ maxHeight: 346 }"
                hide-details
                class="input-language"
                @update:model-value="onChange"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                v-model="settings.ui.timeZone"
                :disabled="busy"
                item-value="ID"
                item-title="Name"
                :items="options.TimeZones($gettext('Default'))"
                :label="$gettext('Time Zone')"
                :menu-props="{ maxHeight: 346 }"
                class="input-timezone"
                @update:model-value="onChangeTheme"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>

      <v-card v-if="isDemo || isSuperAdmin" flat tile class="mt-0 px-1 bg-background">
        <v-card-actions>
          <v-row align="start" dense>
            <v-col cols="12" sm="6" lg="3" class="px-2 pb-2 pt-2">
              <v-checkbox
                v-model="settings.features.people"
                :disabled="busy"
                class="ma-0 pa-0 input-people"
                density="compact"
                :label="$gettext('People')"
                :hint="$gettext('Recognize faces so people can be assigned and found.')"
                prepend-icon="mdi-account"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3" class="px-2 pb-2 pt-2">
              <v-checkbox
                v-model="settings.features.calendar"
                :disabled="busy"
                class="ma-0 pa-0 input-calendar"
                density="compact"
                :label="$gettext('Calendar')"
                :hint="$gettext('Browse and share your pictures organized into monthly albums.')"
                prepend-icon="mdi-calendar"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3" class="px-2 pb-2 pt-2">
              <v-checkbox
                v-model="settings.features.moments"
                :disabled="busy"
                class="ma-0 pa-0 input-moments"
                density="compact"
                :label="$gettext('Moments')"
                :hint="$gettext('Generate albums of special moments, journeys, and places.')"
                prepend-icon="mdi-filmstrip-box"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3" class="px-2 pb-2 pt-2">
              <v-checkbox
                v-model="settings.features.labels"
                :disabled="busy"
                class="ma-0 pa-0 input-labels"
                density="compact"
                :label="$gettext('Labels')"
                :hint="$gettext('Browse and edit image classification labels.')"
                prepend-icon="mdi-label"
                persistent-hint
                @update:model-value="onChange"
              ></v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3" class="px-2 pb-2 pt-2">
              <v-checkbox
                v-model="settings.features.private"
                :disabled="busy"
                class="ma-0 pa-0 input-private"
                density="compact"
                :label="$gettext('Private')"
                :hint="
                  $gettext('Exclude content marked as private from search results, shared albums, labels, and places.')
                "
                prepend-icon="mdi-lock"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3" class="px-2 pb-2 pt-2">
              <v-checkbox
                v-model="settings.features.upload"
                :disabled="busy || config.readonly || isDemo"
                class="ma-0 pa-0 input-upload"
                density="compact"
                :label="$gettext('Upload')"
                :hint="$gettext('Add files to your library via Web Upload.')"
                prepend-icon="mdi-cloud-upload"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3" class="px-2 pb-2 pt-2">
              <v-checkbox
                v-model="settings.features.download"
                :disabled="busy || isDemo"
                class="ma-0 pa-0 input-download"
                density="compact"
                :label="$gettext('Download')"
                :hint="$gettext('Download single files and zip archives.')"
                prepend-icon="mdi-download"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3" class="px-2 pb-2 pt-2">
              <v-checkbox
                v-model="settings.features.import"
                :disabled="busy || config.readonly || isDemo"
                class="ma-0 pa-0 input-import"
                density="compact"
                :label="$gettext('Import')"
                :hint="$gettext('Imported files will be sorted by date and given a unique name.')"
                prepend-icon="mdi-folder-plus"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3" class="px-2 pb-2 pt-2">
              <v-checkbox
                v-model="settings.features.share"
                :disabled="busy"
                class="ma-0 pa-0 input-share"
                density="compact"
                :label="$gettext('Share')"
                :hint="$gettext('Upload to WebDAV and share links with friends.')"
                prepend-icon="mdi-share-variant"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3" class="px-2 pb-2 pt-2">
              <v-checkbox
                v-model="settings.features.edit"
                :disabled="busy || isDemo"
                class="ma-0 pa-0 input-edit"
                density="compact"
                :label="$gettext('Edit')"
                :hint="$gettext('Change photo titles, locations, and other metadata.')"
                prepend-icon="mdi-pencil"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3" class="px-2 pb-2 pt-2">
              <v-checkbox
                v-model="settings.features.archive"
                :disabled="busy || isDemo"
                class="ma-0 pa-0 input-archive"
                density="compact"
                :label="$gettext('Archive')"
                :hint="$gettext('Hide photos that have been moved to archive.')"
                prepend-icon="mdi-package-down"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3" class="px-2 pb-2 pt-2">
              <v-checkbox
                v-model="settings.features.delete"
                :disabled="busy"
                class="ma-0 pa-0 input-delete"
                density="compact"
                :label="$gettext('Delete')"
                :hint="$gettext('Permanently remove files to free up storage.')"
                prepend-icon="mdi-delete"
                persistent-hint
                @update:model-value="onChange"
              ></v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3" class="px-2 pb-2 pt-2">
              <v-checkbox
                v-model="settings.features.services"
                :disabled="busy"
                class="ma-0 pa-0 input-services"
                density="compact"
                :label="$gettext('Services')"
                :hint="$gettext('Share your pictures with other apps and services.')"
                prepend-icon="mdi-sync"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3" class="px-2 pb-2 pt-2">
              <v-checkbox
                v-model="settings.features.library"
                :disabled="busy || isDemo"
                class="ma-0 pa-0 input-library"
                density="compact"
                :label="$gettext('Library')"
                :hint="$gettext('Index and import files through the user interface.')"
                prepend-icon="mdi-film"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3" class="px-2 pb-2 pt-2">
              <v-checkbox
                v-model="settings.features.files"
                :disabled="busy"
                class="ma-0 pa-0 input-files"
                density="compact"
                :label="$gettext('Originals')"
                :hint="$gettext('Browse indexed files and folders in Library.')"
                prepend-icon="mdi-file-tree"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3" class="px-2 pb-2 pt-2">
              <v-checkbox
                v-model="settings.features.logs"
                :disabled="busy"
                class="ma-0 pa-0 input-logs"
                density="compact"
                :label="$gettext('Logs')"
                :hint="$gettext('Show server logs in Library.')"
                prepend-icon="mdi-playlist-check"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3" class="px-2 pb-2 pt-2">
              <v-checkbox
                v-model="settings.features.account"
                :disabled="busy || isDemo"
                class="ma-0 pa-0 input-account"
                density="compact"
                :label="$gettext('Account')"
                :hint="$gettext('Change personal profile and security settings.')"
                prepend-icon="mdi-shield-account-variant"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col v-if="!config.disable.places" cols="12" sm="6" lg="3" class="px-2 pb-2 pt-2">
              <v-checkbox
                v-model="settings.features.places"
                :disabled="busy || isDemo"
                class="ma-0 pa-0 input-places"
                density="compact"
                :label="$gettext('Places')"
                :hint="$gettext('Search and display photos on a map.')"
                prepend-icon="mdi-map-marker"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>

      <v-card v-if="settings.features.places && !config.disable.places" flat tile class="mt-0 px-1 bg-background">
        <v-card-title class="pb-2 text-subtitle-2">
          {{ $gettext(`Places`) }}
        </v-card-title>

        <v-card-actions>
          <v-row align="start" dense>
            <v-col cols="12" sm="6">
              <v-select
                v-model="settings.maps.style"
                :disabled="busy"
                :items="mapsStyle"
                item-title="text"
                item-value="value"
                :label="$gettext('Maps')"
                :menu-props="{ maxHeight: 346 }"
                hide-details
                class="input-style"
                @update:model-value="onChangeMapsStyle"
              >
              </v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                v-model="settings.maps.animate"
                :disabled="busy"
                :items="options.MapsAnimate()"
                item-title="text"
                item-value="value"
                :label="$gettext('Animation')"
                :menu-props="{ maxHeight: 346 }"
                hide-details
                class="input-animate"
                @update:model-value="onChange"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-form>
    <p-about-footer></p-about-footer>
    <p-confirm-sponsor :visible="dialog.sponsor" @close="dialog.sponsor = false"></p-confirm-sponsor>
  </div>
</template>

<script>
import Settings from "model/settings";
import * as options from "options/options";
import * as themes from "options/themes";
import PAboutFooter from "component/about/footer.vue";
import PConfirmSponsor from "component/confirm/sponsor.vue";

export default {
  name: "PSettingsGeneral",
  components: {
    PAboutFooter,
    PConfirmSponsor,
  },
  data() {
    return {
      isDemo: this.$config.isDemo(),
      isAdmin: this.$session.isAdmin(),
      isSuperAdmin: this.$session.isSuperAdmin(),
      isPublic: this.$config.get("public"),
      config: this.$config.values,
      settings: new Settings(this.$config.getSettings()),
      options: options,
      busy: this.$config.loading(),
      subscriptions: [],
      themes: [],
      currentTheme: this.$config.themeName,
      mapsStyle: options.MapsStyle(this.$config.get("experimental")),
      currentMapsStyle: this.$config.getSettings().maps.style,
      languages: options.Languages(),
      dialog: {
        sponsor: false,
      },
    };
  },
  created() {
    this.load();
    this.subscriptions.push(
      this.$event.subscribe("config.updated", (ev, data) => this.settings.setValues(data.config.settings))
    );
  },
  beforeUnmount() {
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.$event.unsubscribe(this.subscriptions[i]);
    }
  },
  methods: {
    load() {
      this.$config.load().then(() => {
        this.themes = themes.Translated();
        this.mapsStyle = options.MapsStyle(this.$config.get("experimental"));
        this.settings.setValues(this.$config.getSettings());
        this.busy = false;
      });
    },
    onChangeTheme(value) {
      if (!value || !themes.Get(value)) {
        return false;
      }

      this.currentTheme = value;
      this.onChange();
    },
    onChangeMapsStyle(value) {
      if (!value) {
        this.currentMapsStyle = value;
        this.onChange();
        return;
      }

      const style = this.mapsStyle.find((s) => s.value === value);

      if (!style) {
        return false;
      }

      this.$sponsorFeatures()
        .then(() => {
          this.currentMapsStyle = value;
          this.onChange();
        })
        .catch(() => {
          if (style.sponsor) {
            this.dialog.sponsor = true;
            this.$nextTick(() => {
              this.settings.maps.style = this.currentMapsStyle;
            });
          } else {
            this.currentMapsStyle = value;
            this.onChange();
          }
        });
    },
    onChange() {
      const locale = this.settings.changed("ui", "language");

      if (locale) {
        this.busy = true;
      }

      this.settings
        .save()
        .then(() => {
          this.$config.setSettings(this.settings);
          if (locale) {
            this.$notify.info(this.$gettext("Reloading…"));
            this.$notify.blockUI();
            setTimeout(() => window.location.reload(), 100);
          } else {
            this.$notify.success(this.$gettext("Changes successfully saved"));
          }
        })
        .finally(() => (this.busy = false));
    },
  },
};
</script>
