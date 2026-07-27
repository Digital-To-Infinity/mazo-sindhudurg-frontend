import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Anchor,
  Sun,
  CloudRain,
  Snowflake,
  Plane,
  Train,
  Car,
  Utensils,
  Waves,
  Landmark,
  Fish,
  ArrowRight,
  BadgeCheck,
  Compass,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Malvan Travel Guide",
  description:
    "Everything to see, do and eat in Malvan — home of Sindhudurg Fort, scuba diving, dolphin rides and the best Malvani seafood on the Konkan coast.",
};

const attractions = [
  {
    title: "Sindhudurg Fort",
    tag: "Historic Fort",
    description:
      "A 17th-century sea fort built on a rocky island by Chhatrapati Shivaji Maharaj. Reach it on a short jetty ride and walk the ramparts for open-sea views.",
    image:
      "https://images.unsplash.com/photo-1717354482498-2a9d0bddd6af?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Chivla Beach",
    tag: "Beach",
    description:
      "A quiet, palm-fringed stretch of sand right next to the fort — calmer than the main harbour and lovely for an evening walk.",
    image:
      "https://images.unsplash.com/photo-1660847931932-d6d257770c04?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Malvan Harbour",
    tag: "Fishing Harbour",
    description:
      "Watch the town's colourful fishing boats come in with the morning catch, and charter one for a dolphin-spotting trip out to sea.",
    image:
      "https://images.unsplash.com/photo-1712472256879-b8f0d72de8cc?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Tsunami Island & Rock Garden",
    tag: "Viewpoint",
    description:
      "A sandbar and cluster of sea-carved rocks near the fort that surface at low tide, popular for photos, snorkelling and sunset views.",
    image:
      "https://images.unsplash.com/photo-1694501333504-98ff498e2686?auto=format&fit=crop&w=900&q=80",
  },
];

const thingsToDo = [
  {
    icon: Waves,
    title: "Scuba Diving & Snorkelling",
    description:
      "Malvan is where recreational scuba diving first took off on the Maharashtra coast. Guided dives near the fort reefs suit complete beginners.",
  },
  {
    icon: Anchor,
    title: "Boat & Dolphin Rides",
    description:
      "Hop on a chartered boat from the harbour for the short crossing to Sindhudurg Fort, with a good chance of spotting dolphins along the way.",
  },
  {
    icon: Utensils,
    title: "Malvani Food Trail",
    description:
      "Work through fiery sol kadhi, bombil fry, prawn curry-rice and kombdi vade at the town's no-frills beachside eateries.",
  },
  {
    icon: Landmark,
    title: "Temple & Heritage Walks",
    description:
      "Visit the coral-stone shrines inside the fort walls and the coastal temples around Sarjekot for a quieter, cultural side of Malvan.",
  },
];

const faqs = [
  {
    q: "What is Malvan best known for?",
    a: "Malvan is best known for Sindhudurg Fort, its scuba diving and water sports scene, and Malvani cuisine — the spicy, coconut-and-kokum-based seafood cooking of the Konkan coast.",
  },
  {
    q: "How do I reach Sindhudurg Fort from Malvan town?",
    a: "Ferries and safety boats leave from Malvan jetty throughout the day and take roughly 15–20 minutes to reach the fort island.",
  },
  {
    q: "What is the best time to visit Malvan?",
    a: "October to March is ideal, with cool, dry weather suited to beaches and water sports. The monsoon months (June–September) turn the coast lush green but most water activities pause for safety.",
  },
  {
    q: "How do I get to Malvan?",
    a: "The nearest airport is Sindhudurg (Chipi) Airport, roughly 25–40 km away, with Goa's airports about 100–130 km further south. The nearest railhead is Kudal on the Konkan Railway, about 30 km out. By road, Malvan sits just off NH66, the Mumbai–Goa highway.",
  },
  {
    q: "Is Malvan good for a family trip?",
    a: "Yes — the beaches are gentle, the fort is an easy half-day outing, and boat rides and food are enjoyable for most age groups. Water sports operators typically offer options suited to first-timers and children.",
  },
];

