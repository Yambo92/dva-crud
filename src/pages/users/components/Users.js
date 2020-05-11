import React from 'react'
import { connect } from 'dva'
import {
    Table,
    Pagination,
    Popconfirm,
    Button
} from 'antd'
import styles from './Users.css'
import {PAGE_SIZE} from '@/constants';
import {routerRedux} from 'dva/router'
import UserModal from './UserModal'

const Users = ({dispatch, list: dataSource, total, loading, page: current}) => {

    const deleteHandler = id => {
        dispatch({
            type: 'users/remove',
            payload: id
        })
    }
    const editHandler = (id, values) => {
        dispatch({
            type: 'users/path',
            payload: {id, values}
        })
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="#">{text}</a>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
        },
        {
            title: 'Operation',
            key: 'operation',
            render: (text, record) => (
                <span className={styles.operation}>
                    <UserModal record={record} onOk={(values) => editHandler(record.id, values)}>
                        <a href=":;">Edit</a>
                    </UserModal>
                    <Popconfirm title="Confirm to delete?" 
                        onConfirm={() => deleteHandler(record.id)}>
                        <a href="#">Delete</a>
                    </Popconfirm>
                </span>
            )
        }
    ];
    /* 处理分页有两个思路：
发 action，请求新的分页数据，保存到 model，然后自动更新页面
切换路由 (由于之前监听了路由变化，所以后续的事情会自动处理)
我们用的是思路 2 的方式，好处是用户可以直接访问到 page 2 或其他页面。 */
    const pageChangeHandler = () => (page) => {
        dispatch(routerRedux.push({
            pathname: '/users',
            query: { page },
        }))
    }
    const createHandler = (values) => {
        dispatch({
            type: 'users/create',
            payload: values
        })
    } 
    return (
        <div className={styles.normal}>
            <div>
                <div className={styles.create}>
                    <UserModal record={{}} onOk={(values) => createHandler(values)}>
                        <Button type="primary">Create User</Button>
                    </UserModal>
                </div>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    rowKey={record => record.id}
                    pagination={false}
                    loading={loading}
                />
                <Pagination
                    className="ant-table-pagination"
                    total={total}
                    current={current}
                    pageSize={PAGE_SIZE}
                    onChange={pageChangeHandler}
                />
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    /* 注意 const { list, total, page } = state.users;
     里面的 users 为 model 里面的 namespace 名称 */
     /* 
     我们没有手动注册 model，umi 帮我们进行了这一步操作，
      详见 src/pages/.umi/DvaContainer.js 文件，该文件会自动更新。
     相关规则详见umi官网#model注册 一节
     */
    const { list, total, page } = state.users;
    /* 注意这里的 users 为 model 的 namespace , 所以 dva-loading 的 loading 状态是对于 model 整体的 */
    const loading = state.loading.models.users;
    return {
        list,
        total: Number(total),
        page,
        loading
    }
}

export default connect(mapStateToProps)(Users);