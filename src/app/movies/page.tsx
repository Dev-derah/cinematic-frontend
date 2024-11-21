import MediaPageLayout from "@/layouts/MediaPageLayout";

export default async function Movies() {
  return (
    <main className="h-full mt-[15vh] mb-[17vh] ml-[6vw] mr-[6vw] text-white space-y-20">
      <MediaPageLayout mediaType="movie" />
    </main>
  );
}
