var sortObject = require('./')
var fixture = {
    "c": true,
    "a": true,
    "b": null,
    "d": [
        {
            "c": true,
            "a": true,
            "b": null
        },
        {
            "c": true,
            "a": true,
            "b": null,
            "d": [
                {
                    "c": true,
                    "a": true,
                    "b": null
                }
            ]
        }
    ]
}
var actual = sortObject(fixture)
console.log(JSON.stringify(actual,null,4)) /* {
    "a": true,
    "b": null,
    "c": true,
    "d": [
        {
            "a": true,
            "b": null,
            "c": true
        },
        {
            "a": true,
            "b": null,
            "c": true,
            "d": [
                {
                    "a": true,
                    "b": null,
                    "c": true
                }
            ]
        }
    ]
} */
