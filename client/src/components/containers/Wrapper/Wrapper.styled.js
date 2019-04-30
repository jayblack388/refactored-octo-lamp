import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${props => (props.fullHeight ? '100%' : 'fit-content')};
`;
