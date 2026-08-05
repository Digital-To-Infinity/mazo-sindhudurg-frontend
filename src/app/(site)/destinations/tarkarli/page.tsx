import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Anchor,
  Sun,
  CloudRain,
  Plane,
  Train,
  Car,
  Waves,
  Sailboat,
  Fish,
  ArrowRight,
  BadgeCheck,
  Compass,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tarkarli Travel Guide",
  description:
    "Plan your trip to Tarkarli — the clearest water on the Konkan coast, backwater boat rides, scuba diving and the Karli river sangam point.",
};

const attractions = [
  {
    title: "Tarkarli Beach",
    tag: "Beach",
    description:
      "A long, powder-white stretch famous for having some of the clearest sea water in Maharashtra — the reason this became the coast\u2019s water-sports capital.",
    image:
      "https://images.unsplash.com/photo-1776679768423-114637549209?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Karli Backwaters",
    tag: "Backwaters",
    description:
      "Calm, mangrove-lined water inland from the beach, best explored by kayak or a slow boat ride at golden hour.",
    image:
      "https://images.unsplash.com/photo-1694501333504-98ff498e2686?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Devbaug Sangam Point",
    tag: "Viewpoint",
    description:
      "Where the Karli River meets the Arabian Sea in a dramatic confluence. Boats from here also run out to Dolphin Point, Golden Rock and Tsunami Island.",
    image:
      "https://images.unsplash.com/photo-1756054271968-726cf7e15ca9?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Sindhudurg Fort",
    tag: "Historic Fort",
    description:
      "Shivaji Maharaj\u2019s 17th-century island fort is a short boat ride from Tarkarli via nearby Malvan jetty, and easily combined with a beach day.",
    image:
      "https://images.unsplash.com/photo-1717354482498-2a9d0bddd6af?auto=format&fit=crop&w=900&q=80",
  },
];

const thingsToDo = [
  {
    icon: Waves,
    title: "Water Sports",
    description:
      "Jet skiing, banana boat and bumper rides, and parasailing all run right off Tarkarli Beach through the day.",
  },
  {
    icon: Fish,
    title: "Scuba Diving & Snorkelling",
    description:
      "Tarkarli\u2019s unusually clear water makes it one of the few spots on this coast where beginner scuba dives are reliably good.",
  },
  {
    icon: Sailboat,
    title: "Backwater Boat & Kayak Rides",
    description:
      "Paddle or motor through the Karli backwaters past mangroves and fishing hamlets, calmest in the early morning or at sunset.",
  },
  {
    icon: Anchor,
    title: "Dolphin Watching",
    description:
      "Chartered boats from Devbaug head out toward Dolphin Point, with a good chance of spotting pods in the open water.",
  },
];

const faqs = [
  {
    q: "What makes Tarkarli different from Malvan?",
    a: "Tarkarli is a quieter beach village about 7 km south of Malvan town, known specifically for unusually clear water and being the region\u2019s water-sports hub. Malvan is the bigger town nearby, home to the harbour, markets and the jetty for Sindhudurg Fort.",
  },
  {
    q: "Is Tarkarli good for swimming?",
    a: "Yes — the water is calmer and clearer than most of the Konkan coast, though it\u2019s still open sea, so stick to areas with lifeguards or water-sports operators watching the water.",
  },
  {
    q: "How far is Tarkarli from Sindhudurg Fort?",
    a: "The fort sits just offshore near Malvan, about 7-8 km from Tarkarli. Most visitors drive to Malvan jetty and take the short ferry crossing from there.",
  },
  {
    q: "What is the best time to visit Tarkarli?",
    a: "October to March is best, with calm seas and pleasant weather for the beach and water sports. During the monsoon (June-September) the coast is lush but most water activities pause.",
  },
  {
    q: "How do I get to Tarkarli?",
    a: "Sindhudurg (Chipi) Airport is the closest, around 30 km away. The nearest railhead is Kudal on the Konkan Railway, about 30-35 km out. By road, Tarkarli is just off NH66 via Malvan.",
  },
];

