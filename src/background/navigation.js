import React from "react";
import {Invoker} from "../service/invoker";
import DATA from '../service/data/data-a';
import {IMAGES_COUNTRY} from "../images";

export class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            level: props.level,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({level: nextProps.level})
    }

    renderImage() {
        let mapWorld = DATA[0];
        let level = mapWorld.points.find(m => m.level.toLowerCase() === this.state.level.toLowerCase());
        if(!level) return null;

        let childrenOfLevel = Invoker.goTo(level.des).points;
        if(childrenOfLevel.length < 2) return null;

        let maps = childrenOfLevel.map(c => {
            return Invoker.goTo(c.des);
        });

        return maps.map(m => {
            const style = {
                background: "url('"+ IMAGES_COUNTRY[m.id] +"') 100% 100%/ contain no-repeat",
                backgroundPosition: 'center',
                width: '60px',
                height: '60px',
                float: 'right',
                border: '1px solid white',
                borderRadius: '50%',
                marginRight: '10px',
            }
            return <div className={'country-icon'} style={style} />
        })
    }


    render(){
        return (
            <div className={'list-country'}>
                {this.renderImage()}
            </div>
        );
    }
}