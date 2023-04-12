import React, {useState, useEffect} from "react";
import { Button, Space, Input, Form, Modal } from "antd";
import "../styles/Game.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";


// const api = axios.create({
//     baseURL: 'http://localhost:5000/listen'
// })

const Game = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: null,
        pin: null
    })

    useEffect(() => {
        
    })

    const handleFields = (e, key) => {
        setUser(prev => ({
            ...prev,
            [key] : e.target.value
        }))
    }

    const onSubmitHandle = () => {
        navigate('/userQuestion', {state: {
            "username": user.username,
            "pin": user.pin,
        }});
        const eventName = "onUserConnect" + user.pin;
        const resp = axios.post('http://localhost:5000/ping', {
            "event": eventName,
            "data": user.username
        })
        // setModal(true);
    }

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
                    <div className="formbg-outer">
                        <div className="formbg">
                            <div className="formbg-inner padding-horizontal--48">
                                <Form id="stripe-login">
                                    <Form.Item className="field" label="Username: " labelCol={{span: 24}}>
                                        <Input value={user?.username} placeholder="Please enter username" onChange={(e) => handleFields(e, "username")} />
                                    </Form.Item>
                                    <Form.Item className="field" label="Game Pin: " labelCol={{span: 24}} wrapperCol={{span:24}}>
                                        <Input type="number" value={user?.pin} placeholder="Please enter pin" onChange={(e) => handleFields(e, "pin")} />
                                    </Form.Item>
                                    <Form.Item className="field">
                                        <Button className="submitButton" type="submit" onClick={onSubmitHandle}>Join</Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                        
                        <div className="footer-link padding-top--24 position">
                            <div className="listing padding-bottom--24 flex-flex center-center">
                                <span><a href="">© FunTime</a></span>
                                <span><a href="">Contact</a></span>
                                <span><a href="">Privacy & terms</a></span>
                            </div>
                        </div>
                    </div>
                    {/* {modal && 
                        <Modal 
                        open={modal}
                        footer={null}
                        closable={false}
                        maskClosable={false}
                        >
                            <p>Waiting for admin to start game</p>
                        </Modal>
                    } */}
                </div>
            </div>
        </div>
        </>
    )
}

export default Game;