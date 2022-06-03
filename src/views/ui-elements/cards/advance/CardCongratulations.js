// ** Icons Imports
import { Award } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap'
import { useSelector } from "@store/store";

// ** Images
import decorationLeft from '@src/assets/images/elements/decore-left.png'
import decorationRight from '@src/assets/images/elements/decore-right.png'

const CardCongratulations = () => {
  const {
    portal_settings:
    {
      detail: {
        portal_settings : {
          primary_color,
          secondary_color
        }
      }
    }
  } = useSelector((state) => state);

  
  const avatarStyle = {
    backgroundColor: primary_color ? primary_color : "#141E15",
    boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)"
  }
  
  const cardStyle = {
    background: secondary_color ?? "#17D492"
  }

  return (
    <Card className='card-congratulations' style={cardStyle}>
      <CardBody className='text-center'>
        <img className='congratulations-img-left' src={decorationLeft} alt='decor-left' />
        <img className='congratulations-img-right' src={decorationRight} alt='decor-right' />
        <Avatar icon={<Award size={28}/>}  size='xl' style={avatarStyle}/>
        <div className='text-center'>
          <h1 className='mb-1 text-white'>Welcome! {JSON.parse(localStorage.getItem('user')).first_name} {JSON.parse(localStorage.getItem('user')).last_name}</h1>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardCongratulations
