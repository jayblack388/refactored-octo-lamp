import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: ${props => props.direction || 'column'};
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'center'};
  height: ${props => props.height || '100%'};
`;
