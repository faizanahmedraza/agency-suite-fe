// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Button } from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-misc.scss'

const NotAuthorized = () => {
  const source = require(`@src/assets/images/pages/not-authorized.svg`).default
  return (
    <div className='misc-wrapper'>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>Oops 403! Unauthorized access. 🔐</h2>
          <p className='mb-2'>
            We appologies for the inconvenience, but you are not
            authorized to visit this page.
            <br />
            If you believe this is an error, please contact support.
          </p>
          <Button tag={Link} color='primary' className='btn-sm-block mb-1' to={'/'}>
            Back to Home
          </Button>
          <img className='img-fluid' src={source} alt='Not Authorized' />
        </div>
      </div>
    </div>
  )
}
export default NotAuthorized
