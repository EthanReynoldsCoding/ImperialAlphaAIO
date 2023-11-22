//C:\Users\Ethan Reynolds\Documents\Businesses\Imperial Alpha\Software\ImperialAlphaAIO\frontendv0.2.1\src\layouts\billing\components\Invoices\Components\Event\PaystubForm\paystubform.js

import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import Alert from "@mui/material/Alert";
import Icon from "@mui/material/Icon";
import VuiButton from "components/VuiButton";
import DeletionForm from "components/DeletionForm";
import FormField from "layouts/calendar/components/Event/FormField"; // Import FormField

import { supabase } from "supabaseClient.js";
import { useAuth } from "hooks/Auth";

function PaystubForm(props) {
  const { handleClose, edit, data, setDataUpdated } = props;
  const [formDisabled, setFormDisabled] = useState(edit ? true : false);

  const { user } = useAuth();
  const userId = user.id;

  const paystubId = data?.id;

  const initialValues = {
    gross_pay: "",
    take_home: "",
    taxes: "",
    other: "",
    new_car_sales: "", // New Car Sales field
    used_car_sales: "", // Used Car Sales field
    spiffs: "", // Spiffs field
    date: "", // Pay Date field
    period_beginning_date: "", // Period Beginning Date field
    period_ending_date: "", // Period Ending Date field
  };

  const [formValues, setFormValues] = useState(edit ? data : initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [deletionFormOpen, setDeletionFormOpen] = useState(false);

  const handleChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    } else if (typeof e === "string" && e.includes("<p>")) {
      setFormValues({ ...formValues, description: e });
    } else if (e.name) {
      setFormValues({ ...formValues, [e.name]: e.value });
    } else {
      setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
    setFormDisabled(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.gross_pay) {
      errors.gross_pay = "Gross Pay is required";
    }
    if (!values.take_home) {
      errors.take_home = "Take Home is required";
    }
    if (!values.taxes) {
      errors.taxes = "Taxes are required";
    }
    if (!values.other) {
      errors.other = "Other is required";
    }
    if (!values.new_car_sales) {
      errors.new_car_sales = "New Car Sales is required";
    }
    if (!values.used_car_sales) {
      errors.used_car_sales = "Used Car Sales is required";
    }
    if (!values.spiffs) {
      errors.spiffs = "Spiffs is required";
    }
    if (!values.date) {
      errors.date = "Pay Date is required";
    }
    if (!values.period_beginning_date) {
      errors.period_beginning_date = "Period Beginning Date is required";
    }
    if (!values.period_ending_date) {
      errors.period_ending_date = "Period Ending Date is required";
    }

    return errors;
  };

  const addPaystub = useCallback(async () => {
    const { error } = await supabase.from("paystubs").insert({ ...formValues, user_id: userId });
    if (error) {
      console.log(error);
    } else {
      handleClose();
      setDataUpdated(true);
    }
  }, [formValues, handleClose, setDataUpdated, userId]);

  const editPaystub = useCallback(async () => {
    delete formValues.id;
    if (paystubId) {
      const { error } = await supabase
        .from("paystubs")
        .update({ ...formValues })
        .eq("id", paystubId);

      if (error) {
        console.error(error);
      } else {
        handleClose();
        setDataUpdated(true);
      }
    }
  }, [paystubId, formValues, handleClose, setDataUpdated]);

  const deletePaystub = useCallback(async () => {
    const { error } = await supabase.from("paystubs").delete().eq("id", paystubId);
    if (error) {
      console.error(error);
    } else {
      handleClose();
      setDataUpdated(true);
    }
  }, [paystubId, handleClose, setDataUpdated]);

  const openDeletionForm = () => {
    setDeletionFormOpen(true);
  };

  const closeDeletionForm = () => {
    setDeletionFormOpen(false);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if (edit) {
        editPaystub(formValues);
      } else {
        addPaystub(formValues);
      }
    }
  }, [addPaystub, edit, editPaystub, formErrors, formValues, isSubmit]);

  return (
    <VuiBox>
      <VuiTypography variant="h5" color="white">
        {edit ? <>Edit </> : <>Add </>} Paystub
      </VuiTypography>
      <form onSubmit={handleSubmit}>
        <VuiBox mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField
                type="number"
                label="Gross Pay"
                name="gross_pay"
                value={formValues.gross_pay}
                onChange={handleChange}
                error={formErrors.gross_pay && true}
                placeholder="Enter Gross Pay"
              />
              {formErrors.gross_pay && (
                <Alert severity="error" className="error_alert">
                  {formErrors.gross_pay}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                type="number"
                label="Take Home"
                name="take_home"
                value={formValues.take_home}
                onChange={handleChange}
                error={formErrors.take_home && true}
                placeholder="Enter Take Home"
              />
              {formErrors.take_home && (
                <Alert severity="error" className="error_alert">
                  {formErrors.take_home}
                </Alert>
              )}
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField
                type="number"
                label="Taxes"
                name="taxes"
                value={formValues.taxes}
                onChange={handleChange}
                error={formErrors.taxes && true}
                placeholder="-$1,832"
              />
              {formErrors.taxes && (
                <Alert severity="error" className="error_alert">
                  {formErrors.taxes}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                type="number"
                label="Other"
                name="other"
                value={formValues.other}
                onChange={handleChange}
                error={formErrors.other && true}
                placeholder="Enter Other"
              />
              {formErrors.other && (
                <Alert severity="error" className="error_alert">
                  {formErrors.other}
                </Alert>
              )}
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mt={2}>
          <FormField
            type="number"
            label="New Car Sales"
            name="new_car_sales"
            value={formValues.new_car_sales}
            onChange={handleChange}
            error={formErrors.new_car_sales && true}
            placeholder="$2,500"
          />
          {formErrors.new_car_sales && (
            <Alert severity="error" className="error_alert">
              {formErrors.new_car_sales}
            </Alert>
          )}
        </VuiBox>
        <VuiBox mt={2}>
          <FormField
            type="number"
            label="Used Car Sales"
            name="used_car_sales"
            value={formValues.used_car_sales}
            onChange={handleChange}
            error={formErrors.used_car_sales && true}
            placeholder="$2,500"
          />
          {formErrors.used_car_sales && (
            <Alert severity="error" className="error_alert">
              {formErrors.used_car_sales}
            </Alert>
          )}
        </VuiBox>
        <VuiBox mt={2}>
          <FormField
            type="number"
            label="Spiffs"
            name="spiffs"
            value={formValues.spiffs}
            onChange={handleChange}
            error={formErrors.spiffs && true}
            placeholder="$1,000"
          />
          {formErrors.spiffs && (
            <Alert severity="error" className="error_alert">
              {formErrors.spiffs}
            </Alert>
          )}
        </VuiBox>
        <VuiBox mt={2}></VuiBox>
        {/* Add Period Beginning Date */}
        <VuiBox mt={2}>
          <FormField
            type="date"
            label="Period Beginning Date"
            name="period_beginning_date"
            value={formValues.period_beginning_date}
            onChange={handleChange}
            error={formErrors.period_beginning_date && true}
            placeholder="Select Period Beginning Date"
          />
          {formErrors.period_beginning_date && (
            <Alert severity="error" className="error_alert">
              {formErrors.period_beginning_date}
            </Alert>
          )}
        </VuiBox>
        {/* Add Period Ending Date */}
        <VuiBox mt={2}>
          <FormField
            type="date"
            label="Period Ending Date"
            name="period_ending_date"
            value={formValues.period_ending_date}
            onChange={handleChange}
            error={formErrors.period_ending_date && true}
            placeholder="Select Period Ending Date"
          />
          {formErrors.period_ending_date && (
            <Alert severity="error" className="error_alert">
              {formErrors.period_ending_date}
            </Alert>
          )}
        </VuiBox>
        <VuiBox mt={2}>
          <FormField
            type="date"
            label="Pay Date"
            name="date"
            value={formValues.date}
            onChange={handleChange}
            error={formErrors.date && true}
            placeholder="Select Pay Date"
          />
          {formErrors.date && (
            <Alert severity="error" className="error_alert">
              {formErrors.date}
            </Alert>
          )}
        </VuiBox>
        <VuiBox mt={3} width="100%" display="flex" justifyContent="flex-end">
          {edit ? (
            <>
              <VuiButton type="submit" variant="contained" color="success" disabled={formDisabled}>
                <Icon sx={{ fontWeight: "bold" }}>edit</Icon>
              </VuiButton>
              <VuiButton variant="contained" color="error" onClick={openDeletionForm}>
                <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
              </VuiButton>
            </>
          ) : (
            <VuiButton type="submit" variant="contained" color="info">
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            </VuiButton>
          )}
        </VuiBox>
        <DeletionForm
          open={deletionFormOpen}
          handleClose={closeDeletionForm}
          deletion={deletePaystub}
        />
      </form>
    </VuiBox>
  );
}

export default PaystubForm;
