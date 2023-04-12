import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Row, Col,Table, Modal } from "antd";

const Question = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const [data, setData] = useState({});
    const [tableData, setTableData] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [finishGame, setFinishGame] = useState(false);

    const columns = [
        {
            title: 'Name',
            dataIndex: ['username', 'S'],
            key: 'Name'
        },
        {
            title: 'Score',
            dataIndex: ['score', 'S'],
            key: 'Score'
        }
    ]


    const queDisplay = () => {
        const resp = axios.post(process.env.REACT_APP_BASEURL + 'ping', {
            "event": "LetsGo",
            "data": data
        })
    }

    const onFinishHandle = () => {
        const resp = axios.post(process.env.REACT_APP_BASEURL + 'ping', {
                "event": "Finsh",
                "data": "Done."
            }
        )
        sessionStorage.removeItem("score");
        // setShowTable(true);
    }

    const onOkHandle = () => {
        try{
            axios.post(process.env.REACT_APP_BASEURL + 'getNextQue',{
                    "pin": location.state.pin
            }).then(resp => {
                if(resp.statusCode == 200){
                    setData(resp.data);
                    queDisplay();
                }else{
                setShowTable(false);
                onFinishHandle();
            }});
        }catch (e) {
            onFinishHandle();
            navigate('/');
        }
    }

    const onNextHandle = async () => {
        try{
        const res = await axios.post(process.env.REACT_APP_BASEURL + 'getScore', {
            'pin': location.state.pin
        })
        setTableData(res.data);
        setShowTable(true);
        } catch (e) {

        }
    }

    useEffect(() => {

        axios.post(process.env.REACT_APP_BASEURL + 'getque',{
            'pin': location.state.pin
        }).then(response => {
                console.log(response.data);
                setData(response.data);
                const resp = axios.post(process.env.REACT_APP_BASEURL + 'ping', {
                "event": "LetsGo",
                "data": response.data
            })
    })
    }, [])

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
                            <Row style={{display:"flex", justifyContent: "center"}}>
                                <Col span={24}>
                                    <div className="formbg-inner padding-horizontal--48">
                                        <h1>{data.question}</h1>
                                        {console.log(data)}
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{display:"flex", justifyContent: "center"}}>
                                <Col>
                                    <Button>{data.option1}</Button>
                                </Col>
                                <Col>
                                    <Button>{data.option2}</Button>
                                </Col>
                            </Row>
                            <Row style={{display:"flex", justifyContent: "center"}}>
                                <Col>
                                    <Button>{data.option3}</Button>
                                </Col>
                                <Col>
                                    <Button>{data.option4}</Button>
                                </Col>
                            </Row>
                            <Button className="field" onClick={onNextHandle}>Next</Button>
                        </div>
                        
                        <div className="footer-link padding-top--24 position">
                            <div className="listing padding-bottom--24 flex-flex center-center">
                                <span><a href="#">© FunTime</a></span>
                                <span><a href="#">Contact</a></span>
                                <span><a href="#">Privacy & terms</a></span>
                            </div>
                        </div>
                    </div>
                    {showTable && tableData.length > 0 &&
                    <Modal
                        open={showTable}
                        footer={null}
                        onCancel={() => onOkHandle()}
                        maskClosable={false}
                    >
                        <Table columns={columns} dataSource={tableData} pagination={false} />
                    </Modal>
                    }
                </div>
            </div>
        </div>
        </>
    )
}

export default Question;