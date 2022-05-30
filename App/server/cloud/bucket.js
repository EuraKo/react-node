const AWS = require('aws-sdk');
//multer, multer-3s 모듈 불러오기
const multer = require('multer');
const multerS3 = require('multer-s3');
//path추가
const path = require('path');

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
//인증키 등록
const access_key = 'p9uUiLQHGM6xVZBWP1nn';
//시크릿 키 등록
const secret_key = '7Q9a23t8wFjxiYO09u0M3gEZATETcb4PGLstaqTJ';

const S3 = new AWS.S3({
	endpoint: endpoint,
	region: region,
	credentials: {
		accessKeyId: access_key,
		secretAccessKey: secret_key,
	},
});

//버킷 이름을 인수로 전달하는 함수를 만들고
function setUpload(bucket) {
	//multer-s3 npm 문서에 upload구문 복사 붙여넣기
	var upload = multer({
		storage: multerS3({
			s3: S3, //위의 인스턴스 이름 매칭
			bucket: bucket, //파라미터 이름 매칭
			//이곳에 있던 meta-data 코드는 삭제
			acl: 'public-read-write', //누구나 쓰고 읽을 수 있는 권한 옵션인 public-read-write로 설정
			key: function (req, file, cb) {
				//path모듈로 전달받은 파일의 원본 파일명을 저장
				let extension = path.extname(file.originalname);
				//날짜문자 뒤에 기존 파일명 붙이기
				cb(null, Date.now().toString() + extension);
			},
		}),
	}).single('file');

	return upload; //내부의 upload를 리턴
}

module.exports = setUpload;
