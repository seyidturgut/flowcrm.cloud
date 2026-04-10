import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  Globe,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Webhook,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const trustItems = ["NOVA COMMERCE", "PIXELHIVE", "ATLAS LEGAL", "ARC STUDIO", "LUMEN CARE"];

const featureCards = [
  {
    title: "Webhook-first capture",
    body: "Push every website form, landing page, and campaign response into one clean lead stream.",
    icon: Webhook,
    className: "lg:col-span-2",
  },
  {
    title: "Lead capture clarity",
    body: "Every submission arrives with source, campaign context, and the details your reps need to act.",
    icon: LayoutDashboard,
    className: "",
  },
  {
    title: "Sales assignment automation",
    body: "Route leads by campaign, territory, urgency, or rep availability without manual triage.",
    icon: Users,
    className: "",
  },
  {
    title: "AI insights that help reps move",
    body: "Surface urgency, likely intent, and next-step guidance the moment a lead comes in.",
    icon: Bot,
    className: "lg:col-span-2",
  },
];

const steps = [
  {
    number: "01",
    title: "Connect your website",
    body: "Add a FlowCRM webhook to forms, ads, or any external source in minutes.",
    icon: Globe,
  },
  {
    number: "02",
    title: "Capture leads automatically",
    body: "Every inbound lead lands in a structured inbox with source and contact data attached.",
    icon: Zap,
  },
  {
    number: "03",
    title: "Assign and manage instantly",
    body: "Rules and AI distribute leads fast so your team spends less time sorting and more time closing.",
    icon: CheckCircle2,
  },
];

const plans = [
  {
    name: "Starter",
    slug: "starter",
    price: "$29",
    label: "For lean teams",
    description: "A fast, clean system for businesses that want instant lead capture and follow-up.",
    features: [
      "300 leads / month",
      "2 sales reps",
      "Webhook intake",
      "Basic routing rules",
      "AI lead summary",
    ],
    featured: false,
  },
  {
    name: "Pro",
    slug: "pro",
    price: "$79",
    label: "Most popular",
    description: "The conversion-focused setup for teams that need speed, routing logic, and visibility.",
    features: [
      "1,000 leads / month",
      "7 sales reps",
      "Advanced assignment logic",
      "AI lead scoring",
      "Source and campaign tracking",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    slug: "enterprise",
    price: "$199",
    label: "For scale",
    description: "Built for multi-site, high-volume teams that need more control and custom workflows.",
    features: [
      "Unlimited leads",
      "Unlimited reps",
      "Multi-site management",
      "Full API access",
      "Custom workflow support",
      "Dedicated onboarding",
    ],
    featured: false,
  },
];

const stats = [
  { value: "< 60s", label: "from form submit to rep assignment" },
  { value: "3.4x", label: "faster first-touch response" },
  { value: "98%", label: "lead capture reliability" },
];

const previewLeads = [
  { name: "Maya Chen", meta: "Pricing page • Pro plan", badge: "High intent" },
  { name: "Owen Reed", meta: "Meta ads • Demo request", badge: "Needs reply" },
  { name: "Lena Ortiz", meta: "Landing page • Enterprise", badge: "Assigned" },
];

const previewRules = [
  "Enterprise inquiries -> Senior team",
  "Istanbul leads -> Territory owner",
  "After-hours forms -> Morning queue",
];

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700 shadow-sm backdrop-blur">
      <Sparkles className="size-3.5" />
      {children}
    </div>
  );
}

function PrimaryCta({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={className}>
      <Button className="h-12 w-full rounded-full bg-[linear-gradient(135deg,#1b74ff_0%,#1251f4_100%)] px-6 text-sm font-semibold text-white shadow-[0_20px_40px_-16px_rgba(27,116,255,0.78)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_54px_-18px_rgba(27,116,255,0.82)] sm:h-13 sm:text-base">
        {children}
      </Button>
    </Link>
  );
}

function SecondaryCta({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={className}>
      <Button
        variant="outline"
        className="h-12 w-full rounded-full border-slate-200 bg-white/85 px-6 text-sm font-semibold text-slate-950 shadow-sm transition duration-300 hover:border-slate-300 hover:bg-white sm:h-13 sm:text-base"
      >
        {children}
      </Button>
    </Link>
  );
}

