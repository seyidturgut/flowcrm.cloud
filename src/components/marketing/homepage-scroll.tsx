"use client";

import { useEffect, useRef, useState } from "react";
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
    title: "Webhook odaklı yakalama",
    body: "Web sitendeki formları, açılış sayfası kayıtlarını ve kampanya dönüşlerini tek bir temiz lead akışında topla.",
    icon: Webhook,
    className: "lg:col-span-2",
  },
  {
    title: "Net lead görünürlüğü",
    body: "Her başvuru kaynak, kampanya bağlamı ve ekibinin hızlı aksiyon alması için gereken detaylarla gelir.",
    icon: LayoutDashboard,
    className: "",
  },
  {
    title: "Otomatik satış atama",
    body: "Leadleri kampanyaya, bölgeye, önceliğe veya temsilci uygunluğuna göre manuel uğraş olmadan yönlendir.",
    icon: Users,
    className: "",
  },
  {
    title: "Ekibi hızlandıran Yapay Zeka içgörüleri",
    body: "Lead gelir gelmez aciliyet, olası niyet ve sonraki adım önerilerini görünür hale getir.",
    icon: Bot,
    className: "lg:col-span-2",
  },
];

const steps = [
  {
    number: "01",
    title: "Web siteni bağla",
    body: "Formlarına, reklamlarına veya dış kaynaklarına dakikalar içinde bir FlowCRM webhook'u ekle.",
    icon: Globe,
  },
  {
    number: "02",
    title: "Leadleri otomatik yakala",
    body: "Her gelen lead, kaynak ve iletişim bilgileriyle birlikte düzenli bir kutuya düşer.",
    icon: Zap,
  },
  {
    number: "03",
    title: "Anında ata ve yönet",
    body: "Kurallar ve yapay zeka leadleri hızla dağıtır; ekibin sıralamaya değil satışa zaman ayırır.",
    icon: CheckCircle2,
  },
];

const plans = [
  {
    name: "Başlangıç",
    slug: "starter",
    price: "$29",
    label: "Küçük ekipler için",
    description: "Anında lead yakalama ve hızlı geri dönüş isteyen işletmeler için sade ve hızlı sistem.",
    features: [
      "Aylık 300 lead",
      "2 satış temsilcisi",
      "Webhook ile lead alma",
      "Temel yönlendirme kuralları",
      "Yapay Zeka lead özeti",
    ],
    featured: false,
  },
  {
    name: "Profesyonel",
    slug: "pro",
    price: "$79",
    label: "En popüler",
    description: "Hız, yönlendirme mantığı ve görünürlük isteyen ekipler için dönüşüm odaklı kurulum.",
    features: [
      "Aylık 1.000 lead",
      "7 satış temsilcisi",
      "Gelişmiş atama mantığı",
      "Yapay Zeka lead skorlama",
      "Kaynak ve kampanya takibi",
      "Öncelikli destek",
    ],
    featured: true,
  },
  {
    name: "Kurumsal",
    slug: "enterprise",
    price: "$199",
    label: "Ölçek için",
    description: "Daha fazla kontrol ve özel akış isteyen çok siteli, yüksek hacimli ekipler için üretildi.",
    features: [
      "Sınırsız lead",
      "Sınırsız temsilci",
      "Çoklu site yönetimi",
      "Tam API erişimi",
      "Özel akış desteği",
      "Özel kurulum desteği",
    ],
    featured: false,
  },
];

const stats = [
  { value: "< 60sn", label: "form gönderiminden temsilci atamasına" },
  { value: "3.4x", label: "daha hızlı ilk geri dönüş" },
  { value: "98%", label: "lead yakalama güvenilirliği" },
];

const previewLeads = [
  { name: "Maya Chen", meta: "Fiyatlandırma sayfası • Profesyonel plan", badge: "Yüksek niyet" },
  { name: "Owen Reed", meta: "Meta reklamları • Demo talebi", badge: "Dönüş bekliyor" },
  { name: "Lena Ortiz", meta: "Açılış sayfası • Kurumsal", badge: "Atandı" },
];

const previewRules = [
  "Kurumsal talepler -> Kıdemli ekip",
  "İstanbul leadleri -> Bölge sahibi",
  "Mesai dışı formlar -> Sabah kuyruğu",
];

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

