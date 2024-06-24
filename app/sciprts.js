const data = {};

let issueNumber = 1;

function POST_issuePost() {
  // API 요청을 흉내내기 위해 10ms만큼의 딜레이를 추가

  return new Promise((res) => {
    console.log('POST 요청 실행 !');
    setTimeout(() => {
      res({ number: issueNumber++ });
    }, 0);
  });
}

function parsePost() {
  console.log(`현재의 이슈 넘버 ${data.issueNumber}`);
  if (!data.issueNumber) {
    console.log(`분기문에 들어온 이슈 넘버 ${data.issueNumber}`);

    POST_issuePost()
      .then((response) => {
        console.log(`POST_issuePost 로 받아온 number : ${response.number}`);
        data.issueNumber = response.number;
        console.log(`write 작업이 완료된 후의 이슈 넘버 ${data.issueNumber}`);
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  }
}

parsePost();
parsePost();
parsePost();
parsePost();
