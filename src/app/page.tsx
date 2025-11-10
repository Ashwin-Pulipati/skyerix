import WeatherDashboard from "./weather-dashboard/page";
import CitySearch from "@/components/city-search";

export default function Home() {
  return (
    <div>
      <div className="md:hidden block">
        <CitySearch />
      </div>
      <WeatherDashboard />
    </div>
  );
}
