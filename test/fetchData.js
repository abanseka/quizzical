const axios = require("axios")

const getdata = async url => {
	try {
		const req = await axios.get(url)
		return req.data
	} catch (err) {
		err => `${err} is the error`
	}
}

module.exports = getdata
