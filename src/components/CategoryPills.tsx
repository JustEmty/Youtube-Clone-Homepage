import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";

type CategoryPillsProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TRANLATE_AMOUNT = 200;

function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillsProps) {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setLeftVisible] = useState(false);
  const [isRightVisible, setRightVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current === null) return;

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container === null) return;
      setLeftVisible(translate > 0);
      setRightVisible(
        translate + container.clientWidth < container.scrollWidth,
      );
    });
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [categories, translate]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-x-auto overflow-x-hidden"
    >
      <div
        className="flex max-w-max flex-row gap-3 whitespace-nowrap transition-transform"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((category) => (
          <Button
            onClick={() => onSelect(category)}
            key={category}
            variant={selectedCategory === category ? "dark" : "default"}
            className="whitespace-nowrap rounded-lg px-3 py-1"
          >
            {category}
          </Button>
        ))}
      </div>
      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 h-full w-24 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent">
          <Button
            onClick={() =>
              setTranslate((translate) => {
                const newTranslate = translate - TRANLATE_AMOUNT;
                if (newTranslate <= 0) return 0;
                return newTranslate;
              })
            }
            variant="ghost"
            size="icon"
            className="aspect-square h-full w-auto p-1.5"
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 flex h-full w-24 -translate-y-1/2 justify-end bg-gradient-to-l from-white from-50% to-transparent">
          <Button
            onClick={() =>
              setTranslate((translate) => {
                if (containerRef.current === null) return translate;
                const newTranslate = translate + TRANLATE_AMOUNT;
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;
                if (newTranslate + width >= edge) {
                  return edge - width;
                }
                return newTranslate;
              })
            }
            variant="ghost"
            size="icon"
            className="aspect-square h-full w-auto p-1.5"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}

export default CategoryPills;
