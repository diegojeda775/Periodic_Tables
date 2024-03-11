import { useData } from "@/components/DataContext";
import { readReservation } from "@/utils/api/api";
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";

function ReservationSeat() {
  const [tableId, setTableId] = useState("");
  const [reservation, setReservation] = useState({});
  const [erros, setErros]  = useState([]);
  
  const {reservations, tables} = useData();
  const {resId} = useParams()
  const abortControllerRef = useRef<AbortController>();
  
  useEffect(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController()
    const res = readReservation(resId, abortControllerRef.current.signal)
    setReservation(res)
  },[resId] )


  return (
    <div>ReservationSeat</div>
  )
}

export default ReservationSeat