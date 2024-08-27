import styled from "styled-components"

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Text = styled.span`
    font-size: 24px;
`;

export default function LoadingScreen() {
    return (<Wrapper><Text>잠시만 기다려주세요...</Text></Wrapper>);
}