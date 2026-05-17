"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function SitePage() {
  const params = useParams();

  const dominio = params?.dominio as string;

  const [site, setSite] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dominio) {
      buscarSite();
    }
  }, [dominio]);

  async function buscarSite() {
    const { data } = await supabase
      .from("sites")
      .select("*")
      .eq("dominio", dominio)
      .single();

    setSite(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">
          Carregando...
        </h1>
      </main>
    );
  }

  if (!site) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">
          Site não encontrado
        </h1>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>
          {site.seo_title || site.nome}
        </title>

        <meta
          name="description"
          content={site.seo_description}
        />

        <meta
          name="keywords"
          content={site.keywords}
        />

        <meta
          property="og:title"
          content={site.seo_title}
        />

        <meta
          property="og:description"
          content={site.seo_description}
        />

        <meta
          property="og:image"
          content={site.banner}
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content={`https://${site.dominio}.com`}
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content={site.seo_title}
        />

        <meta
          name="twitter:description"
          content={site.seo_description}
        />

        <meta
          name="twitter:image"
          content={site.banner}
        />
      </Head>

      <main className="bg-black text-white overflow-hidden">

        {/* NAVBAR */}

        <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/30 border-b border-zinc-900">
          <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">

            <h1 className="text-2xl font-black tracking-tight">
              {site.nome}
            </h1>

            <div className="hidden md:flex items-center gap-10 text-zinc-500 text-sm uppercase tracking-widest">

              <a
                href="#sobre"
                className="hover:text-white transition"
              >
                Sobre
              </a>

              <a
                href="#missao"
                className="hover:text-white transition"
              >
                Missão
              </a>

              <a
                href="#contato"
                className="hover:text-white transition"
              >
                Contato
              </a>

            </div>

          </div>
        </header>

        {/* HERO */}

        <section className="relative min-h-screen flex items-center overflow-hidden">

          {site.banner && (
            <img
              src={site.banner}
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
          )}

          <div className="absolute inset-0 bg-black/80" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,120,0.10),transparent_40%)]" />

          <div className="absolute inset-0 opacity-[0.03]">
            <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:80px_80px]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">

            <div className="max-w-6xl">

              <div className="inline-flex items-center gap-3 border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl px-5 py-2 rounded-full mb-10">

                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

                <span className="text-zinc-300 text-sm tracking-[0.3em] uppercase">
                  Site profissional
                </span>

              </div>

              <h1 className="text-8xl md:text-[11rem] font-black leading-[0.9] tracking-tight max-w-6xl">
                {site.nome}
              </h1>

              <p className="mt-10 text-3xl md:text-4xl text-zinc-400 max-w-5xl leading-relaxed font-light">
                {site.slogan}
              </p>

              <div className="flex flex-wrap gap-5 mt-16">

                <a
                  href={`https://wa.me/55${site.whatsapp}`}
                  target="_blank"
                  className="bg-green-500 hover:bg-green-400 transition-all duration-300 px-10 py-5 rounded-2xl text-lg font-bold shadow-[0_0_60px_rgba(34,197,94,0.35)]"
                >
                  Falar no WhatsApp
                </a>

                <a
                  href="#sobre"
                  className="border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900 transition-all duration-300 px-10 py-5 rounded-2xl text-lg font-bold"
                >
                  Conhecer empresa
                </a>

              </div>

            </div>

          </div>
        </section>

      </main>
    </>
  );
}