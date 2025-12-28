"use client"

import DropDown from "@/components/Ui/DropDown/DropDown"
import { initialMatrix, matrizReducer } from "@/reducers/matrizReducer"
import { useReducer, useEffect, useState } from "react"
import { ArrowLeftCircle, ArrowRightCircle, Calendar } from "react-feather"
import useOutsideClick from "../../hooks/dropdownHook"

export default function DatePicker() {
  const [matriz, dispatchMatriz] = useReducer(matrizReducer, initialMatrix)
  const [dragging, setDragging] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const ref = useOutsideClick(() => setIsOpen(false))

  useEffect(() => {
    dispatchMatriz({
      type: "MATRIX_INIT",
      payload: { width: 7, height: 6 },
    })
  }, [])

  const buildDate = (day) =>
    new Date(
      matriz.currentMonthStartDate.getFullYear(),
      matriz.currentMonthStartDate.getMonth(),
      day
    )

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
    let m = matriz.currentMonthStartDate.getMonth() + 1
    let y = matriz.currentMonthStartDate.getFullYear()
    if (m > 11) {
      m = 0
      y++
    }
    dispatchMatriz({
      type: "SET_CURRENT_MONTH_DATES",
      payload: {
        currentMonthLastDay: new Date(y, m + 1, 0),
        currentMonthStartDate: new Date(y, m, 1),
      },
    })

    dispatchMatriz({
      type: "SET_MONTH_YEAR",
      payload: { attribute: "selectedYear", value: y },
    })

    dispatchMatriz({
      type: "SET_MONTH_YEAR",
      payload: { attribute: "selectedMonth", value: m },
    })
  }

  const calculatePreviousMonth = () => {
    let m = matriz?.currentMonthStartDate.getMonth() - 1
    let y = matriz?.currentMonthStartDate.getFullYear()
    if (m < 0) {
      m = 11
      y--
    }
    dispatchMatriz({
      type: "SET_CURRENT_MONTH_DATES",
      payload: {
        currentMonthLastDay: new Date(y, m + 1, 0),
        currentMonthStartDate: new Date(y, m, 1),
      },
    })

    dispatchMatriz({
      type: "SET_MONTH_YEAR",
      payload: { attribute: "selectedYear", value: y },
    })

    dispatchMatriz({
      type: "SET_MONTH_YEAR",
      payload: { attribute: "selectedMonth", value: m },
    })
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  const actualYear = new Date().getFullYear()
  const years = Array.from({ length: 81 }, (_, i) => actualYear - 80 + i)

  return (
    <>
      <div className="relative inline-block">
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <Calendar />
        </button>
        {isOpen && (
          <div
            ref={ref}
            className="absolute left-0 top-full mt-2 z-50"
            onMouseUp={() => setDragging(null)}
          >
            <div className="w-[320px] select-none bg-[#212121] rounded-md shadow-lg border border-violet-200 p-3">
              <div className="flex justify-between gap-4 mb-2">
                <div className="flex gap-2">
                  <DropDown
                    unSelected={matriz.selectedMonth + 1}
                    selected={matriz.selectedMonth + 1}
                    elements={months}
                    callback={(month) => {
                      const monthIndex = months.indexOf(month)
                      const year =
                        matriz.selectedYear ?? new Date().getFullYear()

                      dispatchMatriz({
                        type: "SET_MONTH_YEAR",
                        payload: {
                          attribute: "selectedMonth",
                          value: monthIndex,
                        },
                      })

                      dispatchMatriz({
                        type: "SET_CURRENT_MONTH_DATES",
                        payload: {
                          currentMonthLastDay: new Date(
                            year,
                            monthIndex + 1,
                            0
                          ),
                          currentMonthStartDate: new Date(year, monthIndex, 1),
                        },
                      })
                    }}
                  />
                  <DropDown
                    selected={matriz.selectedYear}
                    unSelected={matriz.selectedYear}
                    elements={years}
                    callback={(year) => {
                      dispatchMatriz({
                        type: "SET_MONTH_YEAR",
                        payload: { attribute: "selectedYear", value: year },
                      })

                      dispatchMatriz({
                        type: "SET_CURRENT_MONTH_DATES",
                        payload: {
                          currentMonthLastDay: new Date(
                            year,
                            matriz.currentMonthStartDate.getMonth() + 1,
                            0
                          ),
                          currentMonthStartDate: new Date(
                            year,
                            matriz.currentMonthStartDate.getMonth(),
                            1
                          ),
                        },
                      })
                    }}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    className="flex items-end"
                    onClick={calculatePreviousMonth}
                  >
                    <ArrowLeftCircle />
                  </button>
                  <button
                    className="flex items-end"
                    onClick={calculateNextMonth}
                  >
                    <ArrowRightCircle />
                  </button>
                </div>
              </div>

              <div className="flex">
                {days.map((d) => (
                  <p key={d} className="m-3 w-5 text-center font-bold">
                    {d}
                  </p>
                ))}
              </div>
              {matriz.matriz.map((fila, i) => (
                <div key={i} className="flex">
                  {fila.map((_, j) => {
                    const index = i * 7 + j
                    const day =
                      index - matriz.currentMonthStartDate.getDay() + 1
                    const valid =
                      day >= 1 && day <= matriz.currentMonthLastDay.getDate()

                    if (!valid)
                      return (
                        <div
                          key={j}
                          className="relative w-10 h-10 border-2 border-violet-200"
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
                        className="relative w-10 h-10 border-2 border-violet-600 flex items-center justify-center cursor-pointer"
                      >
                        <span className="relative z-10 ">{day}</span>

                        {isInRange(day) && (
                          <div className="absolute inset-2 bg-violet-500 rounded-full" />
                        )}

                        {(isStart(day) || isEnd(day)) && (
                          <div className="absolute inset-2 bg-violet-800 rounded-full cursor-ew-resize" />
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
