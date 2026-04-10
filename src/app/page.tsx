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

const trustLogos = ["NOVA STUDIO", "PIXELHIVE", "LUMOS CARE", "ROOTOPS", "ARC COMMERCE"];

const featureCards = [
  {
    title: "Lead inbox that stays clean",
    description: "Capture every form fill, ad response, and referral in one calm workspace your team can scan in seconds.",
    icon: LayoutDashboard,
    className: "md:col-span-2",
  },
  {
    title: "Webhook integrations",
    description: "Drop one endpoint into your site and route every new lead into FlowCRM automatically.",
    icon: Webhook,
    className: "",
  },
  {
    title: "Sales assignment automation",
    description: "Auto-distribute leads by source, region, campaign, or rep availability without manual triage.",
    icon: Users,
    className: "",
  },
  {
    title: "AI insights for every opportunity",
    description: "Summaries, urgency signals, and next-step prompts help reps act faster with better context.",
    icon: Bot,
    className: "md:col-span-2",
  },
];

const steps = [
  {
    title: "Connect your website",
    description: "Add your FlowCRM webhook to forms, landing pages, or any external lead source.",
    icon: Globe,
  },
  {
    title: "Capture leads automatically",
    description: "Every submission lands in a structured inbox with source, context, and lead details attached.",
    icon: Zap,
  },
  {
    title: "Assign and manage instantly",
    description: "Automation rules send the right lead to the right rep while the team works from one live pipeline.",
    icon: CheckCircle2,
  },
];