export default function TarkarliDestinationPage() {
  return (
    <main className="font-body-md text-body-md bg-surface text-on-surface overflow-x-hidden pb-20">
      {/* Breadcrumb */}
      <div className="pt-20 lg:pt-24 px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-on-surface-variant"
        >
          <Link
            href="/"
            className="hover:text-primary transition-colors font-medium"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-outline-variant" />
          <Link
            href="#"
            className="hover:text-primary transition-colors font-medium"
          >
            Destinations
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-outline-variant" />
          <span className="text-on-surface font-semibold">Tarkarli</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative w-full mt-6 px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[420px] md:min-h-[520px] flex items-end">
          <Image
            src="https://images.unsplash.com/photo-1776679768423-114637549209?auto=format&fit=crop&w=1600&q=80"
            alt="Clear turquoise water along the coast near Tarkarli"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />

          <div className="relative z-10 p-6 md:p-12 w-full">
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4">
              <MapPin className="w-3.5 h-3.5" /> Malvan Taluka &middot;
              Sindhudurg
            </span>
            <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-white tracking-tight drop-shadow-lg mb-3">
              Tarkarli
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl leading-relaxed drop-shadow-sm">
              A slip of white sand where the Karli River meets the Arabian Sea
              &mdash; famous for the clearest water on the Konkan coast and the
              region&rsquo;s best water sports.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href="#attractions"
                className="inline-flex items-center gap-2 bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-xl text-sm font-bold transition-colors shadow-lg"
              >
                <Compass className="w-4 h-4" /> Explore Attractions
              </a>
              <Link
                href="/hotels/tarkarli"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors backdrop-blur-sm"
              >
                Where to Stay <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick facts strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 -mt-8 md:-mt-10 relative z-10 mx-3 md:mx-6">
          {[
            { label: "Known For", value: "Clear Water & Water Sports" },
            { label: "Best Time", value: "Oct &ndash; Mar" },
            { label: "From Malvan", value: "~7 km South" },
            { label: "Nearest Rail", value: "Kudal, ~30 km" },
          ].map((fact) => (
            <div
              key={fact.label}
              className="bg-surface-container-lowest rounded-2xl shadow-md border border-outline-variant p-4 text-center"
            >
              <p className="text-outline font-caption text-caption uppercase tracking-wider mb-1">
                {fact.label}
              </p>
              <p
                className="font-bold text-on-surface text-sm md:text-base"
                dangerouslySetInnerHTML={{ __html: fact.value }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="py-stack-lg px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
              About Tarkarli
            </h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p>
                Tarkarli is a small village about 7 km south of Malvan, wedged
                between the Karli River and the open Arabian Sea. What sets it
                apart from the rest of the Konkan coast is visibility &mdash;
                the water here is noticeably clearer than nearby beaches, which
                is why Tarkarli grew into Sindhudurg&rsquo;s water-sports and
                scuba diving hub rather than staying a purely fishing village.
              </p>
              <p>
                South of the main beach, at Devbaug, the river opens out into a
                wide sangam where it meets the sea, and boats from the jetty
                here run out to a string of natural sights &mdash; a shifting
                sandbar locals call Tsunami Island, a rocky outcrop known as
                Golden Rock, and a stretch of open water where dolphins are
                regularly sighted.
              </p>
              <p>
                Sindhudurg Fort and the town of Malvan are close enough for an
                easy half-day trip, so most visitors base themselves in Tarkarli
                and use it as a springboard for both the beach and the
                district&rsquo;s history.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1611337765360-1fb5b41b69ce?auto=format&fit=crop&w=1000&q=80"
              alt="Palm-lined water near Tarkarli"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Attractions */}
      <section
        id="attractions"
        className="py-stack-lg px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto scroll-mt-24"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary">
              Top Attractions in Tarkarli
            </h2>
            <p className="text-on-surface-variant mt-2">
              The essential stops for a first visit.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {attractions.map((place) => (
            <div
              key={place.title}
              className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={place.image}
                  alt={place.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
                  {place.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-on-surface text-lg mb-2 group-hover:text-primary transition-colors">
                  {place.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {place.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Things to do */}
      <section className="py-stack-lg px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8">
          Things to Do
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {thingsToDo.map((item) => (
            <div
              key={item.title}
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed mb-4">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-on-surface mb-2">{item.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Water sports strip with image */}
      <section className="py-stack-lg px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-lg border border-outline-variant">
          <div className="relative min-h-[260px] md:min-h-[320px]">
            <Image
              src="https://images.unsplash.com/photo-1698009144286-454c9aa251b1?auto=format&fit=crop&w=1000&q=80"
              alt="Jet ski on the water at Tarkarli"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="bg-surface-container-lowest p-8 md:p-10 flex flex-col justify-center">
            <h3 className="font-headline-md text-headline-md text-primary mb-3">
              Konkan&rsquo;s Water Sports Capital
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-4">
              Licensed operators line Tarkarli Beach with jet skis, banana
              boats, parasailing and guided scuba dives. Rates are typically
              negotiated on the spot and vary by season &mdash; expect the
              widest range of activities and the calmest water between October
              and March.
            </p>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Jet
                ski, banana boat & bumper rides
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />{" "}
                Beginner-friendly scuba diving
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />{" "}
                Parasailing over the bay
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Where to stay teaser */}
      <section className="py-stack-lg px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto">
        <div className="bg-primary-container rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-white shrink-0">
              <BadgeCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-white mb-1">
                Where to Stay in Tarkarli
              </h3>
              <p className="text-white/80 max-w-xl">
                From beach shacks to backwater resorts, browse verified stays
                across Tarkarli on our hotels directory.
              </p>
            </div>
          </div>
          <Link
            href="/hotels/tarkarli"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all whitespace-nowrap"
          >
            Browse Hotels <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* How to reach */}
      <section className="py-stack-lg px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8">
          How to Reach Tarkarli
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-4">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-on-surface mb-2">By Air</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Sindhudurg (Chipi) Airport is closest, around 30 km away.
              Goa&rsquo;s Dabolim and Mopa airports are a further option,
              roughly 100&ndash;130 km south.
            </p>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-4">
              <Train className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-on-surface mb-2">By Rail</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Kudal, on the Konkan Railway, is the nearest railhead at about
              30&ndash;35 km, with buses and taxis running on to Tarkarli via
              Malvan.
            </p>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-4">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-on-surface mb-2">By Road</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Tarkarli sits just off NH66, about 7 km past Malvan. Expect
              roughly 10&ndash;12 hours from Mumbai and about 3 hours from Goa
              by car or bus.
            </p>
          </div>
        </div>
      </section>

      {/* Best time to visit */}
      <section className="py-stack-lg px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8">
          Best Time to Visit
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-outline-variant p-6 bg-surface-container-lowest">
            <div className="flex items-center gap-3 mb-3">
              <Sun className="w-5 h-5 text-tertiary" />
              <h3 className="font-bold text-on-surface">
                Oct &ndash; Feb, Winter
              </h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Cool, dry and the peak season &mdash; the water is at its clearest
              and calmest for swimming and diving.
            </p>
          </div>
          <div className="rounded-2xl border border-outline-variant p-6 bg-surface-container-lowest">
            <div className="flex items-center gap-3 mb-3">
              <Sun className="w-5 h-5 text-tertiary" />
              <h3 className="font-bold text-on-surface">
                Mar &ndash; May, Summer
              </h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Warm and humid with calm seas. Good for water sports if you plan
              around the midday heat.
            </p>
          </div>
          <div className="rounded-2xl border border-outline-variant p-6 bg-surface-container-lowest">
            <div className="flex items-center gap-3 mb-3">
              <CloudRain className="w-5 h-5 text-secondary" />
              <h3 className="font-bold text-on-surface">
                Jun &ndash; Sep, Monsoon
              </h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Lush and dramatic, but rough seas mean most water sports and boat
              rides pause for safety.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-stack-lg px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-6xl space-y-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 open:shadow-md transition-shadow"
            >
              <summary className="flex items-center justify-between cursor-pointer font-bold text-on-surface list-none">
                {item.q}
                <ChevronRight className="w-4 h-4 text-primary shrink-0 ml-4 transition-transform group-open:rotate-90" />
              </summary>
              <p className="text-sm text-on-surface-variant leading-relaxed mt-3">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* More destinations CTA */}
      <section className="py-stack-lg px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto">
        <div className="bg-primary rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-primary tracking-tight">
              Keep Exploring Sindhudurg
            </h2>
            <p className="text-primary-fixed font-body-lg">
              Tarkarli pairs perfectly with a stop in Malvan. See what else the
              Konkan coast has to offer.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "Malvan", href: "/destinations/malvan" },
                { label: "Vengurla", href: "/destinations/vengurla" },
                { label: "Amboli", href: "/destinations/amboli" },
                { label: "Devgad", href: "/destinations/devgad" },
              ].map((dest) => (
                <Link
                  key={dest.href}
                  href={dest.href}
                  className="bg-white/10 hover:bg-white/20 border border-white/25 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors backdrop-blur-sm"
                >
                  {dest.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
