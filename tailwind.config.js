module.exports = {
  darkMode: "   class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "#e5e7eb", // 기본 텍스트 색
            fontWeight: "400",
            a: {
              color: "#60a5fa",
              textDecoration: "none",
              fontWeight: "500",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            strong: {
              color: "#facc15",
              fontWeight: "600",
            },
            "h1, h2, h3, h4": {
              color: "#f1f5f9",
              fontWeight: "700",
              scrollMarginTop: "5rem",
            },
            blockquote: {
              fontStyle: "italic",
              borderLeft: "4px solid #4b5563",
              paddingLeft: "1rem",
              color: "#9ca3af",
            },
            code: {
              backgroundColor: "#1e293b",
              color: "#fcd34d",
              padding: "0.25rem 0.4rem",
              borderRadius: "0.25rem",
              fontWeight: "400",
            },
            pre: {
              backgroundColor: "#0f172a",
              padding: "1rem",
              borderRadius: "0.5rem",
              color: "#f1f5f9",
              fontSize: "0.875rem",
              lineHeight: "1.5",
            },
            ul: {
              paddingLeft: "1.2rem",
              listStyleType: "disc",
            },
            ol: {
              paddingLeft: "1.2rem",
              listStyleType: "decimal",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
