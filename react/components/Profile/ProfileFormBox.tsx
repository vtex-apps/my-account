import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { ExtensionPoint, withRuntimeContext } from 'vtex.render-runtime'
import { ProfileRules, ProfileContainer } from 'vtex.profile-form'
import { Button } from 'vtex.styleguide'
import { withCssHandles } from 'vtex.css-handles'

import ContentBox from '../shared/ContentBox'
import UpdateProfile from '../../graphql/updateProfile.gql'
import { withSettings, Settings } from '../shared/withSettings'

const CSS_HANDLES = ['profileFormBoxContainer'] as const

class ProfileFormBox extends Component<InnerProps & OutterProps, State> {
  private validatorFunctions: any[]
  private submitterFunctions: any[]

  constructor(props: InnerProps & OutterProps) {
    super(props)
    this.state = {
      isLoading: false,
      valid: true,
    }
    this.validatorFunctions = []
    this.submitterFunctions = []
  }

  public componentDidMount() {
    this.registerValidator(this.validate)
    this.registerSubmitter(this.submit)
  }

  private setStateAsync(state: any) {
    return new Promise(resolve => {
      this.setState(state, resolve)
    })
  }

  private registerValidator = (validator: any) => {
    this.validatorFunctions.push(validator)
  }

  private registerSubmitter = (submitter: any) => {
    this.submitterFunctions.push(submitter)
  }

  private handleSubmit = async ({ valid, profile }: any) => {
    const { onDataSave, onError } = this.props

    await this.setStateAsync({ isLoading: true, valid, profile })
    try {
      const validation$ = this.validatorFunctions.map(validator => validator())
      const validationResults = await Promise.all(validation$)
      const isValid = validationResults.reduce((acc, cur) => acc && cur, true)

      if (!isValid) {
        this.setState({ isLoading: false })

        return
      }

      const submit$ = this.submitterFunctions.map(submitter =>
        submitter(profile)
      )

      await Promise.all(submit$)
      this.setState({ isLoading: false })
      onDataSave()
    } catch (error) {
      onError(error)
    }
  }

  private validate = () => {
    return this.state.valid
  }

  private submit = (profile: ProfileInput) => {
    const { updateProfile } = this.props

    return updateProfile({ variables: { profile } })
  }

  public render() {
    const { profile, settings, runtime, cssHandles } = this.props
    const { isLoading } = this.state
    const showGenders = settings?.showGenders

    if (!profile) return null

    return (
      <div className={cssHandles.profileFormBoxContainer}>
        <ContentBox shouldAllowGrowing maxWidthStep={6}>
          <ProfileRules country={runtime.culture.country} shouldUseIOFetching>
            <ProfileContainer
              defaultProfile={profile}
              onSubmit={this.handleSubmit}
              shouldShowExtendedGenders={showGenders}
              SubmitButton={
                <Button type="submit" block size="small" isLoading={isLoading}>
                  <FormattedMessage id="vtex.profile-form@3.x::profile-form.save-changes" />
                </Button>
              }
            >
              <ExtensionPoint
                id="profile-input-container"
                registerValidator={this.registerValidator}
                registerSubmitter={this.registerSubmitter}
              />
            </ProfileContainer>
          </ProfileRules>
        </ContentBox>
      </div>
    )
  }
}

interface State {
  isLoading: boolean
  valid: boolean
}

interface InnerProps {
  settings?: Settings
  runtime: Runtime
  updateProfile: (args: Variables<UpdateProfileArgs>) => void
  cssHandles: CssHandles<typeof CSS_HANDLES>
}
interface OutterProps {
  onDataSave: () => void
  onError: (error: any) => void
  profile: Profile
}

const enhance = compose<InnerProps & OutterProps, OutterProps>(
  graphql(UpdateProfile, { name: 'updateProfile' }),
  withRuntimeContext,
  withSettings,
  withCssHandles(CSS_HANDLES)
)

export default enhance(ProfileFormBox)
