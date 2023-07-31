'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }

  // 診断結果表示エリアの作成
  resultDivision.innerText = '';
  
  // headerDivision の作成
  const headerDivision = document.createElement('div');
  headerDivision.setAttribute('class', 'card-header text-bg-primary');
  headerDivision.innerText = '診断結果';

  // bodyDivision の作成
  const bodyDivision = document.createElement('div');
  bodyDivision.setAttribute('class', 'card-body');

  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'card-text');
  const result =assessment(userName);
  paragraph.innerText = result;
  bodyDivision.appendChild(paragraph);

  // resultDivision に Bootstrap のスタイルを適用する
  resultDivision.setAttribute('class', 'card');

  // headerDivision と bodyDivision を resultDivision に差し込む
  resultDivision.appendChild(headerDivision);
  resultDivision.appendChild(bodyDivision);

  //　ツイートエリアの作成
  tweetDivision.innerText = '';
  const anchor = document.createElement('a');
  const hrefValue =
  'https://twitter.com/intent/tweet?button_hashtag=' +
  encodeURIComponent('あなたにおすすめのゲーム') +
  '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.setAttribute('class', 'twitter-hashtag-button');
  anchor.setAttribute('data-text', result); 
  anchor.innerText = 'Tweet #あなたにおすすめのゲーム';

  tweetDivision.appendChild(anchor);
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivision.appendChild(script);
};


userNameInput.onkeydown = event => {
  if (event.key === 'Enter') {
    assessmentButton.onclick();
  }
};

const answers = [
  '###userName###におすすめのゲームは「スーパーマリオブラザーズ ワンダー」です。喋る花や、生き物のように動く土管などが登場する、とてもユニークなゲームです。',
  '###userName###におすすめのゲームは「スプラトゥーン３」です。イカしたヤツらのイカしたバトル！　イカやタコのようなキャラクターを使ってオンラインで4対４のナワバリバトルなど、様々なバトルが楽しめるゲームです。',
  '###userName###におすすめのゲームは「ピクミン４」です。探して、運んで、戦って。未知の生物　ピクミンを使ってダンドリよく攻略していくゲームです。',
  '###userName###におすすめのゲームは「ゼルダの伝説　ティアーズ　オブ　ザ　キングダム」です。前作から6年の時を経て発売された、ゼルダシリーズ最新作！　オープンワールド型のゲームで、地上、地底、天空の３つのマップを自由に行き来できます。',
  '###userName###におすすめのゲームは「大乱闘スマッシュブラザーズ　SPECIAL」です。スマブラ史上最大規模　全87体のファイターが参戦！愉快なパーティゲームです。',
  '###userName###におすすめのゲームは「マリオカート８　デラックス」です。白熱したレースを楽しめる！お馴染みのキャラクターたちがカートに乗ってレースをします。',
  '###userName###におすすめのゲームは「マリオパーティ　スーパースターズ」です。友達や家族とやれば、盛り上がること間違いなしなパーティゲーム！　マリオシリーズのキャラクターが登場します。',
  '###userName###におすすめのゲームは「星のカービィ　ディスカバリー」です。カービィシリーズ初の３D作品！　いろんなものを吸い込んで姿を変えるカービィを操作してゴールを目指しましょう。',
  '###userName###におすすめのゲームは「NintendoSwitch Sports」です。家の中で体を動かそう！　サッカー、バレーボール、ボウリングなど、様々なスポーツを楽しめます。',
  '###userName###におすすめのゲームは「ポケットモンスター　SV」です。ポケットモンスター最新作！　オープンワールド型のゲームで、相棒のポケモンを連れて歩けます。',
  '###userName###におすすめのゲームは「エブリバディ 1-２-Switch!」です。最大100人！　joy-conだけでなく、スマートフォンでもプレイできます。',
  '###userName###におすすめのゲームは「スーパーマリオメーカー　２」です。つくれ！ あそべ！ みんなでマリオ！　自分でコースを作ったり、世界中の人と一緒に遊んだりできるゲームです。',
  '###userName###におすすめのゲームは「ゼルダの伝説　スカイウォードソード」です。ゼルダの伝説、はじまりの物語。　ゼルダ史の中で一番初めに位置する作品です。',
  '###userName###におすすめのゲームは「ゼルダの伝説　ブレス　オブ　ザ　ワイルド」です。駆ける、活きる、護る。 果てなき冒険を思いのままに。　100年前滅んだ王国を気ままに冒険する、オープンワールド型のゲームです。',
  '###userName###におすすめのゲームは「ゼルダの伝説　トワイライトプリンセス」です。あの名作、時のオカリナの続編！　勇者リンクとして影の領域になってしまったハイラルを救うゲームです。',
  '###userName###におすすめのゲームは「花札」です。　任天堂の原点がここに。 1889年から続く任天堂の歴史を体感してみてください。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('###userName###', userName);
  return result;
}

// テストコード
console.assert(
  assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
