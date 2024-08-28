import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Wrapper, Form, Input, Switcher, Error, Title } from "../components/auth-components";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onChange = (e) => {
        const {
            target: { name, value },
        } = e;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (loading || email === "" || password === "") {
            return;
        }

        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
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
            <Title>로그인</Title>
            <Form onSubmit={onSubmit}>
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
                <Input type="submit" value={loading ? "잠시만 기다려주세요..." : "로그인"} />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                계정이 없으신가요? <Link to="/create-account">회원가입 &rarr;</Link>
            </Switcher>
        </Wrapper>
    );
}

export default Login;