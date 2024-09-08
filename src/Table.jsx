import { useContext } from "react";
import { postContext } from "./App";
import Loader from "./Loader";
import ServerError from "./ServerError";

export default function Table({ guestData, reservation }) {
  const { handleEdit, handleDelete, isLoading, error } =
    useContext(postContext);

  return (
    <div className="flex justify-center">
      {isLoading ? (
        error ? (
          <ServerError />
        ) : (
          <Loader />
        )
      ) : (
        <div className="flex flex-col items-center w-4/6">
          <h2 className="text-xl mt-5 ml-3 font-bold italic self-start">
            {reservation}
          </h2>
          <table className="mt-2 text-center w-full">
            <thead className="">
              <tr className="bg-orange-100 h-9">
                <th>Name</th>
                <th>Guests</th>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                {guestData?.length ? <th></th> : ""}
              </tr>
            </thead>
            <tbody>
              {guestData?.map((el) => (
                <tr className="odd:bg-gray-50 h-9" key={el.id}>
                  <td>{el.name}</td>
                  <td>{el.guests}</td>
                  <td>{el.room}</td>
                  <td>{el.checkIn}</td>
                  <td>{el.checkOut}</td>
                  <td className="flex gap-2 items-center mt-1">
                    <span className="block" onClick={() => handleDelete(el.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="red"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </span>
                    <span
                      className="h-full cursor-pointer"
                      onClick={() => handleEdit(el.id)}
                    >
                      Edit
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
