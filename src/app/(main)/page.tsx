import PresentationBanner from "@/components/homepage/presentationBanner";
import { MovieService } from "@/services/movieService";
import RunningTodayAndTomorrowBanner from "@/components/homepage/runningTodayAndTomorrowBanner";

export default async function Home() {

  return (
    <main>
      <PresentationBanner />
      <RunningTodayAndTomorrowBanner />
    </main>
  );
}
