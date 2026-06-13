"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "@/public/img/logo-vini-preta.png";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="relative z-50 flex h-20 items-center justify-between bg-[#F0F0F0] px-5 shadow-xl md:h-25 md:px-10 lg:justify-around">
      <Image
        src={logo}
        alt="Logo"
        width={250}
        height={250}
        className="w-[140px] md:w-[180px] lg:w-[250px]"
      />

      <ul className="hidden gap-10 text-xl lg:flex">
        <li><Link href="/">HOME</Link></li>
        <li><Link href="/#projects">PROJETOS</Link></li>
        <li><Link href="/#about-us">SOBRE NÓS</Link></li>
        <li><Link href="/contato">CONTATO</Link></li>
      </ul>

      <div className="relative lg:hidden">
        <button
          className="flex flex-col gap-1"
          aria-label="Abrir menu"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <span className={`h-[3px] w-8 bg-[#2e2e2e] transition-all duration-300 ${menuAberto ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-[3px] w-8 bg-[#2e2e2e] transition-all duration-300 ${menuAberto ? "opacity-0" : ""}`} />
          <span className={`h-[3px] w-8 bg-[#2e2e2e] transition-all duration-300 ${menuAberto ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>

        {menuAberto && (
          <ul className="absolute right-0 top-10 flex flex-col items-center gap-5 rounded-xl bg-[#F0F0F0] py-6 px-10 text-xl shadow-xl">
            <li><Link href="/" onClick={() => setMenuAberto(false)}>HOME</Link></li>
            <li><Link href="/#projects" onClick={() => setMenuAberto(false)}>PROJETOS</Link></li>
            <li><Link href="/#about-us" onClick={() => setMenuAberto(false)}>SOBRE NÓS</Link></li>
            <li><Link href="/contato" onClick={() => setMenuAberto(false)}>CONTATO</Link></li>
          </ul>
        )}
      </div>
    </header>
  );
}
