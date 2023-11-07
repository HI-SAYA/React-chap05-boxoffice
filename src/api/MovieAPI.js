/* 일별 박스오피스 정보 조회 */

const BASE_URL = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/';
const API_KEY = '1da2a56adea147bfe6de4427f0bac836';

/* 어제 날짜를 포맷에 맞춰서 반환하는 함수 */
const getDateFormat = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
    const date = today.getDate() - 1 < 10 ? '0' + (today.getDate() - 1) : today.getDate() - 1;

    return `${year}${month}${date}`;
}

/* 일별 박스오피스 정보 조회 (어제 기준 10개의 영화) */
export async function getMovieList() {

    const url = `${BASE_URL}boxoffice/searchDailyBoxOfficeList.json?key=${API_KEY}&targetDt=${getDateFormat()}`;
    const response = await fetch(url);
    const data = await response.json(); // await 붙이지 않으면 코드가 그대로 쭉 진행해서 데이터를 담지 않는다.

    console.log(data);

    return data.boxOfficeResult.dailyBoxOfficeList;
}

/* 영화 코드를 전달하여 영화 상세 정보 조회 */
export async function getMovieDetail(movieCd) {

    const url = `${BASE_URL}movie/searchMovieInfo.json?key=${API_KEY}&movieCd=${movieCd}`;
    const response = await fetch(url);
    const data = await response.json();

    return data.movieInfoResult.movieInfo;
}