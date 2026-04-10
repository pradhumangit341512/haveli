export const colors = {
  gold: "#C8A45C",
  goldLight: "#E2CC8A",
  goldDark: "#96772F",
  goldBg: "rgba(200,164,92,0.08)",

  maroon: "#5C1A2A",
  maroonDark: "#3A0D18",
  maroonLight: "#8B3A4A",

  wine: "#722F37",

  sand: "#F2E8D5",
  sandLight: "#FAF6ED",
  sandDark: "#D9C9A8",

  cream: "#FFFDF7",
  ivory: "#F8F3E8",

  dark: "#0C0A08",
  charcoal: "#1C1917",

  text: "#1C1410",
  textMuted: "#6B5C50",
  textLight: "#9A8B7F",
} as const;

export const fonts = {
  heading: "'Cinzel', serif",
  serif: "'Cormorant Garamond', serif",
  body: "'DM Sans', sans-serif",
} as const;

export const breakpoints = {
  tablet: 1024,
  mobile: 640,
} as const;

export type Colors = typeof colors;
export type Fonts = typeof fonts;
