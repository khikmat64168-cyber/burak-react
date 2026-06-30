import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

// styled-components bilan footer uchun maxsus div yaratildi
// CSS ni to'g'ridan-to'g'ri komponent ichida yozish imkonini beradi
const Footers = styled.div`
  width: 100%;
  height: 590px;
  display: flex;
  background: #343434;
  background-size: cover;
`;

export default function Footer() {
  // authMember — kirgan foydalanuvchi. Hozircha null
  const authMember = null;

  return (
    <Footers>
      <Container>

        {/* Yuqori qism: Logo + tavsif + ijtimoiy tarmoqlar | Bo'limlar | Manzil */}
        <Stack direction="row" sx={{ mt: "94px" }}>

          {/* Chap ustun: Logo, tavsif matni, ijtimoiy tarmoq ikonkalari */}
          <Stack direction="column" style={{ width: "340px" }}>
            <Box>
              <img width={"100px"} src={"/icons/burak.svg"} alt="Burak logo" />
            </Box>
            <Box className={"foot-desc-txt"}>
              Focusing on the gourmet Turkish breakfast as well as the youth
              society, CZN Burak Gurme aims to bring Turkish cuisine back.
            </Box>
            {/* Ijtimoiy tarmoq ikonkalari */}
            <Box className="sns-context">
              <img src={"/icons/facebook.svg"} alt="facebook" />
              <img src={"/icons/twitter.svg"} alt="twitter" />
              <img src={"/icons/instagram.svg"} alt="instagram" />
              <img src={"/icons/youtube.svg"} alt="youtube" />
            </Box>
          </Stack>

          {/* O'ng ustun: Navigatsiya linklari va manzil ma'lumotlari */}
          <Stack sx={{ ml: "288px" }} direction="row">

            {/* Bo'limlar — sahifa linklari */}
            <Stack>
              <Box>
                <Box className={"foot-category-title"}>Bo'limlar</Box>
                <Box className={"foot-category-link"}>
                  <Link to="/">Home</Link>
                  <Link to="/products">Products</Link>
                  {/* authMember bo'lsagina Orders linki ko'rinadi */}
                  {authMember && <Link to="/orders">Orders</Link>}
                  <Link to="/help">Help</Link>
                </Box>
              </Box>
            </Stack>

            {/* Manzil, telefon, email, ish vaqti */}
            <Stack sx={{ ml: "100px" }}>
              <Box>
                <Box className={"foot-category-title"}>Find us</Box>
                <Box
                  className={"foot-category-link"}
                  sx={{ mt: "20px", display: "flex", flexDirection: "column" }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }} className={"find-us"}>
                    <span>L.</span><div>Downtown, Dubai</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>P.</span><div>+971 4 554 7777</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>E.</span><div>devexuz@gmail.com</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>H.</span><div>Visit 24 hours</div>
                  </Box>
                </Box>
              </Box>
            </Stack>

          </Stack>
        </Stack>

        {/* Ajratuvchi chiziq */}
        <Stack
          style={{ border: "1px solid #C5C8C9", width: "100%", opacity: "0.2" }}
          sx={{ mt: "80px" }}
        />

        {/* Copyright matni */}
        <Stack className={"copyright-txt"}>
          © Copyright Devex Global, All rights reserved.
        </Stack>

      </Container>
    </Footers>
  );
}
