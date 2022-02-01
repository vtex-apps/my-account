import React, { useEffect } from "react"
import { FC } from "react"
import { useMutation, useQuery } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { ProfileRules, ProfileContainer } from "vtex.profile-form"
import { ExtensionPoint } from 'vtex.render-runtime'
import { Button } from 'vtex.styleguide'
import GET_CLIENTS from '../../graphql/getClient.gql'
import UpdateProfile from '../../graphql/updateProfile.gql'
import ContentBox from '../shared/ContentBox'

interface ProfileFormContainerProps {
  registerValidator: (validator: any) => void
  registerSubmitter: (submitter: any) => void
  profile: Profile
  showGenders?: Boolean
  blockDocument?: Boolean
  validateUniqueDocument?: Boolean
  cleanMaskDocument?: Boolean
  handleSubmit: ({ valid, profile }: any) => Promise<void>
  isLoading: Boolean
  runtime: Runtime
  cssHandles: CssHandles<readonly ["profileFormBoxContainer"]>
}

const ProfileFormContainer: FC<ProfileFormContainerProps> = ({
  registerValidator,
  registerSubmitter,
  profile,
  showGenders,
  blockDocument,
  validateUniqueDocument,
  cleanMaskDocument,
  handleSubmit,
  isLoading,
  runtime,
  cssHandles
}) => {

  const { refetch: searchClient } = useQuery(GET_CLIENTS, { skip: true })
  const [updateProfile] = useMutation(UpdateProfile)

  const submit = async (newProfile: ProfileInput) => {
    console.log(`cleanMaskDocument: ${cleanMaskDocument}    |    validateUniqueDocument: ${validateUniqueDocument}`)

    if(profile.document != newProfile.document){
      const response = await searchClient({ where: `document=${newProfile.document}` })
      if(response.data?.documents?.[0]?.firstName)
        alert('ja existe um cliente cadastrado com o documento')
    }

    return updateProfile({ variables: { newProfile } })
  }

  useEffect(() => {
    registerSubmitter(submit)
  })

  return (
    <div className={cssHandles.profileFormBoxContainer}>
    <ContentBox shouldAllowGrowing maxWidthStep={6}>
      <ProfileRules country={runtime.culture.country} shouldUseIOFetching>
        <ProfileContainer
          defaultProfile={profile}
          onSubmit={handleSubmit}
          shouldShowExtendedGenders={showGenders}
          blockDocument={blockDocument}
          SubmitButton={
            <Button type="submit" block size="small" isLoading={isLoading}>
              <FormattedMessage id="vtex.profile-form@3.x::profile-form.save-changes" />
            </Button>
          }
        >
          <ExtensionPoint
            id="profile-input-container"
            registerValidator={registerValidator}
            registerSubmitter={registerSubmitter}
          />
        </ProfileContainer>
      </ProfileRules>
    </ContentBox>
    </div>
  )
}

export default ProfileFormContainer
