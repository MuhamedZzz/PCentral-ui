import Layout from "../components/Layout";

export const metadata = {
  title: "PCentral",
  description: "PC Central - Assemble. Test. Thrive.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
