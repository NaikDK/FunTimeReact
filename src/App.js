import React from "react";
import './login.css';
import Login from './login';
import VerifyEmail from './component/VerifyEmail';
import SignUp from './component/SignUp';
import { Route, Routes } from "react-router";
import CreateGame from "./component/CrateGame";
import StartGame from "./component/StartGame";
import Home from "./component/Home";
import Game from './component/Game'
import LiveGame from "./component/LiveGame";
import Question from "./component/Question";
import UserQuestion from "./component/UserQuestion";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/verifyEmail" element={<VerifyEmail />}></Route>
                <Route path="/createGame" element={<CreateGame />}></Route>
                <Route path="/startGame" element={<StartGame />}></Route>
                <Route path="/livegame" element={<LiveGame />}></Route>
                <Route path="/game" element={<Game />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/getque" element={<Question />}></Route>
                <Route path="/userQuestion" element={<UserQuestion />}></Route>
            </Routes>
        </>
    );
};

export default App;