function useMountedMotion(disabled: boolean) {
  const [entered, setEntered] = useState(() => disabled);

  useEffect(() => {
    if (disabled) {
      return;
    }

    const frame = window.requestAnimationFrame(() => setEntered(true));

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [disabled]);

  return entered;
}

function useReveal() {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(() => prefersReducedMotion);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return { ref, visible };
}

function fadeUpStyle(visible: boolean, y = 24) {
  return {
    opacity: visible ? 1 : 0.999,
    transform: `translateY(${visible ? 0 : y}px)`,
  };
}

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

function RevealSection({
  children,
  className = "",
  ...props
}: React.ComponentProps<"section">) {
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref}
      {...props}
      style={fadeUpStyle(visible, 20)}
      className={`${className} transition-[opacity,transform] duration-[1200ms] ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-0 opacity-100"
      }`}
    >
      {children}
    </section>
  );
}

function HeroScene() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const entered = useMountedMotion(prefersReducedMotion);

  return (
    <section className="relative z-10 px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24">
      <div>
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.03fr_0.97fr] lg:gap-16">
          <div
            className="max-w-2xl transition-[opacity,transform] duration-[900ms] ease-out"
            style={fadeUpStyle(entered, 28)}
          >
            <SectionEyebrow>Yapay Zeka destekli lead operasyonu</SectionEyebrow>

            <h1 className="mt-6 max-w-xl text-5xl font-semibold leading-[0.93] tracking-[-0.065em] text-slate-950 sm:text-6xl lg:text-7xl">
              Her leadi yakala. Hızlı yönlendir. Daha güvenle satışa dönüştür.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              FlowCRM; gelen formları, kampanya başvurularını ve web sitesi taleplerini ekibinin anında aksiyon alabileceği temiz bir satış akışına dönüştürür.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryCta href="/register" className="sm:w-auto">
                <span className="inline-flex items-center gap-2">
                  Hemen Başla
                  <ArrowRight className="size-4" />
                </span>
              </PrimaryCta>
              <SecondaryCta href="#pricing" className="sm:w-auto">
                Fiyatları Gör
              </SecondaryCta>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-sky-600" />
                  Kredi kartı gerektirmez
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-sky-600" />
                  10 dakikadan kısa kurulum
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  style={fadeUpStyle(entered, 18 + index * 8)}
                  className="rounded-[22px] border border-white/80 bg-white/82 p-4 shadow-[0_20px_46px_-30px_rgba(15,23,42,0.3)] backdrop-blur transition-[opacity,transform] duration-[900ms]"
                >
                  <div className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{stat.value}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[34rem]">
            <div className="absolute inset-x-12 top-8 h-56 rounded-full bg-[radial-gradient(circle,_rgba(27,116,255,0.22),_transparent_68%)] blur-3xl" />

            <div
              className="relative mx-auto max-w-[42rem] transition-[opacity,transform] duration-[1000ms] ease-out"
              style={{
                opacity: entered ? 1 : 0.999,
                transform: `translateY(${entered ? 0 : 30}px) scale(${entered ? 1 : 0.985})`,
              }}
            >
              <div className="relative overflow-hidden rounded-[30px] border border-white/75 bg-white/84 p-3 shadow-[0_34px_90px_-40px_rgba(15,23,42,0.34)] backdrop-blur-xl">
                <div className="rounded-[26px] border border-slate-200/80 bg-[linear-gradient(180deg,#fbfdff_0%,#edf5ff_100%)] p-4 sm:p-5">
                  <div className="flex items-center justify-between rounded-[20px] border border-white/80 bg-white/88 px-4 py-3 shadow-sm">
                    <div>
                      <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">Canlı akış</div>
                      <div className="mt-1 text-lg font-semibold tracking-[-0.03em] text-slate-950">Bugünkü başvuru akışı</div>
                    </div>
                    <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      14 yeni lead
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
                    <div className="rounded-[24px] border border-slate-200/80 bg-slate-950 p-4 text-white shadow-[0_22px_48px_-28px_rgba(15,23,42,0.68)]">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Lead panosu</div>
                          <div className="mt-1 text-base font-semibold">Gerçek zamanlı atama</div>
                        </div>
                        <div className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-sky-200">Yapay Zeka aktif</div>
                      </div>

                      <div className="mt-4 space-y-3">
                        {previewLeads.map((lead, index) => {
                          return (
                            <div
                              key={lead.name}
                              style={fadeUpStyle(entered, 20 + index * 8)}
                              className="rounded-2xl border border-white/10 bg-white/5 p-3 transition-[opacity,transform,background-color] duration-[900ms] hover:bg-white/8"
                            >
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
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div
                        style={fadeUpStyle(entered, 18)}
                        className="rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-sm transition-[opacity,transform] duration-[900ms]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                            <Webhook className="size-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-950">Web sitesi webhook</div>
                            <div className="text-sm text-slate-500">Bağlı ve veri alıyor</div>
                          </div>
                        </div>
                        <div className="mt-4 rounded-2xl bg-slate-950 px-3 py-2 font-mono text-xs text-sky-200">
                          /api/webhook/company-id
                        </div>
                      </div>

                      <div
                        style={fadeUpStyle(entered, 26)}
                        className="rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-sm transition-[opacity,transform] duration-[1000ms]"
                      >
                        <div className="text-sm font-medium text-slate-500">Atama mantığı</div>
                        <div className="mt-3 space-y-3">
                          {previewRules.map((rule, index) => {
                            return (
                              <div
                                key={rule}
                                style={fadeUpStyle(entered, 14 + index * 6)}
                                className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 transition-[opacity,transform] duration-[900ms]"
                              >
                                <span className="text-sm text-slate-700">{rule}</span>
                                <ChevronRight className="size-4 text-slate-400" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductPreviewScene() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, visible } = useReveal();
  const entered = useMountedMotion(prefersReducedMotion);
  const active = prefersReducedMotion ? true : visible && entered;

  return (
    <section ref={ref} className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
      <div>
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div
            style={{
              opacity: active ? 1 : 0.999,
              transform: `translateY(${active ? 0 : 26}px) scale(${active ? 1 : 0.99})`,
            }}
            className="overflow-hidden rounded-[34px] border border-slate-200/80 bg-slate-950 p-4 shadow-[0_36px_80px_-42px_rgba(15,23,42,0.64)] transition-[opacity,transform] duration-[1000ms] ease-out sm:p-5"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-900">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.24),_transparent_34%)]" />
              <div className="relative aspect-[16/10]">
                <Image
                  src="/hero-mockup.png"
                  alt="FlowCRM panel önizlemesi"
                  fill
                  className="object-cover opacity-90"
                  style={{ transform: `scale(${active ? 1 : 1.02}) translateY(${active ? 0 : 10}px)` }}
                />
              </div>
            </div>
          </div>

          <div
            style={fadeUpStyle(active, 28)}
            className="max-w-xl transition-[opacity,transform] duration-[1000ms] ease-out"
          >
            <SectionEyebrow>Ürün Önizleme</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
              Satış ekibinin tek bakışta anlayacağı bir panel.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
              En önemli bilgiler görünür kalır: kaynak, sahiplik, aciliyet ve sonraki aksiyon.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Kaynak, lead niyeti ve sahipliği tek bir temiz görünümde gör.",
                "Temsilcileri net atama ve takip durumuyla aynı hizada tut.",
                "Yakalamadan aksiyona daha az tıklama ve daha az sürtünmeyle geç.",
              ].map((item, index) => {
                return (
                  <div
                    key={item}
                    style={fadeUpStyle(active, 18 + index * 8)}
                    className="flex items-start gap-3 rounded-2xl bg-white/85 p-4 shadow-sm transition-[opacity,transform] duration-[900ms]"
                  >
                    <div className="mt-0.5 flex size-6 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                      <Check className="size-3.5" />
                    </div>
                    <p className="text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomepageScrollExperience() {
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
              Özellikler
            </Link>
            <Link href="#how-it-works" className="transition hover:text-slate-950">
              Nasıl Çalışır
            </Link>
            <Link href="#pricing" className="transition hover:text-slate-950">
              Fiyatlandırma
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login">
              <Button variant="ghost" className="h-10 rounded-full px-4 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                Giriş Yap
              </Button>
            </Link>
            <PrimaryCta href="/register" className="hidden sm:block">
              Hemen Başla
            </PrimaryCta>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <HeroScene />

        <RevealSection className="border-y border-slate-200/80 bg-white/74 px-4 py-6 backdrop-blur sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
              Hızlı hareket eden ekipler için
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-slate-500 sm:grid-cols-5 sm:gap-5">
              {trustItems.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-center shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection className="px-4 py-20 sm:px-6 lg:px-8" id="features">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <SectionEyebrow>Neden FlowCRM</SectionEyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
                Gelen leadler için tek operasyon sistemi.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                Daha iyi görünürlük, daha hızlı atama ve daha temiz satış akışı isteyen hizmet işletmeleri için tasarlandı.
              </p>
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:gap-5">
              {featureCards.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection className="px-4 py-20 sm:px-6 lg:px-8" id="how-it-works">
          <div className="mx-auto max-w-7xl rounded-[34px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(238,246,255,0.86)_100%)] p-6 shadow-[0_30px_80px_-44px_rgba(15,23,42,0.3)] sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
              <div className="max-w-md">
              <SectionEyebrow>Nasıl Çalışır</SectionEyebrow>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                  Bir kez kur. Geri kalan sıralamayı sistem yapsın.
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  FlowCRM, ilk form gönderiminden ilk görüşmeye kadar lead yolculuğunu net tutar.
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
        </RevealSection>

        <ProductPreviewScene />

        <RevealSection className="px-4 py-20 sm:px-6 lg:px-8" id="pricing">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <SectionEyebrow>Fiyatlandırma</SectionEyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
                Bir sonraki adımı netleştiren sade planlar.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                Lead hacmine ve ekibinin ihtiyaç duyduğu hıza uygun paketi seç.
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
                          En Popüler
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-6 flex items-end gap-2">
                      <div className="text-5xl font-semibold tracking-[-0.06em]">{plan.price}</div>
                      <div className={`pb-1 text-sm ${plan.featured ? "text-sky-100" : "text-slate-500"}`}>/ay</div>
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
                          Hemen Başla
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
        </RevealSection>

        <RevealSection className="px-4 pb-28 pt-8 sm:px-6 lg:px-8 lg:pb-24">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-slate-200/70 bg-[linear-gradient(135deg,#071328_0%,#0e1e41_42%,#1550af_100%)] px-6 py-10 text-white shadow-[0_36px_88px_-44px_rgba(15,23,42,0.84)] sm:px-10 sm:py-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-100">
                  <Star className="size-3.5" />
                  Yüksek niyetli lead ekipleri için üretildi
                </div>
                <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">
                  Leadlerini bugün daha akıllı yönetmeye başla.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-sky-50/88 sm:text-lg">
                  Daha fazla fırsat yakala, onları daha hızlı yönlendir ve ekibine gerçekten kullanmak isteyeceği bir sistem ver.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/register">
                  <Button className="h-12 w-full rounded-full bg-white px-6 text-sm font-semibold text-sky-700 hover:bg-sky-50 sm:w-auto">
                    Hemen Başla
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-full border-white/20 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/16 sm:w-auto"
                  >
                    Giriş Yap
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </RevealSection>
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
              FlowCRM, modern ekiplerin hız kaybetmeden gelen leadleri yakalamasına, atamasına ve satışa dönüştürmesine yardımcı olur.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
            <Link href="#features" className="transition hover:text-slate-950">
              Özellikler
            </Link>
            <Link href="#how-it-works" className="transition hover:text-slate-950">
              Nasıl Çalışır
            </Link>
            <Link href="#pricing" className="transition hover:text-slate-950">
              Fiyatlandırma
            </Link>
            <Link href="/login" className="transition hover:text-slate-950">
              Giriş Yap
            </Link>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/80 bg-white/92 p-3 backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-[1fr_auto] gap-3">
          <PrimaryCta href="/register">
            <span className="inline-flex items-center gap-2">
              Hemen Başla
              <ArrowRight className="size-4" />
            </span>
          </PrimaryCta>
          <SecondaryCta href="#pricing" className="w-auto">
            Fiyatlar
          </SecondaryCta>
        </div>
      </div>
    </div>
  );
}
