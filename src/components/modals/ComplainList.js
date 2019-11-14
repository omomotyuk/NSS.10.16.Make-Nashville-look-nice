import React, { Component } from 'react';
/*
// 2019, Alex Momotyuk, Make Nashville Look Nice, NSS, Front-end capstone project
*/

//
class ComplainList extends Component {

    //
    render() {
        return (
            <>
                <article>
                    <div>COMPLAIN LIST</div>
                    <div className="complain-list">
                        {
                            (this.props.complains.length !== 0) ? (this.props.complains.map((issue, index) => (
                                <>
                                    <div key={issue.id} className="issue-div">
                                        <span style={{ color: "blue" }}>{issue.userId}</span>
                                        <span>{issue.complain}</span>
                                    </div>
                                </>
                            ))) : (null)
                        }
                    </div>
                </article>
            </>
        )
    }
}

export default ComplainList
