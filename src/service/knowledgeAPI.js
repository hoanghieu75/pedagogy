import {Invoker} from "./invoker";
import DATA_B_SUPER_BASIC from '../service/data/data-b3-super-basic';
import DATA_B_BASIC from '../service/data/data-b3-basic';
import DATA_B_PRE_INTER from '../service/data/data-b3-pre-inter';
import DATA_B_INTER from '../service/data/data-b3-inter';
import {LEVEL, MAP_TYPE} from "../config";
import _ from 'lodash';

export class KnowledgeAPI {

    static getByMapId(mapId, level) {

        let query = this.getQuery(mapId);

        let DB = this.dataOfLevel(level);
        if(!DB) return;

        let data = DB.filter(d => d[query.field] === mapId);

        let grouped = _.groupBy(data, (o) => o[query.groupingBy]);

        // total
        let totalVocab = [];
        let totalGram = [];
        let totalPhone = [];
        let totalSubject = [];
        data.forEach(d => {
            totalVocab = totalVocab.concat(d.vocabulary);
            totalGram.push(d.grammar);
            totalPhone.push(d.phonetics);
            totalSubject.push(d.subject);
        })
        totalVocab = this.removeDuplicate(totalVocab);
        totalGram = this.removeDuplicate(totalGram);
        totalPhone = this.removeDuplicate(totalPhone);
        totalSubject = this.removeDuplicate(totalSubject);

        // each group
        let result = Object.keys(grouped).map(name => {
            let records = grouped[name];

            let vocabs = [];
            let grammars = [];
            let phonetics = [];
            let subjects = [];

            records.forEach(i => {
                vocabs = vocabs.concat(i.vocabulary);
                grammars.push(i.grammar);
                phonetics.push(i.phonetics);
                subjects.push(i.subject);
            });
            vocabs = this.removeDuplicate(vocabs);
            grammars = this.removeDuplicate(grammars);
            phonetics = this.removeDuplicate(phonetics);
            subjects = this.removeDuplicate(subjects);

            return {
                name: name,
                img: "b." + name,
                topic: "",
                vocabulary: {
                    learn: vocabs.length,
                    total: totalVocab.length,
                    content: vocabs,
                },
                grammar: {
                    learn: grammars.length,
                    total: totalGram.length,
                    content: grammars,
                },
                phonetic: {
                    learn: phonetics.length,
                    total: totalPhone.length,
                    content: phonetics,
                },
                total: {
                    learn: subjects.length,
                    total: totalSubject.length,
                    content: subjects,
                },
            }

        });

        return {
            total: {
                vocab: totalVocab.length,
                gram: totalGram.length,
                phone: totalPhone.length,
                subject: totalSubject.length
            },
            data: result
        }
    }

    static getQuery(mapId) {
        let query = {
            field: "",
            groupingBy: "",
        };
        let mapType = Invoker.typeOf(mapId);
        switch (mapType) {
            case MAP_TYPE.country:
                query = {field: "countryId", groupingBy: "city"};
                break;
            case MAP_TYPE.city:
                query = {field: "cityId", groupingBy: "districtName"};
                break;
            case MAP_TYPE.district:
                query = {field: "districtId", groupingBy: ""};
                break;
            default: break;
        }
        return query;
    }

    static dataOfLevel(level) {
        let data;
        level = level.toLowerCase();
        switch (level) {
            case LEVEL.super_basic: data = DATA_B_SUPER_BASIC; break;
            case LEVEL.basic: data = DATA_B_BASIC; break;
            case LEVEL.pre_inter: data = DATA_B_PRE_INTER; break;
            case LEVEL.inter: data = DATA_B_INTER; break;
            default: break;
        }
        return data;
    }

    static removeDuplicate(arr){
        let unique_array = Array.from(new Set(arr));
        return unique_array
    }

}