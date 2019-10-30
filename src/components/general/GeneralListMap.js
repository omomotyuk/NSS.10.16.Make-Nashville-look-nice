import React, { Component } from 'react';
import GeneralCard from './GeneralCard';
//import APIManager from '../../modules/APIManager';
import "./General.css"
import Leaflet from "../../maps/Leaflet/Leaflet"
import "../../../node_modules/leaflet/dist/leaflet.css"


class GeneralListMap extends Component {

    state = {
        issues: [],
        checked: new Map()
    }

    //
    onCheck = (id) => {
        //console.log("onCheck - id:", id)
        this.setState((prev) => {
            return {
                checked: (prev.checked.has(id) ? prev.checked.set(id, !prev.checked.get(id)) : prev.checked.set(id, true))
            }
        })
        //console.log("checked:", this.state.checked)
    }

    getData = () => {
    }

    componentDidMount() {
        //console.log("didMount - props", this.props)
        console.log("didMount - path:", this.props.match.path)
    }




    render() {

        return (
            <>
                <div className="map-flex-container">
                    <aside>
                        <article>
                            {/*<h1>{this.props.Elements} List</h1>*/}
                            {
                                this.props.issues.map(element =>
                                    <GeneralCard
                                        key={element.id}
                                        Elements={"issues"}
                                        element={element}
                                        {...this.props}
                                        onCheck={this.onCheck}
                                        getData={this.getData}
                                    />
                                )
                            }
                        </article>
                    </aside>
                    <main>
                        <Leaflet locations={this.props.locations} />
                        {/*<img className="test-map" src={require("../../images/test-map.png")} alt="test map" />*/}
                    </main>

                </div>
            </>
        )
    }
}

export default GeneralListMap;