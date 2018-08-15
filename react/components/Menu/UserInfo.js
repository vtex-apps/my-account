import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose, branch, withProps, renderComponent } from 'recompose'
import { injectIntl, intlShape } from 'react-intl'
import { IconPlus } from 'vtex.styleguide'
import UserPlaceholderPicture from './UserPlaceholderPicture'
import UserInfoLoading from './UserInfoLoading'
import GetName from '../../graphql/getName.gql'

const UserInfo = ({ profile, intl }) => {
  return (
    <div className="flex items-end mb7">
      <div className="mr5 relative">
        <UserPlaceholderPicture />
        <div className="absolute bottom-0 right-0 blue bg-white br-100 plus-sign">
          <IconPlus size={20} color="currentColor" />
        </div>
      </div>
      <div>
        <div className="f5 fw3 mid-gray mb2">
          {intl.formatMessage({ id: 'userInfo.greeting' })},
        </div>
        <div className="f4 fw3">{profile.firstName}!</div>
      </div>
    </div>
  )
}

UserInfo.propTypes = {
  profile: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
}

const enhance = compose(
  graphql(GetName),
  branch(({ data }) => data.profile == null, renderComponent(UserInfoLoading)),
  withProps(({ data }) => ({ profile: data.profile })),
  injectIntl,
)
export default enhance(UserInfo)
