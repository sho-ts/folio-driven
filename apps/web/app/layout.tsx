import './globals.css'

export const metadata = {
  title: 'FOLIO DRIVEN',
  description: 'FOLIO DRIVEN APP',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
