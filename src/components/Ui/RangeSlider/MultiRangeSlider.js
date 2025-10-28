"use client"
import "./multiRangeSlider.css"
import { useState, useEffect } from "react"

export default function MultiRangeSlider({ min, max, onChange }) {
  const [minValue, setMinValue] = useState(min ?? 0)
  const [maxValue, setMaxValue] = useState(max ?? 100)

  useEffect(() => {
    if (min != null && max != null) {
      setMinValue(min)
      setMaxValue(max)
      onChange?.({ min, max })
    }
  }, [min, max])

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 4000)
    setMinValue(value)
    onChange?.({ min: value, max: maxValue })
  }

  const handleMaxChange = (e) => {
    console.log(e.target.value)
    let value = Math.max(Number(e.target.value), minValue + 4000)
    value = Math.round(value / 1000) * 1000
    setMaxValue(value)
    onChange?.({ min: minValue, max: value })
  }

  const getPercent = (value) => ((value - min) / (max - min)) * 100

  return (
    <div className="relative w-72 flex">
      <div className="absolute top-0 left-0 w-full flex justify-between text-sm font-medium text-amber-300 mt-[10px]">
        <span>${minValue}</span>
        <span>${maxValue}</span>
      </div>
      <div className="absolute top-1/2 h-1 w-full bg-gray-300 rounded translate-y-[-50%]" />
      <div
        className="absolute top-1/2 h-1 bg-violet-700 rounded translate-y-[-50%] rounded-full"
        style={{
          left: `${getPercent(minValue)}%`,
          right: `${100 - getPercent(maxValue)}%`,
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={minValue}
        step={1000}
        onChange={handleMinChange}
      />
      <input
        type="range"
        min={min}
        max={max + 1}
        value={maxValue}
        step={1000}
        onChange={handleMaxChange}
      />
    </div>
  )
}
