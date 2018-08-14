import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { ProfileRules, ProfileSummary } from '@vtex/profile-form'
import ContentBox from '../shared/ContentBox'
import DataEntry from '../shared/DataEntry'

const ProfileBox = ({ profile, onEditClick, intl }) => {
  if (!profile) return null

  return (
    <ContentBox
      shouldAllowGrowing
      maxWidthStep={6}
      lowerButton={intl.formatMessage({ id: 'commons.edit' })}
      onLowerButtonClick={onEditClick}
    >
      <ProfileRules
        country={'BRA'}
        fetch={country => import('@vtex/profile-form/lib/rules/' + country)}
      >
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
                    <DataEntry
                      label={firstName.label}
                      content={firstName.value}
                    />
                  </div>
                  <div className="mb8 flex-auto">
                    <DataEntry
                      label={lastName.label}
                      content={lastName.value}
                    />
                  </div>
                </div>
                <div className="mb8">
                  <DataEntry label={email.label} content={email.value} />
                </div>
                <div className="flex-ns flex-wrap">
                  <div className="mb8 flex-auto">
                    <DataEntry
                      label={document.label}
                      content={document.value}
                    />
                  </div>
                  <div className="mb8 w-50-ns">
                    <DataEntry label={gender.label} content={gender.value} />
                  </div>
                </div>
                <div className="flex-ns flex-wrap">
                  <div className="mb8 flex-auto">
                    <DataEntry
                      label={birthDate.label}
                      content={birthDate.value}
                    />
                  </div>
                  <div className="mb8 w-50-ns">
                    <DataEntry
                      label={homePhone.label}
                      content={homePhone.value}
                    />
                  </div>
                </div>
              </div>
              {Object.keys(businessData).some(
                fieldName => businessData[fieldName].value != null,
              ) && (
                <div>
                  <div className="mb8">
                    <DataEntry
                      label={businessData.corporateName.label}
                      content={businessData.corporateName.value}
                    />
                  </div>
                  <div className="mb8">
                    <DataEntry
                      label={businessData.tradeName.label}
                      content={businessData.tradeName.value}
                    />
                  </div>
                  <div className="mb8">
                    <DataEntry
                      label={businessData.corporateDocument.label}
                      content={businessData.corporateDocument.value}
                    />
                  </div>
                  <div className="mb8">
                    <DataEntry
                      label={businessData.businessPhone.label}
                      content={businessData.businessPhone.value}
                    />
                  </div>
                  <div className="mb8">
                    <DataEntry
                      label={businessData.stateRegistration.label}
                      content={businessData.stateRegistration.value}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          )}
        </ProfileSummary>
      </ProfileRules>
    </ContentBox>
  )
}

ProfileBox.propTypes = {
  profile: PropTypes.object.isRequired,
  onEditClick: PropTypes.func,
  intl: intlShape.isRequired,
}

export default injectIntl(ProfileBox)
