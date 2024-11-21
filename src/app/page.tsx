import Loading from "@/components/Loading";
import { MovieGrid } from "@/components/MovieGrid";
import { PromptInput } from "@/components/PromptInput";
import { Suspense } from "react";



export default function Home() {
  return (
    <Suspense fallback={<Loading  LoadingType="Page Load"/>}>
      <main className="select-none p-2 flex min-h-full w-full flex-col items-center justify-between relative">
        <div className="fade-top w-full h-3/4 fixed top-0 left-0 z-30" />
        <div className="fade-bottom w-full h-1/3 fixed bottom-0 left-0 z-30" />
        <MovieGrid isFixedBG={true} />
        <section className="relative w-full min-h-[90vh] z-40 flex justify-center">
          <div className="mt-[20vh] w-11/12 p-3 bg-black-10 h-fit max-h-[600px] shadow-md shadow-gray-800 border border-gray-500 rounded-lg max-w-[1800px] text-grey-90 md:mt-[20vh] md:p-8 lg:mt-[25vh] lg:h-4/6 lg:w-4/6">
            <div className="text-center p-4 mb-2 md:mb-8 md:p-4">
              <h1 className="text-xl font-bold text-white mb-4 md:text-3xl">
                Welcome to Cinematic AI!
              </h1>
              <p className="text-gray-300 text-xs md:text-sm lg:text-lg">
                Discover Your Next Watch: Get Personalized Movie Recommendations
              </p>
            </div>
              <PromptInput />
          </div>
        </section>
      </main>
    </Suspense>
  );
}
