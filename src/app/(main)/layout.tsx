import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <main className="flex-1 bg-background">{children}</main>
      <Footer />
    </div>
  );
}