function FeatureCard({
  title,
  body,
  icon: Icon,
  className,
}: {
  title: string;
  body: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <div
      className={`group rounded-[28px] border border-white/80 bg-white/88 p-6 shadow-[0_24px_64px_-38px_rgba(15,23,42,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_80px_-36px_rgba(15,23,42,0.34)] ${className || ""}`}
    >
      <div className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#dbeafe_0%,#eff8ff_100%)] text-sky-700 transition duration-300 group-hover:scale-105">
        <Icon className="size-5" />
      </div>
      <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em] text-slate-950">{title}</h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 sm:text-base">{body}</p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#f6faff_0%,#eff5ff_42%,#f8fbff_100%)] text-slate-950">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[40rem] bg-[radial-gradient(circle_at_top,_rgba(27,116,255,0.18),_transparent_52%),radial-gradient(circle_at_18%_18%,_rgba(72,189,255,0.16),_transparent_30%),radial-gradient(circle_at_82%_10%,_rgba(92,126,255,0.12),_transparent_26%)]" />

      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/78 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/FlowCRM.cloud logo design.webp"
              alt="FlowCRM"
              width={134}
              height={34}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <Link href="#features" className="transition hover:text-slate-950">
              Features
            </Link>
            <Link href="#how-it-works" className="transition hover:text-slate-950">
              How it Works
            </Link>
            <Link href="#pricing" className="transition hover:text-slate-950">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login">
              <Button variant="ghost" className="h-10 rounded-full px-4 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                Sign In
              </Button>
            </Link>
            <PrimaryCta href="/register" className="hidden sm:block">
              Get Started
            </PrimaryCta>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.03fr_0.97fr] lg:gap-16">
            <div className="max-w-2xl">
              <SectionEyebrow>AI-powered lead operations</SectionEyebrow>

              <h1 className="mt-6 max-w-xl text-5xl font-semibold leading-[0.93] tracking-[-0.065em] text-slate-950 sm:text-6xl lg:text-7xl">
                Capture every lead. Route it fast. Close with more confidence.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                FlowCRM turns inbound forms, campaigns, and website inquiries into a clean sales pipeline your team can
                act on immediately.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryCta href="/register" className="sm:w-auto">
                  <span className="inline-flex items-center gap-2">
                    Get Started
                    <ArrowRight className="size-4" />
                  </span>
                </PrimaryCta>
                <SecondaryCta href="#pricing" className="sm:w-auto">
                  View Pricing
                </SecondaryCta>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-sky-600" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-sky-600" />
                  Setup in under 10 minutes
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[22px] border border-white/80 bg-white/82 p-4 shadow-[0_20px_46px_-30px_rgba(15,23,42,0.3)] backdrop-blur"
                  >
                    <div className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{stat.value}</div>
                    <div className="mt-1 text-sm leading-6 text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-x-12 top-8 h-56 rounded-full bg-[radial-gradient(circle,_rgba(27,116,255,0.2),_transparent_68%)] blur-3xl" />
              <div className="relative overflow-hidden rounded-[30px] border border-white/75 bg-white/84 p-3 shadow-[0_34px_90px_-40px_rgba(15,23,42,0.34)] backdrop-blur-xl">
                <div className="rounded-[26px] border border-slate-200/80 bg-[linear-gradient(180deg,#fbfdff_0%,#edf5ff_100%)] p-4 sm:p-5">
                  <div className="flex items-center justify-between rounded-[20px] border border-white/80 bg-white/88 px-4 py-3 shadow-sm">
                    <div>
                      <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">Live pipeline</div>
                      <div className="mt-1 text-lg font-semibold tracking-[-0.03em] text-slate-950">Today&apos;s inbound flow</div>
                    </div>
                    <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      14 new leads
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
                    <div className="rounded-[24px] border border-slate-200/80 bg-slate-950 p-4 text-white shadow-[0_22px_48px_-28px_rgba(15,23,42,0.68)]">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Lead board</div>
                          <div className="mt-1 text-base font-semibold">Assigned in real time</div>
                        </div>
                        <div className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-sky-200">AI active</div>
                      </div>

                      <div className="mt-4 space-y-3">
                        {previewLeads.map((lead) => (
                          <div key={lead.name} className="rounded-2xl border border-white/10 bg-white/5 p-3 transition duration-300 hover:bg-white/8">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="font-medium">{lead.name}</div>
                                <div className="mt-1 text-sm text-slate-300">{lead.meta}</div>
                              </div>
                              <div className="rounded-full bg-white/10 px-2 py-1 text-[11px] font-medium text-slate-100">
                                {lead.badge}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                            <Webhook className="size-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-950">Website webhook</div>
                            <div className="text-sm text-slate-500">Connected and receiving events</div>
                          </div>
                        </div>
                        <div className="mt-4 rounded-2xl bg-slate-950 px-3 py-2 font-mono text-xs text-sky-200">
                          /api/webhook/company-id
                        </div>
                      </div>

                      <div className="rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-sm">
                        <div className="text-sm font-medium text-slate-500">Assignment logic</div>
                        <div className="mt-3 space-y-3">
                          {previewRules.map((rule) => (
                            <div key={rule} className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2">
                              <span className="text-sm text-slate-700">{rule}</span>
                              <ChevronRight className="size-4 text-slate-400" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[24px] border border-slate-200/80 bg-[linear-gradient(135deg,#edf5ff_0%,#ffffff_100%)] p-4 shadow-sm">
                        <div className="text-sm font-medium text-slate-500">AI insight</div>
                        <p className="mt-2 text-sm leading-6 text-slate-700">
                          &ldquo;Pricing-page visits and urgency language suggest a high-close opportunity. Assign within 5
                          minutes.&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200/80 bg-white/74 px-4 py-6 backdrop-blur sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
              Built for teams that move fast
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-slate-500 sm:grid-cols-5 sm:gap-5">
              {trustItems.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-center shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8" id="features">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <SectionEyebrow>Why FlowCRM</SectionEyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
                One operating system for inbound leads.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                Designed for service businesses that need better visibility, faster assignment, and cleaner sales motion.
              </p>
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:gap-5">
              {featureCards.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8" id="how-it-works">
          <div className="mx-auto max-w-7xl rounded-[34px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(238,246,255,0.86)_100%)] p-6 shadow-[0_30px_80px_-44px_rgba(15,23,42,0.3)] sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
              <div className="max-w-md">
                <SectionEyebrow>How it Works</SectionEyebrow>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                  Set it up once. Let the system do the sorting.
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  FlowCRM keeps the lead journey clear from first submission to first conversation.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.number}
                      className="rounded-[28px] border border-white/80 bg-white p-5 shadow-[0_22px_46px_-30px_rgba(15,23,42,0.24)] transition duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                          <Icon className="size-5" />
                        </div>
                        <div className="text-sm font-semibold text-slate-400">{step.number}</div>
                      </div>
                      <h3 className="mt-6 text-lg font-semibold tracking-[-0.03em] text-slate-950">{step.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{step.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="overflow-hidden rounded-[34px] border border-slate-200/80 bg-slate-950 p-4 shadow-[0_36px_80px_-42px_rgba(15,23,42,0.64)] sm:p-5">
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.24),_transparent_34%)]" />
                <div className="relative aspect-[16/10]">
                  <Image src="/hero-mockup.png" alt="FlowCRM dashboard preview" fill className="object-cover opacity-90" />
                </div>
              </div>
            </div>

            <div className="max-w-xl">
              <SectionEyebrow>Product Preview</SectionEyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
                A dashboard your sales team can read at a glance.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                The information that matters most stays visible: source, ownership, urgency, and next action.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "See source, lead intent, and ownership in one clean view.",
                  "Keep reps aligned with clear assignment and follow-up state.",
                  "Move from capture to action with fewer clicks and less friction.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/85 p-4 shadow-sm">
                    <div className="mt-0.5 flex size-6 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                      <Check className="size-3.5" />
                    </div>
                    <p className="text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8" id="pricing">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <SectionEyebrow>Pricing</SectionEyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
                Clear plans that make the next step obvious.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                Choose the setup that matches your lead volume and the speed your team needs.
              </p>
            </div>

            <div className="-mx-4 mt-12 overflow-x-auto px-4 pb-4 [scrollbar-width:none]">
              <div className="flex snap-x snap-mandatory gap-4 lg:grid lg:grid-cols-3 lg:gap-5">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`min-w-[84vw] snap-center rounded-[30px] border p-6 shadow-[0_30px_72px_-42px_rgba(15,23,42,0.32)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_36px_84px_-38px_rgba(15,23,42,0.36)] sm:min-w-[26rem] lg:min-w-0 ${
                      plan.featured
                        ? "border-sky-300 bg-[linear-gradient(180deg,#1b74ff_0%,#1251f4_100%)] text-white shadow-[0_34px_80px_-34px_rgba(27,116,255,0.76)]"
                        : "border-white/80 bg-white/90 text-slate-950"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div
                          className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                            plan.featured ? "bg-white/14 text-white" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {plan.label}
                        </div>
                        <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">{plan.name}</h3>
                      </div>
                      {plan.featured ? (
                        <div className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-700">
                          Pro
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-6 flex items-end gap-2">
                      <div className="text-5xl font-semibold tracking-[-0.06em]">{plan.price}</div>
                      <div className={`pb-1 text-sm ${plan.featured ? "text-sky-100" : "text-slate-500"}`}>/month</div>
                    </div>

                    <p className={`mt-4 text-sm leading-6 ${plan.featured ? "text-sky-50" : "text-slate-600"}`}>
                      {plan.description}
                    </p>

                    <div className="mt-8">
                      <Link href={`/register?plan=${plan.slug}`}>
                        <Button
                          className={`h-12 w-full rounded-full text-sm font-semibold transition duration-300 ${
                            plan.featured
                              ? "bg-white text-sky-700 shadow-[0_18px_40px_-20px_rgba(255,255,255,0.9)] hover:bg-sky-50"
                              : "bg-[linear-gradient(135deg,#1b74ff_0%,#1251f4_100%)] text-white shadow-[0_18px_40px_-20px_rgba(27,116,255,0.72)] hover:-translate-y-0.5"
                          }`}
                        >
                          Get Started
                        </Button>
                      </Link>
                    </div>

                    <ul className={`mt-8 space-y-3 ${plan.featured ? "text-sky-50" : "text-slate-700"}`}>
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm leading-6">
                          <div
                            className={`mt-0.5 flex size-5 items-center justify-center rounded-full ${
                              plan.featured ? "bg-white/18 text-white" : "bg-sky-100 text-sky-700"
                            }`}
                          >
                            <Check className="size-3.5" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-28 pt-8 sm:px-6 lg:px-8 lg:pb-24">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-slate-200/70 bg-[linear-gradient(135deg,#071328_0%,#0e1e41_42%,#1550af_100%)] px-6 py-10 text-white shadow-[0_36px_88px_-44px_rgba(15,23,42,0.84)] sm:px-10 sm:py-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-100">
                  <Star className="size-3.5" />
                  Built for high-intent lead teams
                </div>
                <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">
                  Start managing your leads smarter today.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-sky-50/88 sm:text-lg">
                  Capture more opportunities, route them faster, and give your team a system they actually want to use.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/register">
                  <Button className="h-12 w-full rounded-full bg-white px-6 text-sm font-semibold text-sky-700 hover:bg-sky-50 sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-full border-white/20 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/16 sm:w-auto"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/82 px-4 py-10 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <Image
              src="/FlowCRM.cloud logo design.webp"
              alt="FlowCRM"
              width={134}
              height={34}
              className="h-8 w-auto object-contain"
            />
            <p className="mt-3 text-sm leading-6 text-slate-600">
              FlowCRM helps modern teams capture, assign, and convert inbound leads without losing speed.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
            <Link href="#features" className="transition hover:text-slate-950">
              Features
            </Link>
            <Link href="#how-it-works" className="transition hover:text-slate-950">
              How it Works
            </Link>
            <Link href="#pricing" className="transition hover:text-slate-950">
              Pricing
            </Link>
            <Link href="/login" className="transition hover:text-slate-950">
              Sign In
            </Link>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/80 bg-white/92 p-3 backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-[1fr_auto] gap-3">
          <PrimaryCta href="/register">
            <span className="inline-flex items-center gap-2">
              Get Started
              <ArrowRight className="size-4" />
            </span>
          </PrimaryCta>
          <SecondaryCta href="#pricing" className="w-auto">
            Pricing
          </SecondaryCta>
        </div>
      </div>
    </div>
  );
}
