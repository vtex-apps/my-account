import React, { Component } from 'react'
import { compose } from 'recompose'
import { withRuntimeContext } from 'vtex.render-runtime'
import { withCssHandles } from 'vtex.css-handles'
import type { Settings } from '../shared/withSettings'
import { withSettings } from '../shared/withSettings'
import ProfileFormContainer from './ProfileFormContainer'

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
      this.setState({ isLoading: false })
      onError(error)
    }
  }

  private validate = () => {
    return this.state.valid
  }

  public render() {
    const { profile, settings, runtime, cssHandles, blockDocument, cleanMaskDocument, validateUniqueDocument } = this.props
    const { isLoading } = this.state
    const showGenders = settings?.showGenders

    if (!profile) return null

    return (
          <ProfileFormContainer
            profile={profile}
            showGenders={showGenders}
            blockDocument={blockDocument}
            validateUniqueDocument={validateUniqueDocument}
            cleanMaskDocument={cleanMaskDocument}
            registerValidator={this.registerValidator}
            registerSubmitter={this.registerSubmitter}
            isLoading={isLoading}
            handleSubmit={this.handleSubmit}
            runtime={runtime}
            cssHandles={cssHandles}
          />
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
  cssHandles: CssHandles<typeof CSS_HANDLES>
}
interface OutterProps {
  onDataSave: () => void
  onError: (error: any) => void
  profile: Profile
  blockDocument?: boolean
  validateUniqueDocument?: boolean
  cleanMaskDocument?: boolean
}

const enhance = compose<InnerProps & OutterProps, OutterProps>(
  withRuntimeContext,
  withSettings,
  withCssHandles(CSS_HANDLES)
)

export default enhance(ProfileFormBox)
