import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent, withProps } from 'recompose'
import ContentBox from '../shared/ContentBox'
import LoadingBox from '../shared/LoadingBox'
import DataEntry from '../shared/DataEntry'
import GetProfile from '../../graphql/GetProfile.gql'

const PersonalDataBox = ({ profileQuery, onEditClick, intl }) => {
  const genders = {
    male: intl.formatMessage({ id: 'personalData.genders.male' }),
    female: intl.formatMessage({ id: 'personalData.genders.female' }),
    others: intl.formatMessage({ id: 'personalData.genders.others' }),
  }

  return (
    <ContentBox
      width={'60'}
      lowerButton={intl.formatMessage({ id: 'commons.edit' })}
      onLowerButtonClick={onEditClick}
    >
      <div className="mb8">
        <DataEntry
          label={intl.formatMessage({ id: 'personalData.name' })}
          content="Claudio Eckardt Shimmit dos Santos Martin"
        />
      </div>
      <div className="mb8">
        <DataEntry
          label={intl.formatMessage({ id: 'personalData.email' })}
          content="gustavo.faustino@vtex.com.br"
        />
      </div>
      <div className="mb8-ns flex-ns">
        <div className="mb8 mb0-ns w-50-ns">
          <DataEntry
            label={intl.formatMessage({ id: 'personalData.document' })}
            content="353.264.248-21"
          />
        </div>
        <div className="mb8 mb0-ns w-50-ns">
          <DataEntry
            label={intl.formatMessage({ id: 'personalData.gender' })}
            content={genders.male}
          />
        </div>
      </div>
      <div className="mb8-ns flex-ns">
        <div className="mb8 mb0-ns w-50-ns">
          <DataEntry
            label={intl.formatMessage({ id: 'personalData.birthDate' })}
            content="08/09/1996"
          />
        </div>
        <div className="mb8 mb0-ns w-50-ns">
          <DataEntry
            label={intl.formatMessage({ id: 'personalData.mainPhone' })}
            content="(11) 96486-5052"
          />
        </div>
      </div>
    </ContentBox>
  )
}

PersonalDataBox.propTypes = {
  onEditClick: PropTypes.func,
  intl: intlShape.isRequired,
}

const SizedLoadingBox = withProps({ width: '60' })(LoadingBox)
const enhance = compose(
  graphql(GetProfile, { name: 'profileQuery' }),
  branch(
    ({ profileQuery }) => profileQuery.loading,
    renderComponent(SizedLoadingBox),
  ),
  injectIntl,
)
export default enhance(PersonalDataBox)
