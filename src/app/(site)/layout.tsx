import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BottomNav from '@/components/layout/BottomNav'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Mazo Sindhudurg",
            "url": "https://mazosindhudurg.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://mazosindhudurg.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Mazo Sindhudurg",
            "url": "https://mazosindhudurg.com",
            "logo": "https://mazosindhudurg.com/icon.png",
            "sameAs": [
              "https://www.facebook.com/mazosindhudurg",
              "https://www.instagram.com/mazosindhudurg"
            ]
          })
        }}
      />
      <main>{children}</main>
      <Footer />
      <BottomNav />
    </>
  )
}
