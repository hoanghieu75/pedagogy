
import DATA from './data/data-a';
import MAP from './data/map';

export class Invoker {

    static goTo(location) {
        if(!location) return;
        location = location.trim().toLowerCase();

        let response = DATA.find((map) => {
           return (map.img && map.img.trim().toLowerCase()) === location
        });
        if(!response) return;

        let _response = Object.assign({}, response);
        _response.img = _response.img.trim().toLowerCase();
        _response.points = _response.points.filter(point => point.x && point.y);
        return _response
    }

    static typeOf(id) {
        let map = MAP.find((map) => map.id === id);
        if(!map) return;
        return map.type;
    }

    static nameOfId(id) {
        let map = MAP.find((map) => map.id === id);
        if(!map) return;
        return map.name;
    }

    static getChildrenOf(id) {
       let maps = MAP.filter(map => map.parentId === id);
       if(maps.length === 0) {
           console.log("City Not found of: "+ id);
           return [];
       }
       return maps.map(m => m.id);
    }
}