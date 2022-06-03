// ** React Imports
import { useContext } from 'react'

// ** Icons Imports
import { List } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'
import Timeline from '@components/timeline'
import AvatarGroup from '@components/avatar-group'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

// ** Demo Components
import CardCongratulations from '@src/views/ui-elements/cards/advance/CardCongratulations'

// ** Images
import jsonImg from '@src/assets/images/icons/json.png'
import ceo from '@src/assets/images/portrait/small/avatar-s-9.jpg'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'

const AnalyticsDashboard = () => {

  return (
    <div id='dashboard-analytics'>
      <Row className='match-height'>
        <Col lg='12' sm='12'>
          <CardCongratulations />
        </Col>
      </Row>
    </div>
  )
}

export default AnalyticsDashboard
