window.addEventListener('DOMContentLoaded', function () {
  // Проверяем, что bridge доступен
  if (!window.AdaptavistBridge || !window.AdaptavistBridgeContext) {
    console.error('AdaptavistBridge не найден');
    setError('Bridge is not available');
    return;
  }

  const ctx = window.AdaptavistBridgeContext.context || {};

  if (!ctx.issueKey) {
    setError('Not in issue context');
    return;
  }

  // Запрос в Jira REST API через AdaptavistBridge
  window.AdaptavistBridge
    .request({
      url: `/rest/api/2/issue/${ctx.issueKey}`,
      type: 'GET'
    })
    .then(function (issue) {
      // col1: issue key
      setText('col1-value', issue.key);

      // col2: status name
      const statusName = issue.fields &&
                         issue.fields.status &&
                         issue.fields.status.name
        ? issue.fields.status.name
        : 'No status';
      setText('col2-value', statusName);

      // col3: assignee displayName
      const assigneeName = issue.fields &&
                           issue.fields.assignee &&
                           issue.fields.assignee.displayName
        ? issue.fields.assignee.displayName
        : 'Unassigned';
      setText('col3-value', assigneeName);
    })
    .catch(function (err) {
      console.error('Error loading issue', err);
      setError('Error loading issue');
    });
});

function setText(id, text) {
  var el = document.getElementById(id);
  if (el) {
    el.textContent = text;
  }
}

function setError(msg) {
  setText('col1-value', msg);
  setText('col2-value', msg);
  setText('col3-value', msg);
}
