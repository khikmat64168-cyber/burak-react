/**
 * ─── KOD TAHLILI ──────────────────────────────────────────────────
 * Import qismi:
 * styled — MUI'ning Emotion asosidagi stil yaratish funksiyasi.
 *   styled(KomponentNomi)(stilFunksiyasi) shaklidagi chaqiruv yangi,
 *   stillab chiqilgan komponent qaytaradi.
 * Badge — MUI'ning tayyor Badge komponenti; bolasining ustiga
 *   raqamli yoki nuqtali nishon (badge) qo'yadi.
 * ──────────────────────────────────────────────────────────────────
 */
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

/**
 * ─── KOD TAHLILI ──────────────────────────────────────────────────
 * RippleBadge — MUI Badge asosida yaratilgan maxsus styled komponent.
 * styled(Badge)(({ theme }) => ({...})) sintaksisi:
 *   - Birinchi chaqiruv qaysi komponentni stillashtirish kerakligini
 *     belgilaydi (Badge).
 *   - Ikkinchi chaqiruv CSS ob'ekti qaytaruvchi funksiya oladi;
 *     { theme } orqali joriy MUI temasi qiymatlariga kirish mumkin.
 *
 * "& .MuiBadge-badge" — Badge ichidagi nishon elementini tanlash
 *   uchun MUI CSS class selektori.
 *   color: "#44b700"  — yashil rang; currentColor sifatida border va
 *     animatsiyada qayta ishlatiladi.
 *   background: "white" — nishon foni oq; yashil rang faqat border
 *     va matnda ko'rinadi.
 *
 * "&::after" — pseudo-element; nishon ustida to'lqin (ripple) yaratadi.
 *   position: "absolute" — ota elementga (nishonga) nisbatan joylashadi.
 *   top/left: "-2px"    — border qalinligini hisobga olib, to'g'ri
 *     markazlash uchun salbiy offset.
 *   width/height: "120%" — nishondan biroz katta bo'lib, border
 *     aylanasi to'g'ri ko'rinsin.
 *   borderRadius: "50%" — to'liq doira shakli.
 *   border: "2px solid currentColor" — nishon rangidagi (yashil)
 *     doira chegarasi.
 *   animation: "ripple 1.2s infinite ease-in-out" — quyidagi
 *     @keyframes animatsiyasini 1.2 soniyada, cheksiz takrorlab,
 *     yumshoq boshlash-to'xtatish bilan ijro etadi.
 *   content: '""' — pseudo-elementni render qilish uchun majburiy.
 *
 * "@keyframes ripple" — to'lqin animatsiyasining kalit holatlari:
 *   0%:   scale(.8) + opacity 1 — kichik va to'liq ko'rinadi.
 *   100%: scale(2.4) + opacity 0 — 3 barobar kattalashib yo'qoladi.
 *   Bu ko'z "tirqirab" tarqalayotgan soya effektini beradi.
 * ──────────────────────────────────────────────────────────────────
 */
export const RippleBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    color: "#44b700",
    background: "white",
    "&::after": {
      position: "absolute",
      top: "-2px",
      left: "-2px",
      width: "120%",
      height: "120%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "2px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
