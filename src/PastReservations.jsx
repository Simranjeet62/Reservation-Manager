import { useContext } from "react";
import Table from "./Table";
import { postContext } from "./App";

export default function PastReservations() {
  const { guestData } = useContext(postContext);

  const pastGuest = guestData?.filter(
    (el) => new Date(el.checkOut + "T12:00:00") < new Date()
  );
  console.log(pastGuest);
  return <Table guestData={pastGuest} reservation="Past Reservarion" />;
}
