import { useSelector } from "@store/store"
import '@src/Styles/card.css'

const Footer = () => {

  const {
    detail: { portal_settings }
  } = useSelector(state => state.portal_settings)

  return (
    <p className='clearfix mb-0'>
      <span className='float-md-start d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '}
        <a href='' className="ft-ag-clr" color="" target='_blank'>
          {portal_settings && portal_settings?.agency?.name}
        </a>
        <span className='d-none d-sm-inline-block'>, All Rights Reserved</span>
      </span>
    </p>
  )
}

export default Footer
