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
    const { data: minDate, error } = await supabase.rpc("min_date_from_sales");

    if (!error) {
      const { data: maxDate, error } = await supabase.rpc("max_date_from_sales");
      if (!error) {
        const diff = dayjs(maxDate).diff(minDate, "month");

        setResult(salesCount / diff);
      }
    }
  }, [salesCount]);

  useEffect(() => {
    getResult();
  }, [getResult]);

  return (
    <Grid item xs={6} md={3} lg={3}>
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
