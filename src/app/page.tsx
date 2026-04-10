import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Users, 
  Bot,
  Flame,
  Cloud
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const plans = [
    {
      name: "Starter",
      slug: "starter",
      price: "29",
      description: "Yeni başlayan küçük ekipler için ideal.",
      features: [
        "Aylık 300 Lead İşleme",
        "2 Satış Temsilcisi",
        "Webhook Entegrasyonu",
        "Temel Yönlendirme",
        "AI Lead Özeti"
      ],
      icon: <Cloud className="h-6 w-6 text-blue-400" />,
      popular: false
    },
    {
      name: "Pro",
      slug: "pro",
      price: "79",
      description: "Büyüyen işletmeler için gelişmiş AI gücü.",
      features: [
        "Aylık 1.000 Lead İşleme",
        "7 Satış Temsilcisi",
        "Gelişmiş Yönlendirme Kuralları",
        "AI Lead Skorlama",
        "UTM Takibi & Analitik",
        "Öncelikli Destek"
      ],
      icon: <Zap className="h-6 w-6 text-orange-400" />,
      popular: true
    },
    {
      name: "Enterprise",
      slug: "enterprise",
      price: "199",
      description: "Ajanslar ve büyük ekipler için tam çözüm.",
      features: [
        "Sınırsız Lead İşleme",
        "Sınırsız Temsilci",
        "Full API Erişimi",
        "Çoklu Site Yönetimi",
        "Özel Entegrasyonlar",
        "SLA Destek Hattı"
      ],
      icon: <Flame className="h-6 w-6 text-red-400" />,
      popular: false
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image 
              src="/FlowCRM.cloud logo design.webp" 
              alt="FlowCRM Logo" 
              width={120} 
              height={30} 
              className="object-contain"
              priority
            />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#features" className="hover:text-primary transition-colors">Özellikler</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Fiyatlandırma</Link>
            <Link href="#about" className="hover:text-primary transition-colors">Hakkımızda</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-sm font-bold">Giriş Yap</Button>
            </Link>
            <Link href="/register">
              <Button className="text-sm font-bold rounded-xl shadow-lg shadow-primary/20 px-6 bg-primary hover:scale-105 transition-transform">Hemen Başla</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-indigo-500/10 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-xs font-black uppercase tracking-widest text-primary mb-4">
            <Sparkles className="h-3 w-3 animate-spin duration-3000" />
            Yeni Nesil AI Lead Yönetimi
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-gradient">
            Leadlerinizi Akıllıca <br /> Dönüştürün.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            FlowCRM.cloud ile gelen her leadi yapay zeka ile analiz edin, skorlayın ve saniyeler içinde doğru satış temsilcisine atayın.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/register">
              <Button size="lg" className="h-14 px-8 rounded-2xl text-lg font-black bg-primary shadow-xl shadow-primary/20 hover:scale-105 transition-all group">
                Ücretsiz Deneyin
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#pricing">
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl text-lg font-bold border-white/10 glass hover:bg-white/5 transition-all">
                Paketleri İncele
              </Button>
            </Link>
          </div>
        </div>

        {/* Mockup Preview */}
        <div className="max-w-6xl mx-auto mt-20 relative animate-in fade-in zoom-in duration-1000 delay-300">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative glass border-white/10 rounded-[2rem] overflow-hidden shadow-2xl p-4">
             <div className="bg-background/80 rounded-[1.5rem] aspect-video flex items-center justify-center overflow-hidden border border-white/5">
                <Image 
                  src="/hero-mockup.png" 
                  alt="Dashboard Preview" 
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Neden FlowCRM?</h2>
            <h3 className="text-4xl font-black tracking-tight">Satış Süreçlerinizi Yapay Zeka ile Hızlandırın</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Akıllı Analiz",
                desc: "Her inbound leadi saniyeler içinde analiz eder, niyetini ölçer ve skorlar.",
                icon: <Bot className="h-8 w-8" />
              },
              {
                title: "Doğru Eşleştirme",
                desc: "Leadi uzmanlığına göre en uygun satış temsilcisine otomatik olarak atar.",
                icon: <Users className="h-8 w-8" />
              },
              {
                title: "Gerçek Zamanlı Veri",
                desc: "Dönüşüm oranlarını ve ekip performansını anlık olarak takip edin.",
                icon: <Zap className="h-8 w-8" />
              }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-[2rem] glass border-white/5 hover:border-primary/20 transition-all hover:-translate-y-2 group">
                <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                  {f.icon}
                </div>
                <h4 className="text-xl font-bold mb-4">{f.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Fiyatlandırma</h2>
            <h3 className="text-4xl font-black tracking-tight text-gradient">Size Uygun Paketi Seçin</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((p, i) => (
              <div key={i} className={`p-10 rounded-[2.5rem] flex flex-col relative transition-all hover:scale-[1.02] ${
                p.popular 
                ? "bg-primary/5 border-2 border-primary shadow-2xl shadow-primary/20" 
                : "glass border-white/10"
              }`}>
                {p.popular && (
                  <div className="absolute top-0 right-10 -translate-y-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                    En Popüler
                  </div>
                )}
                <div className="mb-8 p-3 w-fit bg-background rounded-2xl border border-white/10">
                  {p.icon}
                </div>
                <h4 className="text-2xl font-black mb-2">{p.name}</h4>
                <p className="text-sm text-muted-foreground mb-8 min-h-[40px] italic">"{p.description}"</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-black italic tracking-tighter">${p.price}</span>
                  <span className="text-muted-foreground font-medium">/ay</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3 text-sm font-medium">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/register?plan=${p.slug}`}>
                  <Button 
                    variant={p.popular ? "default" : "outline"}
                    className={`w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
                      p.popular 
                      ? "bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 text-white" 
                      : "border-white/20 glass hover:bg-white/10 text-white"
                    }`}
                  >
                    Hemen Başla
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 relative bg-black/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Image 
              src="/FlowCRM.cloud logo design.webp" 
              alt="FlowCRM Logo" 
              width={140} 
              height={35} 
              className="object-contain"
            />
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed font-medium italic">
              Yapay zeka desteğiyle lead yönetiminizi otomatikleştirin, ekibinizin potansiyelini zirveye taşıyın.
            </p>
          </div>
          <div>
            <h5 className="font-black uppercase tracking-widest text-xs mb-6 text-primary">Ürün</h5>
            <ul className="space-y-4 text-sm font-medium opacity-60">
              <li><Link href="#features" className="hover:opacity-100 transition-opacity">Özellikler</Link></li>
              <li><Link href="#pricing" className="hover:opacity-100 transition-opacity">Fiyatlandırma</Link></li>
              <li><Link href="/login" className="hover:opacity-100 transition-opacity">Giriş Yap</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-black uppercase tracking-widest text-xs mb-6 text-primary">İletişim</h5>
            <ul className="space-y-4 text-sm font-medium opacity-60">
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Destek Merkezi</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Satış Ekibi</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Gizlilik Politikası</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs font-medium opacity-40">
          © 2026 FlowCRM.cloud. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
}
