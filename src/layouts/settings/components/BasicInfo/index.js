import React, { useState } from "react";
import { supabase } from "supabaseClient";
import { useAuth } from "hooks/Auth";

// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Vision UI Dashboard PRO React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiSelect from "components/VuiSelect";
import VuiButton from "components/VuiButton";

// Settings page components
import FormField from "layouts/settings/components/FormField";

// Data
import selectData from "layouts/settings/components/BasicInfo/data/selectData";

function BasicInfo() {
  const auth = useAuth();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birth_month: "",
    birth_day: "",
    birth_year: "",
    street_name: "",
    state: "",
    zip_code: "",
    email: "",
    phone_number: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Ensure the user is authenticated (you can modify this condition as needed)
    if (!auth.user) {
      console.error("User is not authenticated. Please log in.");
      return;
    }

    // Insert the form data into the "profile_information" table
    try {
      const { data, error } = await supabase
        .from("profile_information")
        .insert([formData], { onConflict: ["user_id"] });

      if (error) {
        console.error("Error inserting data:", error);
      } else {
        console.log("Data inserted successfully:", data);

        // Optionally, you can clear the form fields after successful submission
        setFormData({
          first_name: "",
          last_name: "",
          gender: "",
          birth_month: "",
          birth_day: "",
          birth_year: "",
          street_name: "",
          state: "",
          zip_code: "",
          email: "",
          phone_number: "",
        });
      }
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  const handleInputChange = (e, name) => {
    const { value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <VuiBox mb="40px">
        <VuiTypography variant="lg" color="white" fontWeight="bold">
          Basic Info
        </VuiTypography>
      </VuiBox>
      <VuiBox component="form">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              name="first_name"
              label="First Name"
              placeholder="Michael"
              value={formData.first_name}
              onChange={(e) => handleInputChange(e, "first_name")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              name="last_name"
              label="Last Name"
              placeholder="Jackson"
              value={formData.last_name}
              onChange={(e) => handleInputChange(e, "last_name")}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <VuiBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <VuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <VuiTypography
                      component="label"
                      variant="caption"
                      color="white"
                      fontWeight="bold"
                      textTransform="capitalize"
                    >
                      Gender
                    </VuiTypography>
                  </VuiBox>
                  <VuiSelect
  placeholder="Male"
  options={selectData.gender}
  name="gender"
  value={formData.gender}
  onChange={(e) => handleInputChange(e, "gender")}
/>

                </VuiBox>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={5}>
                    <VuiBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <VuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                        <VuiTypography
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                          color="white"
                          textTransform="capitalize"
                        >
                          Birth Date
                        </VuiTypography>
                      </VuiBox>
                      <VuiSelect
                        placeholder="February"
                        options={selectData.birthDate}
                        name="birth_month"
                        value={formData.birth_month}
                        onChange={(e) => handleInputChange(e, "birth_month")}
                      />
                    </VuiBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <VuiBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <VuiSelect
                        placeholder={1}
                        options={selectData.days}
                        name="birth_day"
                        value={formData.birth_day}
                        onChange={(e) => handleInputChange(e, "birth_day")}
                      />
                    </VuiBox>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <VuiBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <VuiSelect
                        placeholder={2021}
                        options={selectData.years}
                        name="birth_year"
                        value={formData.birth_year}
                        onChange={(e) => handleInputChange(e, "birth_year")}
                      />
                    </VuiBox>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              name="email"
              label="Email"
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
              value={formData.email}
              onChange={(e) => handleInputChange(e, "email")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              name="phone_number"
              label="Phone Number"
              placeholder="(735) 631-620"
              inputProps={{ type: "number" }}
              value={formData.phone_number}
              onChange={(e) => handleInputChange(e, "phone_number")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              name="street_name"
              label="Street Address"
              placeholder="103 Main St"
              value={formData.street_name}
              onChange={(e) => handleInputChange(e, "street_name")}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <VuiBox
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              height="100%"
            >
              <VuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <VuiTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                  color="white"
                  textTransform="capitalize"
                >
                  State
                </VuiTypography>
              </VuiBox>
              <VuiSelect
                placeholder="Alabama"
                options={selectData.state}
                name="state"
                value={formData.state}
                onChange={(e) => handleInputChange(e, "state")}
              />
            </VuiBox>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormField
              name="zip_code"
              label="Zip Code"
              placeholder="53532"
              inputProps={{ type: "number" }}
              value={formData.zip_code}
              onChange={(e) => handleInputChange(e, "zip_code")}
            />
          </Grid>
          <Grid item xs={12}>
            <VuiButton type="submit" variant="contained" color="primary" onClick={handleFormSubmit}>
              Submit
            </VuiButton>
          </Grid>
        </Grid>
      </VuiBox>
    </Card>
  );
}

export default BasicInfo;
