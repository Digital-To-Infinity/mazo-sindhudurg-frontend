// @ts-nocheck
import Link from "next/link";
import { MapPin, ArrowRight, Waves, Mountain, Landmark } from "lucide-react";

const CompanyPromo = () => {
    return (
        <div className="w-full h-fit xl:sticky xl:top-32">
            <aside className="w-72">
                <div className="p-6 rounded-[2rem] bg-white border border-brand-muted/20 relative overflow-hidden">
                    {/* Background Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />

                    {/* Company Logo/Name */}
                    <div className="relative mb-8 flex flex-col items-center text-center">
                        <div className="w-14 h-14 mb-4 rounded-2xl bg-neutral-50 flex items-center justify-center p-3">
                            <MapPin className="w-full h-full text-brand-primary" />
                        </div>
                        <h4 className="text-xl font-black text-brand-heading uppercase tracking-tight">
                            Mazo Sindhudurg
                        </h4>
                        <div className="h-0.5 w-12 bg-brand-primary/20 mt-2" />
                    </div>

                    <div className="space-y-6 relative">
                        <div className="text-center">
                            <p className="text-sm font-black text-brand-primary uppercase tracking-[0.1em] mb-2">Explore the Coast</p>
                            <h5 className="text-lg font-bold text-brand-heading leading-snug">
                                Plan Your Sindhudurg Trip
                            </h5>
                        </div>

                        <p className="text-base text-brand-paragraph text-center">
                            From Tarkarli&apos;s watersports to Sindhudurg Fort&apos;s ramparts — curated guides, local businesses, and hidden gems across the Konkan coast.
                        </p>

                        <div className="pt-4 space-y-3">
                            <Link
                                href="/destinations"
                                className="w-full py-4 px-6 rounded-2xl bg-brand-primary text-white font-black text-sm uppercase tracking-widest hover:bg-brand-primary-hover transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2"
                            >
                                Explore Destinations
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <Link
                                href="/add-business"
                                className="w-full py-4 px-6 rounded-2xl bg-neutral-50 text-brand-heading font-black text-sm uppercase tracking-widest hover:bg-neutral-100 transition-all flex items-center justify-center gap-2"
                            >
                                <MapPin className="w-4 h-4" />
                                Add Your Business
                            </Link>
                        </div>
                    </div>

                    {/* Quick Facts Section */}
                    <div className="mt-10 pt-8 border-t border-neutral-100">
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                {
                                    icon: Waves,
                                    value: "121 km",
                                    label: "Coastline",
                                    color: "text-amber-600 bg-amber-50",
                                    border: "border-amber-100"
                                },
                                {
                                    icon: Mountain,
                                    value: "30+",
                                    label: "Beaches",
                                    color: "text-blue-600 bg-blue-50",
                                    border: "border-blue-100"
                                },
                                {
                                    icon: Landmark,
                                    value: "15+",
                                    label: "Historic Forts",
                                    color: "text-emerald-600 bg-emerald-50",
                                    border: "border-emerald-100"
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center">
                                    <div className={`w-12 h-12 rounded-2xl ${item.color} border ${item.border} flex items-center justify-center mb-3`}>
                                        <item.icon size={20} strokeWidth={2.5} />
                                    </div>
                                    <span className="block text-[13px] font-black text-brand-heading uppercase leading-none">
                                        {item.value}
                                    </span>
                                    <span className="block text-[8px] font-black text-brand-muted uppercase mt-1.5 tracking-wide leading-none whitespace-nowrap">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default CompanyPromo;
