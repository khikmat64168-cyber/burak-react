import React from "react";
// Material UI — layout uchun
import { Box, Container, Stack } from "@mui/material";
// Joy UI — karta komponentlari
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";       // Rasm joylashadi
import CardContent from "@mui/joy/CardContent";   // Karta ichidagi matn
import Typography from "@mui/joy/Typography";     // Joy UI matni (level, textColor proplari bor)
import { CssVarsProvider } from "@mui/joy/styles"; // Joy UI ishlashi uchun shart
import CardOverflow from "@mui/joy/CardOverflow"; // Karta pastidan chiqadigan qism
// Ikonkalar
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

// Statik ma'lumotlar — hozir qo'lda, keyincha API dan keladi
const list = [
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];

export default function PopularDishes() {
  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">

          {/* Section sarlavhasi */}
          <Box className="category-title">Popular Dishes</Box>

          <Stack className="cards-frame">
            {/* list bo'sh emas → kartalar | bo'sh → "no-data" xabari */}
            {list.length !== 0 ? (
              list.map((ele, index) => {
                return (
                  // CssVarsProvider — har bir Joy UI karta uchun tema beradi
                  <CssVarsProvider key={index}>
                    <Card className={"card"}>

                      {/* CardCover — rasm kartani to'liq qoplaydi */}
                      <CardCover>
                        <img src={ele.imagePath} alt="" />
                      </CardCover>

                      {/* Ikkinchi CardCover — CSS dagi gradient overlay */}
                      <CardCover className={"card-cover"} />

                      {/* CardContent — taom nomi va ko'rishlar soni */}
                      <CardContent sx={{ justifyContent: "flex-end" }}>
                        <Stack
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                          sx={{ width: "260px" }}
                        >
                          {/* Taom nomi — uzun bo'lsa "..." bilan kesadi (noWrap) */}
                          <Typography
                            level="h2"
                            fontSize="lg"
                            textColor="#fff"
                            mb={1}
                            sx={{
                              display: "block",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                            noWrap
                          >
                            {ele.productName}
                          </Typography>

                          {/* Ko'rishlar soni + ko'z ikonkasi */}
                          <Typography
                            sx={{
                              fontWeight: "md",
                              color: "neutral.300",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            20
                            <VisibilityIcon sx={{ fontSize: 25, marginLeft: "5px" }} />
                          </Typography>
                        </Stack>
                      </CardContent>

                      {/* CardOverflow — karta pastidagi tavsif qatori */}
                      <CardOverflow
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          py: 1.5,
                          px: "var(--Card-padding)",
                          borderTop: "1px solid",
                          height: "60px",
                          width: "290px",
                        }}
                      >
                        {/* startDecorator — matndan oldin ikonka qo'yadi */}
                        <Typography
                          startDecorator={<DescriptionOutlinedIcon />}
                          textColor="neutral.300"
                          sx={{
                            display: "block",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          noWrap
                        >
                          This is delicious meal
                        </Typography>
                      </CardOverflow>

                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              // list bo'sh bo'lganda ko'rinadigan xabar
              <Box className="no-data">Popular products are not available!</Box>
            )}
          </Stack>

        </Stack>
      </Container>
    </div>
  );
}
