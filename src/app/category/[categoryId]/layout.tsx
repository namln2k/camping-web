export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div>Breadcrumbs</div>
      {children}
    </>
  )
}
