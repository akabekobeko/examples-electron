import React from 'react'
import UpdateDatetime from './UpdateDatetime'
import ShowURL from './ShowURL'
import Styles from './App.scss'

const App = () => (
  <div className={Styles.main}>
    <UpdateDatetime />
    <ShowURL />
  </div>
)

export default App
