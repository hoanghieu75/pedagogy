import React from "react";
import IMAGES from "../images";
import Coverflow from 'react-coverflow';

export class Album extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSubject : props.imgSubject,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({imgSubject: nextProps.imgSubject});

    }

    renderImage() {
        return this.state.imgSubject.map((i, index) => <img key={index} alt={i.subject} src={IMAGES[i.img]} />);
    }

    render() {

        return(
            <div className={'album'}>
                <Coverflow
                    displayQuantityOfSide={1}
                    navigation={true}
                    enableHeading={true}
                    currentFigureScale={2}
                    otherFigureScale={0.8}
                >
                    {this.renderImage()}

                </Coverflow>
            </div>
        );
    }
}