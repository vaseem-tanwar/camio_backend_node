var config = {
    port: 1657,
    serverhost: 'http://localhost',
    environment: 'development', //development,staging,live
    environmentSslFile: '0', //0=> No Ssl File, 1=> Ssl file
    secretKey: 'hyrgqwjdfbw4534efqrwer2q38945765',
    restaurantSearchDistance: 7000,
    adminUrl: 'http://localhost:1655/#/',
    //serverImagePath:'http://localhost:1942/img/',
    serverImagePath:'http://localhost:1655/img/',
    serverImageUploadPath:'/ubeer/public/img/',
    googleAPiKey:'AIzaSyA894U-lA4acpK6Y6LEpQ8Dt_YsgGQxq5U',
    payStackSk:'',
    sessionSecret:'Saaah',
    jwtSecret:'camio-secret-key',
    production: {
        username: 'brain1uMMong0User',
        password: 'PL5qnU9nuvX0pBa',
        host: '68.183.173.21',
        port: '27017',
        dbName: 'saaah',
        authDb: 'admin'
    },
    sslPath: {
        key: '/etc/letsencrypt/live/nodeserver.mydevfactory.com/privkey.pem',
        cert: '/etc/letsencrypt/live/nodeserver.mydevfactory.com/fullchain.pem'
    },
    emailConfig: {
        MAIL_USERNAME: "saaah.noreply@gmail.com",
        MAIL_PASS: "csoirpjcxfgiuzdb",
        MAIL_HOST: "smtp.gmail.com",
        MAIL_PORT: 465,
    },
    google: {
        API_KEY: "AIzaSyAw0CssOJPRtZV4Sr-wxUa-KYTi6LnO11g" // 
    },
    emailTemplete: {
        siteUrl:"http://ubeer.com/",
        logoUrl: "https://logo.com/",
        appUrl: "https://app.com/",
        helpUrl: "https://help.com/",
        facebookUrl: "https://facebook.com/",
        twitterUrl: "https://twitter.com/Ubeer_phuza",
        instagramUrl: "https://instagram.com/",
        snapchatUrl: "https://snapchat.com/",
        linkedinUrl: "https://www.linkedin.com",
        youtubeUrl: "https://www.youtube.com",
        loginUrl: "https://login.com/",
        androidUrl: "https://android.com/",
        iosUrl: "https://ios.com/",
    },
    payment: {
        secret_key: "sk_test_64b536211a7b0fc9ff4011c5afe97726ab467a5f",
        CURRENCY: "zar",
        defaultPercentage: 20
    },
    delivery: {
        deliveryUrl : "",
        api_key : "",
        testMode : "NO"
    },
    twilio: { 
        testMode: "YES",
        TWILIO_SID: "AC9d666d6ad78f544c8a340f860951eee9",
        TWILIO_AUTHTOKEN: "858042be47404ff8f5d28e73347d5bae",
        friendlyName: "Ubeer",
        PHONE_NUMBER:"+19727522952"
    },
}
module.exports = config;
