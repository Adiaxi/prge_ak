import React, {useEffect, useState} from 'react';
import UserCard from "../components/UserCard";

function ListOfItems(props) {

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        //http://localhost:10000/app/get_users
        fetch('http://localhost:10000/app/get_users')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setUsers(res)
            })


         console.log('działa')
    },[])


    console.log('TO JEST MÓJ USERS I JEGO AKTUALNA ZAWARTOŚĆ', users.data)

    return (
        <div>
            List of items
            <div>
                {users.data?.map(user => <UserCard user={user}/>)}
            </div>

        </div>
    );
}

export default ListOfItems;