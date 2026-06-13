import { TipoProjeto } from "./types";
import img1 from "@/public/img/img_1.png";
import img2 from "@/public/img/img_2.png";
import img3 from "@/public/img/img_3.png";

export const projetos: TipoProjeto[] = [
  {
    cdProject: 1,
    tagImage: img1,
    nmProject: "Casa do Lago",
    nmSubtitle: "Residencial",
    nmLocal: "São Paulo, SP",
  },
  {
    cdProject: 2,
    tagImage: img2,
    nmProject: "Edifício Horizonte",
    nmSubtitle: "Comercial",
    nmLocal: "Rio de Janeiro, RJ",
  },
  {
    cdProject: 3,
    tagImage: img3,
    nmProject: "Praça Central",
    nmSubtitle: "Público",
    nmLocal: "Belo Horizonte, MG",
  },
];