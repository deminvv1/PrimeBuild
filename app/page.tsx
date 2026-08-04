import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { homepageProjects as PROJECTS } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ContactSplit from "@/components/ContactSplit";
import AnimatedLine from "@/components/AnimatedLine";
import VerticalRevealLine from "@/components/VerticalRevealLine";
import SectionLines from "@/components/SectionLines";
import FadeIn from "@/components/FadeIn";
import HeroVideo from "@/components/HeroVideo";
import HowWeWorkSlider from "@/components/HowWeWorkSlider";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.ru";

export const metadata: Metadata = {
  title: "BuildX — Строительство домов в Московской области",
  description:
    "Строим дома под ключ в Московской области за 6 месяцев: реальная цена в договоре, независимый технадзор, чистовая отделка под ключ. Бесплатный подбор дома по параметрам.",
  alternates: { canonical: SITE_URL },
};

const GOLD_SHIMMER: React.CSSProperties = {
  background: "linear-gradient(105deg, #b8924a 0%, #C9A96E 28%, #f5e4aa 50%, #C9A96E 72%, #b8924a 100%)",
  backgroundSize: "250% 100%",
  animation: "btn-gold-shimmer 3.5s linear infinite",
};
const GLASS_SHIMMER: React.CSSProperties = {
  background: "linear-gradient(105deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.14) 30%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.14) 70%, rgba(255,255,255,0.05) 100%)",
  backgroundSize: "250% 100%",
  animation: "btn-gold-shimmer 3.5s linear infinite",
};

const C: React.CSSProperties = {
  // maxWidth: 1200,
  margin: "0 auto",
  padding: "0 60px 40px",
};

const LABEL: React.CSSProperties = {
  display: "inline-block",
  fontFamily: "var(--font-sans)",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: "#C9A96E",
  marginBottom: 12,
};
const H2: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "clamp(28px, 4vw, 40px)",
  fontWeight: 800,
  color: "rgba(255,255,255,0.92)",
  lineHeight: 1.15,
  margin: 0,
  textTransform: "uppercase",
};

export default function HomePage() {
  return (
    <main style={{ paddingTop: 56 }}>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#1a1a1a",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <HeroVideo />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.52)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 220,
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, #242424 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <div
          style={{
            ...C,
            position: "relative",
            zIndex: 1,
            padding: "80px 24px",
          }}
        >
          <FadeIn delay={100} threshold={0.01}>
            <p style={{ ...LABEL, color: "#C9A96E", marginBottom: 20 }}>
              Строительство под ключ · МОСКВА и Московская область
            </p>
          </FadeIn>
          <FadeIn delay={250} threshold={0.01}>
            <h1
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(34px, 6vw, 68px)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.1,
                maxWidth: 800,
                marginBottom: 24,
              }}
            >
              Дом под ключ за 6 месяцев
              <br />
              без переносов сроков
            </h1>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(15px, 2vw, 19px)",
                color: "rgba(255,255,255,0.68)",
                maxWidth: 540,
                lineHeight: 1.7,
                marginBottom: 44,
              }}
            >
              Реальная цена фиксируется в договоре, на каждом этапе — независимый технадзор.
              Дом полностью готов к жизни сразу после сдачи ключей.
            </p>
          </FadeIn>
          <FadeIn delay={450} threshold={0.01}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link
                href="/proekty"
                className="btn-glow-gold"
                style={{
                  ...GOLD_SHIMMER,
                  color: "#1a1a1a",
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  padding: "17px 36px",
                  borderRadius: 999,
                }}
              >
                Смотреть проекты
              </Link>
              <Link
                href="/proekty/podbor-doma"
                className="btn-glow-glass"
                style={{
                  ...GLASS_SHIMMER,
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  padding: "17px 36px",
                  borderRadius: 999,
                }}
              >
                Подобрать дом
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── ABOUT SHORT ───────────────────────────────────────────────────── */}
      <section style={{ position: "relative" }}>
        <SectionLines delay={200} />

        {/* заголовок — на всю ширину */}
        <FadeIn>
          <div style={{ padding: "64px 60px 40px" }}>
            <h2 style={{ ...H2, fontSize: "clamp(28px, 4.5vw, 52px)" }}>
              О нашей компании
            </h2>
          </div>
        </FadeIn>

        {/* горизонтальная линия — полная ширина */}
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={0} />
        </div>

        {/* грид: текст | фото */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            position: "relative",
            minHeight: "55vh",
          }}
          className="about-grid"
        >
          <VerticalRevealLine
            left="50%"
            delay={150}
            color="rgba(255,255,255,0.18)"
            className="about-vline"
          />

          {/* текст — 2 внутренних колонки */}
          <FadeIn delay={100} style={{ height: "100%" }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "3fr auto 1fr", height: "100%" }}
            className="about-inner"
          >
            {/* левая: абзацы */}
            <div style={{ padding: "48px 40px 48px 60px" }}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.85,
                  marginBottom: 20,
                }}
              >
                Мы — строительная компания, специализирующаяся на проектировании и реализации сложных объектов, охватывая все районы Московской области. Наше главное преимущество — это комплексный подход и гарантия качества.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.85,
                }}
              >
                Мы обладаем всеми необходимыми лицензиями, допусками СРО и сертификатами для ведения полномасштабных строительно-монтажных работ.
              </p>
            </div>
            <AnimatedLine
              direction="vertical"
              delay={100}
              color="rgba(255,255,255,0.18)"
              className="mosaic-line"
            />
            {/* правая: ссылка */}
            <div
              className="about-link-cell"
              style={{
                padding: "48px 20px",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <Link
                href="/o-kompanii"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.7)",
                  borderBottom: "1px solid rgba(255,255,255,0.25)",
                  paddingBottom: 2,
                }}
              >
                Подробнее о нас →
              </Link>
            </div>
          </div>
          </FadeIn>

          {/* фото — такой же стиль как в ProjectCard */}
