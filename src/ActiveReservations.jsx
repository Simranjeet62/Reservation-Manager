import { useContext, useEffect, useState } from "react";
import { postContext } from "./App";
import Table from "./Table";

export default function ActiveReservations() {
  const { trigger, setGuestData, guestData, setIsLoading, setError } =
    useContext(postContext);

  const activeGuest = guestData?.filter(
    (el) => new Date(el.checkOut + "T12:00:00") > new Date()
  );

  useEffect(
    function () {
      async function getAR() {
        try {
          setIsLoading(true);
          const res = await fetch("http://localhost:8000/reservations");
          const data = await res.json();
          setGuestData(data);
          setIsLoading(false);
        } catch (err) {
          console.error(err);
          setError(true);
        }
      }
      getAR();
    },
    [trigger]
  );

  return <Table guestData={activeGuest} reservation="Active Reservation" />;
}
