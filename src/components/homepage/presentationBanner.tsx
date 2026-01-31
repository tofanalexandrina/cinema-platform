"use server";

import homepageResources from "@/lib/resources/homepageResources";
import { formatDateRange } from "@/lib/utils";
import { GeneralInfoService } from "@/services/generalInfoService";
import Image from "next/image";

export default async function PresentationBanner() {
  const generalInfo = await GeneralInfoService.getGeneralInfo();

  return (
    <div className="w-full flex flex-row justify-between gap-2 py-6 font-raleway">
      <div className=" flex w-3/5 pl-6 justify-center">
        <div className="w-fit ">
          <div className="w-full flex flex-row justify-between items-baseline">
            <h1 className=" font-bold text-[90px] leading-none">{homepageResources.bannerTitle1}</h1>
            <Image src="/cinema-icon.png" alt="Icon cinema" width={114} height={114} />
          </div>
          <h1 className="font-bold text-[90px] leading-none">{homepageResources.bannerTitle2}</h1>
        </div>
      </div>
      <div className="p-4 w-2/5 justify-center">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <h3 className="font-semibold text-3xl mb-4">{homepageResources.when}</h3>
            <h3 className="font-medium text-xl">{formatDateRange(generalInfo?.startDate, generalInfo?.endDate)}</h3>
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-3xl mb-4">{homepageResources.where}</h3>
            <h3 className="font-medium text-xl uppercase">
              {generalInfo?.location.name} | {generalInfo?.location.area}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
