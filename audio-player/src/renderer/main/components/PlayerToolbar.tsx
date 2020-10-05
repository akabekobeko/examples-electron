import React from 'react'
import styled from 'styled-components'
import { Theme } from '../../Theme'
import { Icon } from './Icon'

type Props = {
  /** Occurs when the remove music button is pressed. */
  removeMusic: () => void
  /** Occurs when the import music button is pressed. */
  importMusic: () => void
  /** Occurs when the show effector button is pressed. */
  showEffector: () => void
}

const StyledPlayerToolbar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 256px;
  height: 100%;
`

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const StyledButton = styled.div`
  position: absolute;
  display: inline-block;
  top: 11px;
  font-size: 24px;
  cursor: pointer;
`

const StyledButtonRemove = styled(StyledButton)`
  right: 72px;

  &:before {
    content: ${(props) => props.theme.icons.circleWithMinus};
  }
`

const StyledButtonImport = styled(StyledButton)`
  right: 40px;

  &:before {
    content: ${(props) => props.theme.icons.circleWithPlus};
  }
`

const StyledButtonEffector = styled(StyledButton)`
  right: 8px;

  &:before {
    content: ${(props) => props.theme.icons.soundMix};
  }
`

/**
 * Component of toolbar on the music player.
 */
export const PlayerToolbar: React.FC<Props> = ({
  removeMusic,
  importMusic,
  showEffector
}) => (
  <StyledPlayerToolbar>
    <StyledContainer>
      <StyledButtonRemove title="Remove slected music" onClick={removeMusic}>
        <Icon icon={Theme.icons.circleWithMinus} />
      </StyledButtonRemove>
      <StyledButtonImport title="Import music files" onClick={importMusic}>
        <Icon icon={Theme.icons.circleWithPlus} />
      </StyledButtonImport>
      <StyledButtonEffector
        title="Show/Hidden effector window"
        onClick={showEffector}
      >
        <Icon icon={Theme.icons.soundMix} />
      </StyledButtonEffector>
    </StyledContainer>
  </StyledPlayerToolbar>
)
