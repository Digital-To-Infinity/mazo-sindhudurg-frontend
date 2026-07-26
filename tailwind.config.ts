import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
      extend: {
          "colors": {
              "primary-fixed": "#d5e3ff",
              "inverse-surface": "#2f3034",
              "secondary-fixed": "#c1ecd4",
              "on-tertiary-fixed": "#341100",
              "on-surface": "#1a1c1f",
              "on-primary": "#ffffff",
              "tertiary-container": "#592300",
              "surface-container-high": "#e8e8ed",
              "on-tertiary-fixed-variant": "#723610",
              "on-tertiary-container": "#d8885c",
              "on-error": "#ffffff",
              "on-error-container": "#93000a",
              "surface": "#f9f9fe",
              "on-primary-container": "#799dd6",
              "surface-bright": "#f9f9fe",
              "on-secondary-fixed": "#002114",
              "on-primary-fixed": "#001b3c",
              "on-background": "#1a1c1f",
              "outline-variant": "#c3c6d1",
              "inverse-primary": "#a7c8ff",
              "secondary": "#3f6653",
              "on-secondary-fixed-variant": "#274e3d",
              "surface-variant": "#e2e2e7",
              "on-secondary-container": "#436b58",
              "on-primary-fixed-variant": "#1f477b",
              "surface-tint": "#3a5f94",
              "secondary-container": "#beead1",
              "surface-container-highest": "#e2e2e7",
              "surface-dim": "#dad9de",
              "surface-container-low": "#f4f3f8",
              "on-surface-variant": "#43474f",
              "surface-container-lowest": "#ffffff",
              "on-tertiary": "#ffffff",
              "primary": "#001e40",
              "tertiary-fixed-dim": "#ffb690",
              "surface-container": "#eeedf2",
              "primary-container": "#003366",
              "tertiary": "#381300",
              "background": "#f9f9fe",
              "error-container": "#ffdad6",
              "tertiary-fixed": "#ffdbca",
              "outline": "#737780",
              "inverse-on-surface": "#f1f0f5",
              "secondary-fixed-dim": "#a5d0b9",
              "primary-fixed-dim": "#a7c8ff",
              "on-secondary": "#ffffff",
              "error": "#ba1a1a"
          },
          "borderRadius": {
              "DEFAULT": "0.25rem",
              "lg": "0.5rem",
              "xl": "0.75rem",
              "full": "9999px"
          },
          "spacing": {
              "container-max": "1280px",
              "margin-desktop": "40px",
              "base": "8px",
              "margin-mobile": "16px",
              "stack-md": "24px",
              "gutter": "24px",
              "stack-sm": "12px",
              "stack-lg": "48px"
          },
          "fontFamily": {
              "body-md": ["Plus Jakarta Sans"],
              "label-md": ["Plus Jakarta Sans"],
              "body-lg": ["Plus Jakarta Sans"],
              "headline-lg-mobile": ["Plus Jakarta Sans"],
              "headline-xl": ["Plus Jakarta Sans"],
              "headline-lg": ["Plus Jakarta Sans"],
              "caption": ["Plus Jakarta Sans"],
              "headline-md": ["Plus Jakarta Sans"]
          },
          "fontSize": {
              "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
              "label-md": ["14px", {"lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "600"}],
              "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
              "headline-lg-mobile": ["28px", {"lineHeight": "1.2", "fontWeight": "700"}],
              "headline-xl": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}],
              "headline-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "700"}],
              "caption": ["12px", {"lineHeight": "1.4", "fontWeight": "500"}],
              "headline-md": ["24px", {"lineHeight": "1.3", "fontWeight": "600"}]
          }
      },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
export default config;
