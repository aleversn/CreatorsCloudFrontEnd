let verifyFunction = {
    Email: {
        verify: function (val)
        {
            return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
                val
            );
        },
        message: "邮箱格式错误"
    },
    Phone: {
        verify: function (val)
        {
            return /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])d{8}$/.test(
                val
            );
        },
        message: "手机格式错误"
    },
    Password: {
        verify: function (val)
        {
            return /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(
                val
            );
        },
        message: "密码格式错误，至少包含大小写数字和特殊符号"
    },
    UserName: {
        verify: function (val)
        {
            return /^[a-zA-Z0-9_-]{4,16}$/.test(val);
        },
        message: "用户名错误"
    },
    NickName: {
        verify: function (val)
        {
            return /^[\d]{6,8}/.test(val);
        },
        message: "昵称格式错误"
    },
    Gender: {
        verify: function (val)
        {
            return /^(male|female|secret)$/.test(val);
        },
        message: "性别格式错误"
    },
    VerifyCode: {
        verify: function (val)
        {
            return val > 100000 && val < 99999999;
        },
        message: "验证码格式错误"
    }
};

/**
 * @summary 验证表单
 * @param {*} form
 * @param {*} rule
 */
async function VerifyForm(form, rule)
{
    if (typeof form == "object")
    {
        let errors;
        if (Array.isArray(form))
        {
            errors = [];
            for (let index in rule)
            {
                let error = await VerifyForm(form[index], rule[index]);
                if (error)
                {
                    errors.push(error);
                }
            }
        } else
        {
            errors = {};
            let verifyState = true;
            for (let key in rule)
            {
                if (
                    rule[key].verify &&
                    typeof rule[key].verify == "function" &&
                    !rule[key].verify(form[key])
                )
                {
                    errors[key] = {
                        message: rule[key].message
                    };
                    verifyState = false;
                }
            }
            if (verifyState)
            {
                return null;
            }
            return errors;
        }
    }
    return null;
}

export default {
    install(Vue)
    {
        Vue.prototype.$verify = {
            verify: VerifyForm,
            method: verifyFunction
        };
    },
    verify: {
        verify: VerifyForm,
        method: verifyFunction
    }
};