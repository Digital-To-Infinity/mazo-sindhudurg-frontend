import { motion } from "framer-motion";
import { Home, Phone, ArrowRight, Award, Users, ShieldCheck } from "lucide-react";

interface CompanyPromoProps { }

const CompanyPromo = ({ }: CompanyPromoProps) => {

    return (
        <div className="w-full h-fit xl:sticky xl:top-32">
            <aside className="w-72">
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-[2rem] bg-white border border-brand-muted/20 relative overflow-hidden group"
                >
                    {/* Background Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-brand-primary/10 transition-colors duration-500" />

                    {/* Company Logo/Name */}
                    <div className="relative mb-8 flex flex-col items-center text-center">
                        <div className="w-14 h-14 mb-4 rounded-2xl bg-neutral-50 flex items-center justify-center p-3">
                            {/* Fallback Logo Icon */}
                            <Home className="w-full h-full text-brand-primary" />
                        </div>
                        <h4 className="text-xl font-black text-brand-heading uppercase tracking-tight">
                            New Mumbai
                        </h4>
                        <div className="h-0.5 w-12 bg-brand-primary/20 mt-2" />
                    </div>

                    <div className="space-y-6 relative">
                        <div className="text-center">
                            <p className="text-sm font-black text-brand-primary uppercase tracking-[0.1em] mb-2">Exclusive Offer</p>
                            <h5 className="text-lg font-bold text-brand-heading leading-snug">
                                Visit New Mumbai
                            </h5>
                        </div>

                        <p className="text-base text-brand-paragraph text-center">
                            Luxurious 6, 5, 4, 4, 3, 2 and 1 BHK flats in Navi Mumbai.
                        </p>

                        <div className="pt-4 space-y-3">
                            <button className="w-full py-4 px-6 rounded-2xl bg-brand-primary text-white font-black text-sm uppercase tracking-widest hover:bg-brand-primary-hover transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2 group/btn cursor-pointer">
                                Book Site Visit
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-x-1 transition-transform" />
                            </button>

                            <button className="w-full py-4 px-6 rounded-2xl bg-neutral-50 text-brand-heading font-black text-sm uppercase tracking-widest hover:bg-neutral-100 transition-all flex items-center justify-center gap-2 cursor-pointer">
                                <Phone className="w-4 h-4" />
                                Enquire Now
                            </button>
                        </div>
                    </div>

                    {/* Trust Badge Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.3
                                }
                            }
                        }}
                        className="mt-10 pt-8 border-t border-neutral-100"
                    >
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                {
                                    icon: Award,
                                    value: "15+",
                                    label: "Years Exp.",
                                    color: "text-amber-600 bg-amber-50",
                                    border: "border-amber-100"
                                },
                                {
                                    icon: Users,
                                    value: "5k+",
                                    label: "Families",
                                    color: "text-blue-600 bg-blue-50",
                                    border: "border-blue-100"
                                },
                                {
                                    icon: ShieldCheck,
                                    value: "RERA",
                                    label: "Project",
                                    color: "text-emerald-600 bg-emerald-50",
                                    border: "border-emerald-100"
                                }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8 },
                                        visible: { opacity: 1, scale: 1 }
                                    }}
                                    whileHover={{ y: -4, scale: 1.05 }}
                                    className="flex flex-col items-center text-center group/badge cursor-default"
                                >
                                    <div className={`w-12 h-12 rounded-2xl ${item.color} border ${item.border} flex items-center justify-center mb-3 transition-all duration-300 group-hover/badge:shadow-lg group-hover/badge:shadow-current/10`}>
                                        <item.icon size={20} strokeWidth={2.5} />
                                    </div>
                                    <span className="block text-[13px] font-black text-brand-heading uppercase leading-none">
                                        {item.value}
                                    </span>
                                    <span className="block text-[8px] font-black text-brand-muted uppercase mt-1.5 tracking-wide leading-none whitespace-nowrap">
                                        {item.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </aside>
        </div>
    );
};

export default CompanyPromo;
