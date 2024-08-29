import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
 display: grid;
 grid-template-columns: 3fr 1fr;
 padding: 20px;
 border: 1px solid rgba(250, 250, 250, 0.8);
 border-radius: 15px;
 margin-bottom: 15px; /* 트윗 간의 간격 추가 */
 background-color: #f8f9fa; /* 배경색 추가 */
`;

const Column = styled.div`
 display: flex;
 flex-direction: column;
 align-items: flex-start;
 justify-content: space-between;
`;

const Username = styled.span`
 font-weight: 600;
 font-size: 15px;
 color: #333; /* 텍스트 색상 변경 */
`;

const Payload = styled.p`
 margin: 10px 0px;
 font-size: 18px;
 color: #555; /* 텍스트 색상 변경 */
`;

const Photo = styled.img`
 width: 100px;
 height: 100px;
 border-radius: 15px;
 cursor: pointer;
 object-fit: cover; /* 이미지의 비율을 유지하면서 크기 조정 */
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
 margin-top: 10px; /* 버튼과 텍스트 사이의 간격 추가 */
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
        <Wrapper>
            <Column>
                <Username>{username}</Username>
                <Payload>{tweet}</Payload>
                {user?.uid === userId ? <DeleteBtn onClick={onDelete}>삭제</DeleteBtn> : null}
            </Column>
            <Column>
                {photo ? <Photo src={photo} onClick={onPhotoClick} /> : null}
            </Column>
        </Wrapper>
    );
}