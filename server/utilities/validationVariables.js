
module.exports = {
    user: {
        username: {
            min: 4,
            max: 18,
            regex: '^[a-zA-Z0-9-_]+$'
        },
        password: {
            min: 6,
            max: Infinity,
            regex: '^[a-zA-Z0-9-!@#$%^&*()_=+\/\\\|]+$'
        },
        email: {
            regex: '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
        }
    },
    challenge: {
        name: {
            min: 3,
            max: 50,
            regex: '.*'
        },
        urlName: {
            min: 3,
            max: 20,
            regex: '^[a-z0-9]+(?:-[a-z0-9]+)*$'
        }
    }
}