import Header from "../components/Header";
import { AuthProvider } from "./context/AuthContext";// Wrap the entire app with AuthProvider to provide auth context
export const metadata = {
  title: "Conference Booking System",
  description: "Book conference rooms easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f4f6f8",
        }}
      >
        <AuthProvider>   
          <Header /> 
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}