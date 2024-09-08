import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";

const ChatWindow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Gap between tweets */
  overflow-y: auto; /* Enable scrolling */
  padding: 15px; /* Add padding for chat window look */
  border: 1px solid rgba(221, 221, 221, 0.8); /* Add a subtle border */
  border-radius: 10px; /* Add rounded corners */
  background-color: #fff; /* Set background color to white */
  height: calc(100vh - 120px); /* Set height to fill viewport minus header/footer */
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
        <ChatWindow>
            {tweets.map((tweet) => (<Tweet key={tweet.id} {...tweet} />))}
        </ChatWindow>
    );
}
