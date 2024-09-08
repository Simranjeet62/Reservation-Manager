import { useContext } from "react";
import { postContext } from "./App";
import { NavLink } from "react-router-dom";

export default function Head() {
  const { addForm, addReservation } = useContext(postContext);

  return (
    <div className="flex flex-col text-center bg-orange-500 bg-opacity-95">
      <h1 className="text-5xl italic font-bold mt-5">Reservation Manager</h1>
      <div className="flex gap-10 justify-center text-2xl pb-2 mt-8">
        <NavLink
          to="/"
          className={`[&.active]:text-3xl [&.active]:font-semibold transition-all `}
        >
          <span>Home</span>
        </NavLink>
        <span
          className={` ${
            addReservation && "text-3xl font-semibold"
          } cursor-pointer transition-all`}
          onClick={() => addForm(true)}
        >
          Add Reservation
        </span>
        <NavLink
          to="/pastReservation"
          className={
            "[&.active]:text-3xl [&.active]:font-semibold transition-all"
          }
        >
          <span>Past Reservations</span>
        </NavLink>
      </div>
    </div>
  );
}
