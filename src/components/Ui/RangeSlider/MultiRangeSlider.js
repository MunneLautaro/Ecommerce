"use client"

import "./multiRangeSlider.css"
import { useState, useEffect } from "react"

export default function MultiRangeSlider({ min = 0, max = 100, onChange }) {
  const [minValue, setMinValue] = useState(min)
  const [maxValue, setMaxValue] = useState(max)

  useEffect(() => {
    setMinValue(min)
    setMaxValue(max)
    onChange?.({ min, max })
  }, [min, max])

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1)
    setMinValue(value)
    onChange?.({ min: value, max: maxValue })
  }

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1)
    setMaxValue(value)
    onChange?.({ min: minValue, max: value })
  }

  const getPercent = (value) => ((value - min) / (max - min)) * 100

  return (
    <div className="relative w-72 h-10">
      <div className="absolute mt-2 top-6 left-0 w-full flex justify-between text-sm font-medium text-amber-300">
        <span>${minValue}</span>
        <span>${maxValue}</span>
      </div>

      <div className="absolute top-1/2 h-1 w-full bg-gray-300 rounded translate-y-[-50%]" />

      <div
        className="absolute top-1/2 h-1 bg-violet-700 rounded translate-y-[-50%]"
        style={{
          left: `${getPercent(minValue)}%`,
          right: `${100 - getPercent(maxValue)}%`,
        }}
      />

      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={minValue}
        onChange={handleMinChange}
        className="range-min"
        aria-label="Minimum price"
      />

      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={maxValue}
        onChange={handleMaxChange}
        className="range-max"
        aria-label="Maximum price"
      />
    </div>
  )
}
