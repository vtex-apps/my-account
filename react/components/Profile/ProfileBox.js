import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { ExtensionPoint } from 'render'
import { ProfileRules, ProfileSummary } from 'vtex.profile-form'
import ContentBox from '../shared/ContentBox'
import DataEntry from '../shared/DataEntry'

const ProfileBox = ({ profile, onEditClick, intl }) => {
  if (!profile) return null

  const storeCountry = global.__RUNTIME__.culture.country
  return (
    <ContentBox
      shouldAllowGrowing
      maxWidthStep={6}
      lowerButton={intl.formatMessage({ id: 'commons.edit' })}
      onLowerButtonClick={onEditClick}
    >
      <ProfileRules country={storeCountry} shouldUseIOFetching>
        <ProfileSummary profile={profile}>
          {({
            personalData: {
              firstName,
              lastName,
              email,
              document,
              gender,
              birthDate,
              homePhone,
            },
            businessData,
          }) => (
            <React.Fragment>
              <div>
                <div className="flex-ns flex-wrap">
                  <div className="mb8 flex-auto">
                    <DataEntry label={firstName.label}>
                      {firstName.value}
                    </DataEntry>
                  </div>
                  <div className="mb8 flex-auto">
                    <DataEntry label={lastName.label}>
                      {lastName.value}
                    </DataEntry>
                  </div>
                </div>
                <div className="mb8">
                  <DataEntry label={email.label}>{email.value}</DataEntry>
                </div>
                <div className="flex-ns flex-wrap">
                  <div className="mb8 flex-auto">
                    <DataEntry label={document.label}>
                      {document.value}
                    </DataEntry>
                  </div>
                  <div className="mb8 w-50-ns">
                    <DataEntry label={gender.label}>{gender.value}</DataEntry>
                  </div>
                </div>
                <div className="flex-ns flex-wrap">
                  <div className="mb8 flex-auto">
                    <DataEntry label={birthDate.label}>
                      {birthDate.value}
                    </DataEntry>
                  </div>
                  <div className="mb8 w-50-ns">
                    <DataEntry label={homePhone.label}>
                      {homePhone.value}
                    </DataEntry>
                  </div>
                </div>
              </div>
              {Object.keys(businessData).some(
                fieldName => businessData[fieldName].value != null,
              ) && (
                <div>
                  <div className="mb8">
                    <DataEntry label={businessData.corporateName.label}>
                      {businessData.corporateName.value}
                    </DataEntry>
                  </div>
                  <div className="mb8">
                    <DataEntry label={businessData.tradeName.label}>
                      {businessData.tradeName.value}
                    </DataEntry>
                  </div>
                  <div className="mb8">
                    <DataEntry label={businessData.corporateDocument.label}>
                      {businessData.corporateDocument.value}
                    </DataEntry>
                  </div>
                  <div className="mb8">
                    <DataEntry label={businessData.businessPhone.label}>
                      {businessData.businessPhone.value}
                    </DataEntry>
                  </div>
                  <div className="mb8">
                    <DataEntry label={businessData.stateRegistration.label}>
                      {businessData.stateRegistration.value}
                    </DataEntry>
                  </div>
                </div>
              )}
            </React.Fragment>
          )}
        </ProfileSummary>
      </ProfileRules>
      <ExtensionPoint
        id="profile/display"
        render={fields => (
          <div className="flex-ns flex-wrap">
            {fields.map(({ label, value }) => (
              <div className="mb8 w-50-ns">
                <DataEntry key={label} label={label}>
                  {value}
                </DataEntry>
              </div>
            ))}
          </div>
        )}
      />
    </ContentBox>
  )
}

ProfileBox.propTypes = {
  profile: PropTypes.object.isRequired,
  onEditClick: PropTypes.func,
  intl: intlShape.isRequired,
}

export default injectIntl(ProfileBox)
