import { $gettext, T } from "common/vm";

/* Theme Styles */

let variables = {
  "btn-height": "32px",
  "table-row-height": "44px",
  "table-header-height": "44px",
  "border-color": "#FFFFFF",
  "border-opacity": 0.12,
  "high-emphasis-opacity": 0.96,
  "medium-emphasis-opacity": 0.88,
  "disabled-opacity": 0.9,
  "idle-opacity": 0.1,
  "hover-opacity": 0.016,
  "focus-opacity": 0.018,
  "selected-opacity": 0.08,
  "activated-opacity": 0,
  "pressed-opacity": 0.16,
  "dragged-opacity": 0.08,
  "overlay-color": "#121212",
  "overlay-opacity": 0.42,
  "theme-kbd": "#212529",
  "theme-on-kbd": "#FFFFFF",
  "theme-code": "#343434",
  "theme-on-code": "#CCCCCC",
};

let themes = {
  default: {
    dark: true,
    sponsor: false,
    title: "Default",
    name: "default",
    colors: {
      background: "#2f3031",
      surface: "#191a1b",
      "on-surface": "#ffffff",
      "surface-bright": "#333333",
      "surface-light": "#1c1d1e",
      "surface-variant": "#7E4FE3",
      "on-surface-variant": "#f6f7e8",
      card: "#232425",
      table: "#252627",
      button: "#232425",
      primary: "#9E7BEA",
      "primary-button": "#5F1DB7",
      "primary-darken-1": "#8265bf",
      secondary: "#1c1d1e",
      "secondary-light": "#282929",
      "secondary-darken-1": "#18191a",
      accent: "#2D2E2E",
      error: "#e57373",
      info: "#00acc1",
      success: "#4db6ac",
      warning: "#ffd740",
      remove: "#DF5353",
      restore: "#3EA2F4",
      album: "#ffab00",
      download: "#00bfa5",
      private: "#00b8d4",
      edit: "#0AA9FF",
      share: "#9575cd",
      love: "#ef5350",
      terminal: "#4A464F",
      navigation: "#141417",
      "navigation-home": "#0e0f10",
    },
    variables,
  },
  abyss: {
    title: "Abyss",
    name: "abyss",
    dark: true,
    sponsor: true,
    colors: {
      background: "#202020",
      surface: "#202020",
      card: "#242424",
      primary: "#814fd9",
      "primary-button": "#7e57c2",
      "surface-variant": "#814fd9",
      "on-surface-variant": "#1a1a1a",
      secondary: "#111111",
      "secondary-light": "#1a1a1a",
      accent: "#090c10",
      error: "#e57373",
      info: "#00acc1",
      success: "#26A69A",
      warning: "#ffd740",
      remove: "#9575cd",
      restore: "#64b5f6",
      album: "#7e57c2",
      download: "#673ab7",
      private: "#512da8",
      edit: "#4527a0",
      share: "#311b92",
      love: "#ef5350",
      terminal: "#333333",
      navigation: "#0d0d0d",
      "navigation-home": "#000000",
    },
  },
  carbon: {
    dark: true,
    sponsor: true,
    title: "Carbon",
    name: "carbon",
    colors: {
      background: "#16141c",
      surface: "#16141c",
      card: "#292732",
      primary: "#8a6eff",
      "primary-button": "#53478a",
      "surface-variant": "#7f63fd",
      secondary: "#0E0D12",
      "secondary-light": "#292733",
      accent: "#262238",
      error: "#e57373",
      info: "#00acc1",
      success: "#26A69A",
      warning: "#ffd740",
      remove: "#e57373",
      restore: "#64b5f6",
      album: "#ffab00",
      download: "#00bfa5",
      private: "#00b8d4",
      edit: "#0AA9FF",
      share: "#9575cd",
      love: "#ef5350",
      terminal: "#292733",
      navigation: "#0E0D12",
      "navigation-home": "#0E0D12",
    },
  },
  chrome: {
    dark: true,
    sponsor: false,
    title: "Chrome",
    name: "chrome",
    colors: {
      background: "#1d1d1d",
      surface: "#1d1d1d",
      card: "#1f1f1f",
      primary: "#ffffff",
      "primary-button": "#393939",
      "surface-variant": "#ffffff",
      secondary: "#1f1f1f",
      "secondary-light": "#292929",
      accent: "#727272",
      error: "#d36161",
      info: "#0696a7",
      success: "#3da097",
      warning: "#e5c036",
      remove: "#d35442",
      restore: "#3bbeaf",
      album: "#e39c0b",
      download: "#06a590",
      private: "#0AA9C2",
      edit: "#009FF5",
      share: "#9575cd",
      love: "#dd3f3e",
      terminal: "#2f3131",
      navigation: "#1e2122",
      "navigation-home": "#1e2122",
    },
  },
  gemstone: {
    title: "Gemstone",
    name: "gemstone",
    dark: true,
    sponsor: true,
    colors: {
      background: "#2f2f31",
      surface: "#2f2f31",
      card: "#2b2b2d",
      primary: "#AFB4D4",
      "primary-button": "#545465",
      "surface-variant": "#9BA0C5",
      secondary: "#272727",
      "secondary-light": "#37373a",
      accent: "#333",
      error: "#e57373",
      info: "#00acc1",
      success: "#26A69A",
      warning: "#ffd740",
      remove: "#e57373",
      restore: "#64b5f6",
      album: "#ffab00",
      download: "#00bfa5",
      private: "#00b8d4",
      edit: "#0AA9FF",
      share: "#9575cd",
      love: "#ef5350",
      terminal: "#4A464F",
      navigation: "#1C1C21",
      "navigation-home": "#131316",
    },
  },
  grayscale: {
    title: "Grayscale",
    name: "grayscale",
    dark: true,
    sponsor: false,
    colors: {
      background: "#525252",
      surface: "#525252",
      card: "#5e5e5e",
      primary: "#c8bdb1",
      "primary-button": "#726e69",
      "surface-variant": "#c8bdb1",
      secondary: "#444",
      "secondary-light": "#5E5E5E",
      accent: "#333",
      error: "#e57373",
      info: "#5a94dd",
      success: "#26A69A",
      warning: "#e3d181",
      love: "#ef5350",
      remove: "#e35333",
      restore: "#64b5f6",
      album: "#ffab40",
      download: "#07bd9f",
      private: "#48bcd6",
      edit: "#0AA9FF",
      share: "#0070a0",
      terminal: "#333333",
      navigation: "#353839",
      "navigation-home": "#212121",
    },
  },
  lavender: {
    title: "Lavender",
    name: "lavender",
    dark: false,
    sponsor: false,
    colors: {
      background: "#fafafa",
      surface: "#FAFBFF",
      card: "#DFE0E8",
      primary: "#9ca2c9",
      "primary-button": "#6c6f84",
      "surface-variant": "#475185",
      secondary: "#E2E5F3",
      "secondary-light": "#eef0f6",
      accent: "#EAEAF3",
      error: "#e57373",
      info: "#00acc1",
      success: "#26A69A",
      warning: "#ffd740",
      remove: "#e57373",
      restore: "#64b5f6",
      album: "#ffab00",
      download: "#00bfa5",
      private: "#00b8d4",
      edit: "#0AA9FF",
      share: "#9575cd",
      love: "#ef5350",
      terminal: "#333333",
      navigation: "#1b1e32",
      "navigation-home": "#121421",
    },
  },
  legacy: {
    title: "Legacy",
    name: "legacy",
    dark: false,
    sponsor: false,
    colors: {
      background: "#F5F5F5",
      surface: "#F5F5F5",
      card: "#e0e0e0",
      primary: "#FFCA28",
      "primary-button": "#212121",
      "surface-variant": "#212121",
      secondary: "#bdbdbd",
      "secondary-light": "#e0e0e0",
      accent: "#757575",
      error: "#e57373",
      info: "#00acc1",
      success: "#26A69A",
      warning: "#ffd740",
      remove: "#e57373",
      restore: "#64b5f6",
      album: "#ffab00",
      download: "#00bfa5",
      private: "#00b8d4",
      edit: "#00b8d4",
      share: "#9575cd",
      love: "#ef5350",
      terminal: "#333333",
      navigation: "#212121",
      "navigation-home": "#000000",
    },
  },
  mint: {
    dark: true,
    sponsor: false,
    title: "Mint",
    name: "mint",
    colors: {
      background: "#121212",
      surface: "#121212",
      card: "#1e1e1e",
      primary: "#2bb14c",
      "primary-button": "#22903d",
      "surface-variant": "#2bb14c",
      secondary: "#181818",
      "secondary-light": "#1f1f1f",
      accent: "#727272",
      error: "#d36161",
      info: "#0696a7",
      success: "#3da097",
      warning: "#e5c036",
      remove: "#d35442",
      restore: "#3bbeaf",
      album: "#e39c0b",
      download: "#06a590",
      private: "#0bb1ca",
      edit: "#0AA9FF",
      share: "#9575cd",
      love: "#ef5350",
      terminal: "#181818",
      navigation: "#181818",
      "navigation-home": "#181818",
    },
  },
  neon: {
    title: "Neon",
    name: "neon",
    dark: true,
    sponsor: true,
    colors: {
      background: "#242326",
      surface: "#242326",
      card: "#1b1a1c",
      primary: "#f44abf",
      "primary-button": "#890664",
      "surface-variant": "#cc0d99",
      secondary: "#111111",
      "secondary-light": "#1a1a1a",
      accent: "#090c10",
      error: "#e57373",
      info: "#00acc1",
      success: "#26A69A",
      warning: "#fece3e",
      love: "#fb4483",
      remove: "#9100a0",
      restore: "#5e33f8",
      album: "#6234b5",
      download: "#8d56eb",
      private: "#4749c8",
      edit: "#5658eb",
      share: "#5692eb",
      terminal: "#333333",
      navigation: "#0e0d0f",
      "navigation-home": "#000000",
    },
  },
  nordic: {
    dark: false,
    sponsor: false,
    title: "Nordic",
    name: "nordic",
    colors: {
      background: "#f7f8fa",
      surface: "#E0E4EC",
      card: "#ECEFF4",
      primary: "#4ca0b8",
      "primary-button": "#519fb6",
      "surface-variant": "#4ca0b8",
      secondary: "#e2e7ee",
      "secondary-light": "#eceff4",
      accent: "#F2F5FA",
      error: "#BF616A",
      info: "#88C0D0",
      success: "#8FBCBB",
      warning: "#f0d8a8",
      remove: "#BF616A",
      restore: "#81A1C1",
      album: "#EBCB8B",
      download: "#8FBCBB",
      private: "#88C0D0",
      edit: "#88C0D0",
      share: "#B48EAD",
      love: "#ef5350",
      terminal: "#4C566A",
      navigation: "#e7ebf1",
      "navigation-home": "#dde3eb",
    },
  },
  onyx: {
    title: "Onyx",
    name: "onyx",
    dark: false,
    sponsor: false,
    colors: {
      background: "#e5e4e2",
      surface: "#e5e4e2",
      card: "#cdccca",
      primary: "#c8bdb1",
      "primary-button": "#353839",
      "surface-variant": "#353839",
      secondary: "#a8a8a8",
      "secondary-light": "#cdccca",
      accent: "#656565",
      error: "#e57373",
      info: "#5a94dd",
      success: "#26A69A",
      warning: "#e3d181",
      love: "#ef5350",
      remove: "#e35333",
      restore: "#64b5f6",
      album: "#ffab40",
      download: "#07bd9f",
      private: "#48bcd6",
      edit: "#0AA9FF",
      share: "#0070a0",
      terminal: "#333333",
      navigation: "#353839",
      "navigation-home": "#212121",
    },
  },
  shadow: {
    title: "Shadow",
    name: "shadow",
    dark: true,
    sponsor: true,
    colors: {
      background: "#444",
      surface: "#444",
      card: "#666666",
      primary: "#c4f1e5",
      "primary-button": "#74817d",
      "surface-variant": "#c8e3e7",
      secondary: "#585858",
      "secondary-light": "#666",
      accent: "#333",
      error: "#e57373",
      info: "#00acc1",
      success: "#26A69A",
      warning: "#ffd740",
      remove: "#e57373",
      restore: "#64b5f6",
      album: "#ffab00",
      download: "#00bfa5",
      private: "#00b8d4",
      edit: "#0AA9FF",
      share: "#9575cd",
      love: "#ef5350",
      terminal: "#333333",
      navigation: "#212121",
      "navigation-home": "#000000",
    },
  },
  vanta: {
    title: "Vanta",
    name: "vanta",
    dark: true,
    sponsor: true,
    colors: {
      background: "#212121",
      surface: "#212121",
      card: "#1d1d1d",
      primary: "#04acaf",
      "primary-button": "#444444",
      "surface-variant": "#04acaf",
      secondary: "#111111",
      "secondary-light": "#1a1a1a",
      accent: "#090c10",
      error: "#e57373",
      info: "#00acc1",
      success: "#26A69A",
      warning: "#ffd740",
      remove: "#e57373",
      restore: "#64b5f6",
      album: "#ffab00",
      download: "#00bfa5",
      private: "#00b8d4",
      edit: "#0AA9FF",
      share: "#9575cd",
      love: "#ef5350",
      terminal: "#333333",
      navigation: "#0d0d0d",
      "navigation-home": "#000000",
    },
  },
  yellowstone: {
    title: "Yellowstone",
    name: "yellowstone",
    dark: true,
    sponsor: true,
    colors: {
      background: "#32312f",
      surface: "#32312f",
      card: "#262524",
      primary: "#ffb700",
      "primary-button": "#54524e",
      "surface-variant": "#ffb700",
      secondary: "#21201f",
      "secondary-light": "#262523",
      accent: "#333",
      error: "#e57373",
      info: "#00acc1",
      success: "#26A69A",
      warning: "#ffd740",
      remove: "#e57373",
      restore: "#64b5f6",
      album: "#ffab00",
      download: "#00bfa5",
      private: "#00b8d4",
      edit: "#0AA9FF",
      share: "#9575cd",
      love: "#ef5350",
      terminal: "#464544",
      navigation: "#191817",
      "navigation-home": "#0c0c0b",
    },
  },
};

