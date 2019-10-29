import React, { Component } from 'react';
import GeneralCard from './GeneralCard';
import APIManager from '../../modules/APIManager';
import "./General.css"
import Leaflet from "../../maps/Leaflet/Leaflet"
import "../../../node_modules/leaflet/dist/leaflet.css"


class GeneralListMap extends Component {

    state = {
        issues: []
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
    componentDidMount() {
        //console.log("General list: ComponentDidMount", this.props.Elements);
        this.getData("issues")
    }


    render() {

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
                                        Elements={"issues"}
                                        element={element}
                                        {...this.props}
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