import styled from 'styled-components';

export type FlexProps = {
  isCol?: boolean;
  gap: number;
};

const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(isCol) => (isCol ? 'column' : 'row')};
  gap: ${({ gap }) => `${gap || 0}px`};
`;

export default Flex;
