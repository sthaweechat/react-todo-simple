// import React, { useState, useEffect } from 'react'
import React, { useEffect, useState } from 'react'
import { Button, Col, Divider, Input, List, Row, Typography } from 'antd'
import _ from 'lodash' //uniqueId
import axios from '../../config/axios' //axios
import Todo from './Todo';

const { Text } = Typography;

export default function TodoList() {

    const [todoList, setTodoList] = useState([]);
    const [inputField, setInputField] = useState("");

    const fetchTodoList = async () => {
        const httpResponse = await axios.get("/todo-list");
        setTodoList(httpResponse.data);
    };

    useEffect(() => {
        fetchTodoList()
    }, []);


    const addTodoItem = async () => {
        await axios.post("/todo-list", { task: inputField });
        fetchTodoList();
        setInputField("");
    }

    const delTodoItem = async (id) => {

        await axios.delete(`/todo-list/${id}`);
        fetchTodoList();
        // วิธี 1 เอาข้อมูลใหม่ทุกตัวยกเว้นid ที่ลบออกไป
        // const newTodoList = todoList.filter(todo => todo.id !== id);
        // setTodoList(newTodoList);

        //วิธี 2 เรียกข้อมูลidเอามาเช็คแล้วนำข้อมูลidนั้นออกแล้วเรียก todolist ใหม่
        // const newTodoList = [...todoList];
        // const targetIndex = newTodoList.findIndex(todo => todo.id === id);
        // newTodoList.splice(targetIndex, 1);
        // setTodoList(newTodoList);
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
                                <Todo del={delTodoItem} todo={todo} fetchData={fetchTodoList} />
                            </List.Item>
                        )}
                    />
                </Row>
            </Col>
        </Row>
    )
}
