/* eslint-disable react/prop-types */
import React, { Fragment, FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { ExtensionPoint, withRuntimeContext } from 'vtex.render-runtime'
import { ProfileRules, ProfileSummary } from 'vtex.profile-form'
import { useCssHandles } from 'vtex.css-handles'

import ContentBox from '../shared/ContentBox'
import DataEntry from '../shared/DataEntry'

const CSS_HANDLES = [
  'profileBoxContainer',
  'nameContainer',
  'firstNameSubContainer',
  'lastNameSubContainer',
  'emailContainer',
  'genderContainer',
  'documentsSubContainer',
  'genderSubContainer',
  'phoneNumberContainer',
  'dateOfBirthSubContainer',
  'phoneNumberSubContainer',
  'corporateName',
  'tradeName',
  'corporateDocument',
  'businessPhoneContainer',
  'businessPhoneSubContainer',
  'stateRegistration',
] as const

const ProfileBox: FunctionComponent<Props> = ({
  profile,
  onEditClick,
  runtime,
}) => {
  const cssHandles = useCssHandles(CSS_HANDLES)

  if (!profile) return null

  return (
    <div className={cssHandles.profileBoxContainer}>
      <ContentBox
        shouldAllowGrowing
        lowerButton={
          <FormattedMessage id="vtex.store-messages@0.x::commons.edit" />
        }
        onLowerButtonClick={onEditClick}
      >
        <ProfileRules country={runtime.culture.country} shouldUseIOFetching>
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
              businessData: {
                corporateName,
                tradeName,
                corporateDocument,
                businessPhone,
                stateRegistration,
              },
              isCorporate,
            }: any) => (
              <Fragment>
                <div
                  className={`flex-ns flex-wrap ${cssHandles.nameContainer}`}
                >
                  <div
                    className={`mb8 flex-auto ${cssHandles.firstNameSubContainer}`}
                  >
                    <DataEntry label={firstName.label}>
                      {firstName.value}
                    </DataEntry>
                  </div>
                  <div
                    className={`mb8 w-50-ns ${cssHandles.lastNameSubContainer}`}
                  >
                    <DataEntry label={lastName.label}>
                      {lastName.value}
                    </DataEntry>
                  </div>
                </div>
                <div className={`mb8 ${cssHandles.emailContainer}`}>
                  <DataEntry label={email.label}>{email.value}</DataEntry>
                </div>
                <div
                  className={`flex-ns flex-wrap ${cssHandles.genderContainer}`}
                >
                  {document?.label && (
                    <div
                      className={`mb8 flex-auto ${cssHandles.documentsSubContainer}`}
                    >
                      <DataEntry label={document.label}>
                        {document.value}
                      </DataEntry>
                    </div>
                  )}
                  <div
                    className={`mb8 w-50-ns ${cssHandles.genderSubContainer}`}
                  >
                    <DataEntry label={gender.label}>{gender.value}</DataEntry>
                  </div>
                </div>
                <div
                  className={`flex-ns flex-wrap ${cssHandles.phoneNumberContainer}`}
                >
                  <div
                    className={`mb8 flex-auto ${cssHandles.dateOfBirthSubContainer}`}
                  >
                    <DataEntry label={birthDate.label}>
                      {birthDate.value}
                    </DataEntry>
                  </div>
                  <div
                    className={`mb8 w-50-ns ${cssHandles.phoneNumberSubContainer}`}
                  >
                    <DataEntry label={homePhone.label}>
                      {homePhone.value}
                    </DataEntry>
                  </div>
                </div>
                {isCorporate && (
                  <Fragment>
                    <div className={`mb8 ${cssHandles.corporateName}`}>
                      <DataEntry label={corporateName.label}>
                        {corporateName.value}
                      </DataEntry>
                    </div>
                    {tradeName?.label && (
                      <div className={`mb8 ${cssHandles.tradeName}`}>
                        <DataEntry label={tradeName.label}>
                          {tradeName.value}
                        </DataEntry>
                      </div>
                    )}
                    {corporateDocument?.label && (
                      <div className={`mb8 ${cssHandles.corporateDocument}`}>
                        <DataEntry label={corporateDocument.label}>
                          {corporateDocument.value}
                        </DataEntry>
                      </div>
                    )}
                    <div
                      className={`flex-ns flex-wrap ${cssHandles.businessPhoneContainer}`}
                    >
                      <div
                        className={`mb8 flex-auto ${cssHandles.businessPhoneSubContainer}`}
                      >
                        <DataEntry label={businessPhone.label}>
                          {businessPhone.value}
                        </DataEntry>
                      </div>
                      {stateRegistration?.label && (
                        <div
                          className={`mb8 w-50-ns ${cssHandles.stateRegistration}`}
                        >
                          <DataEntry label={stateRegistration.label}>
                            {stateRegistration.value}
                          </DataEntry>
                        </div>
                      )}
                    </div>
                  </Fragment>
                )}
              </Fragment>
            )}
          </ProfileSummary>
        </ProfileRules>
        <ExtensionPoint
          id="profile-display-container"
          render={(fields: Array<{ label: string; value: string }>) => (
            <div className="flex-ns flex-wrap">
              {fields.map(
                ({ label, value }: { label: string; value: string }) => (
                  <div className="mb8 w-50-ns" key={label}>
                    <DataEntry label={label}>{value}</DataEntry>
                  </div>
                )
              )}
            </div>
          )}
        />
      </ContentBox>
    </div>
  )
}

interface Props {
  profile: Profile
  runtime: Runtime
  onEditClick: () => void
}

export default withRuntimeContext(ProfileBox)
