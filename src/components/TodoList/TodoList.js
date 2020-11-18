// import React, { useState, useEffect } from 'react'
import React, { useState } from 'react'
import { Button, Col, Divider, Input, List, Row, Typography } from 'antd'
import _ from 'lodash'; //uniqueId

const { Text } = Typography;

export default function TodoList() {

    const [todoList, setTodoList] = useState([]);
    const [inputField, setInputField] = useState("");

    //mockup ข้อมูล
    // useEffect(() => {
    //     setTodoList([
    //         {
    //             id: 1,
    //             task: "Do Homework"
    //         },
    //         {
    //             id: 2,
    //             task: "Play Football"
    //         },
    //         {
    //             id: 3,
    //             task: "Read Book"
    //         },
    //         {
    //             id: 4,
    //             task: "Play game"
    //         },
    //     ]);
    // }, [])

    const addTodoItem = () => {
        const newTodoList = [...todoList];
        newTodoList.push({
            id: _.uniqueId(),
            task: inputField,
        });
        setTodoList(newTodoList);
        setInputField("");
    }

    const delTodoItem = (id) => {
        // วิธี 1 เอาข้อมูลใหม่ทุกตัวยกเว้นid ที่ลบออกไป
        // const newTodoList = todoList.filter(todo => todo.id !== id);
        // setTodoList(newTodoList);

        //วิธี 2 เรียกข้อมูลidเอามาเช็คแล้วนำข้อมูลidนั้นออกแล้วเรียก todolist ใหม่
        const newTodoList = [...todoList];
        const targetIndex = newTodoList.findIndex(todo => todo.id === id);
        newTodoList.splice(targetIndex, 1);
        setTodoList(newTodoList);
    }

    return (
        <Row justify="center">
            <Col>
                <Row justify="center">
                    <Text type="warning"> กรุณาใส่ Todo ที่ต้องการ</Text>
                </Row>
                <Row justify="center">
                    <Col span={20}>
                        <Input value={inputField} onChange={(e) => setInputField(e.target.value)} />
                    </Col>
                    <Col span={4}>
                        <Button style={{ width: '100%' }} onClick={addTodoItem}>Add</Button>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <List
                        style={{ width: '450px' }}
                        header={<div>Todo List Page</div>}
                        bordered
                        dataSource={todoList}
                        renderItem={todo => (
                            <List.Item>
                                <Row style={{ width: '100%' }}>
                                    <Col span={20}>
                                        <Row justify="start">
                                            {todo.task}
                                        </Row>
                                    </Col>
                                    <Col span={4}>
                                        <Button type="danger" onClick={() => delTodoItem(todo.id)}>Delete</Button>
                                    </Col>
                                </Row>
                            </List.Item>
                        )}
                    />
                </Row>
            </Col>
        </Row>
    )
}
