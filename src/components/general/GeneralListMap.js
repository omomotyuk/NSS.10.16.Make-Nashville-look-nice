import React, { Component } from 'react';
import { Button } from 'reactstrap';
import GeneralCardList from './GeneralCardList';
import APIManager from '../../modules/APIManager';
import Leaflet from "../../maps/Leaflet/Leaflet"
import "../../../node_modules/leaflet/dist/leaflet.css"
import UploadModal from "../modals/UploadModal"
import ComplainModal from "../modals/ComplainModal"
import "./General.css"
/*
// 2019, Alex Momotyuk, Make Nashville Look Nice, NSS, Front-end capstone project
*/

//
class GeneralListMap extends Component {

    state = {
        issues: [],
        checked: new Map(),
        complains: []
    }

    //
    onCheck = (id) => {
        this.setState(() => {
            return {
                checked: (this.state.checked.has(id) ? this.state.checked.delete(id) : this.state.checked.set(id, true))
            }
        })
    }

    //
    getData = () => {
    }

    //
    updateChecked = () => {
        this.state.checked.forEach((value, key) => {
            APIManager.get("issues", key)
                .then(issue => {
                    issue.status = "closed"
                    this.updateLocation(issue.id)
                    return (issue)
                })
                .then(issue => {
                    APIManager.updateRecord("issues", key, issue)
                        .then(() => {
                            this.props.reload()
                        })
                })
        })
        return true
    }

    //
    updateLocation = (issue) => {
        let returnedStorage = localStorage.getItem('locations')
        let LSLocations = JSON.parse(returnedStorage)
        LSLocations = LSLocations.filter(location => location.issue !== issue)
        localStorage.setItem("locations", JSON.stringify(LSLocations));
    }

    //
    uploadPhoto = () => { }

    //
    showComplains = () => { }

    //
    closeThemAll = () => {
        this.updateChecked()
    }

    //
    getComplains = () => {
        APIManager.allRecords("issues")
            .then(complainList => {
                this.setState(() => {
                    return {
                        complains: complainList.filter(issue => issue.complain !== "")
                    }
                })
            })
    }

    //
    showButton = () => {
        switch (this.props.path) {
            case "upload":
                return (
                    <UploadModal
                        issues={this.props.issues}
                        locations={this.props.locations}
                        reload={this.props.reload}
                        level={this.props.level}
                        {...this.props} />
                )
                break;
            case "close":
                return (
                    <Button color="danger" onClick={this.closeThemAll}>Close issue</Button>
                )
                break;
            case "complain":
                return (
                    <ComplainModal
                        users={this.props.users}
                        issues={this.props.issues}
                        photos={this.props.photos}
                        locations={this.props.locations}
                        level={this.props.level}
                        complains={this.state.complains}
                        newLevel={this.props.setLevel}
                        {...this.props} />
                )
                break;
            default: { return null }
        }
    }

    //
    componentDidMount() {
        this.getComplains()
    }

    //
    render() {
        return (
            <>
                <div className="map-flex-container">
                    <aside>
                        {
                            (parseInt(this.props.level) > 0) ? (
                                <>
                                    {
                                        this.showButton()
                                    }
                                </>
                            ) : (<></>)
                        }
                        <article>
                            <GeneralCardList
                                issues={this.state.issues}
                                Elements={"issues"}
                                {...this.props}
                                onCheck={this.onCheck}
                                getData={this.getData}
                            />
                        </article>
                    </aside>
                    <main>
                        <Leaflet
                            locations={this.props.locations} />
                    </main>
                </div>
            </>
        )
    }
}

export default GeneralListMap;
