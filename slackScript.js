function IsNowTimeCheck(){
  var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1yfZ1DwaLn6g7jq_RrAt6yRioBaP4ct49qHoJKJoI46g/edit#gid=0');
  var sheet = ss.getSheets()[0];

  var lastRow = sheet.getLastRow();
  var holdYear = sheet.getSheetValues(lastRow,2,1,1);
  var holdMonth = sheet.getSheetValues(lastRow,3,1,1);
  var holdDay = sheet.getSheetValues(lastRow,4,1,1);

  var nowDate = new Date();
  var nowYear = nowDate.getFullYear();
  var nowMonth = nowDate.getMonth() + 1;
  var nowDay = nowDate.getDate();

  // 1月〜12月 閏年考慮せず
  const lastDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  //postSlackMessage(nowYear + "年" + nowMonth + "月"+ nowDay + "日");
  //postSlackMessage(holdYear + "年" + holdMonth + "月"+ holdDay + "日");

  // 会議日が1日の時だけ考慮　1月1日会議は考慮せず
  if(holdDay == 1){
    if(holdMonth != nowMonth + 1|| lastDay[nowMonth - 1] != nowDay){
      return;
    }
  }else{
    if(holdYear != nowYear || holdMonth != nowMonth || holdDay != nowDay + 1){
      return;
    }
  }

  var holdNumber = sheet.getSheetValues(lastRow,1,1,1);
  var holdAdotw = sheet.getSheetValues(lastRow,5,1,1);
  var holdHour = sheet.getSheetValues(lastRow,6,1,1);
  var holdMinute = sheet.getSheetValues(lastRow,7,1,1);
  var holdPlace = sheet.getSheetValues(lastRow,8,1,1);
  var holdAgenda = sheet.getSheetValues(lastRow,9,1,1);
  var holdNotes = sheet.getSheetValues(lastRow,10,1,1);

  var message = postSlackMessage("送りたいメッセージ");

}


function postSlackMessage(content) {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var slackApp = SlackApp.create(token);

  var options = {
    channelId: "#general",
    userName: "botの名前",
    message: content,
    icon_Url: "スプレッドシートのURL"
  };

  slackApp.postMessage(options.channelId, options.message, {username: options.userName, icon_url: options.icon_Url});
}
