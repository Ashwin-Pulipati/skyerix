import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { toast } from "sonner";
import { WeatherData } from "@/app/api/types";

interface FavoriteButtonProps {
  data: WeatherData;
}

export function FavoriteButton({ data }: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const active = isFavorite(data.coord.lat, data.coord.lon);

  const handleToggleFavorite = () => {
    if (active) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from favorites`);
    } else {
      addFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to favorites`);
    }
  };

  const ariaLabel = active
    ? `Remove ${data.name} from favorites`
    : `Add ${data.name} to favorites`;

  return (
    <Button
      type="button"
      variant={active ? "secondary" : "outline"}
      size="icon-lg"
      onClick={handleToggleFavorite}
      aria-label={ariaLabel}
      aria-pressed={active}
      title={ariaLabel}
      className={
        active
          ? "hover:bg-secondary/90 focus-visible:ring-secondary/40"
          : "text-muted-foreground hover:text-foreground"
      }
    >
      <Star
        className={`h-4 w-4 ${
          active
            ? "fill-current text-background dark:text-secondary-foreground"
            : "text-secondary"
        }`}
        aria-hidden="true"
      />
      <span className="sr-only">{ariaLabel}</span>
    </Button>
  );
}
