import React from "react";
import {Point} from "../point/point";
import {Info} from "./info";
import IMAGES, {IMAGES_AVATAR} from '../images'
import {MapName} from "./nameOfMap";
import { CSSTransitionGroup } from 'react-transition-group'
import {MAP, MAP_TYPE} from "../config";
import {LearnMethod} from "./learnMethod";
import {Invoker} from "../service/invoker";
import {Navigation} from "./navigation";

export class Background extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            level: "",
            name: {
                name: this.props.name,
                subName: this.props.subName,
            },
            type: "",
            id: this.props.id,
            img: this.props.img,
            districtSelected: "",
            points: this.props.points,
            isShowInfo: false,
            info: {},
        };
    }

    componentWillMount() {
        this.getTypeOfMap(this.state.id);
    }

    componentWillReceiveProps(nextProps) {
        const {name, id, subName, img, points} = nextProps;
        this.getTypeOfMap(id);

        this.setState({
            name:{
                name: name,
                subName: subName,
            },
            id: id,
            img: img,
            points: points,
            isShowInfo: false,
            info: {},
            districtSelected: "",
        });
    }

    getTypeOfMap(id) {
        this.setState({type: Invoker.typeOf(id)});
    }

    onClickPoint(point) {
        if (MAP_TYPE.city !== this.state.type) return;
        this.setState({districtSelected: point.name});
    }

    onHoverPoint(point) {
        this.setState({isShowInfo: true});
        if(point.level) {
            this.setState({level: point.level});
        }

        this.setAvatarPoint(point);
    }

    setAvatarPoint(point) {
        if(!point.info.img || (MAP_TYPE.city === this.state.type)) return;

        this.setState({
            info: {
                img: IMAGES_AVATAR[point.info.img.toLowerCase()],
            }
        });
    }


    onLeavePoint() {
        this.setState({isShowInfo: false});
    };


    renderPoints() {
        if (!this.state.points || this.state.points.length === 0) return;

        return this.state.points.map((point) => {
            return(
                <Point key={point.x + point.y}
                       value={point}
                       mapType={this.state.type}
                       onHover={() => this.onHoverPoint(point)}
                       onLeave={() => this.onLeavePoint()}
                       onClick={() => this.onClickPoint(point)}
                />
            )
        })
    }

    render() {
        const btn_back = (
            <div className="btn-back">
                <img alt=""
                    src={IMAGES['back_arrow']}
                    onClick={() => {
                        this.props.back.go();
                    }}
                />
            </div>
        );

        const level = (this.state.type === MAP_TYPE.world &&
                            <h2 className={"label-level"}>{this.state.level}</h2>);

        const info = <Info
                        img={this.state.info.img}
                        mapId={this.state.id}
                        district={this.state.districtSelected}
                        level={this.state.level}
                    />;

        const img_background = <img
                                    src={IMAGES[this.state.img]} alt=""
                                    style={{visibility : 'hidden'}}
                                />;

        let imgSrc = IMAGES[this.state.img];
        const style = {
            background: "url('"+ imgSrc +"') no-repeat",
            display: 'inline-block',
        }

        return (
            <div style={style}>

                <MapName value={this.state.name}/>
                {this.props.back.canBack && btn_back }
                {/*<Navigation*/}
                    {/*onClick={() => {}}*/}
                    {/*level={this.state.level}/>*/}

                {this.state.isShowInfo && level}

                {(this.state.type !== MAP_TYPE.world && this.state.type !== MAP_TYPE.level) && info }

                {MAP.world === this.state.img && <LearnMethod level={this.state.level} /> }

                <CSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {this.renderPoints()}
                </CSSTransitionGroup>

                {img_background}

            </div>
        );
    }
}