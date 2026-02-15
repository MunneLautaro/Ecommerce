import Image from "next/image"
import CarrouselProductCardSkeleton from "./CarrouselProductCardSkeleton"

export default function CarrouselProductCard({
  product,
  isPlaceholder = false,
  isLoading = false,
}) {
  if (isLoading) {
    return <CarrouselProductCardSkeleton />
  }

  const name = product?.product
  const image = product?.img || ""

  return (
    <article className="mx-auto w-full max-w-xs sm:max-w-sm rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4 text-white shadow-2xl backdrop-blur-md">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-black/10">
        {isPlaceholder ? (
          <div className="flex h-full w-full items-center justify-center text-sm text-white/70">
            Sin productos
          </div>
        ) : (
          <Image
            src={image}
            alt={name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 640px) 80vw, 320px"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="mt-3 h-[32px] flex items-center justify-center">
        <h3 className="text-center text-lg font-semibold leading-snug tracking-tight line-clamp-1">
          {name}
        </h3>
      </div>
    </article>
  )
}
