import React, { useMemo, useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import VuiButton from "components/VuiButton";
import VuiBox from "components/VuiBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import EventCalendar from "examples/Calendar";
import Icon from "@mui/material/Icon";
import NextEvents from "layouts/calendar/components/NextEvents";
import NewEvent from "layouts/calendar/components/Event"; // Import your EventForm component

import { supabase } from "supabaseClient.js";

// Import the TwitterFollowersWidget component
import TwitterFollowersWidget from "widgets/twitter-followers"; // Replace "path/to" with the actual path

function Calendar() {
  const [events, setEvent] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(async () => {
    setOpen(false);
  }, []);

  const getEvents = useCallback(async () => {
    const { data } = await supabase.from("events").select();
    setEvent(data);
  }, []);

  useEffect(() => {
    getEvents();
    setDataUpdated(false);
  }, [dataUpdated, getEvents]);

  useEffect(() => {}, []);

  return (
    <DashboardLayout>
      {/* Add the DashboardNavbar component */}
      <DashboardNavbar />

      

      <VuiBox pt={3} mb={8}>
        <VuiBox display="flex" justifyContent="flex-end" mt={1} mb={4} mx={2}>
          {/* Display form when the button is clicked */}
          {!open && (
            <VuiButton color="primary" onClick={handleClickOpen}>
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            </VuiButton>
          )}
        </VuiBox>
        <div style={{ position: "relative" }}>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} xl={8}>
              {useMemo(
                () => (
                  <EventCalendar
                    initialView="dayGridMonth"
                    events={events}
                    selectable
                    editable
                    setDataUpdated={setDataUpdated}
                  />
                ),
                [events]
              )}
            </Grid>
            <Grid item xs={12} xl={4}>
              <VuiBox
                display="flex"
                sx={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <VuiBox mb={3}>
                  <NextEvents events={events} />
                </VuiBox>
              </VuiBox>
            </Grid>
          </Grid>

          <NewEvent open={open} handleClose={handleClose} setDataUpdated={setDataUpdated} />
        </div>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Calendar;
