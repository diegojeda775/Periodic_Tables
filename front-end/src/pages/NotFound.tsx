import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <>
      <div>NotFound</div>
      <Link to="/" className='cursor-pointer'>Back to Dashboard</Link>
    </>
  )
}

export default NotFound