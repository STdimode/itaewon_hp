import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import grainTexture from "figma:asset/1958ea6da85be219392f56400cece9696ea658a1.png";
import lightBeamBg from "figma:asset/f69b2aaacf2509efa17ba8dca6463bbd95be090d.png";
import nxtIcon1 from "../imports/nxt_icon_1.svg";
import nxtIcon2 from "../imports/nxt_icon_2.svg";
import nxtIcon3 from "../imports/nxt_icon_3.svg";
import nxtIcon4 from "../imports/nxt_icon_4.svg";

/* ─── images ─── */
import heroSlideImg from "figma:asset/c928059b5968d7fe6b03e6dc8000bd8013816286.png";

const HERO_IMAGES = [
  heroSlideImg,
];
const CARD1_IMG = "https://images.unsplash.com/photo-1770703570446-334b794dc185?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwYmlibGUlMjBzY3JpcHR1cmUlMjBwYWdlc3xlbnwxfHx8fDE3NzI1MzU4NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const CARD2_IMG = "https://images.unsplash.com/photo-1628798302947-4e16ccb28e67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBwdWxwaXQlMjBwb2RpdW0lMjBsZWN0ZXJuJTIwY2xvc2V1cHxlbnwxfHx8fDE3NzI1MzY1NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const CARD3_IMG = "https://images.unsplash.com/photo-1765224747170-be7b97010052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY291c3RpYyUyMGd1aXRhciUyMHdvcnNoaXAlMjBkYXJrJTIwc3RhZ2V8ZW58MXx8fHwxNzcyNTM2NDk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const CHURCH_BG = "https://images.unsplash.com/photo-1545666215-c5fbc4a9f4fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjYXRoZWRyYWwlMjBjYW5kbGVzJTIwYXRtb3NwaGVyaWN8ZW58MXx8fHwxNzcyNTI4Mzc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1615715325974-aaa65b23fdf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodCUyMGJsdWV8ZW58MXx8fHwxNzcyNTM0MTI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1586783965334-e29d38a767b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodCUyMGJsdWUlMjBza3l8ZW58MXx8fHwxNzcyNTM0MTI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1687301634919-f82489300b86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodCUyMGJsdWUlMjB3YXRlcnxlbnwxfHx8fDE3NzI1MzQxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodCUyMGJsdWUlMjB3YWxsfGVufDF8fHx8MTc3MjUzNDEyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1640519963889-57d07c661686?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodCUyMGJsdWUlMjBvY2VhbnxlbnwxfHx8fDE3NzI1MzQxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1638150987707-7525abde5b8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodCUyMGJsdWUlMjBjbG91ZHxlbnwxfHx8fDE3NzI1MzQxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

/* ─── SVG Icons ─── */
const LeafLogo = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 2C7 2 3 6 3 11c0 4 2 7 4 8.5C8 20 10 20 11 20c1 0 3 0 4-0.5 2-1.5 4-4.5 4-8.5C19 6 15 2 11 2z" fill="#2eb872"/>
    <path d="M11 5v13M7 9c2 1 4 2 7 5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const HamburgerIcon = () => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
    <line x1="1" y1="1" x2="21" y2="1"/>
    <line x1="1" y1="8" x2="21" y2="8"/>
    <line x1="1" y1="15" x2="21" y2="15"/>
  </svg>
);

