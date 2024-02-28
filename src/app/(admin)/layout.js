import "../globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Montserrat } from "next/font/google";
import Copyright from "@/components/footer/Copyright";
import Header from "@/components/admin/Header";
import HeaderMobile from "@/components/admin/HeaderMobile";
import SideNav from "@/components/admin/SideNav";
import PageWrapper from "@/components/admin/PageWrapper";
import MarginWidthWrapper from "@/components/admin/MargenWidthWrapper";
import AuthProviders from "@/components/providers/AuthProviders";

const montserrat = Montserrat({
  weight: ["300", "400"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Blog-Admin",
  description: "An Admin dashboard for blog app",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-gray-100`}>
        <AuthProviders>
          <div className="flex">
            <SideNav />
            <main className="flex-1 mt-0" style={{ overflowY: "scroll", scrollbarColor: "gray white", scrollbarWidth: "thin", height: "100vh" }}>
              <MarginWidthWrapper>
                <Header />
                <HeaderMobile />
                <PageWrapper>{children}</PageWrapper>
                <Copyright />
              </MarginWidthWrapper>
            </main>
          </div>
        </AuthProviders>
      </body>
    </html>
  );
}
