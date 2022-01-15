var imgur = require('imgur-node-api'),
    path = require('path');

imgur.setClientID(myClientID);
imgur.upload(path.join(__dirname, 'someimage.png'), function (err, res) {
    console.log(res.data.link); // Log the imgur url
});

imgur.upload('http://25.media.tumblr.com/tumblr_md1yfw1Dcz1rsx19no1_1280.png', function (err, res) {
    console.log(res.data.link);
});

imgur.delete('W0JfyHW', function (err, res) {
    console.log(res.data);
});

imgur.update(
    {
        id: 'W0JfyHW',
        title: 'My Title',
        description: 'My Description',
    },
    function (err, res) {
        console.log(res.data);
    }
);

imgur.getCredits(function (err, res) {
    console.log(res.data);
});
