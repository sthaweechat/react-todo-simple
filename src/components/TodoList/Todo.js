import { Button, Col, Input, Row } from 'antd'
import React, { useState } from 'react'
import axios from '../../config/axios'

export default function Todo(props) {

    const [changeInput, setChangeInput] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    const updateTodoItem = async (id) => {
        await axios.put(`todo-list/${id}`, { task: changeInput });
        props.fetchData();
        setIsEdit(false);
    }

    const toggleEdit = () => {
        setIsEdit(true);
        setChangeInput(props.todo.task);
    }

    let contents = (
        <Row style={{ width: '100%' }}>
            <Col span={20}>
                <Input value={changeInput} onChange={(e) => setChangeInput(e.target.value)} />
            </Col>
            <Col span={4}>
                <Button type="primary" onClick={() => updateTodoItem(props.todo.id)}>Done</Button>
            </Col>
        </Row>
    );
    if (!isEdit) {
        contents = (
            <Row style={{ width: '100%' }}>
                <Col span={16}>
                    <Row justify="start">
                        {props.todo.task}
                    </Row>
                </Col>
                <Col span={4}>
                    <Button style={{ backgroundColor: 'orange', color: 'white' }} onClick={() => toggleEdit()}>Edit</Button>
                </Col>
                <Col span={4}>
                    <Button type="danger" onClick={() => props.del(props.todo.id)}>Delete</Button>
                </Col>
            </Row>
        )
    }

    return (
        <div style={{ width: "100%" }}>
            {contents}
        </div >
    )
}
