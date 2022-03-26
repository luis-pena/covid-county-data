import { Box, Link, Typography } from "@mui/material";

const Attribution = () => (
  <Box sx={{ pt: 4 }}>
    <Typography variant="caption">
      source:{" "}
      <Link
        href="https://github.com/nytimes/covid-19-data"
        target="_blank"
        rel="noopener"
      >
        https://github.com/nytimes/covid-19-data
      </Link>
    </Typography>
  </Box>
);

export default Attribution;