/* Available Themes */

let options = [
  {
    text: $gettext("Default"),
    value: "default",
    disabled: false,
  },
  {
    text: "Abyss",
    value: "abyss",
    disabled: false,
  },
  {
    text: "Carbon",
    value: "carbon",
    disabled: false,
  },
  {
    text: "Chrome",
    value: "chrome",
    disabled: false,
  },
  {
    text: "Gemstone",
    value: "gemstone",
    disabled: false,
  },
  {
    text: "Grayscale",
    value: "grayscale",
    disabled: false,
  },
  {
    text: "Lavender",
    value: "lavender",
    disabled: false,
  },
  {
    text: "Legacy",
    value: "legacy",
    disabled: false,
  },
  {
    text: "Mint",
    value: "mint",
    disabled: false,
  },
  {
    text: "Neon",
    value: "neon",
    disabled: false,
  },
  {
    text: "Nordic",
    value: "nordic",
    disabled: false,
  },
  {
    text: "Onyx",
    value: "onyx",
    disabled: false,
  },
  {
    text: "Shadow",
    value: "shadow",
    disabled: false,
  },
  {
    text: "Vanta",
    value: "vanta",
    disabled: false,
  },
  {
    text: "Yellowstone",
    value: "yellowstone",
    disabled: false,
  },
];

