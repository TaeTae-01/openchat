import styled from "styled-components";
import PostTweet from "../components/post-tweet";
import TimeLine from "../components/timeline";

const HomeContainer = styled.div`
  grid-template-columns: 1fr 3fr;
  `;

function Home() {
    return (
        <HomeContainer>
            <TimeLine />
            <PostTweet />
        </HomeContainer>
    );
}

export default Home;