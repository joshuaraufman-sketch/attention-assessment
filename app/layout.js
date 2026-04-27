export const metadata = {
  title: "Clinical Attention Assessment",
  description:
    "Structured bedside attention assessment tool based on Albertella, Lee & Fontenelle (2026)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
