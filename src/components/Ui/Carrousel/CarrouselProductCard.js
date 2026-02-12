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
    <article className="mx-auto h-[300px] w-[320px] max-w-md rounded-2xl border border-white/10 bg-white/5 p-4 text-white shadow-2xl backdrop-blur-md">
      <div className="relative h-[200px] overflow-hidden rounded-xl bg-black/10">
        {isPlaceholder ? (
          <div className="flex h-full w-full items-center justify-center text-sm text-white/70">
            Sin productos
          </div>
        ) : (
          <Image
            src={image}
            alt={name}
            width={320}
            height={200}
            priority
            className="h-full w-full object-cover"
            sizes="320px"
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
