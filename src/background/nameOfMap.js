import React from "react";

export class MapName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.value.name,
            subName: this.props.value.subName,
        }
    }

    componentWillReceiveProps(nextProps) {
        const value = nextProps.value
        this.setState({
            name: value.name,
            subName: value.subName,
        });
    }

    render() {
        return(
            <div>

            <div className={'map-name'}>
                <div className={"name"}>
                    <p>{this.state.name}</p>
                    <div className={"sub"}>{this.state.subName}</div>
                </div>
            </div>
            </div>
        );
    }
}