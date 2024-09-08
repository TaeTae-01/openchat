import { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
 display: flex;
 flex-direction: column;
 gap: 7px;
 `;

const TextArea = styled.textarea`
 border: 2px solid white;
 padding: 20px;
 border-radius: 20px;
 font-size: 16px;
 color: white;
 background-color: black;
 width: 100%;
 resize: none;
 &:focus {
   outline: none;
   border-color: yellow;
   }
 `;

const AttachFileBtn = styled.label`
 padding: 10px 0px;
 color: white;
 text-align: center;
 border-radius: 20px;
 border: 1px solid yellow;
 font-size: 14px;
 font-weight: 600;
 cursor: pointer;
 `;

const AttachFileInput = styled.input`
 display: none;
 `;

const SubmitBtn = styled.input`
 border: none;
 padding: 10px 0px;
 border-radius: 20px;
 font-size: 16px;
 cursor: pointer;
 &:hover,
 &:active {
    opacity: 0.9;
    }`;

export default function PostTweet() {
    const fileSizeLimit = 1 * 1024 * 1024;
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        setTweet(e.target.value);
    };

    const onFileChange = (e) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            if (files[0].size > fileSizeLimit) {
                alert("파일의 크기가 너무 큽니다.");
                return;
            }
            setFile(files[0]);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user || loading || tweet === "" || tweet.length > 180) {
            return;
        }

        try {
            setLoading(true);
            const doc = await addDoc(collection(db, "tweets"), {
                tweet,
                createdAt: Date.now(),
                username: user.displayName,
                userId: user.uid,
            });
            if (file) {
                const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
                const result = await uploadBytes(locationRef, file);
                const url = await getDownloadURL(result.ref);
                await updateDoc(doc, {
                    photo: url,
                });
                setFile(null);
            };
            setTweet("");
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={onSubmit}>
            <TextArea onChange={onChange} required placeholder="채팅 입력" rows={5} maxLength={200} value={tweet} />
            <AttachFileBtn htmlFor="file">{file ? "추가 완료 ✅" : "사진 추가"}</AttachFileBtn>
            <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
            <SubmitBtn type="submit" value={loading ? "전송중..." : "전송"} />
        </Form>

    );
}