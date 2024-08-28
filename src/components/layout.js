import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { auth } from "../firebase";

const Wrapper = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 4fr;
    height: 100%;
    padding: 50px 0px;
    width: 100%;
    max-width: 860px;
`;

const LogOut = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    svg {
        width: 30px;
        fill: white;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
`;

const ModalContent = styled.div`
    background: rgba(255, 255, 255, 0.95);
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    border: 2px solid #ccc;
`;

const Button = styled.button`
    margin: 0 10px;
    padding: 10px 20px;
    cursor: pointer;
    background-color: #87cefa;
    color: black;
    border: none;
    border-radius: 8px; /* 둥근 모서리 */
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #6495ed; /* hover 시 더 짙은 파란색 */
    }
`;

function ConfirmationDialog({ isOpen, message, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <ModalContent>
                <p>{message}</p>
                <br></br>
                <Button onClick={onConfirm}>확인</Button>
                <Button onClick={onCancel}>취소</Button>
            </ModalContent>
        </ModalOverlay>
    );
}

function Layout() {
    const navigate = useNavigate();
    const [isDialogOpen, setDialogOpen] = useState(false);

    const onLogOut = () => {
        setDialogOpen(true);
    };

    const handleConfirmLogout = async () => {
        setDialogOpen(false);
        await auth.signOut();
        navigate("/");
        window.location.reload(); // 페이지 새로고침
    };

    const handleCancelLogout = () => {
        setDialogOpen(false);
    };

    return (
        <Wrapper>
            <LogOut onClick={onLogOut}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>
            </LogOut>
            <ConfirmationDialog
                isOpen={isDialogOpen}
                message="로그아웃 하시겠습니까?"
                onConfirm={handleConfirmLogout}
                onCancel={handleCancelLogout}
            />
            <Outlet />
        </Wrapper>
    );
}

export default Layout;