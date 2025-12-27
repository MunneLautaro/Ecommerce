"use client"

import DropDown from "@/components/Ui/DropDown/DropDown"
import { initialMatrix, matrizReducer } from "@/reducers/matrizReducer"
import { useReducer, useEffect, useState } from "react"

export default function Calendar() {
  const [matriz, dispatchMatriz] = useReducer(matrizReducer, initialMatrix)

  const [daysInMonth, setDaysInMonth] = useState(new Date(2025, 11 + 1, 0))
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(new Date(2025, 11, 1))

  const [dragging, setDragging] = useState(null)

  useEffect(() => {
    dispatchMatriz({
      type: "MATRIX_INIT",
      payload: { ancho: 7, alto: 6 },
    })
  }, [])

  if (!matriz.matriz.length) return <div>Cargando...</div>

  const buildDate = (day) =>
    new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), day)

  const isInRange = (day) => {
    if (!matriz.startDate || !matriz.endDate) return false
    const date = buildDate(day)
    return date >= matriz.startDate && date <= matriz.endDate
  }

  const isStart = (day) =>
    matriz.startDate && buildDate(day).getTime() === matriz.startDate.getTime()

  const isEnd = (day) =>
    matriz.endDate && buildDate(day).getTime() === matriz.endDate.getTime()

  const calculateNextMonth = () => {
    let m = firstDayOfMonth.getMonth() + 1
    let y = firstDayOfMonth.getFullYear()
    if (m > 11) {
      m = 0
      y++
    }
    setDaysInMonth(new Date(y, m + 1, 0))
    setFirstDayOfMonth(new Date(y, m, 1))
  }

  const calculatePreviousMonth = () => {
    let m = firstDayOfMonth.getMonth() - 1
    let y = firstDayOfMonth.getFullYear()
    if (m < 0) {
      m = 11
      y--
    }
    setDaysInMonth(new Date(y, m + 1, 0))
    setFirstDayOfMonth(new Date(y, m, 1))
  }

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const actualYear = new Date().getFullYear()
  const years = Array.from({ length: 81 }, (_, i) => actualYear - 80 + i)

  console.log(matriz.selectedYear)
  return (
    <div
      className="flex flex-col items-center gap-4"
      onMouseUp={() => setDragging(null)}
    >
      <DropDown
        elements={months}
        callback={(month) => {
          const monthIndex = months.indexOf(month)
          const year = matriz.selectedYear ?? new Date().getFullYear()

          dispatchMatriz({
            type: "SET_MONTH_YEAR",
            payload: {
              attribute: "selectedMonth",
              value: monthIndex,
            },
          })

          setDaysInMonth(new Date(year, monthIndex + 1, 0))
          setFirstDayOfMonth(new Date(year, monthIndex, 1))
        }}
      />
      <DropDown
        elements={years}
        callback={(year) => {
          dispatchMatriz({
            type: "SET_MONTH_YEAR",
            payload: { attribute: "selectedYear", value: year },
          })

          setDaysInMonth((prev) => new Date(year, prev.getMonth() + 1, 0))

          setFirstDayOfMonth((prev) => new Date(year, prev.getMonth(), 1))
        }}
      />
      <div className="flex gap-4">
        <button onClick={calculatePreviousMonth}>Prev</button>
        <button onClick={calculateNextMonth}>Next</button>
      </div>

      <div className="flex">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
          <p key={d} className="m-6 w-10 text-center font-bold">
            {d}
          </p>
        ))}
      </div>
      {matriz.matriz.map((fila, i) => (
        <div key={i} className="flex">
          {fila.map((_, j) => {
            const index = i * 7 + j
            const day = index - firstDayOfMonth.getDay() + 1
            const valid = day >= 1 && day <= daysInMonth.getDate()

            if (!valid)
              return (
                <div
                  key={j}
                  className="relative size-[10px] p-10 border-4 border-amber-200"
                />
              )

            return (
              <div
                key={j}
                onMouseDown={() => {
                  if (isStart(day)) setDragging("start")
                  else if (isEnd(day)) setDragging("end")
                  else {
                    dispatchMatriz({
                      type: "SELECT_DATE",
                      payload: { date: buildDate(day) },
                    })
                  }
                }}
                onMouseEnter={() => {
                  if (!dragging) return

                  dispatchMatriz({
                    type: "DRAG_DATE",
                    payload: {
                      date: buildDate(day),
                      dragging,
                    },
                  })
                }}
                className="relative size-[10px] p-10 border-4 border-amber-600 cursor-pointer"
              >
                {day}

                {isInRange(day) && (
                  <div className="absolute inset-2 bg-amber-200 rounded-full" />
                )}

                {(isStart(day) || isEnd(day)) && (
                  <div className="absolute inset-2 bg-amber-600 rounded-full cursor-ew-resize" />
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
