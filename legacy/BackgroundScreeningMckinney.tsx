import CityScreeningLanding from "@/components/CityScreeningLanding";
import { mckinneyLanding } from "@/data/mckinneyAllenLandings";

export default function BackgroundScreeningMckinney() {
  return <CityScreeningLanding data={mckinneyLanding} />;
}