<FadeIn delay={200}>
  <div
    style={{
      padding: "48px 44px 48px 44px",
      display: "flex",
      alignItems: "center",
    }}
  >
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "2 / 1", // Подстроили под панорамный формат картинки
        overflow: "hidden",
        borderRadius: 10,
        background: "transparent", // Убрали темный задник
      }}
    >
      <Image
        src="/images/projects/o-nas.webp"
        alt="Фото объекта"
        fill
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  </div>
</FadeIn>
        </div>

        {/* горизонтальная линия снизу — полная ширина */}
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={200} />
        </div>
        <div style={{ height: 64 }} />

        <style>{`
          @media(max-width:800px){
            .about-grid{grid-template-columns:1fr!important;}
            .about-grid>div:last-child{min-height:280px;}
            .about-inner{grid-template-columns:1fr!important;}
            .about-vline{display:none!important;}
            .about-link-cell{padding:0 60px 48px!important;align-items:flex-start!important;}
          }
          @media(max-width:700px){
            .pg-grid-2{grid-template-columns:1fr!important;row-gap:0!important;}
            .pg-grid-2>*:nth-child(2){position:relative!important;margin-top:20px!important;padding-top:20px!important;}
            .pg-grid-2>*:nth-child(2)::before{content:'';position:absolute;top:0;left:-20px;right:-20px;height:1px;background:rgba(255,255,255,0.14);}
            .pg-vline{display:none!important;}
            .mosaic-grid{grid-template-columns:1fr!important;grid-template-rows:auto!important;}
            .mosaic-photo{grid-row:auto!important;height:260px;padding:0!important;margin:44px 20px!important;}
            .mosaic-line{display:none!important;}
            .mosaic-text{padding:28px 24px!important;}
          }
        `}</style>
      </section>

      {/* ── PROJECTS PREVIEW ──────────────────────────────────────────────── */}
      <section style={{ background: "#242424", position: "relative" }}>
        <SectionLines delay={200} threshold={0.1} />
        <div style={C}>
          <FadeIn>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              // padding: "0 0 32px 0",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <h2 style={H2}>Наши проекты</h2>
            </div>
            <Link
              href="/proekty"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 600,
                color: "rgba(255,255,255,0.7)",
                borderBottom: "1px solid rgba(255,255,255,0.3)",
                paddingBottom: 2,
              }}
            >
              Смотреть все проекты →
            </Link>
          </div>
          </FadeIn>
        </div>
        {/* горизонтальная + вертикальная линии в одном контейнере — чтобы состыковались */}
        <div style={{ padding: "0 24px", position: "relative" }}>
          <AnimatedLine length="100%" delay={100} />
          <VerticalRevealLine
            left="50%"
            delay={300}
            color="rgba(255,255,255,0.18)"
            threshold={0.1}
            className="pg-vline"
          />
          <FadeIn delay={150} threshold={0.1}>
          <div
            className="pg-grid-2"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              columnGap: 16,
              padding: 20,
            }}
          >
            {PROJECTS.slice(0, 2).map((p) => (
              <ProjectCard key={p.slug} project={p} toConfigurator />
            ))}
          </div>
          </FadeIn>
          <AnimatedLine length="100%" delay={100} threshold={0.1} />
          <FadeIn delay={200} threshold={0.1}>
          <div
            className="pg-grid-2"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              columnGap: 16,
              padding: 20,
            }}
          >
            {PROJECTS.slice(2, 4).map((p) => (
              <ProjectCard key={p.slug} project={p} toConfigurator />
            ))}
          </div>
          </FadeIn>
          <AnimatedLine length="100%" delay={200} threshold={0.1} />
        </div>
        <div style={{ height: 64 }} />
      </section>

      {/* ── HOW WE WORK ───────────────────────────────────────────────────── */}
      <section style={{ background: "#242424", position: "relative" }}>
        <SectionLines delay={200} />
        <FadeIn>
          <div style={{ padding: "0 60px 40px" }}>
            <h2 style={H2}>Как мы работаем</h2>
          </div>
        </FadeIn>
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={0} />
        </div>
        <FadeIn delay={150}>
          <HowWeWorkSlider />
        </FadeIn>
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={300} />
        </div>
        <div style={{ height: 64 }} />
      </section>

      {/* ── WHY CHEAPER ───────────────────────────────────────────────────── */}
      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      {/*
      <section style={{ position: "relative" }}>
        <SectionLines delay={200} />
        <ContactSplit
          source="main"
          photo="/images/projects/gamma-1.jpg"
          quoteText={"Ваш дом в Московской\nобласти под ключ"}
          title="Получите бесплатную консультацию"
        />
      </section>
      */}

    </main>
  );
}
