<template>
  <div class="p-tab p-settings-advanced py-2">
    <v-form
      ref="form"
      validate-on="invalid-input"
      class="p-form-settings"
      accept-charset="UTF-8"
      @submit.prevent="onChange"
    >
      <v-card flat tile class="mt-0 px-1 bg-background">
        <v-card-actions v-if="$config.values.restart">
          <v-row align="start" dense>
            <v-col cols="12" class="pa-2 text-start">
              <v-alert color="primary" icon="mdi-information" class="pa-2" type="info" variant="outlined">
                <a style="color: inherit" href="#restart">
                  {{ $gettext(`Changes to the advanced settings require a restart to take effect.`) }}
                </a>
              </v-alert>
            </v-col>
          </v-row>
        </v-card-actions>

        <v-card-title class="pb-0 text-subtitle-2">
          {{ $gettext(`Global Options`) }}
        </v-card-title>

        <v-card-actions>
          <v-row align="start" dense>
            <v-col cols="12" sm="6" lg="3">
              <v-checkbox
                v-model="settings.Debug"
                :disabled="busy"
                class="ma-0 pa-0 input-debug"
                density="compact"
                color="surface-variant"
                :label="$gettext('Debug Logs')"
                :hint="$gettext('Enable debug mode to display additional logs and help with troubleshooting.')"
                prepend-icon="mdi-bug"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3">
              <v-checkbox
                v-model="settings.Experimental"
                :disabled="busy"
                class="ma-0 pa-0 input-experimental"
                density="compact"
                color="surface-variant"
                :label="$gettext('Experimental Features')"
                :hint="$gettext('Enable new features that may be incomplete or unstable.')"
                prepend-icon="mdi-flask-empty"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3">
              <v-checkbox
                v-model="settings.ReadOnly"
                :disabled="busy"
                class="ma-0 pa-0 input-readonly"
                density="compact"
                color="surface-variant"
                :label="$gettext('Read-Only Mode')"
                :hint="$gettext('Disable features that require write permission for the originals folder.')"
                prepend-icon="mdi-hand-back-right-off"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3">
              <v-checkbox
                v-model="settings.DisableBackups"
                :disabled="busy"
                class="ma-0 pa-0 input-disable-backups"
                density="compact"
                color="surface-variant"
                :label="$gettext('Disable Backups')"
                :hint="$gettext('Prevent database and album backups as well as YAML sidecar files from being created.')"
                prepend-icon="mdi-shield-off"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3">
              <v-checkbox
                v-model="settings.DisableWebDAV"
                :disabled="busy"
                class="ma-0 pa-0 input-disable-webdav"
                density="compact"
                color="surface-variant"
                :label="$gettext('Disable WebDAV')"
                :hint="$gettext('Prevent other apps from accessing PhotoPrism as a shared network drive.')"
                prepend-icon="mdi-sync-off"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3">
              <v-checkbox
                v-model="settings.DisablePlaces"
                :disabled="busy"
                class="ma-0 pa-0 input-disable-places"
                density="compact"
                color="surface-variant"
                :label="$gettext('Disable Places')"
                :hint="$gettext('Disable interactive world maps and reverse geocoding.')"
                prepend-icon="mdi-map-marker-off"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3">
              <v-checkbox
                v-model="settings.DisableExifTool"
                :disabled="busy || (!settings.Experimental && !settings.DisableExifTool)"
                class="ma-0 pa-0 input-disable-exiftool"
                density="compact"
                color="surface-variant"
                :label="$gettext('Disable ExifTool')"
                :hint="$gettext('ExifTool is required for full support of XMP metadata, videos and Live Photos.')"
                prepend-icon="mdi-movie-off-outline"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="3">
              <v-checkbox
                v-model="settings.DisableTensorFlow"
                :disabled="busy"
                class="ma-0 pa-0 input-disable-tensorflow"
                density="compact"
                color="surface-variant"
                :label="$gettext('Disable TensorFlow')"
                :hint="
                  $gettext(
                    'TensorFlow is required for image classification, facial recognition, and detecting unsafe content.'
                  )
                "
                prepend-icon="mdi-layers-off"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>
          </v-row>
        </v-card-actions>

        <template v-if="!settings.DisableBackups">
          <v-card-title class="pb-0 text-subtitle-2">
            {{ $gettext(`Backup`) }}
          </v-card-title>

          <v-card-actions>
            <v-row align="start" dense>
              <v-col cols="12" sm="4">
                <v-checkbox
                  v-model="settings.BackupDatabase"
                  :disabled="busy || settings.BackupSchedule === ''"
                  class="ma-0 pa-0 input-backup-database"
                  density="compact"
                  color="surface-variant"
                  :label="$gettext('Database Backups')"
                  :hint="$gettext('Create regular backups based on the configured schedule.')"
                  prepend-icon="mdi-history"
                  persistent-hint
                  @update:model-value="onChange"
                >
                </v-checkbox>
              </v-col>

              <v-col cols="12" sm="4">
                <v-checkbox
                  v-model="settings.BackupAlbums"
                  :disabled="busy"
                  class="ma-0 pa-0 input-backup-albums"
                  density="compact"
                  color="surface-variant"
                  :label="$gettext('Album Backups')"
                  :hint="$gettext('Create YAML files to back up album metadata.')"
                  prepend-icon="mdi-image-album"
                  persistent-hint
                  @update:model-value="onChange"
                >
                </v-checkbox>
              </v-col>

              <v-col cols="12" sm="4">
                <v-checkbox
                  v-model="settings.SidecarYaml"
                  :disabled="busy"
                  class="ma-0 pa-0 input-sidecar-yaml"
                  density="compact"
                  color="surface-variant"
                  :label="$gettext('Sidecar Files')"
                  :hint="$gettext('Create YAML sidecar files to back up picture metadata.')"
                  prepend-icon="mdi-clipboard-file-outline"
                  persistent-hint
                  @update:model-value="onChange"
                >
                </v-checkbox>
              </v-col>
            </v-row>
          </v-card-actions>
        </template>

        <v-card-title class="pb-0 text-subtitle-2">
          {{ $gettext(`Preview Images`) }}
        </v-card-title>

        <v-card-actions class="grid">
          <v-row align="start">
            <v-col v-if="settings.ThumbLibrary === 'imaging'" cols="12" class="py-2">
              <v-select
                v-model="settings.ThumbFilter"
                :disabled="busy"
                :items="options.ThumbFilters()"
                :label="$gettext('Downscaling Filter')"
                density="compact"
                color="surface-variant"
                bg-color="secondary-light"
                hide-details
                variant="solo"
                @update:model-value="onChange"
              ></v-select>
            </v-col>

            <v-col cols="12" lg="4" class="py-2">
              <v-list-subheader class="pa-0">
                {{ $gettextInterpolate($gettext("Static Size Limit: %{n}px"), { n: parseInt(settings.ThumbSize) }) }}
              </v-list-subheader>
              <v-slider
                v-model="settings.ThumbSize"
                :min="720"
                :max="7680"
                :step="4"
                :disabled="busy"
                hide-details
                class="ma-0"
                @end="onChange"
              ></v-slider>
            </v-col>

            <v-col cols="12" sm="6" lg="4" class="py-2">
              <v-list-subheader class="pa-0">
                {{
                  $gettextInterpolate($gettext("Dynamic Size Limit: %{n}px"), {
                    n: parseInt(settings.ThumbSizeUncached),
                  })
                }}
              </v-list-subheader>
              <v-slider
                v-model="settings.ThumbSizeUncached"
                :min="720"
                :max="7680"
                :step="4"
                :disabled="busy"
                hide-details
                class="ma-0"
                @end="onChange"
              ></v-slider>
            </v-col>

            <v-col cols="12" sm="6" lg="4" class="py-2">
              <v-checkbox
                v-model="settings.ThumbUncached"
                :disabled="busy"
                class="ma-0 pa-0"
                density="compact"
                color="surface-variant"
                :label="$gettext('Dynamic Previews')"
                :hint="
                  $gettext(
                    'On-demand generation of thumbnails may cause high CPU and memory usage. It is not recommended for resource-constrained servers and NAS devices.'
                  )
                "
                prepend-icon="mdi-memory"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>
          </v-row>
        </v-card-actions>

        <v-card-title class="pb-0 text-subtitle-2">
          {{ $gettext(`Image Quality`) }}
        </v-card-title>

        <v-card-actions class="grid">
          <v-row align="start">
            <v-col cols="12" lg="4" class="py-2">
              <v-list-subheader class="pa-0">
                {{ $gettextInterpolate($gettext("JPEG Quality: %{n}"), { n: parseInt(settings.JpegQuality) }) }}
              </v-list-subheader>
              <v-slider
                v-model="settings.JpegQuality"
                :min="25"
                :max="100"
                :disabled="busy"
                hide-details
                class="ma-0"
                @end="onChange"
              ></v-slider>
            </v-col>

            <v-col cols="12" sm="6" lg="4" class="py-2">
              <v-list-subheader class="pa-0">
                {{ $gettextInterpolate($gettext("JPEG Size Limit: %{n}px"), { n: parseInt(settings.JpegSize) }) }}
              </v-list-subheader>
              <v-slider
                v-model="settings.JpegSize"
                :min="720"
                :max="30000"
                :step="20"
                :disabled="busy"
                class="ma-0"
                @end="onChange"
              ></v-slider>
            </v-col>

            <v-col cols="12" sm="6" lg="4" class="py-2">
              <v-list-subheader class="pa-0">
                {{ $gettextInterpolate($gettext("PNG Size Limit: %{n}px"), { n: parseInt(settings.PngSize) }) }}
              </v-list-subheader>
              <v-slider
                v-model="settings.PngSize"
                :min="720"
                :max="30000"
                :step="20"
                :disabled="busy"
                class="ma-0"
                @end="onChange"
              ></v-slider>
            </v-col>
          </v-row>
        </v-card-actions>

        <v-card-title class="py-0 text-subtitle-2">
          {{ $gettext(`File Conversion`) }}
        </v-card-title>

        <v-card-actions>
          <v-row align="start" dense>
            <v-col cols="12" sm="6" lg="4">
              <v-checkbox
                v-model="settings.DisableDarktable"
                :disabled="busy || settings.DisableRaw"
                class="ma-0 pa-0 input-disable-darktable"
                density="compact"
                color="surface-variant"
                :label="$gettext('Disable Darktable')"
                :hint="$gettext('Don\'t use Darktable to convert RAW images.')"
                prepend-icon="mdi-raw-off"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="4">
              <v-checkbox
                v-model="settings.DisableRawTherapee"
                :disabled="busy || settings.DisableRaw"
                class="ma-0 pa-0 input-disable-rawtherapee"
                density="compact"
                color="surface-variant"
                :label="$gettext('Disable RawTherapee')"
                :hint="$gettext('Don\'t use RawTherapee to convert RAW images.')"
                prepend-icon="mdi-raw-off"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="4">
              <v-checkbox
                v-model="settings.RawPresets"
                :disabled="busy || settings.DisableRaw"
                class="ma-0 pa-0 input-raw-presets"
                density="compact"
                color="surface-variant"
                :label="$gettext('Use Presets')"
                :hint="$gettext('Enables RAW converter presets. May reduce performance.')"
                prepend-icon="mdi-circle-half-full"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="4">
              <v-checkbox
                v-model="settings.DisableImageMagick"
                :disabled="busy"
                class="ma-0 pa-0 input-disable-imagemagick"
                density="compact"
                color="surface-variant"
                :label="$gettext('Disable ImageMagick')"
                :hint="$gettext('Don\'t use ImageMagick to convert images.')"
                prepend-icon="mdi-auto-fix"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6" lg="4">
              <v-checkbox
                v-model="settings.DisableFFmpeg"
                :disabled="busy || (!settings.Experimental && !settings.DisableFFmpeg)"
                class="ma-0 pa-0 input-disable-ffmpeg"
                density="compact"
                color="surface-variant"
                :label="$gettext('Disable FFmpeg')"
                :hint="$gettext('Disables video transcoding and thumbnail extraction.')"
                prepend-icon="mdi-video-off"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>

            <v-col v-if="isSponsor" cols="12" sm="6" lg="4">
              <v-checkbox
                v-model="settings.DisableVectors"
                :disabled="busy"
                class="ma-0 pa-0 input-disable-vectors"
                density="compact"
                color="surface-variant"
                :label="$gettext('Disable Vectors')"
                :hint="$gettext('Disables vector graphics support.')"
                prepend-icon="mdi-alpha-a-box"
                persistent-hint
                @update:model-value="onChange"
              >
              </v-checkbox>
            </v-col>
          </v-row>
        </v-card-actions>

        <v-card-actions v-if="!config.disable.restart" class="pt-6 d-flex flex-wrap ga-2">
          <a id="restart"></a>
          <v-btn
            color="highlight"
            :block="$vuetify.display.xs"
            :disabled="busy || !$config.values.restart"
            variant="flat"
            @click.stop.p.prevent="onRestart"
          >
            {{ $gettext(`Restart`) }}
            <v-icon end>mdi-restart</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>

    <p-about-footer></p-about-footer>
  </div>
