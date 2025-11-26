// Отладочные логи
console.log('Bridge:', window.AdaptavistBridge);
console.log('BridgeContext raw:', window.AdaptavistBridgeContext);

// Универсальная установка текста
function setText(id, text) {
  var el = document.getElementById(id);
  if (el) {
    el.textContent = text;
  }
}

// Ждём появления контекста от bridge
function waitForContext(tries) {
  tries = tries || 0;

  // Нет bridge вообще
  if (!window.AdaptavistBridge || !window.AdaptavistBridgeContext) {
    if (tries === 0) {
      console.warn('Bridge or BridgeContext not ready yet');
    }
  } else if (window.AdaptavistBridgeContext.context) {
    console.log('Context ready:', window.AdaptavistBridgeContext.context);
    loadIssueWithContext(window.AdaptavistBridgeContext.context);
    return;
  }

  if (tries > 20) { // ~2 секунды ожидания
    console.error('No context from bridge after waiting');
    setText('col1-value', 'No context from bridge');
    return;
  }

  setTimeout(function () {
    waitForContext(tries + 1);
  }, 100);
}

// Основная логика запроса к Jira
function loadIssueWithContext(ctx) {
  // Если issueKey нет в контексте — можно использовать хардкод AP-1, как у тебя,
  // но при нормальной работе он должен быть
  var issueKey = ctx && ctx.issueKey ? ctx.issueKey : 'AP-1';

  console.log('Using issueKey:', issueKey);

  window.AdaptavistBridge.request({
    url: `/rest/api/2/issue/${issueKey}`,
    type: 'GET'
  })
    .then(function (issue) {
      console.log('Issue:', issue);
      setText(
        'col1-value',
        `${issue.key} is a ${issue.fields.issuetype.name} in ${issue.fields.status.name}`
      );
    })
    .catch(function (err) {
      console.error('Error loading issue', err);
      setText('col1-value', 'Error loading issue');
    });
}

// Старт после загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    waitForContext(0);
  }, 200);
});
