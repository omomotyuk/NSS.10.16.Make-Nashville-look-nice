import React, { Component } from 'react';
import GeneralCard from './GeneralCard';
import APIManager from '../../modules/APIManager';
import "./General.css"


class GeneralList extends Component {
    state = {
        issues: [],
        checked: []
    }

    getData = (Elements) => {
        APIManager.getAndFilter(Elements, "status", "active").then((issues) => {
            //console.log("GeneralList.getData - issues:", issues)
            this.setState(() => {
                return {
                    issues: issues
                }
            })
        })
    }
    //

    //
    onCheck = (id) => {
        console.log("onCheck - id:", id)
    }
    //
    componentDidMount() {
        //console.log("General list: ComponentDidMount", this.props.Elements);
        this.getData(this.props.Elements)
    }

    render() {
        //console.log("pls render Elements")
        return (
            <>
                <div className="map-flex-container">
                    <aside>
                        <article>
                            {/*<h1>{this.props.Elements} List</h1>*/}
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