import React, { memo } from "react";
import ContactForm from "@/components/Forms/ContactForm";
import { MovieGrid } from "@/components/MovieGrid";

const Support: React.FC = () => {

  return (
    <main className="mt-[15vh] mb-[17vh] pl-[6vw] pr-[6vw] w-full">
      <section className="grid grid-rows w-full gap-10 justify-center h-fit lg:grid-cols-[30%_70%] md:mt-[6vh] lg:gap-20">
        <div className="space-y-10">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white md:text-5xl">
              Welcome to our support page!
            </h1>
            <p className="text-grey-60">
              We are here to help you with any problems you may be having with
              our product.
            </p>
          </div>
          <div className="hidden md:block">
            <MovieGrid maxItems={12} hideAfter={8} isFixedBG={false} />
          </div>
        </div>
        <div className="bg-black-06 border border-black-15 rounded-lg w-full">
          <ContactForm />
        </div>
      </section>
    </main>
  );
};

export default memo(Support);
