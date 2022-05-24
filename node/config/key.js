if (process.env.NODE_ENV === 'production') {
	// 배포상태
	module.exports = require('./product.js');
} else {
	// 개발 상태
	module.exports = require('./dev.js');
}
