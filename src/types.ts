import { StaticImageData } from "next/image";

type ImageSource = string | StaticImageData;

export type TipoProjeto = {
  cdProject: number;
  tagImage: ImageSource;
  nmProject: string;
  nmSubtitle: string;
  nmLocal: string;
};
