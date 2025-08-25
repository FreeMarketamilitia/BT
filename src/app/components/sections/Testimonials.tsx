import { Card, CardContent } from "@/components/ui/card";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Our hall traffic is finally predictable. Teachers love how fast it is.",
    author: "M. Barnes",
    role: "Assistant Principal",
    company: "",
    avatar: "",
    rating: 5
  },
  {
    quote: "The overdue alerts alone changed our supervision patterns.",
    author: "R. Delgado",
    role: "Dean of Students",
    company: "",
    avatar: "",
    rating: 5
  },
  {
    quote: "Set up in one afternoon; now every room uses digital passes.",
    author: "T. Nguyen",
    role: "IT Coordinator",
    company: "",
    avatar: "",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <Container size="lg">
        <SectionTitle
          subtitle="Testimonials"
          title="Trusted by Schools and Districts"
          className="mb-16"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                {/* Rating Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                    <AvatarFallback>
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="text-center mt-16">
          <p className="text-sm text-muted-foreground">
            Used by schools across the U.S.
          </p>
        </div>
      </Container>
    </section>
  );
}
