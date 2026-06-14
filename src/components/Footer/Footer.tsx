import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import logo from "@/public/img/logo-vini-branca.png";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer flex w-full flex-col">

      <ul className="lista-footer grid w-full grid-cols-2 place-items-center gap-x-4 gap-y-4 bg-[#3E3E3E] px-4 pt-8 text-center text-xs text-white sm:text-sm md:flex md:flex-wrap md:justify-center md:gap-x-10 md:text-xl">
        <li>
          <Link href="/">HOME</Link>
        </li>

        <li>
          <Link href="/#projects">PROJETOS</Link>
        </li>

        <li>
          <Link href="/#about-us">SOBRE NÓS</Link>
        </li>

        <li>
          <Link href="/contato">CONTATO</Link>
        </li>
      </ul>

      <div className="footer-container flex h-auto flex-col items-center justify-center gap-5 bg-[#3E3E3E] px-5 pb-10 pt-6 md:h-70">
        <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <li className="li-container-a">
            <a href="https://www.linkedin.com/in/melissa-ara%C3%BAjo-34528b239" aria-label="LinkedIn">
              <CiLinkedin size={40} color="white" />
            </a>
          </li>

          <li className="li-container-a">
            <a href="https://www.instagram.com/viniarquitetos?igsh=MWlib21zMHRieXRsZA==" aria-label="Instagram">
              <FaInstagram size={35} color="white" />
            </a>
          </li>

          <li className="li-container-a">
            <a href="mailto:contato@viniarquitetos.com.br" aria-label="Email">
              <MdOutlineEmail size={40} color="white" />
            </a>
          </li>

          <li className="li-container-a">
            <a href="https://wa.me/5511987410531" aria-label="Telefone">
              <BsFillTelephoneFill size={30} color="white" />
            </a>
          </li>
        </ul>

        <Image
          src={logo}
          alt="Logo"
          width={300}
          height={300}
          className="w-[180px] md:w-[240px] lg:w-[300px]"
        />

        <p className="w-full max-w-[500px] text-center text-sm font-light text-white md:text-base lg:w-120">
          © 2026 Vini Alves Arquitetura. Todos os direitos reservados.
          Arquitetura, Urbanismo e Design de Interiores.
        </p>
      </div>
    </footer>
  );
}
