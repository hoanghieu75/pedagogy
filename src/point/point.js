import React from "react";
import IMAGES from "../images"
import {MAP_TYPE} from "../config";


export class Point extends React.Component {

    static POINT_TYPE = "point";
    static AREA_TYPE = "area";
    static ICON_TYPE = "icon";

    constructor(props) {
        super(props);
        this.state = {
            type : Point.ICON_TYPE,
            showInfo: false,
            point : this.props.value,
            mapType: props.mapType,
        };
    }

    componentWillMount() {
        this.setType(this.state.point);
    }

    componentWillReceiveProps(nextProps) {
        const point = nextProps.value;

        this.setState({ point: point });
        this.setType(point);
    }

    setType(point) {
        if(MAP_TYPE.city === this.state.mapType) {
            this.setState({ type: Point.ICON_TYPE});
        } else {
            this.setState({ type: Point.POINT_TYPE});
        }
    }

    showInfo() {
        this.setState({showInfo: true})
    }

    hideInfo() {
        this.setState({showInfo: false})
    }

    renderPoint() {
        const style = this.getCoordinate();
        if(this.state.point.name) {
            style['minWidth'] = "200px";
        }

        return (
            <div className={"row nation-container"} style={style}>
                <div className={"col-lg-3 check"}>

                    <div className={'spinner'} />

                    <img className={"checkpoint animated"} alt=""
                         onMouseEnter={() => {
                             this.showInfo();
                             this.props.onHover();
                         }}
                         onMouseOut={() => this.hideInfo() }
                         src={IMAGES['pin']}
                         onClick={() => this.state.point.onClick()} />
                </div>


                {this.state.point.name &&
                    <div className="col-lg-9 info">
                        <span>{this.state.point.name}</span>
                    </div>
                }

            </div>
        );
    }

    renderIcon(style) {
        let img = this.state.point.info.img;
        return (
            <div className={'point-icon'}
                 style={this.getCoordinate()}
                 onClick={() => {
                     this.state.point.onClick();
                     this.props.onClick();
                 }} >

                <p>{this.state.point.name}</p>

                {img &&
                    <div onMouseEnter={() => { this.props.onHover() }}>
                        <img alt="" src={IMAGES[img.toLowerCase().trim()]} />
                    </div>
                }
            </div>
        )
    }

    getCoordinate() {
        return {
            left: this.state.point.x + 'px',
            top: this.state.point.y + 'px',
        };
    }

    render() {
        return (
            this.state.type === Point.POINT_TYPE ? this.renderPoint() : this.renderIcon()
        );
    }
}



