import Image from "next/image";
import HomeImage from "@/public/img/image_home.png";
import { TipoProjeto } from "@/types";
import { projetos } from "@/project";
import Loc from "@/public/img/loc.png";
import va1 from "@/public/img/valores_1.png";
import va2 from "@/public/img/valores_2.png";
import va3 from "@/public/img/valores_3.png";
import back_valores from "@/public/img/valores_back.png";


export default function Home() {
  return (
    <div>
      <main>
        <section
          id="home"
          className="flex h-[520px] flex-col items-center justify-center gap-5 bg-cover bg-center bg-no-repeat px-5 text-center text-white shadow-2xl md:h-[650px] lg:h-160"
          style={{ backgroundImage: `url(${HomeImage.src})` }}
        >
          <h1 className="w-full text-4xl font-medium leading-tight [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)] md:w-4/5 md:text-6xl lg:w-1/2 lg:text-7xl">
            Projetamos o futuro. Construímos o presente.
          </h1>

          <h2 className="w-full text-lg font-light leading-relaxed [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)] md:w-4/5 md:text-2xl lg:w-1/2 lg:text-3xl">
            Soluções completas em arquitetura e construção sob medida.
          </h2>
        </section>

        <section
          id="projects"
          className="projects-section flex flex-col items-center px-5 pt-10 md:px-10 lg:px-16"
        >
          <h1 className="text-center text-4xl font-semibold text-[#494949] md:text-5xl lg:text-7xl">
            Projetos Desenvolvidos
          </h1>

          <h2 className="pt-5 text-center text-xl font-light text-[#494949] md:text-2xl lg:text-3xl">
            Conheça todos os projetos desenvolvidos por nós!
          </h2>

          <div className="mt-10 grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {projetos.map((projeto: TipoProjeto) => (
              <div
                key={projeto.cdProject}
                className="project-card flex flex-col gap-1 overflow-hidden rounded-xl bg-[#E7E7E7]"
              >
                <Image
                  src={projeto.tagImage}
                  alt={projeto.nmLocal}
                  width={400}
                  height={300}
                  className="h-auto w-full rounded-xl object-cover shadow-lg"
                />

                <h3 className="ml-3 mt-4 text-2xl text-[#494949] md:text-3xl">
                  {projeto.nmProject}
                </h3>

                <h4 className="ml-3 text-xl text-[#494949] md:text-2xl">
                  {projeto.nmSubtitle}
                </h4>

                <div className="mb-4 ml-3 flex items-center gap-1">
                  <Image src={Loc} alt="Localizacao" />
                  <p className="text-[#494949]">{projeto.nmLocal}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="about-us"
          className="about-us-section flex flex-col items-center pt-16 md:pt-24 lg:pt-30"
        >
          <div className="flex h-auto w-full flex-col pb-16 md:pb-24 lg:h-200 lg:flex-row lg:pb-30">
            <div className="flex min-h-[420px] w-full flex-col items-center justify-around bg-linear-to-b from-[#7D7D7D] to-[#3E3E3E] px-6 py-12 text-white lg:w-1/2">
              <h2 className="w-full text-center text-4xl font-semibold leading-tight md:w-[80%] md:text-5xl lg:w-[70%] lg:text-6xl">
                Arquitetura que transforma espaços em experiências.
              </h2>

              <h3 className="text-center text-lg uppercase tracking-widest text-gray-300 md:text-2xl">
                Arquitetura e design de interiores de alto padrão
              </h3>
            </div>

            <div className="relative h-[420px] w-full lg:h-auto lg:w-1/2">
              <Image
                src={back_valores}
                alt="Background_Valores"
                fill
                className="object-cover brightness-75"
              />
            </div>
          </div>

          <div className="mb-16 flex w-full flex-col items-center gap-10 px-5 md:mb-24 md:px-10 lg:mb-30 lg:px-16">
            <h1 className="text-center text-4xl font-semibold text-[#494949] md:text-5xl lg:text-6xl">
              Nossos Valores
            </h1>

            <div
              className={`grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-15 font-source-serif`}
            >
              <div className="flex min-h-[280px] flex-col justify-center gap-2 rounded-xl bg-[#DEDEDE] px-8 py-8 lg:h-70 lg:px-10">
                <Image src={va3} alt="Arq" />
                <h3 className="font-bold">Arquitetura com Propósito</h3>
                <p className="leading-tight">
                  Cada projeto nasce de um entendimento profundo do cliente, do
                  espaço e da forma de viver. Nada é genérico, tudo tem
                  intenção.
                </p>
              </div>

              <div className="flex min-h-[280px] flex-col justify-center gap-2 rounded-xl bg-[#DEDEDE] px-8 py-8 lg:h-70 lg:px-10">
                <Image src={va2} alt="Arq" />
                <h3 className="font-bold">Autenticidade</h3>
                <p className="leading-tight">
                  Acreditamos em projetos autorais, que respeitam a identidade
                  de quem vive o espaço e fogem de tendências passageiras.
                </p>
              </div>

              <div className="flex min-h-[280px] flex-col justify-center gap-2 rounded-xl bg-[#DEDEDE] px-8 py-8 md:col-span-2 lg:col-span-1 lg:h-70 lg:px-10">
                <Image src={va1} alt="Arq" />
                <h3 className="font-bold">Estética com Funcionalidade</h3>
                <p className="leading-tight">
                  Beleza e função caminham juntas. Criamos espaços que
                  impressionam visualmente, mas que também funcionam no dia a
                  dia.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}