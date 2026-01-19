export default function CarrouselProductCardSkeleton() {
  return (
    <article className="mx-auto h-[300px] w-[320px] max-w-md rounded-2xl border border-white/10 bg-white/5 p-4 text-white shadow-2xl backdrop-blur-md animate-pulse">
      <div className="relative h-[200px] overflow-hidden rounded-xl bg-white/10">
        <div className="h-full w-full bg-white/5" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="mt-3 min-h-[32px] flex items-center justify-center">
        <div className="h-6 w-3/4 rounded-md bg-white/10" />
      </div>
    </article>
  )
}
