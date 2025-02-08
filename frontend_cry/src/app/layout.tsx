import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="CryApiLogo.png" type="image/x-icon" />
        <title>CryApi</title>
      </head>
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  );
}
