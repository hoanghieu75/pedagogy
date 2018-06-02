import React from "react";
import IMAGES, {IMAGES_CITY} from '../images'
import './b.css';
import DATA_B2 from '../service/data/data-b2';
import DATA_SKILL from '../service/data/data-b-skill';
import {Detail} from "./detail";

export class Knowledge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            dataAchieved: [],
            skill: {
                listen:"",
                speak: "",
                reflex: "",
            },
            selectedAchieved: {},
            isTableAchieved: false,
            detail:{
                show: false,
                data: [],
                label: "",
            },
            level: props.level,
            showNote: false,
        }
    }

    componentWillMount() {
        let skill = DATA_SKILL.find(skill => skill.level.toLowerCase() === this.state.level.toLowerCase());
        this.setState({skill: skill});
    }

    componentDidMount() {
        let ratio = this.getRatioOfLevel();
        if(!ratio) return;
        let dataAchieved = this.state.data.map(data => {
            return {
                id: data.id,
                name: data.name,
                img: data.img,
                vocabulary: {
                    know: this.formatNumber(ratio.vocab.know * data.vocabulary.learn),
                    under: this.formatNumber(ratio.vocab.under * data.vocabulary.learn),
                    use: this.formatNumber(ratio.vocab.use * data.vocabulary.learn),
                    ana: this.formatNumber(ratio.vocab.ana * data.vocabulary.learn),
                },
                grammar: {
                    know: this.formatNumber(ratio.gram.know * data.grammar.learn),
                    under: this.formatNumber(ratio.gram.under * data.grammar.learn),
                    use: this.formatNumber(ratio.gram.use * data.grammar.learn),
                    ana: this.formatNumber(ratio.gram.ana * data.grammar.learn),
                },
                phonetic: {
                    know: this.formatNumber(ratio.phone.know * data.phonetic.learn),
                    under: this.formatNumber(ratio.phone.under * data.phonetic.learn),
                    use: this.formatNumber(ratio.phone.use * data.phonetic.learn),
                    ana: this.formatNumber(ratio.phone.ana * data.phonetic.learn),
                }
            }
        });
        this.setState({dataAchieved: dataAchieved});
    }
    
    formatNumber(number) {
        if(isNaN(number)) return "";
        return Math.round(number / 100);
    }

    getRatioOfLevel() {
        return DATA_B2.find(o => o.level.toLowerCase() === this.state.level.toLowerCase());
    }

    showAchieved(name) {
        if(!this.state.dataAchieved) return;
        let selectedAchieved = this.state.dataAchieved.find(data => data.name === name);
        if(!selectedAchieved) return;

        this.setState({selectedAchieved: selectedAchieved});
        this.setState({isTableAchieved: true});
    }

    renderContent() {
        if(this.state.isTableAchieved) {
            return this.renderRowAchieved();
        }
        return this.state.data.map(location => this.renderRow(location))
    }

    renderImg(file, width) {
        return <img alt=""
                    width={width + 'px'}
                    src={IMAGES[file]} />
    }

    renderRowAchieved() {
        let achieved = this.state.selectedAchieved;
        return (
            <tbody className={"text-center-neon"}>
                <tr>
                    <td>
                        <div className={'table-city'}
                             onClick={() => this.setState({isTableAchieved: false})} >

                            {achieved.name && <img alt=""
                                                   height={'60px'}
                                                   src={IMAGES_CITY[achieved.name.toLowerCase()]} />}
                            <div className={'name neon-text'}>
                                <img width={'15px'} alt=""
                                     src={IMAGES['back_arrow']}
                                     style={{marginRight: '10px'}}
                                />
                                {achieved.name}
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        {this.renderImg('idea', 30)}
                        <p>Biết/Nhớ</p>
                    </td>
                    <td></td>
                    <td>{achieved.vocabulary.know}</td>
                    <td>{achieved.grammar.know}</td>
                    <td>{achieved.phonetic.know}</td>
                    <td></td>

                </tr>
                <tr>
                    <td>
                        {this.renderImg('brainstorm', 30)}
                        <p>Hiểu</p>
                    </td>
                    <td></td>
                    <td>{achieved.vocabulary.under}</td>
                    <td>{achieved.grammar.under}</td>
                    <td>{achieved.phonetic.under}</td>
                    <td></td>

                </tr>
                <tr>
                    <td>
                        {this.renderImg('pencil', 30)}
                        <p>Vận dụng</p>
                    </td>
                    <td></td>
                    <td>{achieved.vocabulary.use}</td>
                    <td>{achieved.grammar.use}</td>
                    <td>{achieved.phonetic.use}</td>
                    <td></td>

                </tr>
                <tr>
                    <td>
                        {this.renderImg('coding', 30)}
                        <p>Phân tích</p>
                    </td>
                    <td></td>
                    <td>N/A</td>
                </tr>
            </tbody>
        );
    }
    
    

    renderRow(data) {
        let topics = [];
        if(data.topic) {
            topics = data.topic.map(topic => {
                return <p>{topic}</p>
            });
        }
        return (

            <tr>
                <td>
                    <div className={'table-city'}
                         onClick={() => this.showAchieved(data.name)}
                    >
                        {data.name &&
                            <img alt=""
                                 height={'60px'}
                                 src={IMAGES_CITY[data.name.toLowerCase()]} />
                        }
                        <div className={'name neon-text'}>{data.name}</div>
                    </div>
                </td>

                <td>{topics}</td>

                {this.renderBar(data, 'blue', 'vocabulary')}
                {this.renderBar(data, 'blue', 'grammar')}
                {this.renderBar(data, 'blue', 'phonetic')}
                {this.renderBar(data, '', 'total')}
            </tr>
        );
    }

    renderBar(data, style, field) {
        if(isNaN(data[field].learn)) {
            return (
                <td className={style}>
                    <p>{data[field].learn}</p>
                </td>
            );
        }
        return (
            <td className={"pointer " + style}
                onClick={() => this.showDetail(data.name, field)}
            >
                <p>{data[field].learn}/{data[field].total}</p>
                <div class="progress neon-box">
                    <div class="progress-bar bg-warning" role="progressbar"
                         style={{width: (data[field].learn * 100/ data[field].total) + '%'}}></div>
                </div>
            </td>
        );
    }

    showDetail(name, field) {
        let data = this.state.data.find(d => name === d.name);
        this.setState({detail: {show: true, data: data[field], label: field}});
    }

    showNote() {
        this.setState({showNote: !this.state.showNote});
    }

    render() {
        const style = {
            background: "url("+IMAGES['earth']+") no-repeat",
            backgroundSize: '100% 100%',
            padding: '15px',
            minHeight: '98%',
            maxHeight: '98%',
            top: '1%',
            right: '1%',
            left: '80px',
            position: 'fixed',
            zIndex: 4,
            overflowY: 'auto',
        }

        if(this.state.detail.show) {
            return (
                <div style={style} className={'neon-box'}>
                    <Detail
                        onClick={() => this.setState({detail : {show: false}})}
                        data={this.state.detail.data}
                        label={this.state.detail.label}/>
                </div>
            );
        }

        let rowSpan = this.state.data.length + 1;
        return (
            <div style={style} className={'neon-box'}>
                <div>
                    <table>
                        <tr key={1} className={'neon-text header'} >
                            <th width="10%">Name</th>
                            <th width="10%">Topic</th>
                            <th colSpan={3} width="36%" className={'blue'}>Knowledge</th>
                            <th colSpan={4} width="44%">Communication skill</th>
                        </tr>
                        <tr key={2} style={{textAlign: 'center'}}
                            className={'neon-text sub-header'}
                            onClick={() => this.showNote()}>
                            <td></td>
                            <td></td>
                            <td className={'blue'} width="12%">
                                <p>Vocabulary usage</p>
                            </td>
                            <td className={'blue'} width="12%">
                                <p>Grammar usage</p>
                            </td>
                            <td className={'blue'} width="12%">
                                <p>Phonetic usage</p>
                            </td>
                            <td width="11%">
                                <p>General</p>
                            </td>
                            {!this.state.isTableAchieved && this.state.skill && [
                                    <td rowSpan={rowSpan} width="11%" className={'article'}>
                                        <p>Listening</p>
                                        <p>{this.state.skill.listen}</p>
                                    </td>,
                                    <td rowSpan={rowSpan} width="11%" className={'article'}>
                                        <p>Speaking</p>
                                        <p>{this.state.skill.speak}</p>
                                    </td>,
                                    <td rowSpan={rowSpan} width="11%" className={'article'}>
                                        <p>Reflex</p>
                                        <p>{this.state.skill.reflex}</p>
                                    </td>
                                ]
                            }
                        </tr>
                        {this.state.showNote &&
                            <tr key={3} className={'content-top'}>
                                <td></td>
                                <td></td>
                                <td>
                                    <div className={'note'}>Number of vocabulary / Total number vocabulary of current level</div>
                                </td>
                                <td>
                                    <div className={'note'}>Number of grammar structures / Total number of grammar structures of current level</div>
                                </td>
                                <td>
                                    <div className={'note'}>Number of phonetic features / Total number of phonetic features of current level</div>
                                </td>
                                <td>
                                    <div className={'note'}>Number of contexts / total number of contexts</div>
                                </td>

                            </tr>
                        }

                        {this.renderContent()}
                    </table>
                </div>
            </div>
        );
    };

}
