import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {Background} from './background/background.js';
import {Invoker} from "./service/invoker";
import {MAP} from './config/';

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: "",
            history: [],
            background: {},
        };

    }
    componentWillMount() {
        this.goTo(MAP.world);
    }

    goTo(location) {
        const data = Invoker.goTo(location);
        if(!data) return false;

        const points = data.points.map((point) =>  {
            return this.transformToPoint(point);
        });

        this.setState({
            current: data.img,
            background: {
                id: data.id,
                name: data.name,
                subName: data.subName,
                img: data.img,
                points : points,
            },
        });

        return true;
    }

    pushHistory(current) {
        this.state.history.push(current);
        this.setState({history: this.state.history});
    }

    goBack() {
        const history = this.state.history;
        const remainHistory = history.slice(0, history.length - 1);
        this.setState({history: remainHistory});

        this.goTo(history[history.length - 1]);
    }

    onClickPoint(point) {
        let isMoved = this.goTo(point.des);
        if(!isMoved) return;
        this.pushHistory(this.state.current);
    }

    transformToPoint(point) {
        return {
            level: point.level,
            name: point.name,
            x: point.x,
            y: point.y,
            url: point.url,
            info: point.info,
            onClick: () => {
                this.onClickPoint(point);
            } ,

        }
    }

    render() {
        return (
            <div>
                <Background
                    id={this.state.background.id}
                    name={this.state.background.name}
                    subName={this.state.background.subName}
                    img={this.state.background.img}
                    points={this.state.background.points}
                    back={{
                        canBack: this.state.history.length !== 0,
                        go : () => this.goBack(),
                    }}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <Map/>, document.getElementById('root')
);
