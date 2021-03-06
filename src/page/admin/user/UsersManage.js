import React, { Component } from 'react'
import { Table, Layout, Space, Button } from 'antd';
import { Link } from 'react-router-dom'
import { REAREND_HOSTNAME } from '../../../configs/Rearend';

export class UsersManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            usersList: [],
            current: 1,
            pageSize: 10,
            total: 0
        }
        this.onChange = this.onChange.bind(this);
        this.cancelAdmin = this.cancelAdmin.bind(this);
        this.setAdmin = this.setAdmin.bind(this);
    }

    cancelAdmin(id){
        console.log("cancel admin"+ id)
    }
    setAdmin(id){
        console.log("set admin" + id)
    }

    LoadingUsers(current, pageSize) {
        fetch(REAREND_HOSTNAME + "/admin/user/list?pageIndex=" + current + "&pageSize=" + pageSize, {
            method: 'POST',
            headers: {
                'Accept': '/application/json',
                'Content-type': '/application/json'
            },
            body: JSON.stringify({
                "loginInfo": {
                    "userID": parseInt(window.localStorage.getItem("userID")),
                    "password": window.localStorage.getItem("password"),
                    "authority": window.localStorage.getItem('authority'),
                },
            })
        })
            .then((response) => response.json())
            .then((result) => {
                // console.log(result)

                if (result.httpStatus.isError == false){
                    this.setState({
                        usersList: result.users,
                        current: current,
                        pageSize: pageSize,
                        total: result.total,
                        isLoaded: true
                    });
                }
                if(result.httpStatus.msg !== ""){
                    alert(result.httpStatus.msg)
                }
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })

                }
            )
    }

    onChange(pagination) {
        this.LoadingUsers(pagination.current, pagination.pageSize)
    }

    componentDidMount() {
        this.LoadingUsers(this.state.current, this.state.pageSize);
    }

    render() {
        const { isLoaded, error } = this.state;
        const columns = [
            {
                title: '用户编号',
                dataIndex: 'id',
            },
            {
                title: '用户昵称',
                dataIndex: 'name',
            },
            {
                title: '是否为管理员',
                dataIndex: 'authority',
                render: function (text) {
                    // console.log(text)
                    if(text === 'admin'){
                        return(
                            <p>是</p>
                        )
                    }
                    else{
                        return(
                            <p>否</p>
                        )
                    }
                },
            },
            // {
            //     title: '设置管理员',
            //     render: function (text, record) {
            //         console.log(record.authority)
                    
            //         if(record.authority === 'admin'){
            //             return(
            //                 <Button type="primary"><Link to="">取消管理员</Link></Button>
            //             )
            //         }
            //         else{
            //             return(
            //                 <Button type="primary"><Link to="">设置管理员</Link></Button>
            //             )
            //         }
            //     },
            // },
        ];

        if (isLoaded === false) {
            return (
                <div>
                    正在加载中。。。。。。。
                </div>
            );
        } else {
            if (error) {
                return (
                    <div>
                        error: {error.message}
                    </div>
                );
            }
            return (
                <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <Table
                        columns={columns}
                        dataSource={this.state.usersList}
                        pagination={{
                            defaultCurrent: this.state.current,
                            total: this.state.total,
                            defaultPageSize: this.state.pageSize,
                            showSizeChanger: true
                        }}
                        onChange={this.onChange}
                    />
                </Layout.Content>
            );
        }
    }
}

export default UsersManage
