import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router-dom'

const formSchema = z.object({
  
  firstName: z.string(),
  lastName: z.string(),
  mobileNumber: z.string(),
  date: z.string(),
  time: z.string(),
  party: z.number(),
  })
function ReservationForm() {
  const {resId} = useParams()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      date: "",
      time: "",
      party: 0
    }
  })
  
  const handleSubmit= () => {}
  
  return (
    <div className='container max-w-md w-full items-center'>
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
                      min={1}
                      required
                    />
                  </FormControl>
                <FormMessage />
              </FormItem>
            }}
          />
          <div className='flex flex-col justify-center'>
            <Button className='m-1' >{resId ? "Save" : "Submit"}</Button>
            <Button className='m-1' variant={"destructive"} onClick={() => navigate(-1)}>Cancel</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ReservationForm