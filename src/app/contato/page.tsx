"use client";

import { useState } from "react";

type Assunto = "feedback" | "consulta" | "plataforma" | "pessoal";

interface FormErrors {
  primeiroNome?: string;
  sobrenome?: string;
  email?: string;
  telefone?: string;
  assunto?: string;
  mensagem?: string;
}

const assuntoOptions: { value: Assunto; label: string }[] = [
  { value: "feedback", label: "Feedback" },
  { value: "consulta", label: "Consulta geral" },
  { value: "plataforma", label: "Plataforma" },
  { value: "pessoal", label: "Pessoal" },
];

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContatoPage() {
  const [assunto, setAssunto] = useState<Assunto | "">("");
  const [formData, setFormData] = useState({
    primeiroNome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = (data: typeof formData, currentAssunto: Assunto | ""): FormErrors => {
    const errs: FormErrors = {};
    if (!data.primeiroNome.trim())
      errs.primeiroNome = "O primeiro nome é obrigatório.";
    if (!data.sobrenome.trim())
      errs.sobrenome = "O sobrenome é obrigatório.";
    if (!data.email.trim())
      errs.email = "O e-mail é obrigatório.";
    else if (!validateEmail(data.email))
      errs.email = "Informe um e-mail válido.";
    if (!data.telefone.trim())
      errs.telefone = "O telefone é obrigatório.";
    if (!currentAssunto)
      errs.assunto = "Selecione um assunto.";
    if (!data.mensagem.trim())
      errs.mensagem = "A mensagem não pode ficar em branco.";
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    if (touched[e.target.name]) {
      setErrors(validate(updated, assunto));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(formData, assunto));
  };

  const handleAssunto = (value: Assunto) => {
    setAssunto(value);
    setTouched((prev) => ({ ...prev, assunto: true }));
    setErrors((prev) => ({ ...prev, assunto: undefined }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      [...Object.keys(formData), "assunto"].map((k) => [k, true])
    );
    setTouched(allTouched);
    const errs = validate(formData, assunto);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // TODO: integrar com backend
    console.log({ ...formData, assunto });
    setSubmitSuccess(true);
    setFormData({ primeiroNome: "", sobrenome: "", email: "", telefone: "", mensagem: "" });
    setAssunto("");
    setTouched({});
    setErrors({});
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  // Helper: classes do input conforme erro
  const inputClass = (field: keyof FormErrors) =>
    `border-b outline-none py-1.5 text-sm bg-transparent transition ${
      errors[field] && touched[field]
        ? "border-red-500 focus:border-red-600 text-red-600 placeholder:text-red-300"
        : "border-gray-300 focus:border-gray-700 text-gray-800"
    }`;

  return (
    <main className="min-h-screen bg-[#f0efef] flex flex-col items-center pt-12 pb-20 px-4">
      {/* Título */}
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2 tracking-tight">
        Contate-nos
      </h1>
      <p className="text-sm text-gray-500 mb-10 text-center">
        Tem alguma dúvida ou comentário? Basta nos enviar uma mensagem!
      </p>

      {/* Feedback de sucesso */}
      {submitSuccess && (
        <div className="w-full max-w-4xl mb-6 bg-green-50 border border-green-200 text-green-700 text-sm px-5 py-3 rounded-lg flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Mensagem enviada com sucesso! Entraremos em contato em breve.
        </div>
      )}

      {/* Card principal */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row md:rounded-xl md:overflow-hidden md:shadow-md">

        {/* Sidebar esquerda (oculta no mobile) */}
        <aside className="hidden md:flex flex-col justify-between relative bg-[#3a3a3a] text-white p-8 w-80 shrink-0 overflow-hidden">
          <div className="absolute bottom-16 right-[-30px] w-36 h-36 rounded-full border border-white/20 pointer-events-none" />
          <div className="absolute bottom-[-20px] right-[-50px] w-48 h-48 rounded-full border border-white/10 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-lg font-semibold mb-1">Informações de contato</h2>
            <p className="text-xs text-gray-300 mb-8">Diga algo para iniciar um bate-papo.</p>

            <ul className="space-y-5 text-sm">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <span>+55 (11)98765-4321</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <span>contato@arquiviniclusalves.com</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <span>Av. de Palmeiras 45, 1057-001<br />São Paulo – SP</span>
              </li>
            </ul>
          </div>

          <div className="relative z-10 flex gap-3 mt-10">
            <a href="https://www.instagram.com/viniarquitetos?igsh=MWlib21zMHRieXRsZA==" aria-label="Instagram" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10A5 5 0 0 1 12 7Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.25a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75Z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/melissa-ara%C3%BAjo-34528b239" aria-label="LinkedIn" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5A2.49 2.49 0 0 1 7.5 6a2.49 2.49 0 0 1-2.52 2.5A2.49 2.49 0 0 1 2.5 6a2.49 2.49 0 0 1 2.48-2.5ZM3 9h4v12H3V9Zm7 0h3.6v1.71h.05C14.18 9.67 15.6 9 17.3 9 21 9 22 11.29 22 14.5V21h-4v-5.75c0-1.37-.03-3.13-1.9-3.13-1.92 0-2.22 1.5-2.22 3.03V21h-4V9Z" />
              </svg>
            </a>
          </div>
        </aside>

        {/* Formulário */}
        <div className="bg-transparent md:bg-white flex-1 p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

            {/* Primeiro Nome */}
            <div className="flex flex-col gap-1">
              <label className={`text-xs font-medium ${errors.primeiroNome && touched.primeiroNome ? "text-red-500" : "text-gray-500"}`} htmlFor="primeiroNome">
                Primeiro Nome
              </label>
              <input
                id="primeiroNome"
                name="primeiroNome"
                type="text"
                value={formData.primeiroNome}
                onChange={handleChange}
                onBlur={() => handleBlur("primeiroNome")}
                className={inputClass("primeiroNome")}
              />
              {errors.primeiroNome && touched.primeiroNome && (
                <span className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                  <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-8-3a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1zm0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" clipRule="evenodd" />
                  </svg>
                  {errors.primeiroNome}
                </span>
              )}
            </div>

            {/* Sobrenome */}
            <div className="flex flex-col gap-1">
              <label className={`text-xs font-medium ${errors.sobrenome && touched.sobrenome ? "text-red-500" : "text-gray-500"}`} htmlFor="sobrenome">
                Sobrenome
              </label>
              <input
                id="sobrenome"
                name="sobrenome"
                type="text"
                value={formData.sobrenome}
                onChange={handleChange}
                onBlur={() => handleBlur("sobrenome")}
                className={inputClass("sobrenome")}
              />
              {errors.sobrenome && touched.sobrenome && (
                <span className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                  <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-8-3a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1zm0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" clipRule="evenodd" />
                  </svg>
                  {errors.sobrenome}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className={`text-xs font-medium ${errors.email && touched.email ? "text-red-500" : "text-gray-500"}`} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                className={inputClass("email")}
              />
              {errors.email && touched.email && (
                <span className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                  <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-8-3a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1zm0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </span>
              )}
            </div>

            {/* Telefone */}
            <div className="flex flex-col gap-1">
              <label className={`text-xs font-medium ${errors.telefone && touched.telefone ? "text-red-500" : "text-gray-500"}`} htmlFor="telefone">
                Número de Telefone
              </label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                placeholder="+55 (11) 99999-9999"
                value={formData.telefone}
                onChange={handleChange}
                onBlur={() => handleBlur("telefone")}
                className={inputClass("telefone")}
              />
              {errors.telefone && touched.telefone && (
                <span className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                  <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-8-3a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1zm0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" clipRule="evenodd" />
                  </svg>
                  {errors.telefone}
                </span>
              )}
            </div>
          </div>

          {/* Selecione o Assunto */}
          <div className="mb-6">
            <p className={`text-xs font-medium mb-3 ${errors.assunto && touched.assunto ? "text-red-500" : "text-gray-500"}`}>
              Selecione o Assunto
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {assuntoOptions.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                  <span
                    onClick={() => handleAssunto(opt.value)}
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition shrink-0 cursor-pointer ${
                      assunto === opt.value
                        ? "border-gray-800 bg-gray-800"
                        : errors.assunto && touched.assunto
                        ? "border-red-400"
                        : "border-gray-400"
                    }`}
                  >
                    {assunto === opt.value && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </span>
                  {opt.label}
                </label>
              ))}
            </div>
            {errors.assunto && touched.assunto && (
              <span className="text-xs text-red-500 flex items-center gap-1 mt-2">
                <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-8-3a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1zm0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" clipRule="evenodd" />
                </svg>
                {errors.assunto}
              </span>
            )}
          </div>

          {/* Mensagem */}
          <div className="flex flex-col gap-1 mb-8">
            <label className={`text-xs font-medium ${errors.mensagem && touched.mensagem ? "text-red-500" : "text-gray-500"}`} htmlFor="mensagem">
              Mensagem
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={3}
              placeholder="Escreva sua mensagem..."
              value={formData.mensagem}
              onChange={handleChange}
              onBlur={() => handleBlur("mensagem")}
              className={`${inputClass("mensagem")} placeholder:text-gray-300 resize-none`}
            />
            {errors.mensagem && touched.mensagem && (
              <span className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-8-3a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1zm0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" clipRule="evenodd" />
                </svg>
                {errors.mensagem}
              </span>
            )}
          </div>

          {/* Botão Enviar */}
          <div className="flex justify-center md:justify-end">
            <button
              onClick={handleSubmit}
              className="w-full md:w-auto bg-[#3a3a3a] hover:bg-[#222] text-white text-sm font-medium px-10 py-3 rounded transition-colors duration-200"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}        
