import Image from "next/image";
import { fetchPopularMedia, fetchTrendingMedia } from "@/lib/mediaService";
import React, { Suspense } from "react";
import { Carousel } from "@/components/Carousel";
import MediaContentCarousel from "@/components/MediaContentCarousel";
import { CustomButton } from "@/components/CustomButton";
import GenreSelector from "@/components/GenreSelector ";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

interface MediaPageLayoutProps {
  mediaType: "movie" | "tv";
}

export default function MediaPageLayout({ mediaType }: MediaPageLayoutProps) {
  return (
    <Suspense fallback={<Loading />}>
      <MediaPageContent mediaType={mediaType} />
    </Suspense>
  );
}
export async function MediaPageContent({ mediaType }: MediaPageLayoutProps) {
  const popularMedia = await fetchPopularMedia(mediaType, 1);
  const trendingMedia = await fetchTrendingMedia(mediaType, 1);

  return (
    <>
      <section className="overflow-hidden relative">
        <Carousel
          items={popularMedia.slice(0, 5)}
          height={20}
          width={1280}
          mediaType={mediaType}
        />
      </section>
      <section className="w-full">
        <MediaContentCarousel
          title="Trending Now"
          items={trendingMedia}
          itemsToShow={5}
        />
      </section>
      <section className="w-full">
        <div className="h-48 bg-black w-full relative md:h-60">
          {/* <Image
            src="/images/SectionBackgroundImage.svg"
            width={1280}
            height={300}
            alt="movie grid image"
            priority={true}
            loading="eager"
            className="w-full h-full object-cover"
          /> */}
          <div className="absolute p-4 w-full h-full top-0 left-0 flex items-center justify-between md:p-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold md:text-3xl">
                Discover your next favorite movie or tv show!
              </h3>
              <p className="text-gray-50 hidden md:block">
                Our AI recommends films tailored just for you based on your
                tastes.
              </p>
            </div>
            <CustomButton
              label="Get AI Recommendation"
              className="bg-red-45 w-fit text-xs rounded-lg px-4 py-4 md:text-lg"
              path="/"
            />
          </div>
        </div>
      </section>
      <section>
        <GenreSelector mediaType={mediaType} />
      </section>
      <Footer appName="Cinematic" />
    </>
  );
}
