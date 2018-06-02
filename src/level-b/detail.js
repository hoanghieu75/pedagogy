import React from "react";
import IMAGES from "../images";

export class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: props.label,
            data: props.data,
        }
    }

    renderContent() {
        return this.state.data.content.map(e => {
            return (
                <div className={'col-3'}>{e}</div>
            );
        });
    }

    render() {

        const btn_back = <img alt="" className={'btn-back-arrow'}
                              src={IMAGES['left-arrow']}
                              onClick={() => { this.props.onClick() }}
                        />
        return (
            <div className={'detail-table'}>
                {btn_back}

                <h3 className={'neon-text'} style={{textAlign: 'center'}}>{this.state.label.toUpperCase()}</h3>
                <div class="row">
                    {this.renderContent()}
                </div>
            </div>

        );
    }

}