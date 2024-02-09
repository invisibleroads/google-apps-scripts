/* 
 * @OnlyCurrentDoc
 */

function onOpen(e) {
  DocumentApp.getUi().createAddonMenu().addItem('Paste Timestamps', 'pasteTimestamps').addToUi();
}

function pasteTimestamps() {
  var document = DocumentApp.getActiveDocument();
  
  var minuteCount = 30;
  var selection = document.getSelection();
  if (selection) {
    var elements = selection.getRangeElements();
    var el = elements[0].getElement();
    var count = parseInt(el.getText());
    if (count) {
      minuteCount = count;
    }
    document.setCursor(document.newPosition(el, 0));
    for (var i = 0; i < elements.length; i++) {
      elements[i].getElement().removeFromParent();
    }    
  }

  var thisDate = new Date();
  var thisDayText = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][thisDate.getDay()];
  var thisMinuteCount = 15 * Math.ceil(thisDate.getMinutes() / 15);
  thisDate.setMinutes(thisMinuteCount);
  var thisText = getTimestamp(thisDate);
  var nextDate = new Date(thisDate);
  nextDate.setMinutes(thisMinuteCount + minuteCount)
  var nextText = getTimestamp(nextDate);
  var text = thisDayText + ' ' + thisText + ' - ' + nextText + ': ' + minuteCount + ' minutes';
  var cursor = document.getCursor();  
  document.setCursor(document.newPosition(cursor.insertText(text), text.length));
}

function getTimestamp(date) {
  return date.getFullYear() + getPaddedText(date.getMonth()) + getPaddedText(date.getDate()) + '-' + getPaddedText(
    date.getHours()) + getPaddedText(date.getMinutes());
}

function getPaddedText(text) {
  return ('0' + text || 0).slice(-2);
}