/* Welcome icons */
const IconChurchVision = () => (
  <svg width="43" height="43" viewBox="0 0 43 43" fill="none" stroke="#555" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 4v8M18 8h7"/>
    <path d="M10 20l11.5-8L33 20"/>
    <rect x="10" y="20" width="23" height="17"/>
    <rect x="18" y="27" width="7" height="10"/>
  </svg>
);
const IconWorshipGuide = () => (
  <svg width="43" height="43" viewBox="0 0 43 43" fill="none" stroke="#555" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 8h4c3 0 9.5 1 9.5 4v23c0-2.5-5.5-3.5-9.5-3.5H8V8z"/>
    <path d="M35 8h-4c-3 0-9.5 1-9.5 4v23c0-2.5 5.5-3.5 9.5-3.5H35V8z"/>
    <path d="M21.5 12v23"/>
    <line x1="12" y1="16" x2="17" y2="16"/>
    <line x1="12" y1="20" x2="16" y2="20"/>
    <line x1="26" y1="16" x2="31" y2="16"/>
    <line x1="27" y1="20" x2="31" y2="20"/>
  </svg>
);
const IconFacility = () => (
  <svg width="43" height="43" viewBox="0 0 43 43" fill="none">
    <rect x="6" y="11" width="31" height="21" rx="4" stroke="#555" strokeWidth="1.6" fill="#555" />
    <path d="M18 16.5v10l8.5-5-8.5-5z" fill="white" stroke="none" />
  </svg>
);
const IconLocation = () => (
  <svg width="43" height="43" viewBox="0 0 43 43" fill="none" stroke="#555" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 6C16 6 12 10.5 12 16c0 8 9.5 19 9.5 19S31 24 31 16c0-5.5-4-10-9.5-10z"/>
    <circle cx="21.5" cy="16" r="3.5"/>
  </svg>
);
const IconBulletin = () => (
  <svg width="36" height="36" viewBox="0 0 43 43" fill="none" stroke="#555" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="13" y="5" width="24" height="33" rx="2"/>
    <path d="M9 10h4M9 10v28a2 2 0 002 2h22"/>
    <line x1="25" y1="14" x2="25" y2="27"/>
    <line x1="19" y1="20" x2="31" y2="20"/>
  </svg>
);

/* Church school icons */
/* 영·유치부: 곰돌이+ABC블록 아이콘 */
const IconInfant = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#334" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {/* 곰돌이 */}
    <circle cx="18" cy="22" r="8"/>
    <circle cx="12" cy="14" r="3"/>
    <circle cx="24" cy="14" r="3"/>
    <circle cx="15.5" cy="20" r="1.2" fill="#334" stroke="none"/>
    <circle cx="20.5" cy="20" r="1.2" fill="#334" stroke="none"/>
    <ellipse cx="18" cy="24" rx="2.5" ry="1.8"/>
    <circle cx="18" cy="23.5" r="0.8" fill="#334" stroke="none"/>
    {/* ABC 블록 */}
    <rect x="30" y="24" width="12" height="12" rx="1.5"/>
    <text x="36" y="33" textAnchor="middle" fill="#334" stroke="none" fontSize="8" fontWeight="700" fontFamily="sans-serif">A</text>
    <rect x="32" y="14" width="10" height="10" rx="1.5"/>
    <text x="37" y="22" textAnchor="middle" fill="#334" stroke="none" fontSize="7" fontWeight="700" fontFamily="sans-serif">B</text>
  </svg>
);
/* 아동부(다윗): 무지개 다리 아이콘 */
const IconChildren = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" strokeWidth="2.2" strokeLinecap="round">
    <path d="M6 38 Q24 6 42 38" stroke="#E84040" fill="none"/>
    <path d="M9 38 Q24 10 39 38" stroke="#F5A623" fill="none"/>
    <path d="M12 38 Q24 14 36 38" stroke="#F8D74A" fill="none"/>
    <path d="M15 38 Q24 18 33 38" stroke="#5BBF5B" fill="none"/>
    <path d="M18 38 Q24 22 30 38" stroke="#4A90D9" fill="none"/>
    <path d="M21 38 Q24 26 27 38" stroke="#7B61D9" fill="none"/>
    <line x1="4" y1="38" x2="44" y2="38" stroke="#334" strokeWidth="1.8"/>
  </svg>
);
/* 학생부(다니엘): 책 아이콘 */
const IconYouth = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#334" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 10h6c4 0 10 1 10 4v24c0-3-5.5-4-10-4H8V10z"/>
    <path d="M40 10h-6c-4 0-10 1-10 4v24c0-3 5.5-4 10-4h6V10z"/>
    <path d="M24 14v24"/>
    <line x1="13" y1="18" x2="19" y2="18"/>
    <line x1="13" y1="22" x2="18" y2="22"/>
    <line x1="13" y1="26" x2="17" y2="26"/>
    <line x1="29" y1="18" x2="35" y2="18"/>
    <line x1="30" y1="22" x2="35" y2="22"/>
    <line x1="31" y1="26" x2="35" y2="26"/>
  </svg>
);
/* 청년부(갈렙): 교제하는 사람들 아이콘 */
const IconYoungAdult = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#334" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {/* 왼쪽 사람 */}
    <circle cx="14" cy="14" r="4.5"/>
    <path d="M7 34c0-5 3-9 7-9s7 4 7 9"/>
    {/* 오른쪽 사람 */}
    <circle cx="34" cy="14" r="4.5"/>
    <path d="M27 34c0-5 3-9 7-9s7 4 7 9"/>
    {/* 가운데 하트(교제 상징) */}
    <path d="M24 26c-1.5-2.5-5-3-5 0s5 6 5 6 5-3 5-6-3.5-2.5-5 0z" fill="#334" stroke="none"/>
    {/* 연결 손 */}
    <path d="M18 28c2-1 4-1.5 6-1.5"/>
    <path d="M30 28c-2-1-4-1.5-6-1.5"/>
  </svg>
);

