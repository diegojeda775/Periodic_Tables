
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ErrorAlert( error : any) {
  if (error.message){
    return <div>Error: {error.message}</div>
  }
  return (
    <div></div>
  )
}

export default ErrorAlert