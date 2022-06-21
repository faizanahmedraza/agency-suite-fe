import { useSelector } from "@store/store"
import '@src/Styles/card.css'

const Footer = () => {

  const {
    detail: { portal_settings }
  } = useSelector(state => state.portal_settings)

  return (
    <p className='clearfix mb-0'>
      <span className='float-md-start d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '} Powered By <span className="ft-ag-clr"> Agency Suite </span>
        <span className='d-none d-sm-inline-block'>, All rights Reserved</span>
      </span>
    </p>
  )
}

export default Footer