/* Arrow icon for cards */
const ArrowIcon = ({ color = "white" }: { color?: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 11L11 1M11 1H3M11 1v8"/>
  </svg>
);

/* ─── FadeUp Component ─── */
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}

/* ─── Gallery Carousel ─── */
const GALLERY_GAP = 20;
const N = GALLERY_IMAGES.length; // 6
const GALLERY_SLIDES = [...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES]; // 18

function getVisibleCount(width: number) {
  if (width < 640) return 2;
  if (width < 900) return 3;
  return 5;
}

function GalleryCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideW, setSlideW] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  const [idx, setIdx] = useState(N); // start at copy1 index=6
  const [anim, setAnim] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartX = useRef(0);
  const autoplayEnabled = useRef(true);

  /* measure slide width + responsive visible count */
  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const cw = containerRef.current.clientWidth;
    const vc = getVisibleCount(cw);
    setVisibleCount(vc);
    const gap = cw < 480 ? 10 : GALLERY_GAP;
    setSlideW((cw - gap * (vc - 1)) / vc);
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /* responsive gap */
  const gap = (containerRef.current?.clientWidth ?? 1000) < 480 ? 10 : GALLERY_GAP;

  /* translateX calculation */
  const translateX = idx * (slideW + gap) - dragOffset;

  /* responsive image height */
  const imgHeight = visibleCount <= 2 ? 200 : 260;

  /* autoplay */
  useEffect(() => {
    const timer = setInterval(() => {
      if (autoplayEnabled.current) {
        setAnim(true);
        setIdx((p) => p + 1);
      }
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  /* infinite loop jump */
  const handleTransitionEnd = useCallback(() => {
    if (idx >= N * 2) {
      setAnim(false);
      setIdx((prev) => prev - N);
    } else if (idx < N) {
      setAnim(false);
      setIdx((prev) => prev + N);
    }
  }, [idx]);

  /* after jump (anim=false), wait 2 RAF then re-enable animation */
  useEffect(() => {
    if (!anim) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnim(true);
        });
      });
    }
  }, [anim]);

  /* slide helpers */
  const slideNext = useCallback(() => { setAnim(true); setIdx((p) => p + 1); }, []);
  const slidePrev = useCallback(() => { setAnim(true); setIdx((p) => p - 1); }, []);

  /* mouse drag */
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    autoplayEnabled.current = false;
    setAnim(false);
    dragStartX.current = e.clientX;
    setDragOffset(0);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartX.current);
  };
  const finishDrag = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    autoplayEnabled.current = true;
    const threshold = slideW * 0.3;
    if (dragOffset < -threshold) {
      setAnim(true);
      setIdx((p) => p + 1);
    } else if (dragOffset > threshold) {
      setAnim(true);
      setIdx((p) => p - 1);
    } else {
      setAnim(true); // snap back
    }
    setDragOffset(0);
  }, [isDragging, dragOffset, slideW]);

  /* touch drag (mobile) */
  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    autoplayEnabled.current = false;
    setAnim(false);
    dragStartX.current = e.touches[0].clientX;
    setDragOffset(0);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setDragOffset(e.touches[0].clientX - dragStartX.current);
  };
  const onTouchEnd = finishDrag;

  const activeDot = ((idx % N) + N) % N;

  const onDotClick = (i: number) => {
    setAnim(true);
    setIdx(N + i); // copy1 position
  };

  return (
    <div style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      <FadeUp>
        <h2 style={{ fontSize: 32, fontWeight: 700, fontStyle: "italic", color: "#222", textAlign: "center", marginBottom: 32 }}>
          gallery
        </h2>
      </FadeUp>

      {/* Full-width carousel container */}
      <div
        ref={containerRef}
        style={{ overflow: "hidden", width: "100%", cursor: isDragging ? "grabbing" : "grab", userSelect: "none", touchAction: "pan-y", padding: visibleCount <= 2 ? "0 16px" : 0 }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={finishDrag}
        onMouseLeave={finishDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          style={{
            display: "flex",
            gap: gap,
            transform: `translateX(-${translateX}px)`,
            transition: anim ? "transform 0.5s ease" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {GALLERY_SLIDES.map((src, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: slideW,
                height: imgHeight,
              }}
            >
              <img src={src} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>
      </div>

      {/* controls — arrows at far left/right, dots centered */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 28, padding: "0 16px" }}>
        {/* left arrow */}
        <button onClick={slidePrev} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}>
          <svg style={{ width: visibleCount <= 2 ? 60 : 160, height: 20 }} viewBox="0 0 160 20" fill="none" preserveAspectRatio="xMinYMid meet">
            <line x1="160" y1="10" x2="4" y2="10" stroke="#bbb" strokeWidth="1.2"/>
            <polyline points="12,3 4,10 12,17" stroke="#bbb" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* dots */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {Array.from({ length: N }).map((_, i) => (
            <button
              key={i}
              onClick={() => onDotClick(i)}
              style={{
                width: i === activeDot ? 20 : 8,
                height: 8,
                borderRadius: 0,
                background: i === activeDot ? "#666" : "#ccc",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>

        {/* right arrow */}
        <button onClick={slideNext} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}>
          <svg style={{ width: visibleCount <= 2 ? 60 : 160, height: 20 }} viewBox="0 0 160 20" fill="none" preserveAspectRatio="xMaxYMid meet">
            <line x1="0" y1="10" x2="156" y2="10" stroke="#bbb" strokeWidth="1.2"/>
            <polyline points="148,3 156,10 148,17" stroke="#bbb" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ═══════════ MAIN APP ═══════════ */
export default function App() {
  const [heroIdx, setHeroIdx] = useState(0);

  const FONT = "'Noto Sans KR', sans-serif";
  const NAV = ["교회소개", "새가족안내", "다음세대(교회학교)", "갈렙청년부", "인터넷방송", "Mission 2030", "교회소식"];

  const welcomeCards = [
    { key: "vision", icon: <IconChurchVision />, label: "목회비전" },
    { key: "worship", icon: <IconBulletin />, label: "예배안내" },
    { key: "youtube", icon: <IconFacility />, label: "YOUTUBE" },
    { key: "location", icon: <IconLocation />, label: "오시는길" },
    { key: "bulletin", icon: <IconWorshipGuide />, label: "교회주보" },
  ];

  const churchSchoolCards = [
    { icon: <img src={nxtIcon1} alt="영·유치부" width={72} height={72} />, title: "영·유치부", desc: "영아와 유아가 부모와 함께 예배하며\n신앙의 첫 걸음을 시작하는 공동체입니다." },
    { icon: <img src={nxtIcon2} alt="아동부" width={72} height={72} />, title: "아동부(다윗 아동부)", desc: "말씀을 통해 하나님을 배우고,\n신앙의 기초를 다져가는 공동체입니다." },
    { icon: <img src={nxtIcon3} alt="학생부" width={72} height={72} />, title: "학생부(다니엘 학생부)", desc: "청소년 시기에 하나님을 인격적으로 만나고,\n신앙과 삶을 연결해 가도록 돕는 공동체입니다." },
    { icon: <img src={nxtIcon4} alt="청년부" width={72} height={72} />, title: "청년부(갈렙 청년부)", desc: "예수 그리스도를 삶의 중심에 두고 살아가는\n청년들이 함께 예배하고 교제하는 공동체입니다." },
  ];

  return (
    <div style={{ fontFamily: FONT, overflowX: "hidden" }}>
      {/* ━━━ HEADER ━━━ */}
      <header
        className="fixed top-0 left-0 w-full z-50"
        style={{ background: "rgba(30,40,60,0.5)", height: 76 }}
      >
        <div className="max-w-[1440px] mx-auto px-8 h-full flex items-center justify-between">
          {/* logo */}
          <div className="flex items-center gap-2">
            <LeafLogo />
            <span style={{ color: "white", fontSize: 23, fontWeight: 500 }}>이태원교회</span>
          </div>
          {/* nav */}
          <nav className="hidden md:flex items-center" style={{ gap: 28 }}>
            {NAV.map((n) => (
              <a key={n} href="#" style={{ color: "white", fontSize: 20, fontWeight: 400, textDecoration: "none" }}>
                {n}
              </a>
            ))}
          </nav>
          {/* hamburger */}
          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
            <HamburgerIcon />
          </button>
        </div>
      </header>

      {/* ━━━ HERO ━━━ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: 728 }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroSlideImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              style={{
                width: i === heroIdx ? 28 : 10,
                height: 4,
                borderRadius: 0,
                background: i === heroIdx ? "white" : "rgba(255,255,255,0.45)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </section>

      {/* ━━━ WELCOME ━━━ */}
      <section style={{ background: "#F7F8F9", padding: "60px 0 56px" }}>
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-10">
          <FadeUp>
            <div>
              <div style={{ width: 32, height: 2, background: "#aaa", marginBottom: 16 }} />
              <h2 style={{ fontSize: 32, fontWeight: 700, fontStyle: "italic", color: "#222", marginBottom: 14 }}>
                welcome
              </h2>
              <p style={{ fontSize: 17, color: "#666", lineHeight: 1.7, maxWidth: 400 }}>
                어제와 오늘, 내일 함께 그리스도의 지체로<br />
                살아가는 교회, 이태원교회에 오신 것을 환영합니다.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={150}>
            <div className="flex flex-wrap gap-3">
              {welcomeCards.map((c) => (
                <div
                  key={c.key}
                  style={{
                    border: "1px solid #ddd",
                    width: 130,
                    height: 120,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingTop: 20,
                    gap: 4,
                    cursor: "pointer",
                    background: "transparent",
                    borderRadius: 0,
                  }}
                >
                  <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {c.icon}
                  </div>
                  <span style={{ fontSize: c.key === "youtube" ? 16 : 19, color: "#444", textAlign: "center", lineHeight: 1.3 }}>{c.label}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ━━━ THREE CARDS ━━━ */}
      <section style={{ background: "white", paddingTop: 60, paddingBottom: 70 }}>
        <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 md:grid-cols-3" style={{ gap: 30 }}>
          {/* Card 1 */}
          <FadeUp delay={0}>
            <div
              className="relative overflow-hidden group/arrow"
              style={{
                height: 380,
                borderRadius: 0,
                backgroundImage: `url(${CARD1_IMG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,15,25,0.25), rgba(5,10,20,0.5))" }} />
              <div className="relative h-full flex flex-col justify-between" style={{ padding: "32px 28px 28px 32px" }}>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, letterSpacing: 1 }}>담임목사 3분 설교 Pastor's 3-Min Sermon</span>
                  <h3 style={{ color: "white", fontSize: 32, fontWeight: 700, marginTop: 12 }}>담임목사 3분 설교</h3>
                </div>
              </div>
              <div className="absolute group-hover/arrow:-translate-y-1 transition-all duration-300 hover:bg-[rgba(255,255,255,0.3)]" style={{ bottom: 28, right: 28, width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ArrowIcon color="white" />
              </div>
            </div>
          </FadeUp>

          {/* Card 2 */}
          <FadeUp delay={120}>
            <div
              className="relative overflow-hidden group/arrow"
              style={{
                height: 380,
                borderRadius: 0,
                backgroundImage: `url(${CARD2_IMG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,15,25,0.3), rgba(5,10,20,0.52))" }} />
              <div className="relative h-full flex flex-col justify-between" style={{ padding: "32px 28px 28px 32px" }}>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, letterSpacing: 1 }}>주일설교영상 Sunday Sermon</span>
                  <h3 style={{ color: "white", fontSize: 32, fontWeight: 700, marginTop: 12 }}>주일설교영상</h3>
                </div>
              </div>
              <div className="absolute group-hover/arrow:-translate-y-1 transition-all duration-300 hover:bg-[rgba(255,255,255,0.3)]" style={{ bottom: 28, right: 28, width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ArrowIcon color="white" />
              </div>
            </div>
          </FadeUp>

          {/* Card 3 */}
          <FadeUp delay={240}>
            <div
              className="relative overflow-hidden group/arrow"
              style={{
                height: 380,
                borderRadius: 0,
                backgroundImage: `url(${CARD3_IMG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(15,30,80,0.35), rgba(10,20,60,0.55))" }} />
              <div className="relative h-full flex flex-col justify-between" style={{ padding: "32px 28px 28px 32px" }}>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, letterSpacing: 1 }}>금요찬양 Friday Worship</span>
                  <h3 style={{ color: "white", fontSize: 32, fontWeight: 700, marginTop: 12 }}>금요찬양</h3>
                </div>
              </div>
              <div className="absolute group-hover/arrow:-translate-y-1 transition-all duration-300 hover:bg-[rgba(255,255,255,0.3)]" style={{ bottom: 28, right: 28, width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ArrowIcon color="white" />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ━━━ CHURCH SCHOOL ━━━ */}
      <section
        className="relative"
        style={{
          padding: "70px 0",
        }}
      >
        {/* blurred background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-4" style={{
            backgroundImage: `url(${lightBeamBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px)",
          }} />
        </div>
        {/* grain texture overlay */}
        <div className="absolute inset-0" style={{
          opacity: 0.22,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="churchSchoolGrain">
              <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#churchSchoolGrain)" />
          </svg>
        </div>
        {/* dark overlay for text readability */}
        <div className="absolute inset-0" style={{ background: "rgba(10,15,30,0.25)", pointerEvents: "none" }} />
        <div className="relative max-w-[1440px] mx-auto px-8 text-center">
          <FadeUp>
            <h2 style={{ color: "white", fontSize: 32, fontWeight: 700, marginBottom: 12 }}>
              다음세대를 위한 이태원교회 교회학교
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, marginBottom: 40 }}>
              다음세대가 신앙 안에서 건강하게 자라가도록 돕는 공동체입니다.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto" style={{ maxWidth: 1200 }}>
            {churchSchoolCards.map((c, i) => (
              <FadeUp key={c.title} delay={i * 120}>
                <div
                  className="group transition-all duration-300 hover:!bg-[rgba(26,33,81,0.8)]"
                  style={{
                    background: "white",
                    padding: "40px 26px 34px",
                    borderRadius: 0,
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    cursor: "pointer",
                  }}
                >
                  <div className="transition-all duration-300 group-hover:brightness-0 group-hover:invert" style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>{c.icon}</div>
                  <h4 className="transition-colors duration-300 group-hover:!text-white" style={{ fontSize: 24, fontWeight: 700, color: "#222", marginBottom: 8 }}>{c.title}</h4>
                  <p className="transition-colors duration-300 group-hover:!text-white" style={{ fontSize: 16, color: "#777", whiteSpace: "pre-line", lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ GALLERY ━━━ */}
      <section style={{ padding: "60px 0 70px", background: "white" }}>
        <GalleryCarousel />
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer style={{ background: "#1a2038", padding: "40px 0 36px" }}>
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p style={{ color: "rgba(255,255,255,0.95)", fontSize: 17, marginBottom: 4 }}>대한예수교장로회 디모데교회</p>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 16, marginBottom: 12 }}>김성명 담임목사</p>
            <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.25)", marginBottom: 12 }} />
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, lineHeight: 1.7 }}>
              03173 서울 종로구 새문안로5길 19 로얄빌딩 602호<br />
              Tel : 02-393-7133 &nbsp;&nbsp;Fax : 02-6007-1697
            </p>
          </div>
          <div className="flex items-start md:items-end md:text-right">
            <div>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16 }}>
                Copyright &copy; 2021 디모데교회
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }}>
                All rights reserved. Designed by ㈜ 스데반정보.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}