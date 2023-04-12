import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button, Row, Col, Modal } from "antd";
import Question from "./Question";

const UserQuestion = () => {

    const location = useLocation();

    const [question, setQuestion] = useState({});
    const [score, setScore] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [modal, setModal] = useState(true);

    const onAnsHandle = (event) => {
        // if(event.target.value);
        const currentTime = performance.now();
        const milliseconds = currentTime - startTime;

        console.log(milliseconds);
        // console.log(event);
        console.log(event.target.innerText);
        console.log(question.answer);
        if(event.target.innerText == question.answer){
            console.log("inside here...");
            // setScore((score+milliseconds));
            sessionStorage.setItem("score", sessionStorage.getItem("score") + milliseconds);
        }
        setModal(true);
        axios.post('https://rgkf753wn1.execute-api.us-east-1.amazonaws.com/Prod/score', {
            username: location.state.username,
            score: String(sessionStorage.getItem("score")),
            pin: location.state.pin
        }).then(response => {
            console.log(response);
        });
    }

    useEffect(() => {
        
        // console.log(performance.now())
        // setQuestion(location.state.question);
        sessionStorage.setItem("score", 0);
        const evtSource = new EventSource(process.env.REACT_APP_BASEURL + "listen")
            evtSource.addEventListener("LetsGo", (event) => { 
                setModal(false);
                var jsonstr = event.data;
                console.log(jsonstr);
                jsonstr = jsonstr.replace(/'/g, '"');
                jsonstr = jsonstr.replace(/None/g, "null");
                console.log(jsonstr);
                setQuestion(JSON.parse(jsonstr));
                setStartTime(performance.now());
        });

    }, [])

    return(
        <>
            <div className="login-root">
        {console.log(score)}
                {/* {console.log(questions)} */}
            <div className="box-root flex-flex flex-direction--column" style={{minHeight: "100vh", flexGrow: "1"}}>
                <div className="loginbackground box-background--white padding-top--64">
                    <div className="loginbackground-gridContainer">
                        <div className="box-root flex-flex" style={{gridArea: "top / start / 8 / end"}}>
                            <div className="box-root" style={{backgroundImage: "linear-gradient(white 0%, rgb(240, 250, 252) 66%)", flexGrow: "1"}}></div>
                        </div>
                        <div className="box-root flex-flex" style={{gridArea: "4 / 2 / auto / 5"}}>
                            <div className="box-root box-divider--light-all-2 animationLeftRight tans3s" style={{flexGrow: "1"}}></div>
                        </div>
                        <div className="box-root flex-flex" style={{gridArea: "6 / start / auto / 2"}}>
                            <div className="box-root box-background--blue800" style={{flexGrow: "1"}}></div>
                        </div>
                        <div className="box-root flex-flex" style={{gridArea: "7 / start / auto / 4"}}>
                            <div className="box-root box-background--blue animationLeftRight" style={{flexGrow: "1"}}></div>
                        </div>
                        <div className="box-root flex-flex" style={{gridArea: "8 / 4 / auto / 6"}}>
                            <div className="box-root box-background--gray100 animationLeftRight tans3s" style={{flexGrow: "1"}}></div>
                        </div>
                        <div className="box-root flex-flex" style={{gridArea: "2 / 15 / auto / end"}}>
                            <div className="box-root box-background--cyan200 animationRightLeft tans4s" style={{flexGrow: "1"}}></div>
                        </div>
                        <div className="box-root flex-flex" style={{gridArea: "3 / 14 / auto / end"}}>
                            <div className="box-root box-background--blue animationRightLeft" style={{flexGrow: "1"}}></div>
                        </div>
                        <div className="box-root flex-flex" style={{gridArea: "4 / 17 / auto / 20"}}>
                            <div className="box-root box-background--gray100 animationRightLeft tans4s" style={{flexGrow: "1"}}></div>
                        </div>
                        <div className="box-root flex-flex" style={{gridArea: "5 / 14 / auto / 17"}}>
                            <div className="box-root box-divider--light-all-2 animationRightLeft tans3s" style={{flexGrow: "1"}}></div>
                        </div>
                        <div className="box-root flex-flex" style={{gridArea: "9 / 14 / auto / 17"}}>
                            <div className="box-root box-divider--light-all-2 animationRightLeft tans3s" style={{flexGrow: "1"}}></div>
                        </div> 
                     </div>
                </div>
                <div className="box-root flex-flex flex-direction--column">
                    <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center position">
                        <h1>FunTime</h1>
                    </div>
                    <div className="formbg-outer">
                        <div className="formbg">
                            <Row style={{display:"flex", justifyContent: "center"}}>
                                <Col span={24}>
                                    <div className="formbg-inner padding-horizontal--48">
                                        <h1>{question.question}</h1>
                                        {/* {console.log(question)} */}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button onClick={(event) => {onAnsHandle(event)}}>{question.option1}</Button>
                                    <Button onClick={(event) => {onAnsHandle(event)}}>{question.option2}</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button onClick={(event) => {onAnsHandle(event)}}>{question.option3}</Button>
                                    <Button onClick={(event) => {onAnsHandle(event)}}>{question.option4}</Button>
                                </Col>
                            </Row>
                        </div>
                        
                        <div className="footer-link padding-top--24 position">
                            <div className="listing padding-bottom--24 flex-flex center-center">
                                <span><a href="#">© FunTime</a></span>
                                <span><a href="#">Contact</a></span>
                                <span><a href="#">Privacy & terms</a></span>
                            </div>
                        </div>
                    </div>
                    {modal && 
                        <Modal 
                        open={modal}
                        footer={null}
                        closable={false}
                        maskClosable={false}
                        >
                            <p>{sessionStorage.getItem("score") == 0 ? 'Waiting for admin to start the game.' : sessionStorage.getItem("score")}</p>
                        </Modal>
                    }
                </div>
            </div>
        </div>
        </>
    )
}

export default UserQuestion;