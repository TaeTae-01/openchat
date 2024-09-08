import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const
    MessageBubble = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 15px; /* Padding for message content */
  border-radius: 10px; /* Rounded corners for message bubble */
  background-color: #f5f5f5; /* Light gray background for messages */
  margin-bottom: 10px; /* Add margin between messages */
  position: relative; /* Needed for username positioning */
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
  color: black;
  position: absolute; /* Position username above message bubble */
  top: -5px; /* Adjust username position */
  left: 10px; /* Adjust username position */
`;

const Payload = styled.p`
 margin: 10px 0px;
 font-size: 18px;
 color: #555; 
`;

const Photo = styled.img`
 width: 100px;
 height: 100px;
 border-radius: 15px;
 cursor: pointer;
 object-fit: cover;
`;

const DeleteBtn = styled.button`
 background-color: tomato;
 color: white;
 font-weight: 600;
 border: 0;
 font-size: 12px;
 padding: 5px 10px;
 text-transform: uppercase;
 border-radius: 5px;
 cursor: pointer;
 margin-top: 5px;
`;

export default function Tweet({ username, photo, tweet, userId, id }) {
    const user = auth.currentUser;

    const onDelete = async () => {
        if (user?.uid !== userId) return;
        try {
            await deleteDoc(doc(db, "tweets", id));
            if (photo) {
                const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
                await deleteObject(photoRef);
            }
        } catch (e) {
            alert(e);
        }
    };

    const onPhotoClick = () => {
        if (photo) {
            window.open(photo, "_blank");
        }
    };

    return (
        <MessageBubble>
            <Username>{username}</Username>
            <Payload>{tweet}</Payload>
            {user?.uid === userId ? <DeleteBtn onClick={onDelete}>삭제</DeleteBtn> : null}
            {photo ? <Photo src={photo} onClick={onPhotoClick} /> : null}
        </MessageBubble>
    );
}