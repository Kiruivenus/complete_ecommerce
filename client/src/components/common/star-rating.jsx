import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  console.log(rating, "rating");

  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      className={` rounded-full h-4 w-4 transition-colors ${
        star <= rating
          ? "text-yellow-300 hover:bg-black"
          : "text-white hover:bg-primary hover:text-primary-foreground"
      }`}
      variant="outline"
      size="icon"
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon
        className={`w-3 h-3 ${
          star <= rating ? "fill-yellow-400" : "fill-black"
        }`}
      />
    </Button>
  ));
}

export default StarRatingComponent;
