import PageView from "@/components/Generic/PageView/PageView";
import Title from "@/components/Generic/Title/Title";
import { FC } from "react";
import tailwindConfig from "../../../tailwind.config.js"
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type TailwindColors = {
  [key: string]: string | TailwindColors;
};

// Función para recorrer los colores
const traverseColors = (colors: TailwindColors, prefix = ''): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(colors)) {
    if (typeof value === 'object') {
      Object.assign(result, traverseColors(value, `${prefix}${key}-`));
    } else {
      result[`${prefix}${key}`] = value;
    }
  }
  return result;
};
type Props = {};
const Palette: FC<Props> = ({}) => {
    const extendedColors = tailwindConfig.theme.extend.colors;
    const colors = traverseColors(extendedColors);

    const navigate = useNavigate()
  return (
    <PageView extraClassName="min-h-screen">
        <div>
            <Title>Palette</Title>
            <Button onClick={()=>{navigate("/")}} >Atras</Button>
        </div>
      <div>
        <ul className="flex flex-col flex-wrap max-h-[80vh] gap-4">
            {Object.entries(colors).map(([colorName, colorValue]) => (
            <li className="flex gap-2 p-2 shadow-md items-center bg-white" key={colorName} >
            <div style={{ background: colorValue }} className="h-10 w-10 flex rounded-full"></div> {colorName}: {colorValue}
            </li>
            ))}
        </ul>
      </div>
    </PageView>
  );
};

export default Palette;
