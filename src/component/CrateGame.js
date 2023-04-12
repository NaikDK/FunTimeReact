import React, {useState, useEffect} from "react";
import { Button, Space, Input, Form, Row, Col, Select, Modal } from "antd";
import "../styles/CreateGame.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";


const api = axios.create({
    baseURL: process.env.REACT_APP_BASEURL
})

const CreateGame = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate();

    const location = useLocation();
    const username = location.state.username;

    const [pin, setPin] = useState('');
    const [gameCreated, setGameCreated] = useState(false);

    const generatePin = () => {
        const newPin = Math.floor(Math.random() * 9000) + 1000; 
        setPin(newPin.toString()); 
    }


    const [questions, setQuestions] = useState([])
    const [que, setQue] = useState({
        question: null,
        type: null,
        option1: null,
        option2: null,
        option3: null,
        option4: null,
        answer: null
    });

    const handleFields = (e, key) => {
        setQue(prev => ({
            ...prev,
            [key] : e
        }))
    }
    
    const onNewQuestionHandle = () => {
        const tempData = questions;
        tempData.push(que);
        setQuestions(tempData);
        form.resetFields();
    }

    const onFinishHandle = async () => {
        const res = await api.post('/createGame', {
            'username': localStorage.getItem("username"),
            'pin': pin,
            'questions': questions
        });
        // console.log(res);
        setGameCreated(true)
        const message = "Game crated successfully with Pin: " + pin
        Modal.success({
            content: message
        });
        navigate('/')
    }

    useEffect(() => {
        generatePin();
    },[])

    return(
        <>
            <div className="login-root">
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
                    {/* {gameCreated && (<Modal
                        title="Game created"
                        open={gameCreated}
                        onOk={handleOk}
                    />)} */}
                    <div className="formbg-outer">
                        <div className="formbg">
                            <div className="formbg-inner padding-horizontal--48">
                                <Form form={form} id="stripe-login">
                                    <Form.Item className="field" label="Question" labelCol={{span: 24}}>
                                        <Input value={que?.question} placeholder="Please enter question" onChange={(e) => handleFields(e.target.value, "question")} />
                                    </Form.Item>
                                    <Form.Item className="field" label="Type" labelCol={{span: 24}}>
                                    <Select
                                        onChange={(e) => handleFields(e, "type")}
                                        defaultValue="True/False"
                                        dropdownMatchSelectWidth={false}
                                        // placement={placement}
                                        options={[
                                        {
                                            value: 'True/False',
                                            label: 'True/False',
                                        },  
                                        {
                                            value: 'MCQ',
                                            label: 'MCQ',
                                        },
                                        {
                                            value: 'MAQ',
                                            label: 'Multiple Answer Question',
                                        },
                                        ]}
                                    />
                                    </Form.Item>
                                    <Form.Item className="field" label="Option 1" labelCol={{span: 24}} wrapperCol={{span:24}}>
                                        <Input value={que?.option1} placeholder="Please enter option 1" onChange={(e) => handleFields(e.target.value, "option1")} />
                                    </Form.Item>
                                    <Form.Item className="field" label="Option 2" labelCol={{span: 24}} wrapperCol={{span:24}}>
                                        <Input value={que?.option2} placeholder="Please enter option 2" onChange={(e) => handleFields(e.target.value, "option2")} />
                                    </Form.Item>
                                    <Form.Item className="field" label="Option 3" labelCol={{span: 24}} wrapperCol={{span:24}}>
                                        <Input value={que?.option3} placeholder="Please enter option 3" onChange={(e) => handleFields(e.target.value, "option3")} />
                                    </Form.Item>
                                    <Form.Item className="field" label="Option 4" labelCol={{span: 24}} wrapperCol={{span:24}}>
                                        <Input value={que?.option4} placeholder="Please enter option 4" onChange={(e) => handleFields(e.target.value, "option4")} />
                                    </Form.Item>
                                    <Form.Item className="field" label="Answer" labelCol={{span: 24}} wrapperCol={{span:24}}>
                                        <Input value={que?.answer} placeholder="Please enter an answer" onChange={(e) => handleFields(e.target.value, "answer")} />
                                    </Form.Item>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item className="field">
                                                <Button className="submitButton" type="submit" onClick={onNewQuestionHandle}>Add Question</Button>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item className="field">
                                                <Button className="submitButton" type="submit" onClick={onFinishHandle}>Finish</Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                        
                        <div className="footer-link padding-top--24 position">
                            <div className="listing padding-bottom--24 flex-flex center-center">
                                <span><a href="#">© FunTime</a></span>
                                <span><a href="#">Contact</a></span>
                                <span><a href="#">Privacy & terms</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CreateGame;