"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminPage() {
  const [nome, setNome] = useState("");
  const [dominio, setDominio] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [cnpj, setCnpj] = useState("");

  const [metatag, setMetatag] = useState("");
  const [missao, setMissao] = useState("");
  const [sobrenos, setSobreNos] = useState("");

  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");

  const [politica, setPolitica] = useState("");
  const [rodape, setRodape] = useState("");

  const [slogan, setSlogan] = useState("");

  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  const [logo, setLogo] = useState("");
  const [banner, setBanner] = useState("");

  const [sites, setSites] = useState<any[]>([]);

  useEffect(() => {
    buscarSites();
  }, []);

  async function buscarSites() {
    const { data } = await supabase
      .from("sites")
      .select("*")
      .order("id", { ascending: false });

    if (data) {
      setSites(data);
    }
  }

  async function uploadImagem(
    event: any,
    tipo: "logo" | "banner"
  ) {
    const file = event.target.files[0];

    if (!file) return;

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("sites")
      .upload(fileName, file);

    if (error) {
      console.log(error);
      alert("Erro upload");
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("sites")
      .getPublicUrl(fileName);

    if (tipo === "logo") {
      setLogo(publicUrl);
    }

    if (tipo === "banner") {
      setBanner(publicUrl);
    }
  }

  async function gerarDados() {
    try {
      const cnpjLimpo = cnpj.replace(/\D/g, "");

      const response = await fetch(
        `https://brasilapi.com.br/api/cnpj/v1/${cnpjLimpo}`
      );

      const data = await response.json();

      const nomeEmpresa =
        data.razao_social || "";

      const fantasia =
        data.nome_fantasia || nomeEmpresa;

      const dominioGerado = fantasia
        .toLowerCase()
        .replace(/\s/g, "-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      setNome(nomeEmpresa);

      setDominio(dominioGerado);

      setWhatsapp(
        data.ddd_telefone_1 || ""
      );

      setEmail(
        `contato@${dominioGerado}.com`
      );

      setInstagram(
        "https://instagram.com"
      );

      setFacebook(
        "https://facebook.com"
      );

      setSlogan(
        `${fantasia} - excelência e inovação para seu negócio`
      );

      setMissao(`
A missão da ${nomeEmpresa} é atuar com excelência em seu segmento.
      `);

      setSobreNos(`
A ${nomeEmpresa} atua oferecendo soluções profissionais e atendimento de qualidade.
      `);

      setPolitica(`
Política de privacidade da ${nomeEmpresa}.
      `);

      setRodape(`
${nomeEmpresa} © Todos os direitos reservados.
      `);

      setSeoTitle(
        `${fantasia} | Empresa Profissional`
      );

      setSeoDescription(
        `${fantasia} oferece soluções profissionais com excelência, inovação e atendimento de qualidade.`
      );

      setKeywords(
        `${fantasia}, empresa, serviços, soluções, atendimento`
      );

      setMetatag(
        `<meta name="facebook-domain-verification" content="xxxxx" />`
      );

    } catch (error) {
      console.log(error);
      alert("Erro ao buscar CNPJ");
    }
  }

  async function salvarSite() {
    const { error } = await supabase
      .from("sites")
      .insert([
        {
          nome,
          dominio,
          whatsapp,
          cnpj,
          metatag,
          missao,
          sobrenos,
          email,
          instagram,
          facebook,
          politica,
          rodape,
          slogan,
          logo,
          banner,
          seo_title: seoTitle,
          seo_description: seoDescription,
          keywords,
        },
      ]);

    if (error) {
      console.log(error);
      alert("Erro ao salvar");
      return;
    }

    alert("Site salvo!");

    buscarSites();
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-6xl font-black mb-12">
          Criar Site
        </h1>

        <div className="grid gap-6">

          <div>
            <label className="block mb-2 font-bold">
              CNPJ
            </label>

            <div className="flex gap-4">
              <input
                value={cnpj}
                onChange={(e) =>
                  setCnpj(e.target.value)
                }
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white"
              />

              <button
                onClick={gerarDados}
                className="bg-green-500 hover:bg-green-600 px-8 rounded-xl font-bold"
              >
                Gerar dados
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 font-bold">
                Upload Banner
              </label>

              <input
                type="file"
                onChange={(e) =>
                  uploadImagem(e, "banner")
                }
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4"
              />
            </div>

          </div>

          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) =>
              setNome(e.target.value)
            }
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
          />

          <input
            placeholder="Domínio"
            value={dominio}
            onChange={(e) =>
              setDominio(e.target.value)
            }
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
          />

          <textarea
            placeholder="Slogan"
            value={slogan}
            onChange={(e) =>
              setSlogan(e.target.value)
            }
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 min-h-[120px]"
          />

          <textarea
            placeholder="SEO Title"
            value={seoTitle}
            onChange={(e) =>
              setSeoTitle(e.target.value)
            }
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 min-h-[120px]"
          />

          <textarea
            placeholder="SEO Description"
            value={seoDescription}
            onChange={(e) =>
              setSeoDescription(e.target.value)
            }
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 min-h-[120px]"
          />

          <textarea
            placeholder="Keywords"
            value={keywords}
            onChange={(e) =>
              setKeywords(e.target.value)
            }
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 min-h-[120px]"
          />

          <textarea
            placeholder="Nossa missão"
            value={missao}
            onChange={(e) =>
              setMissao(e.target.value)
            }
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 min-h-[180px]"
          />

          <textarea
            placeholder="Sobre nós"
            value={sobrenos}
            onChange={(e) =>
              setSobreNos(e.target.value)
            }
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 min-h-[180px]"
          />

          <textarea
            placeholder="Política"
            value={politica}
            onChange={(e) =>
              setPolitica(e.target.value)
            }
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 min-h-[180px]"
          />

          <textarea
            placeholder="Rodapé"
            value={rodape}
            onChange={(e) =>
              setRodape(e.target.value)
            }
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 min-h-[180px]"
          />

          <button
            onClick={salvarSite}
            className="bg-green-500 hover:bg-green-600 transition-all p-5 rounded-2xl font-black text-xl"
          >
            Salvar Site
          </button>

        </div>

      </div>
    </main>
  );
}