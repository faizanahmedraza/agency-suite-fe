// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Button } from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-misc.scss'

const Error = () => {
  const source = require(`@src/assets/images/pages/error.svg`).default
  return (
    <div className='misc-wrapper'>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>404 Page Not Found .</h2>
          <p className='mb-2'>Oops! 😖 The page you were looking for doesn't exist.</p>
          <Button tag={Link} to='/' color='primary' className='btn-sm-block mb-2'>
            Back to home
          </Button>
          <img className='img-fluid' src={source} alt='Not Found' />
        </div>
      </div>
    </div>
  )
}
export default Error
