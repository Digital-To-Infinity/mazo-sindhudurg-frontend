interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQ[]
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  if (!faqs?.length) return null
  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <dl className="faq-list">
        {faqs.map((faq, i) => (
          <div key={i} className="faq-item">
            <dt className="faq-question">{faq.question}</dt>
            <dd className="faq-answer">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
