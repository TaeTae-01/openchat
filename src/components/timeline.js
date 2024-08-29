import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";

const Wrapper = styled.div`
 display: flex;
 gap: 10px;
 flex-direction: column;
`;

export default function TimeLine() {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        let unsubscribe = null;
        const fetchTweets = async () => {
            const tweetsQuery = query(
                collection(db, "tweets"),
                orderBy("createdAt", "desc"),
                limit(25)
            );

            unsubscribe = onSnapshot(tweetsQuery, (snapshot) => {
                const tweets = snapshot.docs.map((doc) => {
                    const { createdAt, photo, tweet, userId, username } = doc.data();
                    return {
                        id: doc.id, createdAt, photo, tweet, userId, username,
                    };
                });
                setTweets(tweets);
            });
        };

        fetchTweets();
        return () => {
            unsubscribe && unsubscribe();
        };
    }, []);

    return (
        <Wrapper>
            {tweets.map((tweet) => (<Tweet key={tweet.id} {...tweet} />))}
        </Wrapper>
    );
}
