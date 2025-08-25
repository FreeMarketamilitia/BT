import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";

const faqs = [
  {
    question: "How do teachers issue a pass?",
    answer: "From the dashboard, select a student, destination, and time limit — it's one tap."
  },
  {
    question: "What happens when a pass is overdue?",
    answer: "The dashboard highlights the pass, and optional alerts can be sent to an admin or hall monitor."
  },
  {
    question: "Does it work offline?",
    answer: "If a device goes offline mid-pass, the state is preserved and syncs as soon as the device reconnects."
  },
  {
    question: "Can we restrict certain times or destinations?",
    answer: "Yes. Admins can set cooldowns, block overlaps, and create destination rules by role or grade."
  },
  {
    question: "What about student privacy?",
    answer: "We're built for FERPA/COPPA environments. You control data retention and access by role."
  },
  {
    question: "Do you integrate with our SIS?",
    answer: "Not required to start. We offer CSV import and directory-based provisioning; SIS integrations available on District plans."
  },
  {
    question: "Can parents see pass history?",
    answer: "Optional. Schools can enable read-only visibility for guardians via email summaries."
  },
  {
    question: "How fast is setup?",
    answer: "Most schools start same day; district onboarding is typically under two weeks."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-muted/30">
      <Container size="md">
        <SectionTitle
          subtitle="FAQ"
          title="Questions, Answered"
          className="mb-16"
        />

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-background rounded-lg border px-6"
            >
              <AccordionTrigger className="text-left font-medium hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact CTA */}
        <div className="text-center mt-12 space-y-4">
          <p className="text-sm text-muted-foreground">
            Still have questions?
          </p>
          <div className="space-y-2">
            <p className="text-sm">
              Our support team is here to help you succeed.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center text-primary hover:underline font-medium"
            >
              Contact Support →
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
