import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox";
import VuiProgress from "components/VuiProgress";
import VuiTypography from "components/VuiTypography";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { IoWallet } from "react-icons/io5";
import { supabase } from "supabaseClient";

function SoldPerMonth({ salesCount }) {
  const [result, setResult] = useState(0);

  const getResult = useCallback(async () => {
    const { data, error } = await supabase.rpc("sold_per_month");
    const res = String(data).slice(0, 4);
    console.log("SD", res);
    if (!error) {
      setResult(res);
    }
  }, [salesCount]);

  useEffect(() => {
    getResult();
  }, [getResult]);

  return (
    <Grid
      item
      xs={6}
      md={3}
      lg={3}
      style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
    >
      <Stack direction="row" spacing={{ sm: "10px", xl: "4px", xxl: "10px" }} mb="6px">
        <VuiBox
          bgColor="info"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            borderRadius: "6px",
            width: "25px",
            height: "25px",
          }}
        >
          <IoWallet color="#fff" size="12px" />
        </VuiBox>
        <VuiTypography color="text" variant="button" fontWeight="medium">
          Sold Per Month
        </VuiTypography>
      </Stack>
      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
        {result}
      </VuiTypography>
      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
    </Grid>
  );
}

export default SoldPerMonth;
