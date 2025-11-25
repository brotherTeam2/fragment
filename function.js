// Скрипт почти 1 в 1 как в доке, только без <script> тегов
console.log(AdaptavistBridgeContext && AdaptavistBridgeContext.context);

AdaptavistBridge.request({
  url: `/rest/api/2/issue/${AdaptavistBridgeContext.context.issueKey}`,
  type: 'GET'
})
  .then(function (issue) {
    console.log('issue', issue);
    document.getElementById("col1-value").textContent =
      `${issue.key} is a ${issue.fields.issuetype.name} in ${issue.fields.status.name}`;
  })
  .catch(function (e) {
    console.error('Error loading issue', e);
    document.getElementById("col1-value").textContent = 'Error loading issue';
  });
