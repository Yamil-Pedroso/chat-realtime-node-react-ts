import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow: hidden;
  border: 1px solid #ccc;
`;

export const Message = styled.div`
  display: flex;
  width: 18rem;
  margin-bottom: 20px;
  position: relative;

  ul {
    list-style: none;
    position: absolute;

    li:nth-child(odd) {
      color: #529982;
    }
  }
`;