const plans = [
  {
    name: "Starter",
    slug: "starter",
    price: "$29",
    description: "For lean teams that want a faster way to capture and follow up.",
    label: "Best for new teams",
    features: [
      "300 leads per month",
      "2 sales reps",
      "Webhook capture",
      "Basic assignment rules",
      "AI lead summary",
    ],
    featured: false,
  },
  {
    name: "Pro",
    slug: "pro",
    price: "$79",
    description: "For growing sales teams that need automation, speed, and visibility.",
    label: "Most popular",
    features: [
      "1,000 leads per month",
      "7 sales reps",
      "Advanced routing logic",
      "AI lead scoring",
      "Campaign and source tracking",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    slug: "enterprise",
    price: "$199",
    description: "For multi-brand and high-volume teams that need control at scale.",
    label: "For advanced operations",
    features: [
      "Unlimited leads",
      "Unlimited reps",
      "Multi-site management",
      "Full API access",
      "Custom workflows",
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

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#f2f7ff_38%,#f8fbff_100%)] text-slate-950">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(22,132,255,0.18),_transparent_55%),radial-gradient(circle_at_20%_20%,_rgba(69,189,255,0.14),_transparent_32%),radial-gradient(circle_at_80%_10%,_rgba(72,117,255,0.12),_transparent_28%)]" />

      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/FlowCRM.cloud logo design.webp"
              alt="FlowCRM"
              width={132}
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
              How it works
            </Link>
            <Link href="#pricing" className="transition hover:text-slate-950">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                className="h-10 rounded-full px-4 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Sign in
              </Button>
            </Link>
            <Link href="/register">
              <Button className="h-10 rounded-full bg-[linear-gradient(135deg,#1674ff_0%,#0f4cf4_100%)] px-5 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(22,116,255,0.65)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(22,116,255,0.7)]">
                Start free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700 shadow-sm">
                <Sparkles className="size-3.5" />
                AI-powered lead operations
              </div>

              <h1 className="mt-6 max-w-xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
                Turn every inbound lead into a faster sales conversation.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                FlowCRM helps service businesses capture leads from any website, score them instantly, and assign the
                right rep before response time slips away.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button className="h-12 w-full rounded-full bg-[linear-gradient(135deg,#1674ff_0%,#0f4cf4_100%)] px-7 text-base font-semibold text-white shadow-[0_22px_40px_-16px_rgba(22,116,255,0.75)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_52px_-18px_rgba(22,116,255,0.78)] sm:w-auto">
                    Start free
                    <ArrowRight className="ml-1 size-4" />
                  </Button>
                </Link>
                <Link href="#pricing" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-full border-slate-200 bg-white/80 px-7 text-base font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-white sm:w-auto"
                  >
                    View pricing
                  </Button>
                </Link>
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
                    className="rounded-[22px] border border-white/70 bg-white/80 p-4 shadow-[0_18px_40px_-26px_rgba(15,23,42,0.35)] backdrop-blur"
                  >
                    <div className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{stat.value}</div>
                    <div className="mt-1 text-sm leading-6 text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-x-10 top-6 h-56 rounded-full bg-[radial-gradient(circle,_rgba(22,116,255,0.2),_transparent_68%)] blur-3xl" />
              <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/82 p-3 shadow-[0_30px_80px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl">
                <div className="rounded-[24px] border border-slate-200/80 bg-[linear-gradient(180deg,#f9fbff_0%,#eef5ff_100%)] p-4 sm:p-5">
                  <div className="flex items-center justify-between rounded-[20px] border border-white/70 bg-white/80 px-4 py-3 shadow-sm">
                    <div>
                      <div className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">Live pipeline</div>
                      <div className="mt-1 text-lg font-semibold tracking-[-0.03em] text-slate-950">Today&apos;s inbound flow</div>
                    </div>
                    <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      14 new leads
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                    <div className="rounded-[22px] border border-slate-200/80 bg-slate-950 p-4 text-white shadow-[0_20px_45px_-25px_rgba(15,23,42,0.65)]">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Lead board</div>
                          <div className="mt-1 text-base font-semibold">Assigned in real time</div>
                        </div>
                        <div className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-sky-200">
                          AI active
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        {[
                          {
                            name: "Maya Chen",
                            tag: "High intent",
                            source: "Pricing form • Pro plan",
                          },
                          {
                            name: "Owen Reed",
                            tag: "Needs follow-up",
                            source: "Meta ads • Demo request",
                          },
                          {
                            name: "Lena Ortiz",
                            tag: "Assigned to Sarah",
                            source: "Landing page • Enterprise",
                          },
                        ].map((lead) => (
                          <div key={lead.name} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="font-medium">{lead.name}</div>
                                <div className="mt-1 text-sm text-slate-300">{lead.source}</div>
                              </div>
                              <div className="rounded-full bg-white/10 px-2 py-1 text-[11px] font-medium text-slate-100">
                                {lead.tag}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-[22px] border border-slate-200/80 bg-white p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
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

                      <div className="rounded-[22px] border border-slate-200/80 bg-white p-4 shadow-sm">
                        <div className="text-sm font-medium text-slate-500">Assignment logic</div>
                        <div className="mt-3 space-y-3">
                          {[
                            "Enterprise inquiries -> Senior team",
                            "Istanbul leads -> Territory owner",
                            "After-hours forms -> Morning queue",
                          ].map((rule) => (
                            <div key={rule} className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2">
                              <span className="text-sm text-slate-700">{rule}</span>
                              <ChevronRight className="size-4 text-slate-400" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[22px] border border-slate-200/80 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] p-4 shadow-sm">
                        <div className="text-sm font-medium text-slate-500">AI insight</div>
                        <p className="mt-2 text-sm leading-6 text-slate-700">
                          “Pricing-page visits and urgency language suggest a high-close opportunity. Assign within 5
                          minutes.”
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200/80 bg-white/70 px-4 py-6 backdrop-blur sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
              Teams using FlowCRM to move faster
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-slate-500 sm:grid-cols-5 sm:gap-6">
              {trustLogos.map((logo) => (
                <div key={logo} className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-center">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8" id="features">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">Why teams switch</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
                One place to capture, route, and act on every lead.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                The landing page should sell clarity. The product should deliver it. FlowCRM gives your team both.
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3 lg:gap-5">
              {featureCards.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className={`group rounded-[28px] border border-white/80 bg-white/85 p-6 shadow-[0_22px_60px_-34px_rgba(15,23,42,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-30px_rgba(15,23,42,0.33)] ${feature.className}`}
                  >
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#dbeafe_0%,#eef8ff_100%)] text-sky-700 transition group-hover:scale-105 group-hover:bg-[linear-gradient(135deg,#bfdbfe_0%,#dff4ff_100%)]">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em] text-slate-950">{feature.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 sm:text-base">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8" id="how-it-works">
          <div className="mx-auto max-w-7xl rounded-[32px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(239,246,255,0.82)_100%)] p-6 shadow-[0_28px_80px_-42px_rgba(15,23,42,0.35)] sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
              <div className="max-w-md">
                <div className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">How it works</div>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                  Set up your lead flow once. Let the system handle the busywork.
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  From website capture to rep assignment, FlowCRM keeps the path simple enough for fast teams and
                  structured enough for scale.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.title}
                      className="rounded-[28px] border border-white/75 bg-white p-5 shadow-[0_20px_40px_-28px_rgba(15,23,42,0.28)]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                          <Icon className="size-5" />
                        </div>
                        <div className="text-sm font-semibold text-slate-400">0{index + 1}</div>
                      </div>
                      <h3 className="mt-6 text-lg font-semibold text-slate-950">{step.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-slate-950 p-4 shadow-[0_34px_80px_-36px_rgba(15,23,42,0.55)] sm:p-5">
              <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-slate-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.15),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.22),_transparent_34%)]" />
                <div className="relative aspect-[16/10]">
                  <Image src="/hero-mockup.png" alt="FlowCRM dashboard preview" fill className="object-cover opacity-90" />
                </div>
              </div>
            </div>

            <div className="max-w-xl">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">Product preview</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
                A dashboard your reps can understand on the first scroll.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                Critical lead context, ownership, AI summaries, and routing status are visible without digging through
                tabs. That means quicker follow-up and fewer dropped opportunities.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "See lead source, urgency, and ownership in one view.",
                  "Keep the team aligned with clear assignment and response state.",
                  "Move from lead capture to action with fewer clicks and less friction.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/80 p-4 shadow-sm">
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
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">Pricing</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
                Clear plans that make the next step obvious.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                Each plan is designed around faster lead response, cleaner assignment, and stronger conversion.
              </p>
            </div>

            <div className="-mx-4 mt-12 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
              <div className="flex snap-x snap-mandatory gap-4 sm:grid sm:grid-cols-3 sm:gap-5">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`min-w-[84vw] snap-center rounded-[30px] border p-6 shadow-[0_28px_70px_-42px_rgba(15,23,42,0.3)] transition duration-300 hover:scale-[1.01] sm:min-w-0 sm:p-7 ${
                      plan.featured
                        ? "border-sky-300 bg-[linear-gradient(180deg,#1674ff_0%,#0f4cf4_100%)] text-white shadow-[0_32px_70px_-34px_rgba(22,116,255,0.75)]"
                        : "border-white/80 bg-white/88 text-slate-950"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                            plan.featured ? "bg-white/14 text-white" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {plan.label}
                        </div>
                        <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">{plan.name}</h3>
                      </div>
                      {plan.featured ? (
                        <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                          Most popular
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
                          className={`h-12 w-full rounded-full text-sm font-semibold shadow-sm transition ${
                            plan.featured
                              ? "bg-white text-sky-700 hover:bg-sky-50"
                              : "bg-[linear-gradient(135deg,#1674ff_0%,#0f4cf4_100%)] text-white shadow-[0_16px_30px_-18px_rgba(22,116,255,0.7)] hover:-translate-y-0.5"
                          }`}
                        >
                          Get started
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
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-slate-200/80 bg-[linear-gradient(135deg,#071327_0%,#0d1b39_45%,#123d91_100%)] px-6 py-10 text-white shadow-[0_36px_80px_-44px_rgba(15,23,42,0.8)] sm:px-10 sm:py-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-100">
                  <Star className="size-3.5" />
                  Built for high-intent lead teams
                </div>
                <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">
                  Start managing your leads smarter today.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-sky-50/85 sm:text-lg">
                  Capture more opportunities, route them faster, and give your sales team a system they will actually
                  enjoy using.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/register">
                  <Button className="h-12 w-full rounded-full bg-white px-6 text-sm font-semibold text-sky-700 hover:bg-sky-50 sm:w-auto">
                    Start free
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-full border-white/20 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/16 sm:w-auto"
                  >
                    Sign in
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/80 px-4 py-10 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <Image
              src="/FlowCRM.cloud logo design.webp"
              alt="FlowCRM"
              width={132}
              height={34}
              className="h-8 w-auto object-contain"
            />
            <p className="mt-3 text-sm leading-6 text-slate-600">
              FlowCRM helps modern sales teams capture, assign, and convert leads without losing speed.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
            <Link href="#features" className="transition hover:text-slate-950">
              Features
            </Link>
            <Link href="#pricing" className="transition hover:text-slate-950">
              Pricing
            </Link>
            <Link href="/login" className="transition hover:text-slate-950">
              Sign in
            </Link>
            <Link href="/register" className="transition hover:text-slate-950">
              Get started
            </Link>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/80 bg-white/92 p-3 backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <Link href="/register" className="flex-1">
            <Button className="h-12 w-full rounded-full bg-[linear-gradient(135deg,#1674ff_0%,#0f4cf4_100%)] text-sm font-semibold text-white shadow-[0_18px_34px_-18px_rgba(22,116,255,0.72)]">
              Start free
            </Button>
          </Link>
          <Link href="#pricing" className="flex-1">
            <Button variant="outline" className="h-12 w-full rounded-full border-slate-200 bg-white text-sm font-semibold text-slate-900">
              Pricing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
