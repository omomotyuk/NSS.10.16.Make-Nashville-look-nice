import React, { Component } from 'react';
import GeneralCard from './GeneralCard';
import APIManager from '../../modules/APIManager';
import "./General.css"

class GeneralList extends Component {
    state = {
        allElements: []
    }

    getData = (Elements) => {
        APIManager.getAll(Elements).then((allElements) => {
            this.setState(() => {
                return {
                    allElements: allElements
                }
            })
        })
    }

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
                                this.state.allElements.map(element =>
                                    <GeneralCard
                                        key={element.id}
                                        Elements={this.props.Elements}
                                        element={element}
                                        {...this.props}
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