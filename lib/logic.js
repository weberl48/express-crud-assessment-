module.exports = function(object) {
    var message = {
        errors: []
    };
    var form = object;
    message.errors.push("Please correct the following errors");
    if (form.title.trim() === "") {
        message.errors.push("Text Field cannot be blank");
    }
    if (form.body.trim() === "") {
        message.errors.push("Body cannot be blank");
    }
    if (form.excerpt.trim() === "") {
        message.errors.push("Excerpt cannot be blank");
    }
    return message;
};
