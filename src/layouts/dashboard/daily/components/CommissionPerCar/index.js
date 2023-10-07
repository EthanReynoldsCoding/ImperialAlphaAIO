import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox";
import VuiProgress from "components/VuiProgress";
import VuiTypography from "components/VuiTypography";
import { useCallback, useEffect, useState } from "react";
import { IoIosRocket } from "react-icons/io";
import { supabase } from "supabaseClient";

function CommissionPerCar() {
  const [result, setResult] = useState(0);

  const getResult = useCallback(async () => {
    const { data, error } = await supabase.rpc("commission_per_car");

    if (!error) {
      setResult(data);
    } else {
      console.log(error);
    }
  }, []);

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
          <IoIosRocket color="#fff" size="12px" />
        </VuiBox>
        <VuiTypography color="text" variant="button" fontWeight="medium">
          Commission Per Car
        </VuiTypography>
      </Stack>
      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
        {result}
      </VuiTypography>
      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
    </Grid>
  );
}

export default CommissionPerCar;
