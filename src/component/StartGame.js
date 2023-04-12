import { Button, Form, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/'
})

const StartGame = () => {

    const location = useLocation();
    const username = location.state.username;

    const [pin, setPin] = useState('')

    const handleFields = (e) => {setPin(e.target.value)}

    const navigate = useNavigate();

    const onStartHandle = () => {
        const resp = axios.post("http://localhost:5000/startgame", {'usename': localStorage.getItem('username'), 'pin':pin})
        navigate('/livegame', {state: {
            username: username,
            pin: pin
        }})
    }

    
    // const res = api.get('/listen');
    // const [data, setData] = useState('');

    // useEffect(() => {

        // const evtSource = new EventSource("http://localhost:5000/listen")
        
        // evtSource.onmessage = (event) => {
        //     setData(event.data);
        // };
      
        //   return () => {
        //     eventSource.close();
        //   };
    // }, [])
  
      return (
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
                                    <Form.Item className="field" label="Game Pin: " labelCol={{span: 24}} wrapperCol={{span:24}}>
                                        <Input value={pin} placeholder="Please enter pin" onChange={(e) => handleFields(e)} />
                                    </Form.Item>
                                    <Form.Item className="field">
                                        <Button className="submitButton" type="submit" onClick={onStartHandle}>Start</Button>
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
                </div>
            </div>
        </div>
        <Button onClick={() => navigate('/livegame')}>Start Game</Button>
        </>
      );
}

export default StartGame;