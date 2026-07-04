import './globals.css'; // Optional: if you have global styles

export const metadata = {
  title: 'Al-Rahbiyyah Pro',
  description: 'The Definitive Islamic Estate & Inheritance Framework',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950">
        {children}
      </body>
    </html>
  );
}