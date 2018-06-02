import React from 'react';
import IMAGES from "../images";
import {LEARN_METHOD, LEVEL, MAP} from "../config";

export class LearnMethod extends React.Component {
    countDown;

    constructor(props) {
        super(props);
        this.state = {
            enable: false,
            name: "",
            mean: "",
            content: "",
        }
    }
    componentWillReceiveProps(nextProps) {
        const {level} = nextProps;
        let name,mean, content;
        if(LEVEL.inter === level.toLocaleLowerCase()) {
            name = LEARN_METHOD.lipe.name;
            mean = LEARN_METHOD.lipe.mean;
            content = LEARN_METHOD.lipe.content;
        } else {
            name = LEARN_METHOD.piele.name;
            mean = LEARN_METHOD.piele.mean;
            content = LEARN_METHOD.piele.content;
        }
        this.setState({
            enable: true,
            name: name,
            mean: mean,
            content: content,
        })

        this.shutdownAfter(6000);
    }

    shutdownAfter(time) {
        clearTimeout(this.countDown);
        this.countDown = setTimeout(() => {
            this.setState({enable: false})
        }, time)
    }

    render() {
        const background = {
            background: "url('"+ IMAGES[MAP.bee_back] +"') no-repeat",
            backgroundSize : '100% 100%',
        }
        return (
            this.state.enable &&
                <div className={'learn-method'} style={background} >
                    <p>{this.state.name}</p>
                    <p>{this.state.mean}</p>
                    <article>
                        {this.state.content}
                    </article>
                </div>
        );
    }

}
