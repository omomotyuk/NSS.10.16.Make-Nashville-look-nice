import React, { Component } from 'react';
import GeneralCard from './GeneralCard';
/*
// 2019, Alex Momotyuk, Make Nashville Look Nice, NSS, Front-end capstone project
*/

//
class GeneralCardList extends Component {

    //
    render() {
        return (
            <>
                <article>
                    {
                        this.props.issues.map(element =>
                            <GeneralCard
                                key={element.id}
                                Elements={"issues"}
                                element={element}
                                {...this.props}
                                onCheck={this.props.onCheck}
                                getData={this.props.getData}
                            />
                        )
                    }
                </article>
            </>
        )
    }
}

export default GeneralCardList