export default function MalvanDestinationPage() {
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
          <span className="text-on-surface font-semibold">Malvan</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative w-full mt-6 px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[420px] md:min-h-[520px] flex items-end">
          <Image
            src="https://images.unsplash.com/photo-1611337765360-1fb5b41b69ce?auto=format&fit=crop&w=1600&q=80"
            alt="Palm-lined coastline near Malvan, Sindhudurg"
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
              Malvan
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl leading-relaxed drop-shadow-sm">
              A coastal fort town on the Konkan Sea where a 17th-century island
              fortress, quiet beaches and India&rsquo;s first scuba diving
              school share the same shoreline.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href="#attractions"
                className="inline-flex items-center gap-2 bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-xl text-sm font-bold transition-colors shadow-lg"
              >
                <Compass className="w-4 h-4" /> Explore Attractions
              </a>
              <Link
                href="/hotels/malvan"
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
            { label: "Known For", value: "Forts & Scuba Diving" },
            { label: "Best Time", value: "Oct &ndash; Mar" },
            { label: "Nearest Airport", value: "Sindhudurg (Chipi)" },
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
              About Malvan
            </h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p>
                Malvan is the cultural heart of Sindhudurg district, a low-key
                fishing town that has grown into one of the Konkan coast&rsquo;s
                most rewarding destinations without losing its fishing-village
                character. Its skyline is dominated by Sindhudurg Fort, a sea
                bastion built under the supervision of Chhatrapati Shivaji
                Maharaj in the 1660s, still standing on a rocky island just
                offshore.
              </p>
              <p>
                Beyond the fort, Malvan is where recreational scuba diving first
                arrived on this coast, and dive schools now run
                beginner-friendly dives out to nearby reefs. Between dives, the
                town&rsquo;s beachside shacks serve some of the most authentic
                Malvani food anywhere &mdash; coconut-and-kokum seafood curries
                built for rice, not naan.
              </p>
              <p>
                Use Malvan as a base for a day or two, then branch out to the
                whiter sands of nearby Tarkarli, or the waterfalls and
                viewpoints around Amboli in the Sahyadri hills a couple of hours
                inland.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1660847931932-d6d257770c04?auto=format&fit=crop&w=1000&q=80"
              alt="Beach near Malvan"
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
              Top Attractions in Malvan
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

      {/* Where to stay teaser */}
      <section className="py-stack-lg px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto">
        <div className="bg-primary-container rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-white shrink-0">
              <BadgeCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-white mb-1">
                Where to Stay in Malvan
              </h3>
              <p className="text-white/80 max-w-xl">
                From beachside homestays to fort-view resorts, browse verified
                stays across Malvan on our hotels directory.
              </p>
            </div>
          </div>
          <Link
            href="/hotels/malvan"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all whitespace-nowrap"
          >
            Browse Hotels <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* How to reach */}
      <section className="py-stack-lg px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8">
          How to Reach Malvan
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-4">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-on-surface mb-2">By Air</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Sindhudurg (Chipi) Airport is the closest, roughly 25&ndash;40 km
              from town. Goa&rsquo;s Dabolim and Mopa airports are a further
              option, about 100&ndash;130 km south.
            </p>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-4">
              <Train className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-on-surface mb-2">By Rail</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Malvan has no station of its own. Kudal, on the scenic Konkan
              Railway, is the nearest railhead at about 30 km, with regular
              buses and taxis onward.
            </p>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-4">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-on-surface mb-2">By Road</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Malvan sits just off NH66, the Mumbai&ndash;Goa highway. Expect
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
              Cool, dry and the peak season. Ideal for the fort, beaches and all
              water sports.
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
              Warm and humid, with calm seas. Good for beaches and diving early
              or late in the day.
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
              Lush and dramatic, but rough seas usually pause boat rides and
              water sports.
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
              Malvan is just the start. See what else the Konkan coast has to
              offer.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "Tarkarli", href: "/destinations/tarkarli" },
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
