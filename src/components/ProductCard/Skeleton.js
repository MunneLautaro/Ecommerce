export default function Skeleton() {
  return (
    <div className="w-[250px] h-[300px] rounded-[15px] bg-[#151515] m-[10px] p-[5px] flex flex-col items-center animate-pulse">
      <div className="relative w-[75px] h-[75px] rounded-full bg-violet-900 mt-4" />
      <div className="text-white flex flex-col items-center mt-[10px] gap-2 w-full px-4">
        <div className="w-full h-4 bg-violet-700 rounded" />
        <div className="w-3/4 h-4 bg-violet-700 rounded" />
        <div className="w-5/6 h-4 bg-violet-700 rounded" />
        <div className="w-2/3 h-4 bg-violet-700 rounded" />
        <div className="w-full h-4 bg-violet-700 rounded" />
        <div className="w-1/2 h-4 bg-violet-700 rounded" />
      </div>
    </div>
  )
}
