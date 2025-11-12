import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { toast } from "sonner";
import { WeatherData } from "@/app/api/types";
import { cn } from "@/lib/utils";

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
      variant={active ? "secondary" : "outline"}
      size="icon-lg"
      onClick={handleToggleFavorite}
      aria-label={ariaLabel}
      aria-pressed={active}
      title={ariaLabel}
      className={cn(
        "rounded-full group",
        active
          ? "hover:bg-secondary/90 focus-visible:ring-secondary/40"
          : 
            "text-muted-foreground hover:text-accent-foreground focus-visible:ring-accent/40"
      )}
    >
      <Star
        className={cn(
          "h-4 w-4 transition-colors",
          active
            ? "fill-current text-background"
            : 
              "text-secondary group-hover:text-accent-foreground group-focus-visible:text-accent-foreground"
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{ariaLabel}</span>
    </Button>
  );
}
