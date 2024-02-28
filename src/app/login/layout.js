import AuthProviders from "@/components/providers/AuthProviders";
import "../globals.css";

export const metadata = {
  title: "Login Page",
  description: "Login to access the admin app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProviders>{children}</AuthProviders>
      </body>
    </html>
  );
}