/* Theme Functions */

// Returns an object containing all themes for use with Vuetify.
export const All = () => {
  let result = [];

  for (let k in themes) {
    if (themes.hasOwnProperty(k)) {
      const theme = themes[k];

      if (!theme["name"]) {
        continue;
      }

      result[theme.name] = {
        dark: !!theme.dark,
        colors: theme.colors ? theme.colors : {},
        variables: theme.variables ? theme.variables : variables,
      };

      // TODO: Make sure all themes have a button and table color, so this workaround is not needed anymore.
      if (typeof result[theme.name].colors.button === "undefined") {
        result[theme.name].colors.button = result[theme.name].colors["secondary-light"];
      }
      if (typeof result[theme.name].colors.table === "undefined") {
        result[theme.name].colors.table = result[theme.name].colors["card"];
      }
    }
  }

  return result;
};

// Returns a theme by name.
export const Get = (name) => {
  if (typeof themes[name] === "undefined") {
    return themes[options[0].value];
  }

  return themes[name];
};

// Adds or replaces a theme by name.
export const Set = (name, val) => {
  if (typeof themes[name] === "undefined") {
    options.push({
      text: val.title,
      value: val.name,
      disabled: false,
    });
  }

  themes[name] = val;
};

// Removes a theme by name.
export const Remove = (name) => {
  delete themes[name];
  const i = options.findIndex((el) => el.value === name);
  if (i > -1) {
    options.splice(i, 1);
  }
};

// Returns translated theme options.
export const Translated = () => {
  return options.map((v) => {
    if (v.disabled) {
      return null;
    }

    return {
      text: T(v.text),
      value: v.value,
    };
  });
};

export const Options = () => options;

export const SetOptions = (v) => (options = v);