</template>

<script>
import ConfigOptions from "model/config-options";
import * as options from "options/options";
import { restart } from "common/server";
import PAboutFooter from "component/about/footer.vue";

export default {
  name: "PSettingsAdvanced",
  components: {
    PAboutFooter,
  },
  data() {
    return {
      busy: this.$config.get("demo"),
      isDemo: this.$config.get("demo"),
      isPublic: this.$config.get("public"),
      isSponsor: this.$config.isSponsor(),
      readonly: this.$config.get("readonly"),
      config: this.$config.values,
      rtl: this.$isRtl,
      settings: new ConfigOptions(false),
      options: options,
    };
  },
  created() {
    if (this.isPublic && !this.isDemo) {
      this.$router.push({ name: "settings" });
    } else {
      this.load();
    }
  },
  methods: {
    onRestart() {
      this.busy = true;
      restart().finally(() => {
        this.busy = false;
      });
    },
    load() {
      if (this.busy || this.isDemo) {
        return;
      }

      this.busy = true;
      this.settings.load().finally(() => {
        this.busy = false;
      });
    },
    onChange() {
      if (this.busy || this.isDemo) {
        return;
      }

      this.busy = true;

      this.settings
        .save()
        .then(() => {
          this.$notify.success(this.$gettext("Changes successfully saved"));
        })
        .finally(() => (this.busy = false));
    },
  },
};
</script>
