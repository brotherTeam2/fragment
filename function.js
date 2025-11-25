// Для отладки посмотри консоль фрагмента в браузере (DevTools)
console.log('Bridge:', window.AdaptavistBridge);
console.log('BridgeContext:', window.AdaptavistBridgeContext);

function setText(id, text) {
  var el = document.getElementById(id);
  if (el) {
    el.textContent = text;
  }
}

function loadIssue() {
  if (!window.AdaptavistBridge || !window.AdaptavistBridgeContext) {
    console.error('Bridge not available yet');
    setText('col1-value', 'Bridge not available');
    return;
  }

  var ctx = window.AdaptavistBridgeContext.context || {};
  console.log('Context:', ctx);

  if (!ctx.issueKey) {
    setText('col1-value', 'No issueKey in context');
    return;
  }

  window.AdaptavistBridge.request({
    url: `/rest/api/2/issue/${ctx.issueKey}`,
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

// ждём, пока DOM и bridge будут готовы
document.addEventListener('DOMContentLoaded', function () {
  // небольшая задержка, чтобы успел инициализироваться bridge
  setTimeout(loadIssue, 200);
});
