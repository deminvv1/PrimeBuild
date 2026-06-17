import type { Metadata } from "next";
import Link from "next/link";
import { projects as PROJECTS } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import AnimatedLine from "@/components/AnimatedLine";
import VerticalRevealLine from "@/components/VerticalRevealLine";
import SectionLines from "@/components/SectionLines";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.ru";

export const metadata: Metadata = {
  title: "PrimeBuild — Строительство домов в Московской области",
  description:
    "TODO: Строим дома в МО под ключ за 6 месяцев. Проекты Mini, Midi, Maxi. Отделка Комфорт и Бизнес. Бесплатный расчёт стоимости.",
  alternates: { canonical: SITE_URL },
};

const C: React.CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "0 24px",
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
};

export default function HomePage() {
  return (
    <main style={{ paddingTop: 72 }}>
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.52)",
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
          <p style={{ ...LABEL, color: "#C9A96E", marginBottom: 20 }}>
            Строительство под ключ · МОСКВА и Московская область
          </p>
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
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link
              href="/proekty"
              style={{
                background: "#C9A96E",
                color: "#1a1a1a",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                padding: "17px 36px",
                borderRadius: 6,
              }}
            >
              Смотреть проекты
            </Link>
            <Link
              href="/kalkulyator"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                padding: "17px 36px",
                borderRadius: 6,
              }}
            >
              Рассчитать стоимость
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT SHORT ───────────────────────────────────────────────────── */}
      <section style={{ position: "relative" }}>
        <SectionLines delay={200} />

        {/* заголовок — на всю ширину */}
        <div style={{ padding: "64px 60px 40px" }}>
          <h2 style={{ ...H2, fontSize: "clamp(28px, 4.5vw, 52px)" }}>
            О нашей компании
          </h2>
        </div>

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
          <div
            style={{ display: "grid", gridTemplateColumns: "3fr auto 1fr" }}
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
            />
            {/* правая: ссылка */}
            <div
              style={{
                padding: "48px 32px",
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

          {/* фото — такой же стиль как в ProjectCard */}
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
        </div>

        {/* горизонтальная линия снизу — полная ширина */}
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={300} />
        </div>
        <div style={{ height: 64 }} />

        <style>{`@media(max-width:800px){.about-grid{grid-template-columns:1fr!important;} .about-grid>div:last-child{min-height:280px;}}`}</style>
      </section>

      {/* ── PROJECTS PREVIEW ──────────────────────────────────────────────── */}
      <section style={{ background: "#242424", position: "relative" }}>
        <SectionLines delay={200} threshold={0.1} />
        <div style={C}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              padding: "0 0 32px 0",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <h2 style={H2}>Готовые проекты</h2>
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
        </div>
        {/* горизонтальная + вертикальная линии в одном контейнере — чтобы состыковались */}
        <div style={{ padding: "0 24px", position: "relative" }}>
          <AnimatedLine length="100%" delay={300} />
          <VerticalRevealLine
            left="50%"
            delay={300}
            color="rgba(255,255,255,0.18)"
            threshold={0.1}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
              padding: 20,
            }}
          >
            {PROJECTS.slice(0, 3).map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
          <AnimatedLine length="100%" delay={400} threshold={0.1} />
        </div>
        <div style={{ height: 64 }} />
      </section>

      {/* ── HOW WE WORK ───────────────────────────────────────────────────── */}
      <section style={{ background: "#242424", position: "relative" }}>
        <SectionLines delay={200} />
        <div style={{ padding: "0 60px 40px" }}>
          <h2 style={H2}>Как мы работаем</h2>
        </div>
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={0} />
        </div>
        <div style={{ ...C, padding: "48px 24px 64px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 40,
            }}
          >
            {[
              {
                n: "01",
                title: "Заявка и расчёт",
                desc: "Оставляете заявку — перезваниваем в течение 2 часов, считаем смету.",
              },
              {
                n: "02",
                title: "Договор",
                desc: "Фиксируем цену и сроки в договоре. Никаких дополнительных платежей.",
              },
              {
                n: "03",
                title: "Фундамент и коробка",
                desc: "Заливаем фундамент, возводим стены и кровлю. Онлайн-отчёты каждую неделю.",
              },
              {
                n: "04",
                title: "Отделка и инженерия",
                desc: "Электрика, сантехника, отопление, чистовая отделка по выбранному пакету.",
              },
              {
                n: "05",
                title: "Сдача ключей",
                desc: "Подписываем акт приёма-передачи и вручаем ключи. Гарантия на дом.",
              },
            ].map(({ n, title, desc }) => (
              <div key={n}>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "2px",
                    color: "#C9A96E",
                    marginBottom: 12,
                  }}
                >
                  {n}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.9)",
                    marginBottom: 8,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={300} />
        </div>
        <div style={{ height: 64 }} />
      </section>

      {/* ── FINISH OPTIONS ────────────────────────────────────────────────── */}
      <section style={{ position: "relative" }}>
        <SectionLines delay={200} />
        <div style={{ padding: "0 60px 40px" }}>
          <h2 style={H2}>Варианты отделки</h2>
        </div>
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={0} />
        </div>
        <div style={{ ...C, padding: "48px 24px 64px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 28,
            }}
          >
            {[
              {
                name: "Комфорт",
                priceNote: "от TODO млн ₽",
                accent: "rgba(255,255,255,0.2)",
                includes: [
                  "Черновая и чистовая отделка",
                  "Ламинат 33-го класса",
                  "Натяжные потолки",
                  "Электрика с автоматикой",
                  "Сантехника базовая",
                  "Отопление котёл + радиаторы",
                ],
                checkColor: "rgba(255,255,255,0.6)",
              },
              {
                name: "Бизнес",
                priceNote: "от TODO млн ₽",
                accent: "#C9A96E",
                includes: [
                  "Всё из Комфорт",
                  "Премиальные материалы",
                  "Авторский дизайн-проект",
                  "Тёплый пол во всём доме",
                  "Умный дом базовый",
                  "Расширенная гарантия 5 лет",
                ],
                checkColor: "#C9A96E",
              },
            ].map(({ name, priceNote, accent, includes, checkColor }) => (
              <div
                key={name}
                style={{
                  padding: "36px 32px",
                  background: "#2c2c2c",
                  borderRadius: 10,
                  border: `2px solid ${accent}`,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 22,
                    fontWeight: 800,
                    color: "rgba(255,255,255,0.92)",
                    marginBottom: 4,
                  }}
                >
                  {name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.35)",
                    marginBottom: 28,
                  }}
                >
                  {priceNote}
                </p>
                {includes.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        color: checkColor,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 14,
                        color: "rgba(255,255,255,0.75)",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
                <Link
                  href="/kalkulyator"
                  style={{
                    display: "block",
                    marginTop: 32,
                    textAlign: "center",
                    background: accent,
                    color:
                      accent === "#C9A96E"
                        ? "#1a1a1a"
                        : "rgba(255,255,255,0.85)",
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    padding: "15px 24px",
                    borderRadius: 6,
                    border:
                      accent === "#C9A96E"
                        ? "none"
                        : "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  Рассчитать стоимость
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={300} />
        </div>
        <div style={{ height: 64 }} />
      </section>

      {/* ── WHY CHEAPER ───────────────────────────────────────────────────── */}
      <section style={{ background: "#242424", position: "relative" }}>
        <SectionLines delay={200} />
        <div style={{ padding: "0 60px 40px" }}>
          <h2 style={{ ...H2, maxWidth: 560 }}>
            Почему наши цены ниже — без потери качества
          </h2>
        </div>
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={0} />
        </div>
        <div style={{ ...C, padding: "48px 24px 64px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 28,
            }}
          >
            {[
              {
                title: "Собственное производство",
                desc: "TODO: опишите, почему нет накрутки посредников.",
              },
              {
                title: "Строим сами",
                desc: "TODO: все работы выполняем собственной бригадой, не перепродаём субподрядчикам.",
              },
              {
                title: "Прозрачная смета",
                desc: "TODO: фиксируем стоимость в договоре. Никаких доп. платежей по ходу стройки.",
              },
              {
                title: "Поток объектов",
                desc: "TODO: строим несколько домов одновременно — объём снижает себестоимость.",
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                style={{
                  padding: "28px 24px",
                  background: "#2c2c2c",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.9)",
                    marginBottom: 10,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={300} />
        </div>
        <div style={{ height: 64 }} />
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────────────────── */}
      <section style={{ background: "#242424", position: "relative" }}>
        <SectionLines delay={200} threshold={0.2} />
        <div style={{ padding: "0 60px 40px" }}>
          <h2 style={H2}>Что говорят наши клиенты</h2>
        </div>
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={0} threshold={0.2} />
        </div>
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
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={300} threshold={0.2} />
        </div>
        <div style={{ height: 64 }} />
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <section style={{ background: "#242424", position: "relative" }}>
        <SectionLines delay={200} />
        <div style={{ padding: "0 60px 40px" }}>
          <h2 style={{ ...H2, textAlign: "center" }}>
            Получите бесплатную консультацию
          </h2>
        </div>
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={0} />
        </div>
        <div style={{ ...C, maxWidth: 640, padding: "48px 24px 64px" }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              color: "rgba(255,255,255,0.45)",
              textAlign: "center",
              marginBottom: 40,
              lineHeight: 1.6,
            }}
          >
            Расскажите о своём участке и пожеланиях — ответим на вопросы и
            подберём подходящий проект.
          </p>
          <ContactForm source="main" buttonLabel="Отправить заявку" dark />
        </div>
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={300} />
        </div>
        <div style={{ height: 64 }} />
      </section>

      {/* ── QUIZ CALCULATOR ───────────────────────────────────────────────── */}
      <section style={{ position: "relative" }}>
        <SectionLines delay={200} />
        <div style={{ padding: "0 60px 40px" }}>
          <h2 style={H2}>Узнайте примерную стоимость за 2 минуты</h2>
        </div>
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={0} />
        </div>
        <div
          style={{
            ...C,
            padding: "48px 24px 64px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
          className="quiz-grid"
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 16,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.7,
                marginBottom: 32,
              }}
            >
              Ответьте на 4 вопроса — пришлём развёрнутый расчёт с ценами на
              материалы и работы.
            </p>
            {[
              "Без обязательств — просто расчёт",
              "Ответим в течение 2 часов",
              "Фиксированная итоговая цена без скрытых платежей",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    color: "#C9A96E",
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 15,
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              background: "#2c2c2c",
              borderRadius: 12,
              padding: "48px 40px",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 24,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 32,
                fontWeight: 900,
                color: "#C9A96E",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Бесплатный расчёт
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Ответьте на несколько вопросов — получите точную смету с ценами на
              материалы и работы.
            </p>
            <Link
              href="/kalkulyator"
              style={{
                display: "inline-block",
                background: "#C9A96E",
                color: "#1a1a1a",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                padding: "17px 36px",
                borderRadius: 6,
                textDecoration: "none",
              }}
            >
              Рассчитать стоимость →
            </Link>
          </div>
        </div>
        <div style={{ padding: "0 24px" }}>
          <AnimatedLine length="100%" delay={300} />
        </div>
        <div style={{ height: 64 }} />
        <style>{`@media(max-width:860px){.quiz-grid{grid-template-columns:1fr!important;gap:40px!important}}`}</style>
      </section>
    </main>
  );
}
