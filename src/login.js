import React, {useState} from "react";
import { Button, Space, Input, Form, Checkbox } from "antd";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/'
})

const Login = () => {

    const navigate = useNavigate();

    const [fields, setFields] = useState({
        email: null,
        password: null
    })

    const handleFields = (e, key) => {
        setFields(prev => ({
            ...prev,
            [key]: e.target.value
        }))
    }

    const onSubmitHandle = async () => {
        // if(validator.allValid()) {
        try{
            const res = await api.post('/login', fields);
            console.log(res.data.AuthenticationResult.AccessToken);
            sessionStorage.setItem('token', res.data.AuthenticationResult.AccessToken);
            localStorage.setItem('username', fields?.email);
            // res.
            navigate('/', {state: {
                username: fields?.email
            }})
            // console.log(fields.email, fields.password)
        } catch (e){
            console.log(e);
        }
        // } else {
        //     validator.getErrorMessages();
        //     setvalidator(true);
        // }
        // console.log(fields.email, fields.password)
    }

    return(
        <>
            <div className="login-root">
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
                <div className="box-root padding-top--24 flex-flex flex-direction--column">
                    <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center position">
                        <h1>FunTime</h1>
                    </div>
                    <div className="formbg-outer">
                        <div className="formbg">
                            <div className="formbg-inner padding-horizontal--48">
                                <span className="padding-bottom--15">Sign in to your account</span>
                                <Form id="stripe-login">
                                    <Form.Item className="field" label="Email" labelCol={{span: 24}}>
                                        <Input value={fields?.email} placeholder="Please enter email" onChange={(e) => handleFields(e, "email")} />
                                    </Form.Item>
                                    <Form.Item 
                                        className="field" 
                                        label="Password" 
                                        labelCol={{span: 24}}
                                        wrapperCol={{span:24}}
                                        labelAlign="left">
                                        <Input type="password" name="password" value={fields?.password} placeholder="Please enter password" onChange={(e) => handleFields(e, "password")} />
                                    </Form.Item>
                                <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                                    <Checkbox className="fontSize">Stay Signed In</Checkbox>
                                </div>
                                <Form.Item className="field">
                                    <Button className="submitButton" type="submit" onClick={onSubmitHandle}>Sign In</Button>
                                </Form.Item>
                                </Form>
                            </div>
                        </div>
                        
                        <div className="footer-link padding-top--24 position">
                            <span>Don't have an account? <Button onClick={() => navigate('/signup')}>Sign up</Button></span>
                            <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
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
export default Login;