import { forwardRef, MouseEvent, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { motion } from "framer-motion";
import CategoryIcon from "@/components/Generic/Icons/CategoryIcon";
import { FaX } from "react-icons/fa6";
import { FixedSizeGrid, GridChildComponentProps } from "react-window";
import useContainerWidth from "@/hooks/useContainerWidth";
import IconItem from "./IconItem";


export type IconHandle ={
  resetSearch : ()=>void
}

type Props = {
  setFieldValue: Function;
  name: string;
  value: string;
  actualColor: string;
  actualColor2: string;
};

const SelectIcon = forwardRef<IconHandle, Props>(({
  setFieldValue,
  name,
  value,
  actualColor,
  actualColor2,
},ref) => {
  const [iconNames] = useState<string[]>(Object.keys(FaIcons));
  const [iconNamesFiltered, setIconNamesFiltered] = useState<string[]>([]);
  const [iconSelect, setIconSelect] = useState<string>(value);
  const [search, setSearch] = useState("");

  const { containerRef, containerWidth } = useContainerWidth();

  const selectIcon = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget;
    setIconSelect(id);
    setFieldValue(name, id);
  }, [setFieldValue, name]);

  useEffect(() => {
    setIconSelect(value);
  }, [value]);

  const iconsToRender = useMemo(() => {
    return search.length > 0 ? iconNamesFiltered : iconNames;
  }, [search, iconNamesFiltered, iconNames]);

  const filterIcons = useCallback((searchValue: string) => {
    setSearch(searchValue);
    const lowerSearch = searchValue.toLowerCase();
    const filteredIcons = iconNames.filter((icon) =>
      icon.toLowerCase().includes(lowerSearch)
    );
    setIconNamesFiltered(filteredIcons);
  }, [iconNames]);

  const MotionCategoryIcon = motion(CategoryIcon);
  const iconWidth = 32;
  const columnCount = Math.floor(containerWidth / iconWidth);

  const renderIconItem = useCallback(
    ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
      const index = rowIndex * columnCount + columnIndex;
      const iconName = iconsToRender[index];

      if (!iconName) return null;

      return (
        <IconItem
          iconName={iconName}
          iconSelect={iconSelect}
          selectIcon={selectIcon}
          style={style}
        />
      );
    },
    [ iconsToRender, columnCount]
  );

// Expose the function for reset the filter
  useImperativeHandle(ref, () => ({
    resetSearch() {
      setSearch("");
    }
  }));
  
  return (
    <div className="h-3/6">
      <span className="flex items-center gap-4 mt-1 mb-1">
        Icono:
        {iconSelect ? (
          <MotionCategoryIcon
            color={actualColor}
            color2={actualColor2}
            iconName={`${iconSelect}`}
          />
        ) : (
          <div className="text-2xl p-2 h-8 w-8"> </div>
        )}
      </span>
      <div className="w-full flex relative rounded-md shadow-md mb-2">
        <input
          onChange={(e) => filterIcons(e.target.value)}
          value={search}
          className="w-full p-1 rounded"
        />
        <button
          onClick={() => setSearch("")}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-neutral-300 p-1 rounded-full"
        >
          <FaX className="h-2 w-2 text-stone-600" />
        </button>
      </div>

      <div ref={containerRef} className="w-full overflow-auto">
        <FixedSizeGrid
          columnCount={columnCount}
          columnWidth={iconWidth}
          height={300}
          rowCount={Math.ceil(iconsToRender.length / columnCount)}
          rowHeight={iconWidth}
          width={containerWidth}
          className="bg-neutral-500"
        >
          {renderIconItem}
        </FixedSizeGrid>
      </div>
    </div>
  );
})

export default SelectIcon;
