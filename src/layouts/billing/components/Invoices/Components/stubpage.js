//C:\Users\Ethan Reynolds\Documents\Businesses\Imperial Alpha\Software\ImperialAlphaAIO\frontendv0.2.1\src\layouts\billing\components\Invoices\Components\stubpage.js

import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import { useAuth } from "hooks/Auth";
import { supabase } from "supabaseClient";
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";
import PropTypes from "prop-types";
import StubPageView from "./stubpageview";

function StubPage({ selectedPaystub }) {
  // Initialize state unconditionally
  const [paystubs, setPaystubs] = useState([]);
  const { user } = useAuth();
  const borderBottom = `${borders.borderWidth[1]} solid ${colors.borderCol.main}`;


  console.log(user);


  useEffect(() => {
    // This code will run whenever selectedPaystub changes
    // You can trigger any side effects or updates here
  }, [selectedPaystub]);

  // Check if selectedPaystub is available before rendering
  if (!selectedPaystub || !selectedPaystub.date) {
  return StubPageView;
}

  
 

  return (
    
      <VuiBox mt={{ xs: 4, md: 10 }} mb={{ xs: 4, md: 8 }}>
        <Grid container justifyContent="center">
          <Grid item sm={12} md={8}>
            <Card>
              {/* Invoice header */}
              <VuiBox p={3}>
                <Grid container justifyContent="space-between">
                  <Grid item sm={12} md={5}>
                    <VuiBox mb="30px">
                      <VuiTypography
                        variant="lg"
                        textGradient={true}
                        color="logo"
                        letterSpacing={2}
                        fontWeight="medium"
                        sx={{
                          margin: "0 auto",
                        }}
                      >
                        | PAYSTUB |

                      </VuiTypography>
                    </VuiBox>

                    <VuiTypography
                      variant="button"
                      color="white"
                      lineHeight={0}
                      fontWeight="medium"
                    >
                      Pinkerton Chevrolet  
                      <br />801 Graves Mill Rd,
                      <br /> Lynchburg VA, 24502
                    </VuiTypography>
                    <VuiBox mt={1} mb={2}>
                      <VuiTypography display="block" variant="caption" color="white">
                        Phone: (434) 237-9400
                      </VuiTypography>
                    </VuiBox>
                  </Grid>
                  <Grid item sm={12} md={7} lg={3}>
                    <VuiBox width="100%" textAlign={{ xs: "left", md: "right" }} mt={6}>
                      <VuiBox mt={1}>
                        <VuiTypography variant="button" color="white" fontWeight="medium">
                          Deposited to: {user?.user_metadata.full_name}
                        </VuiTypography>
                      </VuiBox>
                      <VuiBox mb={1}>
                        <VuiTypography variant="caption" color="white">
                          4006 Locust Drive
                          <br />
                          Lynchburg, VA
                          <br />
                          24502
                        </VuiTypography>
                      </VuiBox>
                    </VuiBox>
                  </Grid>
                </Grid>
                <VuiBox mt={{ xs: 5, md: 10 }}>
                  <Grid container justifyContent="space-between">
                    <Grid item sm={12} md={4}>
                      <VuiTypography variant="caption" color="white" fontWeight="regular">
                        Invoice no
                      </VuiTypography>
                      <VuiTypography fontSize={14} color="white" fontWeight="medium">
                      # {selectedPaystub.id}
                      </VuiTypography>
                    </Grid>
                    <Grid item sm={12} md={7} lg={5}>
                      <VuiBox
                        width="100%"
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign={{ xs: "left", md: "right" }}
                        mt={{ xs: 3, md: 0 }}
                      >
                        <VuiBox width="50%">
                          <VuiTypography variant="caption" color="white" fontWeight="regular">
                            Period Beginning:
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox width="50%">
                          <VuiTypography variant="button" color="white" fontWeight="medium">
                            {selectedPaystub.period_beginning_date}
                          </VuiTypography>
                        </VuiBox>
                      </VuiBox>
                      <VuiBox
                        width="100%"
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign={{ xs: "left", md: "right" }}
                      >
                        <VuiBox width="50%">
                          <VuiTypography variant="caption" color="white" fontWeight="medium">
                            Period End:
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox width="50%">
                          <VuiTypography variant="button" fontWeight="medium" color="white">
                            {selectedPaystub.period_ending_date}
                          </VuiTypography>
                        </VuiBox>
                      </VuiBox>
                    </Grid>
                  </Grid>
                </VuiBox>
              </VuiBox>

              {/* Invoice table */}
              <VuiBox p={3}>
                <VuiBox width="100%" overflow="auto">
                  <Table sx={{ minWidth: "32rem" }}>
                    <VuiBox component="thead">
                      <TableRow>
                        <VuiBox
                          component="th"
                          width={{ xs: "45%", md: "50%" }}
                          py={1.5}
                          px={1}
                          textAlign="left"
                          borderBottom={borderBottom}
                        >
                          <VuiTypography variant="xxs" color="text" fontWeight="medium">
                            ITEM
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox
                          component="th"
                          py={1.5}
                          pl={3}
                          pr={1}
                          textAlign="left"
                          borderBottom={borderBottom}
                        >
                          <VuiTypography variant="xxs" color="text" fontWeight="medium">
                            QUANTITY
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox
                          component="th"
                          py={1.5}
                          pl={3}
                          pr={1}
                          textAlign="left"
                          borderBottom={borderBottom}
                        >
                          <VuiTypography variant="xxs" color="text" fontWeight="medium">
                            AMOUNT
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox
                          component="th"
                          py={1.5}
                          pl={3}
                          pr={1}
                          textAlign="left"
                          borderBottom={borderBottom}
                        >
                          
                        </VuiBox>
                      </TableRow>
                    </VuiBox>
                    <TableBody>
                      <TableRow>
                        <VuiBox
                          component="td"
                          textAlign="left"
                          p={1}
                          py={2}
                          borderBottom={borderBottom}
                        >
                          <VuiTypography variant="body2" color="white">
                            New Car Sales
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <VuiTypography variant="body2" color="white">
                            5
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <VuiTypography variant="body2" color="white">
                          {selectedPaystub.new_car_sales}
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          
                        </VuiBox>
                      </TableRow>
                      <TableRow>
                        <VuiBox
                          component="td"
                          textAlign="left"
                          p={1}
                          py={2}
                          borderBottom={borderBottom}
                        >
                          <VuiTypography variant="body2" color="white">
                            Used Car Sales
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <VuiTypography variant="body2" color="white">
                            3
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <VuiTypography variant="body2" color="white">
                          {selectedPaystub.used_car_sales}
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        
                        >
                        
                          
                        </VuiBox>
                        <VuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          
                        </VuiBox>
                      </TableRow>
                      <TableRow>
                        <VuiBox
                          component="td"
                          textAlign="left"
                          p={1}
                          py={2}
                          borderBottom={borderBottom}
                        >
                          <VuiTypography variant="body2" color="white">
                            Spiffs
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <VuiTypography variant="body2" color="white">
                            3
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <VuiTypography variant="body2" color="white">
                          {selectedPaystub.spiffs}
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                          >
                          
                          </VuiBox>
                        </TableRow>
                        <TableRow>
                          <VuiBox
                            component="td"
                            textAlign="left"
                            p={1}
                            py={2}
                            borderBottom={borderBottom}
                          >
                            <VuiTypography variant="body2" color="white">
                              Other
                            </VuiTypography>
                          </VuiBox>
                          <VuiBox
                            component="td"
                            textAlign="left"
                            py={1}
                            pr={1}
                            pl={3}
                            borderBottom={borderBottom}
                          >
                            <VuiTypography variant="body2" color="white">
                              3
                            </VuiTypography>
                          </VuiBox>
                          <VuiBox
                            component="td"
                            textAlign="left"
                            py={1}
                            pr={1}
                            pl={3}
                            borderBottom={borderBottom}
                          >
                            <VuiTypography variant="body2" color="white">
                            {selectedPaystub.other}
                            </VuiTypography>
                          </VuiBox>
                          <VuiBox
                            component="td"
                            textAlign="left"
                            py={1}
                            pr={1}
                            pl={3}
                            borderBottom={borderBottom}
                          >
                          
                        
                        
                          
                        </VuiBox>
                      </TableRow>
                      <TableRow>
                        <VuiBox component="td" textAlign="left" p={1}>
                          <VuiTypography variant="body2" color="white">
                            Taxes
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox component="td" textAlign="left" py={2} pr={1} pl={3}>
                          <VuiTypography variant="body2" color="white">
                            1
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox component="td" textAlign="left" py={2} pr={1} pl={3}>
                          <VuiTypography variant="body2" color="white">
                          {selectedPaystub.taxes}
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox component="td" textAlign="left" py={2} pr={1} pl={3}>
                          
                        </VuiBox>
                      </TableRow>
                      
                      <TableRow>
                        <VuiBox component="td" textAlign="left" p={1} borderBottom={borderBottom} />
                        <VuiBox
                          component="td"
                          textAlign="left"
                          py={2}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        />
                        
                        
                        <VuiBox
                          component="td"
                          textAlign="left"
                          py={2}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <VuiTypography variant="lg" color="white" fontWeight="medium">
                            Take Home
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox
                          component="td"
                          textAlign="left"
                          py={2}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <VuiTypography variant="lg" color="white" fontWeight="medium">
                          {selectedPaystub.take_home}
                          </VuiTypography>
                        </VuiBox>
                      </TableRow>
                    </TableBody>
                  </Table>
                </VuiBox>
              </VuiBox>

              {/* Invoice footer */}
              <VuiBox p={3} mt={7}>
                <Grid container>
                  <Grid item sm={12} lg={5}>
                    <VuiTypography variant="lg" color="white" fontWeight="medium">
                      Thank you! {selectedPaystub.date}
                    </VuiTypography>
                    <VuiBox mt={1} mb={2} lineHeight={0}>
                      <VuiTypography variant="caption" fontWeight="regular" color="white">
                        If you encounter any issues related to the invoice you can contact us at:
                      </VuiTypography>
                    </VuiBox>
                    <VuiTypography
                      component="span"
                      variant="button"
                      fontWeight="regular"
                      color="white"
                    >
                      email:{" "}
                      <VuiTypography
                        component="span"
                        variant="button"
                        color="white"
                        fontWeight="medium"
                      >
                        cgray@pinkertonchevy.com
                      </VuiTypography>
                    </VuiTypography>
                  </Grid>
                  <Grid item sm={12} lg={7}>
                    <VuiBox
                      width="100%"
                      height={{ xs: "auto", md: "100%" }}
                      display="flex"
                      justifyContent={{ xs: "flex-start", md: "flex-end" }}
                      alignItems="flex-end"
                      mt={{ xs: 2, md: 0 }}
                    >
                      <VuiButton
                        variant="contained"
                        color="info"
                        sx={{ minWidth: "100px" }}
                        onClick={() => window.print()}
 // minify the sidebar before the print and set the navbar to be unfixed
                      >
                        print
                      </VuiButton>
                    </VuiBox>
                  </Grid>
                </Grid>
              </VuiBox>
            </Card>
          </Grid>
        </Grid>
      </VuiBox>
      
  );
}

StubPage.propTypes = {
  selectedPaystub: PropTypes.object,
};

export default StubPage;