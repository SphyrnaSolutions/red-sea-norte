import type { FAQPage, WithContext } from 'schema-dts'

interface FAQItem {
  question: string
  answer: string
}

export function buildFAQPageSchema(
  faqs: FAQItem[],
  pageUrl: string
): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question' as const,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: faq.answer,
      },
    })),
    url: pageUrl,
  }
}
