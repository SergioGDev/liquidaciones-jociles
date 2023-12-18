import RootLayout from "@/layouts/RootLayout";

export const metadata = {
  title: "Liquidaciones Jociles",
  description: "APP para comparar ficheros CSV con liquidaciones de la empresa.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
