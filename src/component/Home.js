import { Button, Row, Col } from "antd"
import { Navigate, useNavigate } from "react-router-dom"
import "../styles/Home.css"
import { useRef, useEffect, useState, createRef } from "react"
import { useLocation } from "react-router-dom";

const Home = () => {

    const location = useLocation();
    const username = localStorage.getItem('username');
    const [ active, setActive ] = useState(0)
    const navigate = useNavigate();
    useEffect(() => {
        
        if(sessionStorage.getItem('token') == null){
            navigate('/login')
        }   
      }, [active])

    
    const onCreateGameHandle = () => {
        navigate('/createGame', {state: {
            username: username
        }})
    }

    const onStartGameHandle = () => {
        navigate('/startGame', {state: {
            username: username
        }})
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
                    <div className="center-center formbg padding-top--48 padding-bottom--24 padding-horizontal--48">
                        <Row>
                            <Col  className="center" span={12}>
                                `<Button className="field" onClick={onCreateGameHandle}>Create Game</Button>
                            </Col>
                            <Col  className="center" span={12}>
                                <Button className="field" onClick={onStartGameHandle}>Start Game</Button>  
                            </Col>
                        </Row>
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
            
        </>
    )
}

export default Home;