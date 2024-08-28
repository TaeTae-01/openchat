import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Wrapper, Form, Input, Switcher, Error, Title } from "../components/auth-components";

function CreateAccount() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onChange = (e) => {
        const {
            target: { name, value },
        } = e;

        if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (loading || name === "" || email === "" || password === "") {
            return;
        }

        try {
            setLoading(true);
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(credentials.user, {
                display: name,
            });
            navigate("/");
        } catch (e) {
            if (e instanceof FirebaseError) {
                setError(e.message);
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <Title>회원가입</Title>
            <Form onSubmit={onSubmit}>
                <Input
                    name="name"
                    type="text"
                    value={name}
                    onChange={onChange}
                    required
                    placeholder="이름"
                />
                <Input
                    name="email"
                    type="email"
                    value={email}
                    onChange={onChange}
                    required
                    placeholder="이메일"
                />
                <Input
                    name="password"
                    type="password"
                    value={password}
                    onChange={onChange}
                    required
                    placeholder="비밀번호"
                />
                <Input type="submit" value={loading ? "잠시만 기다려주세요..." : "회원가입"} />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                이미 계정이 있으신가요? <Link to="/login">로그인 &rarr;</Link>
            </Switcher>
        </Wrapper>
    );
}

export default CreateAccount;