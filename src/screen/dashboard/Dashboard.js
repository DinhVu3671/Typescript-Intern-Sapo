import React from 'react';
import { useSelector, useDispatch } from "react-redux";



function Dashboard() {

    const userName = useSelector((state) => state.setStateUser.userName);
    return (
        <div>
            <div className="col-sm-4 offset-sm-4">
                Hello {userName}
            </div>
        </div>
    )
}
export default Dashboard