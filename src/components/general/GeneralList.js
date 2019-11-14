import React, { Component } from 'react';
import GeneralCard from './GeneralCard';
import APIManager from '../../modules/APIManager';
import "./General.css"
/*
// 2019, Alex Momotyuk, Make Nashville Look Nice, NSS, Front-end capstone project
*/

//
class GeneralList extends Component {
    state = {
        issues: [],
        checked: []
    }

    //
    getData = (Elements) => {
        APIManager.getAndFilter(Elements, "status", "active").then((issues) => {
            this.setState(() => {
                return {
                    issues: issues
                }
            })
        })
    }

    //
    onCheck = (id) => {
        console.log("onCheck - id:", id)
    }

    //
    componentDidMount() {
        this.getData(this.props.Elements)
    }

    //
    render() {
        return (
            <>
                <div className="map-flex-container">
                    <aside>
                        <article>
                            {
                                this.state.issues.map(element =>
                                    <GeneralCard
                                        key={element.id}
                                        element={element}
                                        Elements={this.props.Elements}
                                        {...this.props}
                                        onCheck={this.onCheck}
                                        getData={this.getData}
                                    />
                                )
                            }
                        </article>
                    </aside>
                    <main>
                        <img className="test-map" src={require("../../images/test-map.png")} alt="test map" />
                    </main>
                </div>
            </>
        )
    }
}

export default GeneralList;
