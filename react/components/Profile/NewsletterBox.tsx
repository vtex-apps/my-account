import React, { Component } from 'react'
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { Checkbox } from 'vtex.styleguide'

import ContentBox from '../shared/ContentBox'
import GET_NEWSLETTER from '../../graphql/getNewsletterOpt.gql'
import NEWSLETTER_MUTATION from '../../graphql/setOptInNewsletter.gql'
import styles from '../../styles.css'
import className from "../../styles/ContentBox.css";

const messages = defineMessages({
  optinNewsLetter: {
    id: 'vtex.store-messages@0.x::personalData.newsletterOptIn',
    defaultMessage: '',
  },
  newsletter: {
    id: 'vtex.store-messages@0.x::personalData.newsletter',
    defaultMessage: '',
  },
  newsletterQuestion: {
    id: 'vtex.store-messages@0.x::personalData.newsletterQuestion',
    defaultMessage: '',
  },
})

class NewsletterBox extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      checked: props.isNewsletterOptIn,
    }
  }

  public componentDidUpdate(oldProps: Props) {
    if (oldProps.isNewsletterOptIn !== this.props.isNewsletterOptIn) {
      this.setState({ checked: this.props.isNewsletterOptIn })
    }
  }

  private debounceCall: NodeJS.Timeout | null | number = null

  private handleCheck = () => {
    const { setOptInNewsletter, userEmail } = this.props
    const { checked } = this.state
    clearInterval(this.debounceCall as NodeJS.Timeout)
    this.debounceCall = setTimeout(
      () =>
        setOptInNewsletter({
          variables: {
            email: userEmail,
            isNewsletterOptIn: !checked,
          },
        }),
      500
    )
    this.setState({ checked: !checked })
  }

  public render() {
    const { checked } = this.state
    const {
      intl: { formatMessage },
    } = this.props

    return (
      <div className={`${className.newsletterBoxContainer}`}>
      <ContentBox shouldAllowGrowing>
        <div  className={`${className.newsletterContainerTitle}`}>
          {formatMessage(messages.newsletter)}
        </div>
        <div className={`c-muted-2 pt2 pb6 ${className.newsletterContainerMessage}`}>
          {formatMessage(messages.newsletterQuestion)}
        </div>
        <div className={`${styles.passwordBox} w-100`}>
          <Checkbox
            checked={checked}
            id="newsletterOptIn"
            label={formatMessage(messages.optinNewsLetter)}
            name="newsletterOptIn"
            onChange={this.handleCheck}
          />
        </div>
      </ContentBox>
      </div>
    )
  }
}

interface State {
  checked: boolean
}

type Props = ExternalProps & QueryResult & Mutations & InjectedIntlProps

interface ExternalProps {
  userEmail: string
}

interface QueryData {
  profile: Pick<Profile, 'customFields'>
}

interface QueryResult {
  isNewsletterOptIn: boolean
}

interface Mutations {
  setOptInNewsletter: (args: Variables<SetOptInNewsletterArgs>) => Promise<void>
}

const enhance = compose<Props, ExternalProps>(
  graphql<Props, QueryData, unknown, QueryResult>(GET_NEWSLETTER, {
    props: ({ data }) => ({
      isNewsletterOptIn: data?.profile?.customFields?.[0].value === 'true',
    }),
  }),
  graphql(NEWSLETTER_MUTATION, {
    name: 'setOptInNewsletter',
    options: {
      refetchQueries: ['NewsletterOpt'],
    },
  }),
  injectIntl
)

export default enhance(NewsletterBox)
