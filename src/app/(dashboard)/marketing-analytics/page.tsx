"use client";

import { useEffect, useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Zap, 
  Target,
  ArrowUpRight,
  TrendingDown,
  Activity
} from "lucide-react";
import { getMarketingAnalytics } from "@/actions/analytics";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

type SourceDistributionItem = {
  name: string;
  value: number;
  avgScore: number;
};

type CampaignPerformanceItem = {
  name: string;
  total: number;
  won: number;
  lost: number;
  winRate: number;
  avgScore: number;
};

type GrowthDataItem = {
  date: string;
  count: number;
};

type MarketingAnalyticsData = {
  sourceDistribution: SourceDistributionItem[];
  campaignPerformance: CampaignPerformanceItem[];
  growthData: GrowthDataItem[];
  summary: {
    totalLeads: number;
    averageAiScore: number;
    hotLeadsCount: number;
  };
};

export default function MarketingAnalyticsPage() {
  const [data, setData] = useState<MarketingAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMarketingAnalytics()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">Analizler Hazırlanıyor...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { sourceDistribution, campaignPerformance, growthData, summary } = data;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
           <div className="p-3 bg-primary/10 rounded-2xl shadow-lg shadow-primary/5">
              <BarChart3 className="h-6 w-6 text-primary" />
           </div>
           <div>
              <h1 className="text-3xl font-black tracking-tight italic">Pazarlama Analitiği</h1>
              <p className="text-muted-foreground text-sm font-medium opacity-70 italic">Kampanya performansları ve kanal verimliliklerini takip edin.</p>
           </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-white/10 rounded-[2rem] overflow-hidden group hover:scale-[1.02] transition-all">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Toplam Lead</p>
                <h3 className="text-4xl font-black italic">{summary.totalLeads}</h3>
                <div className="mt-2 flex items-center gap-1 text-emerald-500 font-bold text-xs">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>Son 7 gün</span>
                </div>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-2xl">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 rounded-[2rem] overflow-hidden group hover:scale-[1.02] transition-all">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Ort. AI Kalite</p>
                <h3 className="text-4xl font-black italic">%{summary.averageAiScore.toFixed(0)}</h3>
                <div className="mt-2 flex items-center gap-1 text-amber-500 font-bold text-xs">
                  <Zap className="h-3 w-3" />
                  <span>Potansiyel: Yüksek</span>
                </div>
              </div>
              <div className="p-3 bg-amber-500/10 rounded-2xl">
                <Zap className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 rounded-[2rem] overflow-hidden group hover:scale-[1.02] transition-all">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Ciddi Aday (Hot)</p>
                <h3 className="text-4xl font-black italic">{summary.hotLeadsCount}</h3>
                <div className="mt-2 flex items-center gap-1 text-red-500 font-bold text-xs uppercase tracking-tighter">
                  <Target className="h-3 w-3" />
                  <span>Sıcak Takip Gerekli</span>
                </div>
              </div>
              <div className="p-3 bg-red-500/10 rounded-2xl">
                <Target className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Source Distribution Pie Chart */}
        <Card className="glass border-white/10 rounded-[2.5rem] p-4">
          <CardHeader>
            <CardTitle className="text-xl font-black tracking-tight italic flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Kanal Bazlı Dağılım
            </CardTitle>
            <CardDescription className="text-xs font-semibold italic opacity-60">Leadlerin hangi kaynak ve origin alanlarından geldiği.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (%${percent ? (percent * 100).toFixed(0) : 0})`}
                >
                  {sourceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Growth Line Chart */}
        <Card className="glass border-white/10 rounded-[2.5rem] p-4">
          <CardHeader>
            <CardTitle className="text-xl font-black tracking-tight italic flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Lead Artış Trendi
            </CardTitle>
            <CardDescription className="text-xs font-semibold italic opacity-60">Son 7 günlük yeni kayıt grafiği.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="date" stroke="#ffffff40" fontSize={10} tickFormatter={(str) => str.split('-').slice(1).join('/')} />
                <YAxis stroke="#ffffff40" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#ffffff' }}
                />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCount)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Campaign Performance Bar Chart */}
        <Card className="lg:col-span-2 glass border-white/10 rounded-[2.5rem] p-4">
          <CardHeader>
            <CardTitle className="text-xl font-black tracking-tight italic flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              Kampanya Verimliliği (Conversion)
            </CardTitle>
            <CardDescription className="text-xs font-semibold italic opacity-60">Hangi kampanya ne kadar satışa (Won) dönüştü.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaignPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} />
                <YAxis stroke="#ffffff40" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#ffffff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="total" name="Toplam Lead" fill="#ffffff10" radius={[10, 10, 0, 0]} />
                <Bar dataKey="won" name="Satış (WON)" fill="#10b981" radius={[10, 10, 0, 0]} />
                <Bar dataKey="lost" name="Kaybedilen (LOST)" fill="#ef4444" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sızıntı Tablosu - Concept */}
      <Card className="glass border-white/10 rounded-[2.5rem] p-8">
        <div className="flex items-center gap-4 mb-6">
           <div className="p-3 bg-red-500/10 rounded-2xl">
              <TrendingDown className="h-6 w-6 text-red-500" />
           </div>
           <div>
              <h2 className="text-xl font-black italic">Bütçe Sızıntı Raporu</h2>
              <p className="text-xs text-muted-foreground font-semibold italic">En düşük dönüşüm oranına sahip kampanyalar.</p>
           </div>
        </div>

        <div className="space-y-4">
          {campaignPerformance
            .filter((c) => c.winRate < 10 && c.total > 5)
            .map((c, i: number) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                <div className="flex flex-col">
                  <span className="font-bold text-sm tracking-tight">{c.name}</span>
                  <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Kritik: %{c.winRate.toFixed(1)} Dönüşüm</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black italic text-muted-foreground">{c.total} Lead / {c.won} Satış</div>
                  <div className="text-[9px] font-black text-red-500 uppercase mt-1">Bütçe Analizi Önerilir</div>
                </div>
              </div>
            ))}
          
          {campaignPerformance.filter((c) => c.winRate < 10 && c.total > 5).length === 0 && (
            <div className="text-center py-8 opacity-50 italic text-sm font-medium">
               Şu an için kritik bir bütçe sızıntısı tespit edilmedi. Tüm kanallar sağlıklı görünüyor.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
