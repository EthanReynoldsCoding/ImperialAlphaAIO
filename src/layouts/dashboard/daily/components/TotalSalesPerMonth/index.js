import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox";
import VuiProgress from "components/VuiProgress";
import VuiTypography from "components/VuiTypography";
import { useCallback, useEffect, useState } from "react";
import { IoBuild } from "react-icons/io5";
import { supabase } from "supabaseClient";

function TotalSalesPerMonth() {
  const [result, setResult] = useState(0);

  const getResult = useCallback(async () => {
    const { data, error } = await supabase.rpc("total_sales_per_month");

    if (!error) {
      setResult(data);
    }
  }, []);

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
          <IoBuild color="#fff" size="12px" />
        </VuiBox>
        <VuiTypography color="text" variant="button" fontWeight="medium">
          Total Sales Per Month
        </VuiTypography>
      </Stack>
      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
        {result}
      </VuiTypography>
      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
    </Grid>
  );
}

export default TotalSalesPerMonth;
