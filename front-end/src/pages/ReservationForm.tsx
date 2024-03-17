import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { formatPhoneNumber, readReservation } from '@/utils/api/api'
import { useEffect, useRef, useState } from 'react'
import ErrorAlert from '@/components/ErrorAlert'

type ErrorType = {
  message: string
}

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  mobileNumber: z.string(),
  date: z.string(),
  time: z.string(),
  party: z.number()
  })

function ReservationForm() {
  const {resId} = useParams()
  const [errors, setErrors] = useState<ErrorType | null>(null);
  const [existingRes, setExistingRes] = useState({
      firstName:"",
      lastName: "",
      mobileNumber: "",
      date: "",
      time: "",
      party: 0
  })
  const navigate = useNavigate()
  const abortControllerRef = useRef<AbortController>()
  const {setValue} = useForm()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: "",
      mobileNumber: '',
      date: '',
      time: '',
      party: 0
    }
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const phoneNumberFormatter = (value: string) => {
    const formattedInputValue = formatPhoneNumber(value);
    return formattedInputValue;
  };

  useEffect(() => {
    async function getReservation(){
      try {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController()
        const res = await readReservation(resId, abortControllerRef.current.signal)
        setExistingRes({...res, date: new Date(res.date).toISOString().substring(0,10)})
        Object.keys(res).forEach(key => setValue(`${key}`, res.key))
      } catch (error) {
        const err = error as TypeError
        setErrors(err)
      }
    }
    getReservation()
  }, [resId, setValue])
  
  const handleSubmit= (values: z.infer<typeof formSchema>) => {
    const resToBeCreated = {...values, party: +values.party}
    console.log(resToBeCreated)

  }
  
  return (
    <div className='container max-w-md w-full items-center'>
      <ErrorAlert error={errors} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}
        className='max-w-md w-full flex flex-col gap-4'
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => {
              return <FormItem>
                <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type='text'
                      placeholder="e.g. John"
                      // value={existingRes?.firstName}
                      required
                    />
                  </FormControl>
                <FormMessage />
              </FormItem>
            }}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => {
              return <FormItem>
                <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type='text'
                      placeholder="e.g. Smith"
                      // value={existingRes?.lastName}
                      required
                    />
                  </FormControl>
                <FormMessage />
              </FormItem>
            }}
          />
          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => {
              return <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type='tel'
                      placeholder="555-555-5555"
                      onChange={(event) => field.onChange(phoneNumberFormatter(event.target.value))}
                      // value={existingRes?.mobileNumber}
                      required
                    />
                  </FormControl>
                <FormMessage />
              </FormItem>
            }}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => {
              return <FormItem>
                <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type='date'
                      placeholder="MM/DD/YYYY"
                      pattern="\d{4}-\d{2}-\d{2}"
                      // value={existingRes.date}
                      required
                    />
                  </FormControl>
                <FormMessage />
              </FormItem>
            }}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => {
              return <FormItem>
                <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type='time'
                      placeholder="HH:MM"
                      pattern="[0-9]{2}:[0-9]{2}"
                      // value={existingRes.time.slice(11,16)}
                      required
                    />
                  </FormControl>
                <FormMessage />
              </FormItem>
            }}
          />
          <FormField
            control={form.control}
            name="party"
            render={({ field }) => {
              return <FormItem>
                <FormLabel>Party Size</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type='number'
                      placeholder="Number of people"
                      onChange={(event) => field.onChange(+event.target.value)}
                      min={1}
                      // value={existingRes?.party}
                      required
                    />
                  </FormControl>
                <FormMessage />
              </FormItem>
            }}
          />
          <div className='flex flex-col justify-center'>
            <Button className='m-1' type='submit'>{resId ? "Save" : "Submit"}</Button>
            <Button className='m-1' variant={"destructive"} onClick={() => navigate('/')}>Cancel</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ReservationForm