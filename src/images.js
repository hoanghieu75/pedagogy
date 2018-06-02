function importAll(r, isLowerCase) {
    let images = {};
    r.keys().map((key, index) => {
        let imgName = key.substring(key.lastIndexOf('/') + 1);
        let img = imgName.substring(0, imgName.lastIndexOf('.'));
        img = img.trim().toLowerCase();
        images[img] = r(key);
        return "";
    });
    return images;
}

const IMAGES = importAll(require.context('./img/map'));
export default IMAGES;

export const IMAGES_AVATAR = importAll(require.context('./img/avatar'));
export const IMAGES_COUNTRY = importAll(require.context('./img/country'));
export const IMAGES_CITY = importAll(require.context('./img/city'));

