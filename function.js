// Adaptavist Bridge уже подключен автоматически для ScriptRunner Fragment
window.addEventListener('DOMContentLoaded', function() {
  const context = window.AdaptavistBridgeContext && window.AdaptavistBridgeContext.context;
  if (context && context.issueKey) {
    window.AdaptavistBridge.request({
      url: `/rest/api/2/issue/${context.issueKey}`,
      type: 'GET'
    })
    .then(issue => {
      document.getElementById("info").innerText =
        `${issue.key}: ${issue.fields.summary} (${issue.fields.status.name})`;
    })
    .catch(() => {
      document.getElementById("info").innerText = "Не удалось получить данные задачи!";
    });
  } else {
    document.getElementById("info").innerText = "Открыто не в контексте задачи.";
  }
});
