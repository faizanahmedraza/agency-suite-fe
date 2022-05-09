// ** Vertical Menu Components
import VerticalNavMenuLink from './VerticalNavMenuLink'
import VerticalNavMenuGroup from './VerticalNavMenuGroup'
import VerticalNavMenuSectionHeader from './VerticalNavMenuSectionHeader'
import { useSelector } from "@store/store"
import { userHeaders, userRoutes, adminHeaders, adminRoutes } from "@utils"

// ** Utils
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '@layouts/utils'

const VerticalMenuNavItems = props => {

  const { user } = useSelector(state => state.login)

  // ** Components Object
  const Components = {
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
    VerticalNavMenuSectionHeader
  }

  // ** Render Nav Menu Items
  const RenderNavItems = props.items.map((item, index) => {

    if (user.roles[0].name === "Customer" && !userRoutes.includes(item.id) && !userHeaders.includes(item.header)) return

    if (user.roles[0].name === "Agency" && !adminRoutes.includes(item.id) && !adminHeaders.includes(item.header)) return

    const TagName = Components[resolveNavItemComponent(item)]
    if (item.children) {
      return canViewMenuGroup(item) && <TagName item={item} index={index} key={item.id} {...props} />
    }
    return <TagName key={item.id || item.header} item={item} {...props} />
  })

  return RenderNavItems
}

export default VerticalMenuNavItems
