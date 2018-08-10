import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import ContentBox from '../shared/ContentBox'
import DataEntry from '../shared/DataEntry'

const ProfileBox = ({ profile, onEditClick, intl }) => {
  const genders = {
    male: intl.formatMessage({ id: 'personalData.genders.male' }),
    female: intl.formatMessage({ id: 'personalData.genders.female' }),
    others: intl.formatMessage({ id: 'personalData.genders.others' }),
  }

  if (!profile) return null

  return (
    <ContentBox
      shouldAllowGrowing
      lowerButton={intl.formatMessage({ id: 'commons.edit' })}
      onLowerButtonClick={onEditClick}
    >
      <div className="flex-ns flex-wrap">
        <div className="mb8 flex-auto">
          <DataEntry
            label={intl.formatMessage({ id: 'personalData.firstName' })}
            content={profile.firstName}
          />
        </div>
        <div className="mb8 flex-auto">
          <DataEntry
            label={intl.formatMessage({ id: 'personalData.lastName' })}
            content={profile.lastName}
          />
        </div>
      </div>
      <div className="mb8">
        <DataEntry
          label={intl.formatMessage({ id: 'personalData.email' })}
          content={profile.email}
        />
      </div>
      <div className="flex-ns flex-wrap">
        <div className="mb8 flex-auto">
          <DataEntry
            label={intl.formatMessage({ id: 'personalData.document' })}
            content={profile.document}
          />
        </div>
        <div className="mb8 w-50-ns">
          <DataEntry
            label={intl.formatMessage({ id: 'personalData.gender' })}
            content={profile.gender}
          />
        </div>
      </div>
      <div className="flex-ns flex-wrap">
        <div className="mb8 flex-auto">
          <DataEntry
            label={intl.formatMessage({ id: 'personalData.birthDate' })}
            content={profile.birthDate}
          />
        </div>
        <div className="mb8 w-50-ns">
          <DataEntry
            label={intl.formatMessage({ id: 'personalData.mainPhone' })}
            content={profile.homePhone}
          />
        </div>
      </div>
    </ContentBox>
  )
}

ProfileBox.propTypes = {
  onEditClick: PropTypes.func,
  intl: intlShape.isRequired,
}

export default injectIntl(ProfileBox)
