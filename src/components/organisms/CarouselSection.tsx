"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
  image: string
  width: number
}

interface CarouselSectionProps {
  label: string
  title: string
  slides: Slide[]
}

export function CarouselSection({ label, title, slides }: CarouselSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
    dragFree: false,
  })

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className="bg-[#0D3A5D] py-[100px]">
      {/* Header */}
      <div className="container-custom mb-10 flex items-end justify-between">
        <div className="flex flex-col gap-3">
          <div className="text-[#3DABC2] text-xs font-bold tracking-[2px]">
            {label}
          </div>
          <h2 className="text-white text-[64px] font-bold leading-none">
            {title}
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          <button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="text-white" size={28} />
          </button>
          <button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="text-white" size={28} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 pl-[120px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative rounded-[24px] overflow-hidden flex-shrink-0"
              style={{ width: `${slide.width}px`, height: "520px" }}
            >
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="container-custom mt-8 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-white w-8"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
