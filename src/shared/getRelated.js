const axios = require('axios');
const key = ['AIzaSyCYT5cLNysbX6E8EXJJ7bbgd5Z7LwHBxcg', 'AIzaSyDQqTBebnhLxKYJci1rvHB4bAnYOb2ISF4', 'AIzaSyC-wqQSn2_fLFIxqGfM1sIy5l1E_w4Zw8U', 'AIzaSyDhU9d-EBUq3S9De3rR9RQNVG92VqOWdEU'];
const get_related = (id, index) => {
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&key=${key[index]}&maxResults=50`)
        .then(data => {
            return data.data;
        })
        .catch(err => {
            if (index + 1 < key.length) {
                return get_related(id, index + 1);
            } else {
                return [];
            }
        })
}
module.exports = get_related;