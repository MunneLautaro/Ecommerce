export default function RangeSlider({ min = 0, max = 100, value, onChange }) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={1}
      value={value} // <-- ahora existe porque lo recibe como prop
      onChange={onChange}
    />
  )
}
