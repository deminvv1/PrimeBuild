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
    "TODO: Строим дома в МО под ключ за 6 месяцев. Проекты Mini, Midi, Maxi. Отделка Комфорт и Бизнес. Бесплатный подбор дома по параметрам.",
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
              TODO: Главный заголовок.
              <br />
              Ваш дом за 6 месяцев.
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
              TODO: ценностное предложение — 2 строки.
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
                href="/podbor-doma"
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
                TODO: 2–3 предложения о компании. Кто вы, сколько лет работаете,
                в каких районах МО, главное конкурентное преимущество.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.85,
                }}
              >
                TODO: второй абзац. Лицензии, допуски СРО.
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
                width: "100%",
                aspectRatio: "16/9",
                overflow: "hidden",
                borderRadius: 10,
                background: "#2c2c2c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.2)",
                }}
              >
                TODO: фото объекта
              </span>
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
          }
          @media(max-width:700px){
            .pg-grid-2{grid-template-columns:1fr!important;}
            .mosaic-grid{grid-template-columns:1fr!important;grid-template-rows:auto!important;}
            .mosaic-photo{grid-row:auto!important;height:260px;}
            .mosaic-line{display:none!important;}
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
              <ProjectCard key={p.slug} project={p} />
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
              <ProjectCard key={p.slug} project={p} />
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

      {/* ── FINISH OPTIONS ────────────────────────────────────────────────── */}
      <section style={{ position: "relative" }}>
        <SectionLines delay={200} />
        <FadeIn>
          <div style={{ padding: "0 60px 40px" }}>
            <h2 style={H2}>Варианты отделки</h2>
          </div>
        </FadeIn>
        <div style={{ padding: "0 24px", position: "relative" }}>
          <AnimatedLine length="100%" delay={0} threshold={0.1} />
          <VerticalRevealLine left="50%" delay={150} color="rgba(255,255,255,0.18)" threshold={0.1} />
          <FadeIn delay={150} threshold={0.1}>
          <div className="pg-grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", columnGap: 24, padding: 20 }}>
            {([
              {
                name: "Комфорт",
                priceNote: "от TODO млн ₽",
                img: "/images/quiz/comfort.jpg",
                isPremium: false,
                includes: [
                  "Черновая и чистовая отделка",
                  "Ламинат 33-го класса",
                  "Натяжные потолки",
                  "Электрика с автоматикой",
                  "Сантехника базовая",
                  "Отопление котёл + радиаторы",
                ],
              },
              {
                name: "Бизнес",
                priceNote: "от TODO млн ₽",
                img: "/images/quiz/premium.jpg",
                isPremium: true,
                includes: [
                  "Премиальные материалы",
                  "Авторский дизайн-проект",
                  "Тёплый пол во всём доме",
                  "Умный дом базовый",
                  "Гарантия на строительство 6 месяцев",
                  "Черновая и чистовая отделка",
                  "Ламинат 33-го класса",
                  "Натяжные потолки",
                  "Электрика с автоматикой",
                  "Сантехника базовая",
                  "Отопление котёл + радиаторы",
                ],
              },
            ] as const).map(({ name, priceNote, img, isPremium, includes }) => (
              <div key={name}>
                <div style={{ position: "relative", width: "100%", aspectRatio: "4/2", overflow: "hidden", background: "#2c2c2c", borderRadius: 10 }}>
                  <Image src={img} alt={name} fill sizes="(max-width:800px) 100vw, 50vw"
                    style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: "28px 12px 40px" }}>
                  <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 26, fontWeight: 800, color: "rgba(255,255,255,0.92)", marginBottom: 4 }}>
                    {name}
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: isPremium ? "#C9A96E" : "rgba(255,255,255,0.35)", marginBottom: 24 }}>
                    {priceNote}
                  </p>
                  <div style={isPremium ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" } : {}}>
                    {includes.map((item) => (
                      <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                        <span style={{ color: isPremium ? "#C9A96E" : "rgba(255,255,255,0.5)", fontWeight: 700, flexShrink: 0 }}>✓</span>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,0.72)", lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/podbor-doma"
                    className={isPremium ? "btn-glow-gold" : "btn-glow-glass"}
                    style={{
                      ...(isPremium ? GOLD_SHIMMER : GLASS_SHIMMER),
                      display: "inline-block",
                      marginTop: 32,
                      color: isPremium ? "#1a1a1a" : "rgba(255,255,255,0.85)",
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: "0.8px",
                      textTransform: "uppercase" as const,
                      padding: "15px 32px",
                      borderRadius: 999,
                      border: isPremium ? "none" : "1px solid rgba(255,255,255,0.2)",
                    }}>
                    Подобрать дом
                  </Link>
                </div>
              </div>
            ))}
          </div>
          </FadeIn>
          <AnimatedLine length="100%" delay={200} threshold={0.1} />
        </div>
        <div style={{ height: 64 }} />
      </section>

      {/* ── WHY CHEAPER ───────────────────────────────────────────────────── */}
      <section style={{ background: "#242424", position: "relative" }}>
        <SectionLines delay={200} />
        <FadeIn>
          <div style={{ padding: "0 60px 40px" }}>
            <h2 style={{ ...H2, maxWidth: 560 }}>
              Почему выбирают нас 
            </h2>
          </div>
        </FadeIn>
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={0} />
        </div>
        <FadeIn delay={150}>
        {/* Без вертикального padding — сетка касается верхнего и нижнего AnimatedLine */}
        <div style={{ padding: "0 24px" }}>
          <div className="mosaic-grid" style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 1fr 1.15fr",
            gridTemplateRows: "300px 300px",
            position: "relative",
          }}>
            {/* Вертикальная линия col1|col2 — соединяется с внешними горизонтальными */}
            <VerticalRevealLine left="34.85%" delay={100} color="rgba(255,255,255,0.18)" className="mosaic-line" />
            {/* Вертикальная линия col2|col3 */}
            <VerticalRevealLine left="65.15%" delay={150} color="rgba(255,255,255,0.18)" className="mosaic-line" />
            {/* Горизонтальная линия между строками (col2+col3) */}
            <div className="mosaic-line" style={{ position: "absolute", top: 300, left: "34.85%", right: 0, zIndex: 1 }}>
              <AnimatedLine length="100%" delay={200} color="rgba(255,255,255,0.18)" />
            </div>

            {/* ── Фото большое слева: padding только справа и сверху/снизу чтобы линии были видны ── */}
            <div className="mosaic-photo" style={{ gridRow: "1 / 3", padding: "20px 20px 20px 20px" }}>
              <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: 10 }}>
                <Image
                  src="/images/projects/gamma-1.jpg"
                  alt="Почему выбирают BuildX"
                  fill
                  sizes="30vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* ── Текст 1 ── */}
            <div style={{ padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 style={{
                fontFamily: "var(--font-sans)", fontSize: 22, fontWeight: 800,
                color: "rgba(255,255,255,0.92)", lineHeight: 1.2, marginBottom: 16,
              }}>
                Гарантия 6 месяцев
              </h3>
              <p style={{
                fontFamily: "var(--font-sans)", fontSize: 14,
                color: "rgba(255,255,255,0.45)", lineHeight: 1.8, margin: 0,
              }}>
                Строим точно в срок и даём гарантию на все выполненные работы — без переносов и задержек.
              </p>
            </div>

            {/* ── Текст 2 ── */}
            <div style={{ padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 style={{
                fontFamily: "var(--font-sans)", fontSize: 22, fontWeight: 800,
                color: "rgba(255,255,255,0.92)", lineHeight: 1.2, marginBottom: 16,
              }}>
                Технадзор на каждом этапе
              </h3>
              <p style={{
                fontFamily: "var(--font-sans)", fontSize: 14,
                color: "rgba(255,255,255,0.45)", lineHeight: 1.8, margin: 0,
              }}>
                Независимый технический надзор контролирует качество работ и соблюдение технологий на всех этапах стройки.
              </p>
            </div>

            {/* ── Текст 3 ── */}
            <div style={{ padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 style={{
                fontFamily: "var(--font-sans)", fontSize: 22, fontWeight: 800,
                color: "rgba(255,255,255,0.92)", lineHeight: 1.2, marginBottom: 16,
              }}>
                Честная цена
              </h3>
              <p style={{
                fontFamily: "var(--font-sans)", fontSize: 14,
                color: "rgba(255,255,255,0.45)", lineHeight: 1.8, margin: 0,
              }}>
                Фиксируем реальную стоимость в договоре — без заниженных цен и доплат по ходу строительства.
              </p>
            </div>

            {/* ── Фото правый нижний: padding слева и сверху/снизу ── */}
            <div className="mosaic-photo" style={{ padding: "20px 20px 20px 20px" }}>
              <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: 10 }}>
                <Image
                  src="/images/quiz/premium.jpg"
                  alt="Отделка"
                  fill
                  sizes="30vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
        </FadeIn>
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={300} />
        </div>
        <div style={{ height: 20 }} />
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────────────────── */}
      {/* <section style={{ background: "#242424", position: "relative" }}>
        <SectionLines delay={200} threshold={0.2} />
        <FadeIn>
          <div style={{ padding: "0 60px 40px" }}>
            <h2 style={H2}>Что говорят наши клиенты</h2>
          </div>
        </FadeIn>
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={0} threshold={0.2} />
        </div>
        <FadeIn delay={150} threshold={0.1}>
        <div style={{ ...C, padding: "48px 24px 64px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 28,
            }}
          >
            {[
              {
                name: "TODO: Иван С.",
                date: "TODO: 2024",
                text: "TODO: текст реального отзыва. Перезвонили сразу, смету прислали в тот же день. Дом сдали в срок.",
                rating: 5,
              },
              {
                name: "TODO: Мария К.",
                date: "TODO: 2024",
                text: "TODO: текст реального отзыва. Очень понравилось качество отделки Бизнес.",
                rating: 5,
              },
              {
                name: "TODO: Александр Н.",
                date: "TODO: 2024",
                text: "TODO: текст реального отзыва. Цена оказалась точно такой, как в договоре.",
                rating: 5,
              },
            ].map(({ name, date, text, rating }) => (
              <div
                key={name}
                style={{
                  background: "#2c2c2c",
                  borderRadius: 10,
                  padding: "28px 24px",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {Array.from({ length: rating }).map((_, i) => (
                    <span key={i} style={{ color: "#C9A96E", fontSize: 16 }}>
                      ★
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.7,
                    marginBottom: 20,
                  }}
                >
                  {text}
                </p>
                <div
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    paddingTop: 16,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    {name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 12,
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    {date}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, textAlign: "center" }}>
            <Link
              href="/otzyvy"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 600,
                color: "rgba(255,255,255,0.65)",
                borderBottom: "1px solid rgba(255,255,255,0.25)",
                paddingBottom: 2,
              }}
            >
              Все отзывы →
            </Link>
          </div>
        </div>
        </FadeIn>
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={300} threshold={0.2} />
        </div>
        <div style={{ height: 64 }} />
      </section> */}

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <section style={{ position: "relative" }}>
        <SectionLines delay={200} />
        <ContactSplit
          source="main"
          photo="/images/projects/gamma-1.jpg"
          quoteText={"Ваш дом в Московской\nобласти под ключ"}
          title="Получите бесплатную консультацию"
        />
      </section>

    </main>
  );
}
