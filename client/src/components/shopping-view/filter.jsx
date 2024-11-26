import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>

      {/* Filter Sections */}
      <div className="p-4 space-y-6">
        {Object.keys(filterOptions).map((keyItem, index) => (
          <Fragment key={keyItem}>
            {/* Filter Category Title */}
            <div>
              <h3 className="text-base font-bold mb-1">{keyItem}</h3>
              <div className="flex flex-wrap items-center gap-2">
                {filterOptions[keyItem].map((option) => (
                  <Label key={option.id} className="flex items-center gap-2">
                    <Checkbox
                      checked={filters?.[keyItem]?.includes(option.id) || false}
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                      aria-checked={filters?.[keyItem]?.includes(option.id) || false}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>

            {/* Separator (exclude after last item) */}
            {index < Object.keys(filterOptions).length - 1 && <Separator />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
