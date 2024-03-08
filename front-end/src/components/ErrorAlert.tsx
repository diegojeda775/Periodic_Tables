import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ErrorAlert( error : any) {
  if (!error.message){
    return <div></div>
  }
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error.message}
      </AlertDescription>
    </Alert>
  )
}

export default ErrorAlert