import './App.scss'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { updateDateTime, showURL } from '../actions'
import Link from '../components/Link'
import Button from '../components/Button'

type Props = {
  url?: string
  dateTime?: string
  requestUpdateTime?: () => void
  requestShowURL?: (url: string) => void
}

const component: React.FC<Props> = ({
  url = '',
  dateTime = '',
  requestUpdateTime = () => {},
  requestShowURL = () => {}
}) => (
  <div className="main">
    <Button label="Click" onClick={requestUpdateTime} />
    <span>{dateTime}</span>
    <Link label={url} url={url} icon="icon_github" onClick={requestShowURL} />
  </div>
)

const mapStateToProps = (state = {}) => {
  return state
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  requestUpdateTime: () => {
    dispatch(updateDateTime())
  },
  requestShowURL: (url: string) => {
    dispatch(showURL(url))
  }
})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(component)

export default Container
