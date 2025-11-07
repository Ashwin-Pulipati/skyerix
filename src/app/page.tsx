import Searchbar from "@/components/ui/searchbar";
import WeatherDashboard from "./weather-dashboard/page";

export default function Home() {
  return (
    <div>
      <div className="md:hidden block">
        <Searchbar />
      </div>
      <WeatherDashboard />
    </div>
  );
}
