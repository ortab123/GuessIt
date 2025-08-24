import { useMemo } from "react"
import { Bar, Cell } from "recharts"
import GraphCard from "./GraphCard"
import Summary from "./Summary"

export default function AnalyticsTab({ children }) {
  const COLORS = ["#3b82f6", "#f59e0b", "#8b5cf6", "#10b981", "#ec4899"]

  const chartsData = useMemo(() => {
    return (children || []).map((c) => {
      const correct = c.correct_answers ?? 0
      const wrong = c.wrong_answers ?? 0
      const total = correct + wrong
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0
      const timeMin = c.total_play_time ?? 0
      const difficult_breed = c.difficult_breed ?? "none"
      return {
        id: c.id,
        name: c.name || "Child",
        correct,
        wrong,
        accuracy,
        timeMin,
        difficult_breed,
      }
    })
  }, [children])

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Analytics
        </h2>
      </div>

      <Summary cards={chartsData} />

      <GraphCard title="Correct vs Wrong answers" data={chartsData}>
        <Bar dataKey="correct" name="Correct" fill="#22c55e" />
        <Bar dataKey="wrong" name="Wrong" fill="#ef4444" />
      </GraphCard>

      <GraphCard
        title="Accuracy (%)"
        data={chartsData}
        domain={[0, 100]}
        formatter={(v) => `${v}%`}
      >
        <Bar dataKey="accuracy" name="Accuracy (%)">
          {chartsData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </GraphCard>
    </div>
  )
}
