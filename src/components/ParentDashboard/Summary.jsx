import { useState } from "react"

export default function Summary({ cards }) {
  const [openChildId, setOpenChildId] = useState(null)
  const toggleOpen = (id) => setOpenChildId(openChildId === id ? null : id)

  return (
    <div className="space-y-3">
      {cards.map((child) => {
        const accuracy =
          child.correct + child.wrong > 0
            ? ((child.correct / (child.correct + child.wrong)) * 100).toFixed(1)
            : 0

        return (
          <div key={child.id} className="bg-white/70 rounded-xl border border-white/30 shadow p-4">
            <button
              onClick={() => toggleOpen(child.id)}
              className="w-full text-left font-bold text-lg text-gray-800"
            >
              {child.name}
            </button>

            {openChildId === child.id && (
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <StatCard title="Minutes Played" value={(child.timeMin / 60).toFixed(1)} />
                <StatCard title="Correct Answers" value={child.correct} />
                <StatCard title="Wrong Answers" value={child.wrong} />
                <StatCard title="Success Rate" value={` ${accuracy}% `} />
                <StatCard title="Difficult Breed" value={child.difficult_breed || "-"} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// function StatCard({ title, value }) {
//   return (
//     <div className="bg-white/80 rounded-xl border border-white/30 shadow p-4 flex flex-col items-center justify-center">
//       <div className="text-sm text-gray-500">{title}</div>
//       <div className="text-2xl font-bold text-gray-800">{value}</div>
//     </div>
//   )
// }

function StatCard({ title, value }) {
  return (
    <div className="bg-white/80 rounded-xl border border-white/30 shadow p-4 flex flex-col items-center justify-center">
      <div className="text-sm text-gray-500 text-center">{title}</div>
      <div className="text-xl text-gray-800 text-center space-y-1 max-w-[150px] break-words">
        {Array.isArray(value) ? value.map((breed, idx) => <div key={idx}>{breed}</div>) : value}
      </div>
    </div>
  )
}
