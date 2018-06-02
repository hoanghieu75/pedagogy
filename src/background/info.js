import React from "react";
import {Knowledge} from "../level-b/knowledge";
import IMAGES from "../images";
import { CSSTransitionGroup } from 'react-transition-group'
import {Album} from "../level-b/album";
import {KnowledgeAPI} from "../service/knowledgeAPI";

export class Info extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            level: props.level,
            mapId: props.mapId,
            district: props.district,
            img: props.img,
            isShowKnowledge: false,
            vocabulary: {
                total: 0,
                progress: 0,
            },
            grammar: {
                total: 0,
                progress: 0,
            },
            phonetic: {
                total: 0,
                progress: 0,
            },
            total: {
                total: 0,
                progress: 0,
            },
            knowlegdes : [],
        }
    }

    componentWillMount() {
        this.getProgress(this.state.mapId);
    }

    componentWillReceiveProps(nextProps) {
        const {img, mapId, district, level} = nextProps;
        this.getProgress(mapId);
        this.setState({
            img: img,
            mapId: mapId,
            level: level,
            isShowKnowledge: false,
            district: district,
        });
    }

    getProgress(mapId) {

        let result = KnowledgeAPI.getByMapId(mapId, this.state.level);
        if(!result) return;

        // TODO: get progress of user F2
        let total = result.total;
        this.setState({vocabulary: { total: total.vocab }});
        this.setState({grammar: { total: total.gram }});
        this.setState({phonetic: { total: total.phone }});
        this.setState({total: { total: total.subject }});
        this.setState({knowlegdes: result.data});
    }

    renderThumbnail() {
        return (
            <div>
                <div className="thumbnail">
                    <img src={this.state.img} alt=""/>
                    <div className="line"/>
                </div>
            </div>
        );
    }

    renderAlbum() {
        let imgSubject = this.findAlbum();
        return <Album imgSubject={imgSubject} />
    }

    findAlbum() {
        let districtSelected = this.state.district.trim().toLowerCase().replace(/ /g, '');
        let DATA = KnowledgeAPI.dataOfLevel(this.state.level);
        let areas = DATA.filter(o => districtSelected.includes(o.districtName.trim().toLowerCase().replace(/ /g, '')));

        let imageResource = Object.keys(IMAGES);
        let imgSubject = areas.map(a => {
            let subject = a.subject;
            subject = this.cleanStrAndLowerCase(subject).trim();
            let img = imageResource.find(img => this.cleanStrAndLowerCase(img).includes(subject));
            return {
                img: img,
                subject: a.subject,
            }
        });
        return imgSubject;
    }

    cleanStrAndLowerCase(str) {
        return str.replace(/[^a-zA-Z ]/g, "").toLowerCase();
    }

    contain(array, target) {
        let contain = array.find(e => {
            e = e.replace(/[^a-zA-Z ]/g, "");
            return target.includes(e);
        });
        return contain !== undefined;
    }

    render() {
        return (
            <div className="background-info">
                {this.state.img && this.renderThumbnail() }
                {this.state.district && this.renderAlbum() }

                <div className={'progress-info'}>
                    {this.progressOf(this.state.total, 'total')}
                    {this.progressOf(this.state.vocabulary, 'vocab')}
                    {this.progressOf(this.state.grammar, 'gram')}
                    {this.progressOf(this.state.phonetic, 'phonetic')}
                </div>

                <CSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {this.state.isShowKnowledge && <Knowledge
                                                        level={this.state.level}
                                                        data={this.state.knowlegdes}
                                                    />}
                </CSSTransitionGroup>
            </div>
    )};

    progressOf(value, img) {
        return (
            <div className={"row"}
                 onClick={() => {
                     if(this.state.knowlegdes.length > 0){
                        this.setState({isShowKnowledge: ! this.state.isShowKnowledge})
                     }
                 }} >

                <div className={"col-4 total"}>
                    <img alt="" style={{float: 'left', width: '30px'}}
                         src={IMAGES[img]}
                    />
                    {value.total}
                </div>

                <div className={"col-8 bar"}>
                    <div className="progress neon-box">
                        <div className="progress-bar bg-warning" role="progressbar"
                             style={{width: value.progress}}></div>
                    </div>
                </div>
            </div>
        );
    }

}