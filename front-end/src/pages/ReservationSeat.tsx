import { useData } from "@/components/DataContext";
import ErrorAlert from "@/components/ErrorAlert";
import { Button } from "@/components/ui/button";
import { readReservation, updateTable } from "@/utils/api/api";
import { SetStateAction, useEffect, useRef, useState } from "react"
import { Params, useNavigate, useParams } from "react-router-dom";

type Table = {
  id: string
  name: string
  capacity: number
  createdAt: Date
  updatedAt: Date
  reservationId?: string | null
}
type Reservation = {
  id: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  date: string;
  time: string;
  status: string;
  party: number;
  createdAt: string;
  updatedAt: string;
};

type ErrorType = {
  message: string
}

function ReservationSeat() {
  const [tableId, setTableId] = useState<string>("");
  const [reservation, setReservation] = useState<Reservation | undefined>(undefined);
  const [errors, setErrors] = useState<ErrorType | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { tables }: any = useData();
  const { resId }: Readonly<Params<string>> = useParams()
  const navigate = useNavigate()
  const abortControllerRef = useRef<AbortController>();
  
  useEffect(() => {
    async function getReservation(){
      try {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController()
        const res = await readReservation(resId, abortControllerRef.current.signal)
        setReservation(res)
        
      } catch (error) {
        const err = error as TypeError
        setErrors(err)
      }
    }
    getReservation()
  },[resId] )

  const validateSeat = (foundTable: Table) => {
    const foundErrors: string[] = []
    console.log('validate')
    if(!foundTable){
      foundErrors.push("The table you selected does not exist.")
    }else if(!reservation){
      foundErrors.push(`This reservation ${resId} does not exist`)
    } else{
      if(foundTable.reservationId){
        foundErrors.push("The table you selected is currently occupied")
      }
      if(foundTable.capacity < reservation.party){
        foundErrors.push(`The table you selected cannot ${reservation.party} people`)
      }
    }
    console.log('error', foundErrors)
    if(foundErrors.length){
      setErrors(new Error(foundErrors.toString()))
      return false
    } 
    return true
  }

  const handleChange = async (e: { target: { value: SetStateAction<string>; }; }) => {
    console.log(e.target.value)
    setTableId(e.target.value)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("here)")
    console.log("reservation", reservation)
    console.log(tableId)
    setErrors(null)
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController()
    const foundTable = tables.find((table: Table) => tableId === table.id)
    console.log(foundTable)
    const valid = validateSeat(foundTable)
    if(valid){
      console.log("is Valid")
      try {
        await updateTable(foundTable, resId!, abortControllerRef.current.signal)
        navigate(0)
      } catch (error: unknown) {
        const err = error as TypeError
        setErrors(err)
      }

    }

  }

  const tableOptionsJSX = () => {
    return tables.map((table: Table) => (
      <option value={table.id} key={table.id}>
        {table.name} - {table.capacity}
      </option>
    ));
  };

  return (
    <div className="container">
      <h3>Reservation Seat</h3>
      <ErrorAlert error={errors} />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="tableId">Choose table:</label>
          <select
            name="tableId"
            id="tableId"
            value={tableId}
            onChange={handleChange}
          >
            {tableOptionsJSX()}
          </select>

          <Button type="submit" className="m-2">Submit</Button>
          <Button type="button" className="m-2" variant={"destructive"} onClick={()=> navigate(-1)}>
            Cancel
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ReservationSeat