import { createContext, useState } from "react";
import AddReservation from "./AddReservation";
import Head from "./Head";
import ActiveReservations from "./ActiveReservations";
import EditReservation from "./EditReservation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PastReservations from "./PastReservations";

export const postContext = createContext();

export default function App() {
  const [addReservation, setAddReservation] = useState(false);
  const [trigger, setTrigger] = useState();
  const [id, setId] = useState();
  const [editState, setEditState] = useState(false);
  const [guestData, setGuestData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  function handleEdit(id) {
    setId(id);
    setEditState(true);
  }

  function handleDelete(id) {
    const confirmation = confirm("delete?");

    if (confirmation) {
      async function deleteReser() {
        const res = await fetch(`http://localhost:8000/reservations/${id}`, {
          method: "DELETE",
        });
        setTrigger(Math.random());
      }
      deleteReser();
    }
  }

  return (
    <div className="flex flex-col">
      <postContext.Provider
        value={{
          trigger,
          setTrigger,
          addForm: setAddReservation,
          handleEdit,
          id,
          guestData,
          setGuestData,
          setEditState,
          addReservation,
          handleDelete,
          isLoading,
          setIsLoading,
          error,
          setError,
        }}
      >
        <BrowserRouter>
          <Head />
          <div className="relativs flex-grow">
            {addReservation && <AddReservation />}
            {editState && <EditReservation />}

            <Routes>
              <Route path="/" element={<ActiveReservations />}></Route>
              <Route
                path="pastReservation"
                element={<PastReservations />}
              ></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </postContext.Provider>
    </div>
  );
}
