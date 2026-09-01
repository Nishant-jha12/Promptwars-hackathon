import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart2, Info } from 'lucide-react';

const literacyData = [
  { state: 'Kerala', male: 96.1, female: 92.1 },
  { state: 'Maharashtra', male: 88.38, female: 75.87 },
  { state: 'Tamil Nadu', male: 86.8, female: 73.4 },
  { state: 'Gujarat', male: 85.75, female: 69.68 },
  { state: 'Uttar Pradesh', male: 77.3, female: 57.2 },
  { state: 'Bihar', male: 71.2, female: 51.5 },
];

const illustrativeSEProgress = [
  { name: 'Completed Online (SE)', value: 35 },
  { name: 'Pending / Offline', value: 65 },
];
const COLORS = ['#059669', '#4f46e5']; // emerald-600, indigo-600

export default function DataViz() {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold flex items-center gap-4 text-slate-900 tracking-tight">
          <BarChart2 className="w-10 h-10 text-indigo-600" />
          {t('dataviz_title', "Census Data Explorer")}
        </h1>
        <p className="text-lg font-normal text-slate-600 max-w-2xl leading-relaxed">
          {t('dataviz_desc', "Historical 2011 baselines and illustrative 2027 progress.")}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        <div className="bg-white p-8 rounded-2xl border border-slate-200">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">{t('literacy_chart_title', "Literacy Rate by State (2011)")}</h2>
            <p className="text-sm font-medium text-slate-500 flex items-center gap-2 mt-2">
              <Info className="w-4 h-4 text-indigo-600" /> {t('literacy_real_data', "Real 2011 Census Data")}
            </p>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={literacyData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                role="img"
                aria-label="Bar chart showing literacy rates by state for males and females based on 2011 census"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="state" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', color: '#0f172a', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                />
                <Legend wrapperStyle={{ paddingTop: '24px', fontSize: '14px', fontWeight: 500, color: '#475569' }} />
                <Bar dataKey="male" name="Male (%)" fill="#4f46e5" radius={[4, 4, 0, 0]} aria-label="Male literacy percentage" />
                <Bar dataKey="female" name="Female (%)" fill="#d97706" radius={[4, 4, 0, 0]} aria-label="Female literacy percentage" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 flex flex-col">
          <div className="mb-8 bg-amber-50 p-6 rounded-xl border border-amber-200">
            <h2 className="text-xl font-bold text-amber-900 mb-2">{t('illustrative_title', "Illustrative: 2027 SE Progress")}</h2>
            <p className="text-sm text-amber-800 font-medium leading-relaxed">
              {t('illustrative_note', "Note: 2027 population results are NOT published yet. This chart uses mock/sample data to demonstrate the dashboard capability.")}
            </p>
          </div>
          
          <div className="h-64 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart role="img" aria-label="Pie chart showing illustrative 2027 self enumeration progress">
                <Pie
                  data={illustrativeSEProgress}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="#ffffff"
                  strokeWidth={2}
                >
                  {illustrativeSEProgress.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', color: '#0f172a', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
