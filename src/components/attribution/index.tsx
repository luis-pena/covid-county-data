import { Box, Link, Typography } from "@mui/material";

const Attribution = () => (
  <Box
    sx={{
      mt: 4,
      alignItems: "center",
      display: "flex",
    }}
  >
    <Typography padding={0} pr={0.5} margin={0} variant="subtitle2">
      data source:
    </Typography>
    <Link
      href="https://covidactnow.org/data-api"
      target="_blank"
      rel="noopener"
      style={{
        alignItems: "center",
        display: "flex",
      }}
    >
      <img src="https://images.prismic.io/luis-pena/28b1e66f-599d-4f9a-bf7c-29a3a1b92d60_Black_Green_URL.png" />
    </Link>
    <style jsx>{`
      img {
        margin: 0;
        padding: 0;
        max-height: 1rem;
      }
    `}</style>
  </Box>
);

export default Attribution;
