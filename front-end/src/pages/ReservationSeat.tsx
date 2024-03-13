import { useData } from "@/components/DataContext";
import ErrorAlert from "@/components/ErrorAlert";
import { Button } from "@/components/ui/button";
import { readReservation, updateTable } from "@/utils/api/api";
import { useEffect, useRef, useState } from "react"
import { Params, useNavigate, useParams } from "react-router-dom";
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const formSchema = z.object({
  tableId: z.string()
})

function ReservationSeat() {
  const [reservation, setReservation] = useState<Reservation | undefined>(undefined);
  const [errors, setErrors] = useState<ErrorType | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { tables }: any = useData();
  const { resId }: Readonly<Params<string>> = useParams()
  const navigate = useNavigate()
  const abortControllerRef = useRef<AbortController>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
  
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
    if(foundErrors.length){
      setErrors(new Error(foundErrors.toString()))
      return false
    } 
    return true
  }

  const handleSubmit = async (value: z.infer<typeof formSchema>) => {
    setErrors(null)
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController()
    const foundTable = tables.find((table: Table) => value.tableId === table.id)
    const valid = validateSeat(foundTable)
    if(valid){
      try {
        await updateTable(foundTable, resId!, abortControllerRef.current.signal)
        navigate(`/?date=${reservation?.date}`)
      } catch (error: unknown) {
        const err = error as TypeError
        setErrors(err)
      }
    }
  }

  const tableOptionsJSX = () => {
    return tables.map((table: Table) => (
      <SelectItem value={table.id} key={table.id}>
        {table.name} - {table.capacity}
      </SelectItem>
    ));
  };

  return (
    <div className="container">
      <h3>Reservation Seat</h3>
      <ErrorAlert error={errors} />
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}
          className='max-w-md w-full flex flex-col gap-4'
          >
            <FormField
              control={form.control}
              name="tableId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Choose Table</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a table"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tableOptionsJSX()}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <Button type="submit" className="">Submit</Button>
            <Button type="button" className="" variant={"destructive"} onClick={()=> navigate(-1)}>
              Cancel
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ReservationSeat