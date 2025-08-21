import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

export default function GraphCard({
  title,
  data,
  children,
  domain,
  formatter,
}) {
  return (
    <section className="mt-6">
      <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="h-64 bg-white/70 rounded-xl shadow border border-white/30 p-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={domain} tickFormatter={formatter} />
            <Tooltip formatter={formatter} />
            <Legend />
            {children}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
