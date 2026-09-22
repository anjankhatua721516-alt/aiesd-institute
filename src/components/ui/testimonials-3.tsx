import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
};

export const defaultTestimonials: TestimonialItem[] = [
  {
    quote:
      "Coming from a vernacular medium, speaking during campus placement drives was intimidating. Daily extempore circles at AIESD gave me genuine fluency. I cracked my placement on the very first round!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    name: "Suman Roy",
    role: "Associate Software Engineer",
    company: "TCS Kolkata",
  },
  {
    quote:
      "Grammar was simplified with practical speaking drills every day. No complicated formulas—just real conversations. Today, I lead team meetings and hospital administration calls with zero hesitation.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    name: "Priyanka Mahato",
    role: "Administrative Officer",
    company: "Care Health Hospital",
  },
  {
    quote:
      "The personalized interview mock panels and mic rehearsals transformed my stage fright into calm composure. AIESD helped me transition from a hesitant graduate into a confident communicator.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    name: "Sourav Mondal",
    role: "Banking & Finance Officer",
    company: "HDFC Regional Branch",
  },
];

function DecorIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-0 left-0 z-1 size-3.5 shrink-0 -translate-x-[calc(50%+0.5px)] -translate-y-[calc(50%+0.5px)] stroke-1 stroke-muted-foreground",
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function QuoteIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}

export function TestimonialsSection({
  items = defaultTestimonials,
}: {
  items?: TestimonialItem[];
}) {
  const displayItems = items && items.length > 0 ? items : defaultTestimonials;

  return (
    <div className="mx-auto -mt-10 grid w-full max-w-5xl gap-8 md:grid-cols-3 md:gap-6">
      {displayItems.slice(0, 3).map((testimonial, index) => (
        <TestimonialCard
          index={index}
          key={testimonial.name + index}
          testimonial={testimonial}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
  className,
  ...props
}: React.ComponentProps<"figure"> & {
  testimonial: TestimonialItem;
  index: number;
}) {
  const { quote, name, role, company, image } = testimonial;

  return (
    <figure
      className={cn(
        "group relative flex flex-col justify-between gap-6 px-8 pt-8 pb-6 shadow-xs md:translate-y-[calc(3rem*var(--t-card-index))] bg-white rounded-[24px] border border-[#e4e4e7] hover:border-[#18181b]/30 transition-all",
        "dark:bg-[radial-gradient(50%_80%_at_25%_0%,--theme(--color-foreground/.1),transparent)]",
        className,
      )}
      style={
        {
          "--t-card-index": index,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="absolute -inset-y-4 -left-px w-px bg-border" />
      <div className="absolute -inset-y-4 -right-px w-px bg-border" />
      <div className="absolute -inset-x-4 -top-px h-px bg-border" />
      <div className="absolute -right-4 -bottom-px -left-4 h-px bg-border" />
      <DecorIcon />

      <blockquote className="flex gap-4">
        <QuoteIcon
          aria-hidden="true"
          className="size-6 shrink-0 stroke-1 text-muted-foreground"
        />

        <p className="flex-1 font-normal text-base text-muted-foreground leading-relaxed">
          {quote}
        </p>
      </blockquote>

      <figcaption className="flex items-center gap-3">
        <Avatar className="size-10 rounded-full ring-2 ring-border ring-offset-2 ring-offset-background transition-shadow group-hover:ring-foreground/20">
          <AvatarImage alt={`${name}'s profile picture`} src={image} />
          <AvatarFallback>{name ? name.charAt(0) : "S"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <cite className="font-medium text-foreground text-sm not-italic">
            {name}
          </cite>
          <p className="text-muted-foreground text-xs">
            {role}{company ? `, ` : ''}<span className="text-foreground/80">{company}</span>
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export default TestimonialsSection;
